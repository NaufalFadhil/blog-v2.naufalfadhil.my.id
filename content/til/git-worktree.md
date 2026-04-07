---
title: "Git Worktrees"
tags: [git, devtools]
date: 2026-03-17
description: "Use git worktree to work on multiple branches simultaneously"
---

## What Are Git Worktrees?

Git worktrees let you check out multiple branches at the same time, each in its own directory. No more stashing or committing half-done work to switch branches.

## Create a Worktree

```bash
# Create a new worktree for a branch
git worktree add ../feature-branch feature-branch

# Create a new branch in a worktree
git worktree add -b hotfix ../hotfix main
```

## List Worktrees

```bash
git worktree list
# /home/user/project        abc1234 [main]
# /home/user/feature-branch def5678 [feature-branch]
```

## Remove a Worktree

```bash
git worktree remove ../feature-branch
```

## Use Cases

- **Code review**: Check out PR branch without disrupting your work
- **Hotfixes**: Quickly fix production while keeping your feature branch open
- **Comparison**: Run two versions side-by-side
