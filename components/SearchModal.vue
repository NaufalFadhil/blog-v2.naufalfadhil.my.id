<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50" @click="close" />

        <!-- Modal -->
        <div class="fixed inset-x-0 top-[15vh] mx-auto max-w-xl px-4">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <!-- Search Input -->
            <div class="flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
              <svg class="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref="inputRef"
                v-model="query"
                type="text"
                class="flex-1 px-3 py-3.5 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-base"
                placeholder="Search documentation..."
                @keydown.up.prevent="moveUp"
                @keydown.down.prevent="moveDown"
                @keydown.enter.prevent="selectCurrent"
                @keydown.esc="close"
              />
              <kbd class="px-2 py-0.5 text-xs font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 rounded">
                ESC
              </kbd>
            </div>

            <!-- Results -->
            <div class="max-h-80 overflow-y-auto scrollbar-thin">
              <div v-if="isLoading" class="px-4 py-8 text-center text-gray-500">
                Searching...
              </div>

              <div v-else-if="query.length >= 2 && results.length === 0" class="px-4 py-8 text-center text-gray-500">
                No results found for "<span class="font-medium">{{ query }}</span>"
              </div>

              <ul v-else-if="results.length > 0" class="py-2">
                <li v-for="(result, idx) in results" :key="result.item._path">
                  <button
                    class="w-full text-left px-4 py-3 flex items-start gap-3 transition-colors"
                    :class="idx === selectedIndex
                      ? 'bg-primary-50 dark:bg-primary-950/50'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'"
                    @click="navigateToResult(result)"
                    @mouseenter="selectedIndex = idx"
                  >
                    <div class="shrink-0 mt-0.5">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="text-sm font-medium text-gray-900 dark:text-white truncate">
                        <template v-for="(seg, i) in splitHighlight(result.item.title ?? '', query)" :key="i">
                          <mark v-if="seg.match" class="search-highlight">{{ seg.text }}</mark>
                          <span v-else>{{ seg.text }}</span>
                        </template>
                      </div>
                      <div
                        v-if="result.item.description"
                        class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate"
                      >
                        <template v-for="(seg, i) in splitHighlight(result.item.description ?? '', query)" :key="i">
                          <mark v-if="seg.match" class="search-highlight">{{ seg.text }}</mark>
                          <span v-else>{{ seg.text }}</span>
                        </template>
                      </div>
                      <div class="flex items-center gap-1.5 mt-1">
                        <span
                          v-for="tag in (result.item.tags ?? []).slice(0, 3)"
                          :key="tag"
                          class="inline-flex px-1.5 py-0.5 text-[10px] font-medium rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        >
                          {{ tag }}
                        </span>
                      </div>
                    </div>
                    <div class="shrink-0">
                      <svg
                        v-if="idx === selectedIndex"
                        class="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </li>
              </ul>

              <div v-else class="px-4 py-8 text-center text-gray-400 text-sm">
                Type to search documentation...
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between px-4 py-2 text-xs text-gray-400 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-3">
                <span class="flex items-center gap-1">
                  <kbd class="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px]">↑↓</kbd>
                  navigate
                </span>
                <span class="flex items-center gap-1">
                  <kbd class="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px]">↵</kbd>
                  select
                </span>
                <span class="flex items-center gap-1">
                  <kbd class="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px]">esc</kbd>
                  close
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { query, results, isLoading, isOpen, selectedIndex, close, moveUp, moveDown, selectCurrent } = useSearch()

const inputRef = ref<HTMLInputElement | null>(null)

watch(isOpen, (open) => {
  if (open) {
    nextTick(() => inputRef.value?.focus())
  }
})

function navigateToResult(result: any) {
  navigateTo(result.item._path)
  close()
}

interface TextSegment {
  text: string
  match: boolean
}

function splitHighlight(text: string, search: string): TextSegment[] {
  if (!search || search.length < 2) return [{ text, match: false }]

  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  return parts
    .filter((p) => p.length > 0)
    .map((p) => ({
      text: p,
      match: regex.test(p) || p.toLowerCase() === search.toLowerCase(),
    }))
}
</script>
