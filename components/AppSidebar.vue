<template>
  <aside
    :class="[
      'fixed top-14 bottom-0 left-0 z-30 w-64 bg-white dark:bg-black/20 dark:backdrop-blur-md border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <div class="flex flex-col h-full py-4 overflow-y-auto scrollbar-thin">
      <!-- Mobile close button -->
      <div class="lg:hidden flex justify-end px-4 mb-2">
        <button
          class="p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          @click="$emit('close')"
          aria-label="Close sidebar"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="flex-1 px-3">
        <!-- Back button -->
        <button
          v-if="stack.length > 0"
          class="sidebar-link w-full flex items-center gap-2 mb-2 font-medium"
          @click="goBack"
        >
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to {{ stack[stack.length - 1].label }}
        </button>

        <!-- Current level heading -->
        <h3 class="px-3 mb-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          {{ currentLabel }}
        </h3>

        <!-- Current level items -->
        <ul class="space-y-0.5">
          <li v-for="node in currentNodes" :key="node.key">
            <!-- Folder -->
            <button
              v-if="node.children && node.children.length > 0"
              class="sidebar-link w-full flex items-center justify-between"
              @click="drillInto(node)"
            >
              <span class="min-w-0 break-words text-left">{{ node.label }}</span>
              <svg class="w-4 h-4 shrink-0 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Leaf -->
            <NuxtLink
              v-else
              :to="node.path!"
              class="sidebar-link"
              active-class="sidebar-link-active"
            >
              {{ node.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </aside>

  <!-- Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-20 bg-black/50 lg:hidden"
    @click="$emit('close')"
  />
</template>

<script setup lang="ts">
defineProps<{ isOpen: boolean }>()
defineEmits(['close'])

interface TreeNode {
  key: string
  label: string
  path?: string
  children?: TreeNode[]
}

interface StackEntry {
  label: string
  nodes: TreeNode[]
}

const { data: allContent } = await useAsyncData('sidebar-content', () =>
  queryContent('/')
    .where({ _partial: false, draft: { $ne: true } })
    .only(['_path', 'title', 'weight'])
    .sort({ weight: 1, _path: 1 })
    .find()
)

const sectionConfig = [
  { prefix: '/data-structure-algorithm', label: 'DSA Handbook' },
  { prefix: '/docker', label: 'Docker' },
  { prefix: '/javascript', label: 'JavaScript' },
  { prefix: '/php', label: 'PHP' },
]

interface ContentItem {
  _path: string
  title: string
  weight?: number
}

function buildTree(items: ContentItem[], prefix: string): TreeNode[] {
  const folderMap = new Map<string, ContentItem[]>()
  const folderMinWeight = new Map<string, number>()
  const leaves: (TreeNode & { weight: number })[] = []

  for (const item of items) {
    const relative = item._path.slice(prefix.length + 1)
    const parts = relative.split('/')
    const w = item.weight ?? 9999

    if (parts.length === 1) {
      leaves.push({ key: item._path, label: item.title, path: item._path, weight: w })
    } else {
      const folder = parts[0]
      if (!folderMap.has(folder)) folderMap.set(folder, [])
      folderMap.get(folder)!.push(item)
      const currentMin = folderMinWeight.get(folder) ?? 9999
      if (w < currentMin) folderMinWeight.set(folder, w)
    }
  }

  const folders: (TreeNode & { weight: number })[] = []
  for (const [folder, children] of folderMap) {
    folders.push({
      key: `${prefix}/${folder}`,
      label: formatLabel(folder),
      children: buildTree(children, `${prefix}/${folder}`),
      weight: folderMinWeight.get(folder) ?? 9999,
    })
  }

  // Sort by weight (smallest first), then alphabetically
  folders.sort((a, b) => a.weight - b.weight || a.label.localeCompare(b.label))
  leaves.sort((a, b) => a.weight - b.weight || a.label.localeCompare(b.label))

  return [...folders, ...leaves]
}

const upperCaseWords = new Set(['php', 'css', 'html', 'js', 'ts', 'sql', 'api', 'cli', 'sdk', 'ui', 'ux', 'ci', 'cd', 'aws', 'gcp', 'npm', 'vue', 'jwt', 'ssh', 'dns', 'tcp', 'udp', 'http', 'https', 'til'])

function formatLabel(slug: string): string {
  return slug.replace(/-/g, ' ').split(' ').map((word) =>
    upperCaseWords.has(word.toLowerCase()) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const rootNodes = computed<TreeNode[]>(() => {
  const items = allContent.value
  return sectionConfig
    .map(({ prefix, label }) => {
      const sectionItems = items.filter((i) => i._path?.startsWith(prefix))
      return {
        key: prefix,
        label,
        children: buildTree(
          sectionItems.map((i) => ({ _path: i._path!, title: i.title ?? '', weight: (i as any).weight })),
          prefix
        ),
      }
    })
    .filter((node) => node.children.length > 0)
})

// Drill-down state
const stack = ref<StackEntry[]>([])
const currentNodes = ref<TreeNode[]>([])
const currentLabel = ref('Menu')

// Initialize and keep in sync when content loads
watch(rootNodes, (nodes) => {
  if (stack.value.length === 0) {
    currentNodes.value = nodes
    currentLabel.value = 'Menu'
  }
}, { immediate: true })

function drillInto(node: TreeNode) {
  stack.value.push({
    label: currentLabel.value,
    nodes: currentNodes.value,
  })
  currentLabel.value = node.label
  currentNodes.value = node.children ?? []
}

function goBack() {
  const prev = stack.value.pop()
  if (prev) {
    currentLabel.value = prev.label
    currentNodes.value = prev.nodes
  }
}

// Find a node in the tree by key
function findNode(nodes: TreeNode[], key: string): TreeNode | null {
  for (const node of nodes) {
    if (node.key === key) return node
    if (node.children) {
      const found = findNode(node.children, key)
      if (found) return found
    }
  }
  return null
}

// Auto-drill to current route's parent folder
const route = useRoute()
watch(
  () => route.path,
  (path) => {
    if (path === '/' || !rootNodes.value.length) return

    const parts = path.split('/').filter(Boolean)
    // Walk down to the parent folder of the current page
    // e.g. /snippets/php/references → drill into /snippets then /snippets/php

    stack.value = []
    let nodes = rootNodes.value
    currentLabel.value = 'Menu'
    currentNodes.value = nodes

    for (let i = 0; i < parts.length - 1; i++) {
      const segment = '/' + parts.slice(0, i + 1).join('/')
      const match = nodes.find((n) => n.key === segment)
      if (match?.children) {
        stack.value.push({ label: currentLabel.value, nodes })
        currentLabel.value = match.label
        nodes = match.children
        currentNodes.value = nodes
      }
    }
  },
  { immediate: true }
)
</script>
