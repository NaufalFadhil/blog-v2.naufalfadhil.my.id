<template>
  <!-- Competitive Programming: trophy cup -->
  <svg v-if="name === 'competitive-programming'" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" :class="cls">
    <path d="M6 3h12v7a6 6 0 01-12 0V3z"/>
    <path d="M6 5H3.5A1.5 1.5 0 002 6.5v1A3.5 3.5 0 005.5 11"/>
    <path d="M18 5h2.5A1.5 1.5 0 0122 6.5v1A3.5 3.5 0 0118.5 11"/>
    <line x1="12" y1="16" x2="12" y2="19"/>
    <path d="M8 21h8"/>
  </svg>

  <!-- Docker: stacked containers -->
  <svg v-else-if="name === 'docker'" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" :class="cls">
    <rect x="3" y="4" width="18" height="4" rx="1"/>
    <rect x="3" y="10" width="18" height="4" rx="1"/>
    <rect x="3" y="16" width="18" height="4" rx="1"/>
  </svg>

  <!-- JavaScript: curly braces { } -->
  <svg v-else-if="name === 'javascript'" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" :class="cls">
    <path d="M9 4H7a2 2 0 00-2 2v3a2 2 0 01-2 2 2 2 0 012 2v3a2 2 0 002 2h2"/>
    <path d="M15 4h2a2 2 0 012 2v3a2 2 0 002 2 2 2 0 01-2 2v3a2 2 0 01-2 2h-2"/>
  </svg>

  <!-- PHP: code slash </> -->
  <svg v-else-if="name === 'php'" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" :class="cls">
    <path d="M7 8L3 12l4 4"/>
    <path d="M17 8l4 4-4 4"/>
    <line x1="14" y1="4" x2="10" y2="20"/>
  </svg>

  <!-- Fallback: file document -->
  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" :class="cls">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  name: string
  cls?: string
  strokeWidth?: number | string
}>(), {
  strokeWidth: 1.5,
})
</script>
