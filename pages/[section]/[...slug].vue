<template>
  <div v-if="doc" class="flex gap-8 max-w-6xl mx-auto">
    <div class="flex-1 min-w-0">
      <DocRenderer :doc="doc" />
    </div>
    <TableOfContents :links="doc?.body?.toc?.links ?? []" :link="doc?.link" :link-label="doc?.link_label" />
  </div>
  <GroupIndex v-else-if="isGroup" :path="path" :title="groupTitle" />
</template>

<script setup lang="ts">
const route = useRoute()

const section = String(route.params.section ?? '').replace(/[^a-z0-9-]/g, '')
const rawSlug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
const slug = String(rawSlug ?? '').replace(/[^a-z0-9/_.-]/gi, '').replace(/\.{2,}/g, '')
const path = `/${section}/${slug}`

const { data: doc } = await useAsyncData(`content-${path}`, () =>
  queryContent(path).findOne().catch(() => null)
)

const { data: children } = await useAsyncData(`group-check-${path}`, () =>
  queryContent(path)
    .where({ _partial: false, draft: { $ne: true } })
    .only(['_path'])
    .find()
)

const isGroup = computed(() => !doc.value && (children.value?.length ?? 0) > 0)

const upperCaseWords = new Set(['php', 'css', 'html', 'js', 'ts', 'sql', 'api', 'cli', 'sdk', 'ui', 'ux', 'ci', 'cd', 'aws', 'gcp', 'npm', 'vue', 'jwt', 'ssh', 'dns', 'tcp', 'udp', 'http', 'https'])

function formatTitle(s: string): string {
  return s.replace(/-/g, ' ').split(' ').map((w) =>
    upperCaseWords.has(w.toLowerCase()) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)
  ).join(' ')
}

const lastSegment = slug.split('/').at(-1) ?? slug
const groupTitle = formatTitle(lastSegment)

if (!doc.value && !isGroup.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
</script>
