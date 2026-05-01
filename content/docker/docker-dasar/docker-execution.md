---
title: "Docker Execution"
tags: [docker, devops, infrastructure]
date: 2026-03-12
description: "Introduction to Docker execution and their usage"
weight: 22
---

## Prerequisites - Running a Docker Container

Before you can execute a Docker container, you need to have Docker installed on your system. You can refer to the [Docker Container](./docker-container.md) snippet for instructions on how to create and manage Docker containers.

## Executing a Command in a Running Container

To execute a command inside a running Docker container, you can use the `docker exec` command. This allows you to run a command in the context of the container, which can be useful for
debugging or performing administrative tasks.

```bash
docker exec -it <container-name> <command>
```

Example:

```bash
docker exec -it my-nginx bash
```

This command will open an interactive terminal session inside the `my-nginx` container, allowing you to run commands as if you were logged into the container's shell.

Output:

```bash
root@container-id:/# 
root@container-id:/# ls
bin  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@container-id:/# 
```

You can also execute specific commands without opening an interactive terminal. For example, to check the status of the MySQL service inside a MySQL container, you can run:

```bash
docker exec -it my-mysql mysql -u root -p
``` 

This command will open an interactive terminal session inside the `my-mysql` container and start the MySQL client, allowing you to interact with the MySQL database running inside the container.

Output:

```bash
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 1
Server version: 5.7.34 MySQL Community Server (GPL)
Copyright (c) 2000, 2021, Oracle and/or its affiliates. All rights reserved.
Oracle is a registered trademark of Oracle Corporation and/or its affiliates. Other names may be trademarks of their respective owners.
Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
mysql> 
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema | 
| sys                |
+--------------------+
4 rows in set (0.00 sec)
mysql>
```

## Executing a Command in a New Container

You can also execute a command in a new container using the `docker run` command. This will create a new container from a specified image and execute the command in that container.

```bash
docker run --rm <image-name>:<tag> <command>
```

Example:

```bash
docker run --rm nginx:latest echo "Hello, World!"
```

This command will create a new container from the `nginx:latest` image, execute the `echo "Hello, World!"` command, and then remove the container after the command has finished executing.

Output:

```bash
Hello, World!
```
Another example with MySQL:

```bash
docker run --rm mysql:5.7 mysql -u root -p -e "SHOW DATABASES;"
```

This command will create a new container from the `mysql:5.7` image, execute the MySQL client with the `SHOW DATABASES;` command, and then remove the container after the command has finished executing.

Output:

```bash
Enter password:
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```