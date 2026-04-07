<template>
  <SectionIndex section="external" title="External" description="Shareable pages — hidden from public navigation, accessible via direct URL" />
</template>

<script setup lang="ts">
const auth = useAuth()
const route = useRoute()

onMounted(() => {
  if (!auth.isAuthenticated.value) {
    navigateTo(`/login?redirect=${encodeURIComponent(route.path)}`)
  }
})
</script>
