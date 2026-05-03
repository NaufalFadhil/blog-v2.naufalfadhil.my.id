<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <CursorGlow />
</template>

<script setup lang="ts">
// Apply dark mode on initial load (before hydration flicker)
if (import.meta.client) {
  const stored = localStorage.getItem('color-mode')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.classList.add('dark')
  }
}
</script>
