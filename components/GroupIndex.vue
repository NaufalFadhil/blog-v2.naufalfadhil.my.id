<template>
  <div class="flex gap-10 max-w-6xl mx-auto">
    <div class="flex-1 min-w-0">
      <section class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ title }}</h1>
      </section>

      <div class="space-y-3">
        <NuxtLink
          v-for="post in (posts ?? [])"
          :key="post._path"
          :to="post._path"
          class="flex items-center justify-between gap-4 px-6 py-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
        >
          <div class="min-w-0">
            <span class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ post.title }}
            </span>
            <p v-if="post.description" class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
              {{ post.description }}
            </p>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <div class="hidden sm:flex gap-1.5">
              <span
                v-for="tag in (post.tags ?? []).slice(0, 2)"
                :key="tag"
                :class="tagColor(tag)"
                class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
              >
                {{ tag }}
              </span>
            </div>
            <span v-if="post.date" class="text-sm text-gray-400">
              {{ formatDate(post.date) }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <p v-if="!posts?.length" class="text-center py-12 text-gray-500 dark:text-gray-400">
        No content yet.
      </p>
    </div>
    <PageSidebar />
  </div>
</template>

<script setup lang="ts">
const { tagColor } = useTagColor()

const props = defineProps<{
  path: string
  title: string
}>()

const { data: posts } = await useAsyncData(`group-${props.path}`, () =>
  queryContent(props.path)
    .where({ _partial: false, draft: { $ne: true } })
    .only(['_path', 'title', 'description', 'tags', 'date'])
    .sort({ date: -1 })
    .find()
)

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

useHead({
  title: `${props.title} — Naufal Fadhil`,
})
</script>
