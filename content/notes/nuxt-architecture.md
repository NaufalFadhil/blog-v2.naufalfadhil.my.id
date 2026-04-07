---
title: "Nuxt 3 Architecture Notes"
tags: [nuxt, vue, frontend, architecture]
date: 2026-03-15
description: "Architecture notes and patterns for Nuxt 3 applications"
---

## Directory Structure

Nuxt 3 uses a convention-based directory structure:

```
├── pages/          → File-based routing
├── components/     → Auto-imported components
├── composables/    → Auto-imported composables
├── layouts/        → Page layouts
├── middleware/     → Route middleware
├── plugins/        → Vue plugins
├── server/         → Server routes and middleware
└── content/        → Markdown content (with @nuxt/content)
```

## Data Fetching

### useAsyncData

```typescript
const { data, pending, error, refresh } = await useAsyncData(
  'unique-key',
  () => $fetch('/api/data')
)
```

### useFetch

```typescript
// Shorthand for useAsyncData + $fetch
const { data } = await useFetch('/api/users')
```

## Auto Imports

Nuxt auto-imports:
- Vue APIs (`ref`, `computed`, `watch`, etc.)
- Composables from `composables/`
- Components from `components/`
- Utils from `utils/`

## Server Routes

```typescript
// server/api/hello.ts
export default defineEventHandler((event) => {
  return { message: 'Hello from the server!' }
})
```

## Rendering Modes

::alert{type="info"}
Choose the right rendering mode based on your use case.
::

- **SSR**: Server-side rendering (default)
- **SSG**: Static site generation (`nuxt generate`)
- **SPA**: Client-side only (`ssr: false`)
- **Hybrid**: Mix modes per route
