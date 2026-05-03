<template>
  <nav v-if="crumbs.length > 0" class="hidden sm:flex items-center gap-1.5 text-sm min-w-0 pl-4 border-l border-gray-200 dark:border-gray-700">

    <template v-for="(crumb, i) in crumbs" :key="crumb.path">
      <!-- Separator -->
      <svg
        v-if="i > 0"
        class="w-3.5 h-3.5 shrink-0 text-gray-400 dark:text-gray-600"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>

      <!-- Last crumb (current page) -->
      <span
        v-if="i === crumbs.length - 1"
        class="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px]"
      >
        {{ crumb.label }}
      </span>

      <!-- Ancestor crumb -->
      <NuxtLink
        v-else
        :to="crumb.path"
        class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors truncate max-w-[140px]"
      >
        {{ crumb.label }}
      </NuxtLink>
    </template>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const sectionLabels: Record<string, string> = {
  'data-structure-algorithm': 'DSA Handbook',
  'docker': 'Docker',
  'javascript': 'JavaScript',
  'php': 'PHP',
}

const upperCaseWords = new Set(['php', 'css', 'html', 'js', 'ts', 'sql', 'api', 'cli', 'sdk', 'ui', 'ux', 'ci', 'cd', 'aws', 'gcp', 'npm', 'vue', 'jwt', 'ssh', 'dns', 'tcp', 'udp', 'http', 'https'])

function formatSegment(slug: string): string {
  return sectionLabels[slug] ?? slug.replace(/-/g, ' ').split(' ').map((w) =>
    upperCaseWords.has(w.toLowerCase()) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)
  ).join(' ')
}

const crumbs = computed(() => {
  const parts = route.path.split('/').filter(Boolean)
  if (parts.length === 0) return []

  return parts.map((seg, i) => ({
    label: formatSegment(seg),
    path: '/' + parts.slice(0, i + 1).join('/'),
  }))
})
</script>
