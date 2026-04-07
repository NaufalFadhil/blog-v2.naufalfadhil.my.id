<template>
  <div v-if="tags && tags.length > 0" class="flex flex-wrap gap-1.5">
    <NuxtLink
      v-for="tag in tags"
      :key="tag"
      :to="`/tags/${tag}`"
      class="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full transition-colors
             bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
             hover:bg-primary-100 dark:hover:bg-primary-900/50 hover:text-primary-700 dark:hover:text-primary-300"
    >
      {{ tag }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ tags: string[] }>()
</script>
