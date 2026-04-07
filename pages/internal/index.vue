<template>
  <SectionIndex section="internal" title="Internal" description="Private pages — visible to authenticated users only" />
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
