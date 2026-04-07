<template>
  <div class="flex gap-8 max-w-6xl mx-auto">
    <div class="flex-1 min-w-0">
      <DocRenderer v-if="doc" :doc="doc" />
      <div v-else class="text-center py-20 text-gray-500">
        <p class="text-lg">Page not found</p>
        <NuxtLink to="/" class="text-primary-500 hover:underline mt-2 inline-block">Go home</NuxtLink>
      </div>
    </div>
    <TableOfContents :links="doc?.body?.toc?.links ?? []" :link="doc?.link" :link-label="doc?.link_label" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const auth = useAuth()
const rawSlug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
const slug = String(rawSlug ?? '').replace(/[^a-z0-9/_.-]/gi, '').replace(/\.{2,}/g, '')
const path = `/til/${slug}`

const { data: doc } = await useAsyncData(`content-${path}`, () =>
  queryContent(path).findOne()
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

onMounted(() => {
  if (doc.value && !auth.canAccess(doc.value as Record<string, unknown>)) {
    navigateTo(`/login?redirect=${encodeURIComponent(route.path)}`)
  }
})
</script>
