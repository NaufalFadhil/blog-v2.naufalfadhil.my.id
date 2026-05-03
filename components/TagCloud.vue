<template>
  <div class="flex flex-wrap gap-2 items-center">
    <NuxtLink
      v-for="tag in tags"
      :key="tag.name"
      :to="`/tags/${tag.name}`"
      :class="[tagColor(tag.name), uniform ? 'text-sm' : getTagSize(tag.count)]"
      :style="uniform ? {} : { opacity: getTagOpacity(tag.count) }"
      class="inline-flex items-center px-3 py-1.5 rounded-lg font-medium transition-opacity hover:opacity-80"
    >
      {{ tag.name }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ uniform?: boolean }>()
const { tags, fetchTags, getTagSize, getTagOpacity } = useTags()
const { tagColor } = useTagColor()
await fetchTags()
</script>
