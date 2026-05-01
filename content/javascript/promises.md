---
title: "Promise Patterns"
tags: [javascript, frontend, async]
date: 2026-03-12
description: "Common JavaScript promise patterns and async/await usage"
---

## Promise.all

Run multiple promises in parallel:

```js
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
])
```

## Promise.allSettled

Wait for all promises regardless of outcome:

```js
const results = await Promise.allSettled([
  fetch('/api/fast'),
  fetch('/api/slow'),
  fetch('/api/failing'),
])

const successful = results
  .filter(r => r.status === 'fulfilled')
  .map(r => r.value)
```
