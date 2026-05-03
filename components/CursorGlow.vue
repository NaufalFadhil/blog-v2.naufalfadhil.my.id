<template>
  <div
    v-if="isDark"
    class="cursor-glow"
    :style="{ '--x': x + 'px', '--y': y + 'px' }"
  />
</template>

<script setup lang="ts">
const x = ref(-999)
const y = ref(-999)
const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')

  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })
  observer.observe(document.documentElement, { attributeFilter: ['class'] })

  const onMove = (e: MouseEvent) => {
    x.value = e.clientX
    y.value = e.clientY
  }

  window.addEventListener('mousemove', onMove, { passive: true })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMove)
    observer.disconnect()
  })
})
</script>

<style scoped>
.cursor-glow {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: radial-gradient(
    600px circle at var(--x) var(--y),
    rgba(99, 102, 241, 0.08) 0%,
    rgba(99, 102, 241, 0.03) 30%,
    transparent 70%
  );
  transition: background 0.05s ease;
}
</style>
