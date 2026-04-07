---
title: "Getting Started with Internal Blog"
internal: true
tags: [internal, guide]
date: 2026-03-29
description: "An overview of how internal documentation works and how to add new internal pages."
weight: 1
---

# Internal Documentation

This section is only visible to authenticated users. All pages here require `internal: true` in the frontmatter.

## Adding Internal Pages

Create a markdown file anywhere under `content/internal/` and add the following frontmatter:

```yaml
---
title: "My Internal Page"
internal: true
tags: [internal]
date: 2026-03-29
description: "Short description"
---
```

## Restricting to Specific Emails

If a page should only be visible to certain people, add `internal_access`:

```yaml
---
title: "Restricted Page"
internal: true
internal_access:
  - naufalfadhilathallah@gmail.com
---
```

Anyone with the correct password can still log in, but only the listed email(s) can view that specific page.
