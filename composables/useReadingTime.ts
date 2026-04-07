interface ReadingStats {
  wordCount: number
  readingTime: number
}

export function useReadingTime(content: string | null | undefined): ReadingStats {
  if (!content) {
    return { wordCount: 0, readingTime: 0 }
  }

  // Strip markdown/HTML tags for cleaner word count
  const plainText = content
    .replace(/<[^>]*>/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/[#*_~\[\]()>|\\-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  const words = plainText.split(/\s+/).filter((word) => word.length > 0)
  const wordCount = words.length
  const WPM = 200
  const readingTime = Math.max(1, Math.ceil(wordCount / WPM))

  return { wordCount, readingTime }
}

export function useReadingTimeFromBody(body: any): ReadingStats {
  if (!body) return { wordCount: 0, readingTime: 0 }

  const extractText = (node: any): string => {
    if (!node) return ''
    if (typeof node === 'string') return node
    if (node.type === 'text') return node.value ?? ''
    if (node.children && Array.isArray(node.children)) {
      return node.children.map(extractText).join(' ')
    }
    return ''
  }

  const text = extractText(body)
  return useReadingTime(text)
}
