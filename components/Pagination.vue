<template>
  <nav v-if="totalPages > 1" class="flex items-center justify-center gap-1 mt-8">
    <button
      :disabled="currentPage <= 1"
      class="px-3 py-1.5 text-sm rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed
             text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      @click="$emit('page-change', currentPage - 1)"
    >
      Previous
    </button>

    <template v-for="page in visiblePages" :key="page">
      <span v-if="page === '...'" class="px-2 text-gray-400">...</span>
      <button
        v-else
        class="w-8 h-8 text-sm rounded-md transition-colors"
        :class="page === currentPage
          ? 'bg-primary-500 text-white font-medium'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'"
        @click="$emit('page-change', page as number)"
      >
        {{ page }}
      </button>
    </template>

    <button
      :disabled="currentPage >= totalPages"
      class="px-3 py-1.5 text-sm rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed
             text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      @click="$emit('page-change', currentPage + 1)"
    >
      Next
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits(['page-change'])

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')

  pages.push(total)
  return pages
})
</script>
