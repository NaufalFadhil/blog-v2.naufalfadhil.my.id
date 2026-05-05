<template>
  <!-- DSA Handbook: trophy cup -->
  <svg v-if="name === 'data-structure-algorithm'" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" :class="cls">
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

  <!-- Python: snake / lambda λ symbol -->
  <svg v-else-if="name === 'python'" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" :class="cls">
    <path d="M12 2C9 2 7 3.5 7 6v2h5v1H6C4 9 2 10.5 2 13s1.5 4 4 4h1v-2.5c0-1.5 1-2.5 2.5-2.5h5c1.5 0 2.5-1 2.5-2.5V6c0-2.5-2-4-5-4z"/>
    <path d="M12 22c3 0 5-1.5 5-4v-2h-5v-1h6c2 0 4-1.5 4-4s-1.5-4-4-4h-1v2.5c0 1.5-1 2.5-2.5 2.5h-5C8.5 12 7.5 13 7.5 14.5V18c0 2.5 2 4 5 4z"/>
    <circle cx="9.5" cy="5.5" r="0.75" fill="currentColor" stroke="none"/>
    <circle cx="14.5" cy="18.5" r="0.75" fill="currentColor" stroke="none"/>
  </svg>

  <!-- Java: coffee cup -->
  <svg v-else-if="name === 'java'" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" :class="cls">
    <path d="M6 2c0 0 .5 2 2 3s3 1 3 3"/>
    <path d="M8 2c0 0 .5 2 2 3s3 1 3 3"/>
    <path d="M5 13h11l-1 7H6l-1-7z"/>
    <path d="M16 16h2a2 2 0 000-4h-2"/>
  </svg>

  <!-- Rust: gear/cog -->
  <svg v-else-if="name === 'rust'" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" :class="cls">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>

  <!-- Jenkins: CI/CD pipeline arrows -->
  <svg v-else-if="name === 'jenkins'" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" :class="cls">
    <circle cx="5" cy="12" r="2"/>
    <circle cx="19" cy="12" r="2"/>
    <circle cx="12" cy="5" r="2"/>
    <circle cx="12" cy="19" r="2"/>
    <path d="M7 12h5M12 7v5M17 12h-5M12 14v5"/>
  </svg>

  <!-- C++ / CPP: brackets with plus -->
  <svg v-else-if="name === 'cpp'" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" :class="cls">
    <path d="M10 8L6 12l4 4"/>
    <line x1="15" y1="10" x2="15" y2="14"/>
    <line x1="13" y1="12" x2="17" y2="12"/>
    <line x1="21" y1="10" x2="21" y2="14"/>
    <line x1="19" y1="12" x2="23" y2="12"/>
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
