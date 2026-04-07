<template>
  <nav v-if="flatLinks.length > 0 || link || showOnClient" class="hidden xl:block w-56 shrink-0">
    <div class="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin flex flex-col gap-4">
      <!-- Link button -->
      <button
        class="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-lg border transition-colors"
        :class="copied
          ? 'border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
          : 'border-primary-300 dark:border-primary-700 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30'"
        @click="link ? openLink() : copyLink()"
      >
        <!-- External link icon -->
        <svg v-if="link && !copied" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        <!-- Copy icon -->
        <svg v-else-if="!copied" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <!-- Copied icon -->
        <svg v-else class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        {{ copied ? 'Copied!' : (link ? (linkLabel || 'Open Link') : 'Copy Link') }}
      </button>

      <!-- TOC -->
      <div v-if="flatLinks.length > 0">
        <h4 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
          On this page
        </h4>
        <ul class="space-y-1 text-sm">
          <li v-for="tocLink in flatLinks" :key="tocLink.id">
            <a
              :href="`#${tocLink.id}`"
              :class="[
                'block py-1 transition-colors border-l-2 hover:text-gray-900 dark:hover:text-white',
                tocLink.depth === 3 ? 'pl-6' : 'pl-3',
                activeId === tocLink.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-medium'
                  : 'border-transparent text-gray-500 dark:text-gray-400',
              ]"
              @click.prevent="scrollToHeading(tocLink.id)"
            >
              {{ tocLink.text }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = defineProps<{
  links: TocLink[]
  link?: string
  linkLabel?: string
}>()

const copied = ref(false)
const showOnClient = ref(false)

onMounted(() => {
  showOnClient.value = true
})

function openLink() {
  if (props.link) window.open(props.link, '_blank', 'noopener,noreferrer')
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}

// Flatten nested h3 children into a flat list
function flatten(links: TocLink[]): TocLink[] {
  const result: TocLink[] = []
  for (const link of links) {
    result.push({ id: link.id, text: link.text, depth: link.depth })
    if (link.children?.length) {
      result.push(...flatten(link.children))
    }
  }
  return result
}

const flatLinks = computed(() => flatten(props.links))

const activeId = ref('')

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-80px 0px -75% 0px', threshold: 0 }
  )

  const headings = document.querySelectorAll('.prose h2[id], .prose h3[id]')
  headings.forEach((h) => observer.observe(h))

  onUnmounted(() => observer.disconnect())
})

function scrollToHeading(id: string) {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
    activeId.value = id
    history.replaceState(null, '', `#${id}`)
  }
}
</script>
