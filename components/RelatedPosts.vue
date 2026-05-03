<template>
  <div v-if="related.length > 0" class="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Related Posts</h3>
    <div class="grid gap-3">
      <NuxtLink
        v-for="post in related"
        :key="post._path"
        :to="post._path"
        class="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
      >
        <h4 class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {{ post.title }}
        </h4>
        <p v-if="post.description" class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
          {{ post.description }}
        </p>
        <div v-if="post.tags?.length" class="flex flex-wrap gap-1 mt-2">
          <span
            v-for="tag in post.tags.slice(0, 3)"
            :key="tag"
            :class="tagColor(tag)"
            class="text-[10px] px-1.5 py-0.5 rounded font-medium"
          >
            {{ tag }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

const props = defineProps<{ post: ParsedContent }>()
const { getRelatedPosts } = useRelatedPosts()

const related = ref<ParsedContent[]>([])

watch(
  () => props.post?._path,
  async () => {
    if (props.post) {
      related.value = await getRelatedPosts(props.post)
    }
  },
  { immediate: true }
)

const { tagColor } = useTagColor()
</script>
