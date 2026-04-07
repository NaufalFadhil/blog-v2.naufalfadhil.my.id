---
title: "CSS Container Queries"
tags: [css, frontend]
date: 2026-03-16
description: "Responsive components with CSS container queries"
---

## What Are Container Queries?

Unlike media queries which respond to the viewport, container queries respond to the size of a parent container. This makes components truly self-contained.

## Basic Usage

```css
/* Define a containment context */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* Style based on container width */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}
```

## Container Query Units

```css
.card-title {
  /* 5% of the container's inline size */
  font-size: clamp(1rem, 5cqi, 2rem);
}
```

## Browser Support

Container queries are supported in all modern browsers as of 2023. Use `@supports` for fallbacks:

```css
@supports (container-type: inline-size) {
  .wrapper {
    container-type: inline-size;
  }
}
```
