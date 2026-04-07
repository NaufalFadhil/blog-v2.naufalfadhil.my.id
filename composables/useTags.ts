import type { ParsedContent } from '@nuxt/content'

interface TagInfo {
  name: string
  count: number
}

export function useTags() {
  const tags = ref<TagInfo[]>([])

  const fetchTags = async () => {
    const { data } = await useAsyncData('all-tags', () =>
      queryContent('/').where({ _partial: false, draft: { $ne: true } }).only(['tags']).find()
    )

    if (data.value) {
      const tagMap = new Map<string, number>()

      for (const doc of data.value) {
        if (doc.tags && Array.isArray(doc.tags)) {
          for (const tag of doc.tags) {
            const normalized = tag.toLowerCase().trim()
            tagMap.set(normalized, (tagMap.get(normalized) ?? 0) + 1)
          }
        }
      }

      tags.value = Array.from(tagMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
    }
  }

  const maxCount = computed(() =>
    tags.value.reduce((max, t) => Math.max(max, t.count), 0)
  )

  const getTagSize = (count: number): string => {
    if (maxCount.value === 0) return 'text-sm'
    const ratio = count / maxCount.value
    if (ratio > 0.75) return 'text-xl font-semibold'
    if (ratio > 0.5) return 'text-lg font-medium'
    if (ratio > 0.25) return 'text-base'
    return 'text-sm'
  }

  const getTagOpacity = (count: number): number => {
    if (maxCount.value === 0) return 0.6
    return 0.4 + (count / maxCount.value) * 0.6
  }

  const getPostsByTag = async (tag: string): Promise<ParsedContent[]> => {
    return await queryContent('/')
      .where({ tags: { $contains: tag }, draft: { $ne: true } })
      .sort({ date: -1 })
      .find()
  }

  return {
    tags,
    fetchTags,
    maxCount,
    getTagSize,
    getTagOpacity,
    getPostsByTag,
  }
}
