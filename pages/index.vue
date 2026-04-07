<template>
  <div class="flex gap-10 max-w-6xl mx-auto">
    <!-- Main content -->
    <div class="flex-1 min-w-0">
      <!-- Hero -->
      <section class="mb-12">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Naufal Fadhil
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Personal documentation, code snippets, and notes. Search with
          <kbd class="px-1.5 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-800 rounded">⌘K</kbd>
        </p>
      </section>

      <!-- Section Cards -->
      <section class="mb-12">
        <div class="grid sm:grid-cols-3 gap-5">
          <NuxtLink
            v-for="section in sections"
            :key="section.path"
            :to="section.path"
            class="group p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-400 dark:hover:border-primary-600 bg-white dark:bg-gray-900 transition-all hover:shadow-md"
          >
            <div class="text-2xl mb-3">{{ section.icon }}</div>
            <h2 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ section.label }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ section.description }}
            </p>
            <span class="inline-block mt-3 text-xs text-gray-400 dark:text-gray-500">
              {{ section.count }} {{ section.count === 1 ? 'item' : 'items' }}
            </span>
          </NuxtLink>
        </div>
      </section>

      <!-- Recent (3 posts) -->
      <section class="mb-12">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent</h2>
        <div class="space-y-3">
          <NuxtLink
            v-for="post in recentPosts?.slice(0, 3)"
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
            </div>
            <span v-if="post.date" class="text-xs text-gray-400 shrink-0">
              {{ formatDate(post.date) }}
            </span>
          </NuxtLink>
        </div>
      </section>
    </div>

    <!-- Right sidebar -->
    <aside class="hidden xl:flex flex-col gap-8 w-56 shrink-0 pt-0">
      <!-- Stats -->
      <div>
        <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Overview</h3>
        <div class="space-y-2">
          <NuxtLink
            v-for="section in sections"
            :key="section.path"
            :to="section.path"
            class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <span class="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
              {{ section.icon }} {{ section.label }}
            </span>
            <span class="text-xs font-medium text-gray-400 dark:text-gray-500 tabular-nums">
              {{ section.count }}
            </span>
          </NuxtLink>
        </div>
      </div>

      <!-- Tags -->
      <div>
        <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Tags</h3>
        <TagCloud uniform />
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth()

const { data: recentPosts } = await useAsyncData('recent-posts', () =>
  queryContent('/')
    .where({ _partial: false, draft: { $ne: true }, internal: { $ne: true } })
    .only(['_path', 'title', 'date'])
    .sort({ date: -1 })
    .limit(3)
    .find()
)

const { data: allContent } = await useAsyncData('section-counts', () =>
  queryContent('/')
    .where({ _partial: false, draft: { $ne: true }, internal: { $ne: true } })
    .only(['_path'])
    .find()
)

const internalCount = ref(0)

onMounted(async () => {
  if (!auth.isAuthenticated.value) return
  const items = await queryContent('/')
    .where({ _partial: false, internal: true })
    .only(['_path'])
    .find()
  internalCount.value = items.filter((i) => auth.canAccess(i as Record<string, unknown>)).length
})

const sections = computed(() => {
  const items = allContent.value ?? []
  const base = [
    {
      path: '/snippets',
      label: 'Snippets',
      icon: '📝',
      description: 'Code snippets and quick references',
      count: items.filter((i) => i._path?.startsWith('/snippets')).length,
    },
    {
      path: '/til',
      label: 'TIL',
      icon: '💡',
      description: 'Today I learned — short discoveries',
      count: items.filter((i) => i._path?.startsWith('/til')).length,
    },
    {
      path: '/notes',
      label: 'Notes',
      icon: '📒',
      description: 'In-depth notes and documentation',
      count: items.filter((i) => i._path?.startsWith('/notes')).length,
    },
  ]
  if (auth.isAuthenticated.value) {
    base.push({
      path: '/internal',
      label: 'Internal',
      icon: '🔒',
      description: 'Private pages for authenticated users',
      count: internalCount.value,
    })
  }
  return base
})

const upperCaseWords = new Set(['php', 'css', 'html', 'js', 'ts', 'sql', 'api', 'cli', 'sdk', 'ui', 'ux', 'ci', 'cd', 'aws', 'gcp', 'npm', 'vue', 'jwt', 'ssh', 'dns', 'tcp', 'udp', 'http', 'https', 'til'])

function formatCrumb(crumb: string): string {
  if (upperCaseWords.has(crumb.toLowerCase())) return crumb.toUpperCase()
  return crumb.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function getBreadcrumbs(path: string): string[] {
  const parts = path.split('/').filter(Boolean)
  return parts.slice(0, -1)
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

useHead({
  title: 'Naufal Fadhil — Personal Blog',
})
</script>
