<template>
  <div class="min-h-screen">
    <AppTopbar
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @open-search="search.open()"
    />

    <AppSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />

    <main
      :class="[
        'flex-1 min-w-0 px-4 lg:px-8 py-8 transition-[margin] duration-200 ease-in-out',
        sidebarOpen ? 'lg:ml-72' : '',
      ]"
    >
      <slot />
    </main>

    <SearchModal />
  </div>
</template>

<script setup lang="ts">
const sidebarOpen = ref(false)
const search = useSearch()

onMounted(() => {
  sidebarOpen.value = window.innerWidth >= 1024
})
</script>