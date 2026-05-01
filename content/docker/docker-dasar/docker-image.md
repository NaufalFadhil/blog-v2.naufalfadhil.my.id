---
title: "Docker Image"
tags: [docker, devops, infrastructure]
date: 2026-03-12
description: "Introduction to Docker images and their usage"
weight: 21
internal: true
internal_access:
  - naufalfadhilathallah@gmail.com
---

## Showing Docker Images

```bash
docker images
```

```bash
docker image ls
```
---

## Pulling a Docker Image

```bash
docker pull <image-name>:<tag>
```

Example:

```bash
docker pull nginx:latest
```

```bash
docker pull mysql:5.7
```

## Removing a Docker Image

```bash
docker rmi <image-name>:<tag>
```

Example:

```bash
docker rmi nginx:latest
```

```bash
docker rmi mysql:5.7
```