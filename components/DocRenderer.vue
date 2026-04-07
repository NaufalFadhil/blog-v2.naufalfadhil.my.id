<template>
  <article class="w-full">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">
        {{ doc.title }}
      </h1>
      <p v-if="doc.description" class="text-lg text-gray-600 dark:text-gray-400 mb-4">
        {{ doc.description }}
      </p>
      <div class="flex flex-wrap items-center gap-4 mb-4">
        <ReadingStats :reading-time="stats.readingTime" :word-count="stats.wordCount" />
        <span v-if="doc.date" class="text-sm text-gray-500 dark:text-gray-400">
          {{ formatDate(doc.date) }}
        </span>
      </div>
      <TagList v-if="doc.tags?.length" :tags="doc.tags" />
    </header>

    <!-- Body -->
    <div class="prose prose-gray dark:prose-invert max-w-none prose-headings:scroll-mt-20">
      <ContentRenderer :value="doc" />
    </div>

    <!-- Related Posts -->
    <RelatedPosts :post="doc" />
  </article>
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

const props = defineProps<{ doc: ParsedContent }>()

const stats = computed(() => useReadingTimeFromBody(props.doc.body))

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

useHead({
  title: computed(() => props.doc?.title ?? 'Naufal Fadhil'),
  meta: [
    { name: 'description', content: computed(() => props.doc?.description ?? '') },
    { property: 'og:title', content: computed(() => props.doc?.title ?? '') },
    { property: 'og:description', content: computed(() => props.doc?.description ?? '') },
  ],
})
</script>
