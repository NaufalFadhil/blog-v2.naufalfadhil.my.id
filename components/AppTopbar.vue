<template>
  <header
    class="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm"
  >
    <div class="flex items-center justify-between h-14 px-4 lg:px-6">
      <div class="flex items-center gap-3">
        <button
          class="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          @click="$emit('toggle-sidebar')"
          aria-label="Toggle sidebar"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <NuxtLink to="/" class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <svg class="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span v-if="showAuth && auth.isAuthenticated.value" class="hidden sm:inline">Naufal Fadhil Internal</span>
          <span v-else class="hidden sm:inline">Naufal Fadhil's Docs</span>
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <button
          class="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          @click="$emit('open-search')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span class="hidden sm:inline">Search...</span>
          <kbd class="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs font-mono bg-gray-200 dark:bg-gray-700 rounded">
            ⌘K
          </kbd>
        </button>

        <button
          class="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          @click="toggleColorMode"
          aria-label="Toggle dark mode"
        >
          <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <!-- Auth: show user badge + logout when authenticated, login button otherwise -->
        <template v-if="showAuth">
          <template v-if="auth.isAuthenticated.value">
            <div class="relative" ref="profileRef">
              <button
                class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-semibold hover:ring-2 hover:ring-primary-400 transition-all"
                @click="profileOpen = !profileOpen"
                aria-label="Account menu"
              >
                {{ initials }}
              </button>

              <!-- Dropdown -->
              <div
                v-if="profileOpen"
                class="absolute right-0 top-full mt-2 w-56 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg z-50 overflow-hidden"
              >
                <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <p class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Signed in as</p>
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ auth.userEmail.value }}</p>
                </div>
                <button
                  class="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  @click="handleLogout"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits(['toggle-sidebar', 'open-search'])

const isDark = ref(false)
const showAuth = ref(false)
const profileOpen = ref(false)
const profileRef = ref<HTMLElement | null>(null)
const auth = useAuth()

const initials = computed(() => {
  const email = auth.userEmail.value ?? ''
  const [local] = email.split('@')
  return local.slice(0, 2).toUpperCase() || '??'
})

onMounted(() => {
  showAuth.value = true
  const stored = localStorage.getItem('color-mode')
  isDark.value = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme()

  document.addEventListener('click', (e) => {
    if (profileRef.value && !profileRef.value.contains(e.target as Node)) {
      profileOpen.value = false
    }
  })
})

function toggleColorMode() {
  isDark.value = !isDark.value
  if (import.meta.client) {
    localStorage.setItem('color-mode', isDark.value ? 'dark' : 'light')
  }
  applyTheme()
}

function applyTheme() {
  if (!import.meta.client) return
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function handleLogout() {
  auth.logout()
  navigateTo('/')
}
</script>
