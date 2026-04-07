<template>
  <div class="flex flex-wrap gap-2 items-center">
    <NuxtLink
      v-for="tag in tags"
      :key="tag.name"
      :to="`/tags/${tag.name}`"
      :class="uniform ? 'text-sm' : getTagSize(tag.count)"
      :style="uniform ? {} : { opacity: getTagOpacity(tag.count) }"
      class="inline-flex items-center px-3 py-1.5 rounded-lg transition-all
             bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
             hover:bg-primary-100 dark:hover:bg-primary-900/50 hover:text-primary-700 dark:hover:text-primary-300
             hover:opacity-100"
    >
      {{ tag.name }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ uniform?: boolean }>()
const { tags, fetchTags, getTagSize, getTagOpacity } = useTags()
await fetchTags()
</script>
