<template>
  <div class="flex gap-10 max-w-6xl mx-auto">
  <div class="flex-1 min-w-0">
    <section class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ title }}</h1>
      <p class="text-gray-500 dark:text-gray-400">{{ description }}</p>
    </section>

    <div class="space-y-3">
      <NuxtLink
        v-for="post in (posts ?? [])"
        :key="post._path"
        :to="post._path"
        class="flex items-center justify-between gap-4 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
      >
        <div class="min-w-0">
          <div class="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-0.5">
            <span v-for="(crumb, idx) in getBreadcrumbs(post._path)" :key="idx" class="flex items-center gap-1">
              <span v-if="idx > 0" class="text-gray-300 dark:text-gray-600">/</span>
              <span>{{ formatCrumb(crumb) }}</span>
            </span>
          </div>
          <span class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {{ post.title }}
          </span>
          <p v-if="post.description" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
            {{ post.description }}
          </p>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <div class="hidden sm:flex gap-1.5">
            <span
              v-for="tag in (post.tags ?? []).slice(0, 2)"
              :key="tag"
              class="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
            >
              {{ tag }}
            </span>
          </div>
          <span v-if="post.date" class="text-xs text-gray-400">
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
const props = defineProps<{
  section: string
  title: string
  description: string
}>()

const { data: posts } = await useAsyncData(`section-${props.section}`, () =>
  queryContent(`/${props.section}`)
    .where({ _partial: false, draft: { $ne: true } })
    .only(['_path', 'title', 'description', 'tags', 'date'])
    .sort({ date: -1 })
    .find()
)

const upperCaseWords = new Set(['php', 'css', 'html', 'js', 'ts', 'sql', 'api', 'cli', 'sdk', 'ui', 'ux', 'ci', 'cd', 'aws', 'gcp', 'npm', 'vue', 'jwt', 'ssh', 'dns', 'tcp', 'udp', 'http', 'https', 'til'])

function formatCrumb(crumb: string): string {
  if (upperCaseWords.has(crumb.toLowerCase())) return crumb.toUpperCase()
  return crumb.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function getBreadcrumbs(path: string): string[] {
  const parts = path.split('/').filter(Boolean)
  // Remove first (section) and last (page) segments
  return parts.slice(1, -1)
}

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
