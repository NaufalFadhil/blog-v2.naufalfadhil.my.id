---
title: "Docker Container"
tags: [docker, devops, infrastructure]
date: 2026-03-12
description: "Introduction to Docker containers and their usage"
weight: 20
---

## Showing Docker Containers

```bash
docker ps
```
```bash
docker container ls
```

## Creating a Docker Container

```bash
docker run -d --name <container-name> <image-name>:<tag>
```
Example:

```bash
docker run -d --name my-nginx nginx:latest
```
```bash
docker run -d --name my-mysql mysql:5.7
```

## Starting a Docker Container

```bash
docker start <container-name>
```
Example:
```bash
docker start my-nginx
```

## Stopping a Docker Container

```bash
docker stop <container-name>
```
Example:
```bash
docker stop my-nginx
```

## Removing a Docker Container

```bash
docker rm <container-name>
```
Example:
```bash
docker rm my-nginx

