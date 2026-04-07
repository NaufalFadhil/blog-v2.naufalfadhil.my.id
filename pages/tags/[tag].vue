<template>
  <div class="flex gap-10 max-w-6xl mx-auto">
  <div class="flex-1 min-w-0">
    <header class="mb-8">
      <NuxtLink to="/" class="text-sm text-primary-500 hover:underline mb-2 inline-block">&larr; Back</NuxtLink>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Posts tagged "{{ tag }}"
      </h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">
        {{ posts.length }} {{ posts.length === 1 ? 'post' : 'posts' }} found
      </p>
    </header>

    <div class="grid gap-3">
      <NuxtLink
        v-for="post in paginatedPosts"
        :key="post._path"
        :to="post._path"
        class="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
      >
        <h2 class="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {{ post.title }}
        </h2>
        <p v-if="post.description" class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ post.description }}
        </p>
        <div class="flex items-center gap-3 mt-2">
          <TagList v-if="post.tags?.length" :tags="post.tags" />
          <span v-if="post.date" class="text-xs text-gray-400">{{ formatDate(post.date) }}</span>
        </div>
      </NuxtLink>
    </div>

    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="currentPage = $event"
    />
  </div>
  <PageSidebar />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const tag = String(route.params.tag ?? '').replace(/[^a-z0-9._-]/gi, '').slice(0, 100)

const { data } = await useAsyncData(`tag-${tag}`, () =>
  queryContent('/')
    .where({ tags: { $contains: tag }, draft: { $ne: true } })
    .only(['_path', 'title', 'description', 'tags', 'date'])
    .sort({ date: -1 })
    .find()
)

const posts = computed(() => data.value ?? [])

const perPage = 10
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(posts.value.length / perPage))
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return posts.value.slice(start, start + perPage)
})

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

useHead({
  title: `Posts tagged "${tag}" — Naufal Fadhil`,
  meta: [
    { name: 'description', content: `All posts tagged with "${tag}"` },
  ],
})
</script>
