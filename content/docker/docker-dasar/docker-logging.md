---
title: "Docker Logging"
tags: [docker, devops, infrastructure]
date: 2026-03-12
description: "Introduction to Docker logging and their usage"
weight: 23
---

## View Container Logs

```bash
docker logs <container-name>
```
Example:
```bash
docker logs my-nginx
```

## Follow Container Logs

```bash
docker logs -f <container-name>
```
Example:
```bash
docker logs -f my-nginx
```

## Attributes of Docker Logs

### View Logs with Timestamps

```bash
docker logs --timestamps <container-name>
```
Example:
```bash
docker logs --timestamps my-nginx
```

### View Logs with Tail

```bash
docker logs --tail <number> <container-name>
```
Example:
```bash
docker logs --tail 100 my-nginx
```

### View Logs with Since

```bash
docker logs --since <time> <container-name>
```
Example:
```bash
docker logs --since 2026-03-01T00:00:00 my-nginx
```
```bash
docker logs --since 10m my-nginx
``` 
Output:
```
2026-03-12T12:00:00.000000Z Start nginx...
2026-03-12T12:01:00.000000Z nginx is runn
```

### View Logs with Until

```bash
docker logs --until <time> <container-name>
```
Example:
```bash
docker logs --until 2026-03-01T00:00:00 my-nginx
```
```bash
docker logs --until 10m my-nginx
```
Output:
```
2026-03-12T12:00:00.000000Z Start nginx...
2026-03-12T12:01:00.000000Z nginx is runn
```

### View Logs with Multiple Attributes (Tail, Since, Until)

```bash
docker logs --tail <number> --since <time> --until <time> <container-name>
```
Example:
```bash
docker logs --tail 100 --since 2026-03-01T00:00:00 --until 2026-03-12T12:00:00 my-nginx
```
```bash
docker logs --tail 100 --since 10m --until 5m my-nginx
```
Output:
```
2026-03-12T12:00:00.000000Z Start nginx...
2026-03-12T12:01:00.000000Z nginx is runn
```

## View Logs of All Containers

```bash
docker logs --all
```
Output:
```2026-03-12T12:00:00.000000Z Start nginx...
2026-03-12T12:01:00.000000Z nginx is runn
2026-03-12T12:00:00.000000Z Start mysql...
2026-03-12T12:01:00.000000Z mysql is runn
``` 

## View Logs of Multiple Containers

```bash
docker logs <container-name-1> <container-name-2> ...
```
Example:
```bash
docker logs my-nginx my-mysql
```
Output:
```
2026-03-12T12:00:00.000000Z Start nginx...
2026-03-12T12:01:00.000000Z nginx is runn
2026-03-12T12:00:00.000000Z Start mysql...
2026-03-12T12:01:00.000000Z mysql is runn
```

### View Logs of Multiple Containers with Attributes

```bash
docker logs --tail <number> --since <time> --until <time> <container-name-1> <container-name-2> ...
```
Example:
```bash
docker logs --tail 100 --since 2026-03-01T00:00:00 --until 2026-03-12T12:00:00 my-nginx my-mysql
```
```bashdocker logs --tail 100 --since 10m --until 5m my-nginx my-mysql
```
Output:
```
2026-03-12T12:00:00.000000Z Start nginx...
2026-03-12T12:01:00.000000Z nginx is runn
2026-03-12T12:00:00.000000Z Start mysql...
2026-03-12T12:01:00.000000Z mysql is runn
```