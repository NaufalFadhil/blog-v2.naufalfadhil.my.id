const isAuthenticated = ref(false)
const userEmail = ref<string | null>(null)
let initPromise: Promise<void> | null = null

async function init(): Promise<void> {
  if (!import.meta.client) return
  if (initPromise) return initPromise
  initPromise = $fetch<{ email: string }>('/api/auth/me')
    .then((data) => {
      isAuthenticated.value = true
      userEmail.value = data.email
    })
    .catch(() => {
      isAuthenticated.value = false
      userEmail.value = null
    })
  return initPromise
}

export function useAuth() {
  async function login(email: string, password: string): Promise<boolean> {
    try {
      await $fetch('/api/auth/login', { method: 'POST', body: { email, password } })
      isAuthenticated.value = true
      userEmail.value = email.toLowerCase().trim()
      return true
    } catch {
      return false
    }
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
    isAuthenticated.value = false
    userEmail.value = null
    initPromise = null
  }

  function canAccess(doc: Record<string, unknown>): boolean {
    const isProtected = doc.draft === true || doc.internal === true
    if (!isProtected) return true
    if (!isAuthenticated.value) return false

    const accessList = doc.internal_access as string[] | undefined
    if (!accessList || accessList.length === 0) return true

    return accessList.map((e) => e.toLowerCase()).includes(userEmail.value ?? '')
  }

  return { isAuthenticated, userEmail, login, logout, canAccess, init }
}
