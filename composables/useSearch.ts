import Fuse from 'fuse.js'

interface SearchItem {
  _path: string
  title: string
  description: string
  tags: string[]
  draft?: boolean
  internal?: boolean
  internal_access?: string[]
}

interface SearchResult {
  item: SearchItem
  score: number
  source: 'fuse'
}

// Shared state across all useSearch() calls (singleton)
const query = ref('')
const results = ref<SearchResult[]>([])
const isLoading = ref(false)
const isOpen = ref(false)
const selectedIndex = ref(0)

let fuseInstance: Fuse<SearchItem> | null = null
let contentLoaded = false
let keyboardBound = false

export function useSearch() {
  const auth = useAuth()

  const loadContent = async () => {
    if (contentLoaded) return

    try {
      let items: SearchItem[]

      if (auth.isAuthenticated.value) {
        // Fetch all content (including protected), then filter by access
        const all = await queryContent('/')
          .where({ _partial: false })
          .only(['_path', 'title', 'description', 'tags', 'draft', 'internal', 'internal_access'])
          .find()
        items = all.filter((item) => auth.canAccess(item as Record<string, unknown>)) as SearchItem[]
      } else {
        const all = await queryContent('/')
          .where({ _partial: false, draft: { $ne: true }, internal: { $ne: true }, external: { $ne: true } })
          .only(['_path', 'title', 'description', 'tags'])
          .find()
        items = all as SearchItem[]
      }

      const searchItems: SearchItem[] = items.map((item) => ({
        _path: item._path ?? '',
        title: item.title ?? '',
        description: item.description ?? '',
        tags: item.tags ?? [],
      }))

      fuseInstance = new Fuse(searchItems, {
        keys: [
          { name: 'title', weight: 2 },
          { name: 'description', weight: 1.5 },
          { name: 'tags', weight: 1 },
        ],
        includeScore: true,
        includeMatches: true,
        threshold: 0.4,
        minMatchCharLength: 2,
      })

      contentLoaded = true
    } catch {
      // silently fail
    }
  }

  const search = async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2 || searchQuery.length > 100) {
      results.value = []
      return
    }

    isLoading.value = true

    try {
      await loadContent()

      if (fuseInstance) {
        const fuzzyResults = fuseInstance.search(searchQuery)
        results.value = fuzzyResults.slice(0, 10).map((result) => ({
          item: result.item,
          score: result.score ?? 1,
          source: 'fuse' as const,
        }))
      }
    } catch {
      results.value = []
    } finally {
      isLoading.value = false
    }
  }

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  watch(query, (newQuery) => {
    selectedIndex.value = 0
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => search(newQuery), 200)
  })

  const open = () => {
    isOpen.value = true
    query.value = ''
    results.value = []
    selectedIndex.value = 0
    // Pre-load content when modal opens
    loadContent()
  }

  const close = () => {
    isOpen.value = false
    query.value = ''
    results.value = []
  }

  const moveUp = () => {
    if (selectedIndex.value > 0) selectedIndex.value--
  }

  const moveDown = () => {
    if (selectedIndex.value < results.value.length - 1) selectedIndex.value++
  }

  const selectCurrent = () => {
    const selected = results.value[selectedIndex.value]
    if (selected) {
      navigateTo(selected.item._path)
      close()
    }
  }

  // Reset search cache when auth state changes so protected content is included/excluded
  watch(auth.isAuthenticated, () => {
    contentLoaded = false
    fuseInstance = null
    results.value = []
  })

  // Ctrl+K global shortcut (bind once)
  if (import.meta.client && !keyboardBound) {
    keyboardBound = true
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        isOpen.value ? close() : open()
      }
    }
    document.addEventListener('keydown', handler)
  }

  return {
    query,
    results,
    isLoading,
    isOpen,
    selectedIndex,
    open,
    close,
    moveUp,
    moveDown,
    selectCurrent,
  }
}
