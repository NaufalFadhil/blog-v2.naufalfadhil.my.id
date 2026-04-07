<template>
  <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
    <span class="flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ readingTime }} min read
    </span>
    <span class="text-gray-300 dark:text-gray-700">|</span>
    <span>{{ wordCount.toLocaleString() }} words</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  readingTime: number
  wordCount: number
}>()
</script>
