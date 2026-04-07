import type { ParsedContent } from '@nuxt/content'

interface ScoredPost {
  post: ParsedContent
  score: number
}

export function useRelatedPosts() {
  const getRelatedPosts = async (
    currentPost: ParsedContent,
    limit: number = 4
  ): Promise<ParsedContent[]> => {
    if (!currentPost?._path) return []

    const { data } = await useAsyncData(
      `related-${currentPost._path}`,
      () =>
        queryContent('/')
          .where({ _partial: false, draft: { $ne: true }, _path: { $ne: currentPost._path } })
          .only(['_path', 'title', 'description', 'tags', 'date'])
          .find()
    )

    if (!data.value) return []

    const currentTags = new Set(
      (currentPost.tags ?? []).map((t: string) => t.toLowerCase())
    )
    const currentTitle = (currentPost.title ?? '').toLowerCase()
    const currentWords = new Set(
      currentTitle.split(/\s+/).filter((w) => w.length > 3)
    )

    const scored: ScoredPost[] = data.value.map((post) => {
      let score = 0

      // Tag similarity: each shared tag = 3 points
      const postTags = (post.tags ?? []).map((t: string) => t.toLowerCase())
      for (const tag of postTags) {
        if (currentTags.has(tag)) score += 3
      }

      // Title similarity: each shared word (>3 chars) = 1 point
      const postTitle = (post.title ?? '').toLowerCase()
      const postWords = postTitle.split(/\s+/).filter((w) => w.length > 3)
      for (const word of postWords) {
        if (currentWords.has(word)) score += 1
      }

      // Same section bonus
      const currentSection = currentPost._path?.split('/')[1]
      const postSection = post._path?.split('/')[1]
      if (currentSection && currentSection === postSection) score += 1

      return { post, score }
    })

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((s) => s.post)
  }

  return { getRelatedPosts }
}
