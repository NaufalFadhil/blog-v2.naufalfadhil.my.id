<template>
  <div v-if="tags && tags.length > 0" class="flex flex-wrap gap-1.5">
    <NuxtLink
      v-for="tag in tags"
      :key="tag"
      :to="`/tags/${tag}`"
      :class="tagColor(tag)"
      class="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full transition-opacity hover:opacity-80"
    >
      {{ tag }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ tags: string[] }>()
const { tagColor } = useTagColor()
</script>
