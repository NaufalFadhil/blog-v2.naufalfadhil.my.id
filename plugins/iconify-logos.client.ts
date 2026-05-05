import { addCollection } from '@iconify/vue'
import logosIcons from './logos-icons.json'

export default defineNuxtPlugin(() => {
  addCollection(logosIcons as Parameters<typeof addCollection>[0])
})
