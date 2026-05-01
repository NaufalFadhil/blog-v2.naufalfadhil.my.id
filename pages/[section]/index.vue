<template>
  <SectionIndex :section="section" :title="formatTitle(section)" description="" />
</template>

<script setup lang="ts">
const route = useRoute()
const section = String(route.params.section ?? '').replace(/[^a-z0-9-]/g, '')

function formatTitle(s: string): string {
  const upper = new Set(['php', 'css', 'html', 'js', 'ts', 'sql', 'api'])
  return s.replace(/-/g, ' ').split(' ').map((w) =>
    upper.has(w.toLowerCase()) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)
  ).join(' ')
}

useHead({
  title: `${formatTitle(section)} — Naufal Fadhil`,
})
</script>
