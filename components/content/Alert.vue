<template>
  <div :class="containerClass" role="alert">
    <div class="flex items-center gap-3">
      <span class="shrink-0 text-lg leading-none">{{ icon }}</span>
      <div class="flex-1 min-w-0 text-sm">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ type?: string }>(), {
  type: 'info',
})

const styles: Record<string, string> = {
  info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
  warning: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
  error: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  success: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
}

const icons: Record<string, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  error: '❌',
  success: '✅',
}

const containerClass = computed(() => [
  'my-4 p-4 rounded-lg border',
  styles[props.type] ?? styles.info,
])

const icon = computed(() => icons[props.type] ?? icons.info)
</script>
