# Docs Stashidea

Personal documentation site built with Nuxt 3, Tailwind CSS, and @nuxt/content.

## Tech Stack

- **Nuxt 3** — Vue 3 framework with SSR/SSG
- **Tailwind CSS v3** — Utility-first CSS
- **@nuxt/content v2** — Markdown/MDX content management
- **Shiki** — Syntax highlighting (github-light / github-dark)
- **Fuse.js** — Fuzzy search

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone <your-repo-url>
cd app-stashidea-docs-frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# SSG (static site)
npm run generate

# SSR (server-side rendering)
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── content/              # Markdown content (auto-routed)
│   ├── snippets/         # Code snippets
│   ├── til/              # Today I Learned
│   └── notes/            # Notes & guides
├── components/           # Vue components (auto-imported)
├── composables/          # Composables (auto-imported)
├── layouts/              # Page layouts
├── pages/                # File-based routing
├── assets/css/           # Global styles
├── nuxt.config.ts        # Nuxt configuration
└── tailwind.config.ts    # Tailwind configuration
```

## Writing Content

Create a `.md` file inside `content/` with frontmatter:

```markdown
---
title: "Your Title"
tags: [tag1, tag2]
date: 2026-03-20
description: "Short description"
weight: 1
---

Your content here...
```

### Frontmatter Fields

| Field         | Type     | Required | Description                                      |
|---------------|----------|----------|--------------------------------------------------|
| `title`       | string   | Yes      | Page title                                       |
| `tags`        | string[] | Yes      | Tags for categorization and search               |
| `date`        | string   | Yes      | Publication date (YYYY-MM-DD)                    |
| `description` | string   | Yes      | Short description for SEO and search results     |
| `weight`      | number   | No       | Sort order in sidebar (smaller = higher, default 999) |

### Using Components in Markdown

You can use Vue components inside markdown with MDC syntax:

```markdown
::alert{type="info"}
This is an info alert.
::

::alert{type="warning"}
Be careful with this.
::
```

Available types: `info`, `warning`, `error`, `success`

### Content Organization

Folders map directly to sidebar navigation and URL routes:

```
content/
├── snippets/
│   ├── php/
│   │   ├── arrays.md          → /snippets/php/arrays
│   │   └── references.md      → /snippets/php/references
│   └── javascript/
│       └── promises.md        → /snippets/javascript/promises
├── til/
│   └── git-worktree.md        → /til/git-worktree
└── notes/
    └── docker/
        └── essentials.md      → /notes/docker/essentials
```

## Features

- **Dark Mode** — Toggle with button, persisted to localStorage
- **Global Search** — `Ctrl+K` / `⌘K`, fuzzy search with Fuse.js
- **Drill-down Sidebar** — Navigate folders one level at a time
- **Table of Contents** — Auto-generated from h2/h3, highlights active section
- **Reading Stats** — Word count and estimated reading time
- **Related Posts** — Smart suggestions based on shared tags and title similarity
- **Tag System** — Tag cloud on homepage, tag pages with pagination
- **SEO** — Dynamic meta tags and OpenGraph per page
- **SSG Ready** — `npm run generate` for static hosting

## Deployment

See [DEPLOY.md](DEPLOY.md) for Docker + VPS deployment instructions.
