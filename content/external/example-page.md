---
title: "Example External Page"
external: true
tags: [external]
date: 2026-03-29
description: "This page is hidden from the public directory but accessible via direct URL."
link: https://github.com
link_label: View on GitHub
---

# External Page

This page is **hidden from the public** — it won't appear in the sidebar or search results for visitors.

However, anyone with the **direct URL** can open and read it.

## Use Cases

- Sharing a specific doc with someone without giving them login access
- Public-facing reference pages you don't want indexed in navigation
- Client-facing documentation shared via direct link

## Frontmatter

```yaml
---
title: "My External Page"
external: true
link: https://github.com/your-repo
link_label: View on GitHub
---
```

The `link` and `link_label` fields add a button above "On this page" in the right sidebar.
