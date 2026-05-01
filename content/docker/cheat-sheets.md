---
title: "Docker Cheat Sheets"
tags: [docker, devops, infrastructure]
date: 2026-05-01
description: "Cheat sheets for frequently used Docker commands and concepts"
weight: 100
---

## Docker Images

| Description | Command Example |
|-------------|-----------------|
| **Docker Build** |
| Build an image from a Dockerfile | `docker build -t myapp:latest .` |
| Build an image from a Dockerfile with a specific tag | `docker build -t myapp:1.0 .` |
| **Docker Pull** |
| Pull an image from a registry | `docker pull nginx` |
| Pull an image with a specific tag | `docker pull nginx:latest` |
| Pull an image from a private registry | `docker pull myregistry.com/myapp:latest` |
| **Docker Push** |
| Push an image to a registry | `docker push myapp:latest` |
| Push an image to a registry with a specific tag | `docker push myapp:1.0` |
| Push an image to a private registry | `docker push myregistry.com/myapp:latest` |
| **Others** |
| List images | `docker images` |
| Remove an image | `docker rmi myapp:latest` |
| Tag an image | `docker tag myapp:latest myrepo/myapp:latest` |
| Show the history of an image | `docker history myapp:latest` |

---

## Docker Containers

| Description | Command Example |
|-------------|-----------------|
| Run a container | `docker run -d -p 80:80 nginx` |
| List running containers | `docker ps` |
| Stop a container | `docker stop <container_id>` |
| Remove a container | `docker rm <container_id>` |
| View container logs | `docker logs <container_id>` |

---

## Docker Volumes

| Description | Command Example |
|-------------|-----------------|
| `docker volume create` | Create a volume | `docker volume create myvolume` |
| `docker volume ls` | List volumes | `docker volume ls` |
| `docker volume rm` | Remove a volume | `docker volume rm myvolume` |
| `docker run -v` | Mount a volume to a container | `docker run -v myvolume:/data nginx` |

---

## Docker Networks

| Description | Command Example |
|-------------|-----------------|
| Create a network | `docker network create mynetwork` |
| List networks | `docker network ls` |
| Remove a network | `docker network rm mynetwork` |
| Connect a container to a network | `docker run --network mynetwork nginx` |

---

## Docker Compose
| Description | Command Example |
|-------------|-----------------|
| **Lifecycle Commands** |
| Start services defined in docker-compose.yml | `docker compose up` |
| Stop and remove containers, networks, volumes | `docker compose down` |
| Stop services | `docker compose stop` |
| Start services | `docker compose start` |
| Restart services | `docker compose restart` |
| **Image & Container Management Commands** |
| Build or rebuild services | `docker compose build` |
| Pull service images | `docker compose pull` |
| Push service images | `docker compose push` |
| Remove stopped service containers | `docker compose rm` |
| **Logging, Execution, and Scaling Commands** |
| List containers | `docker compose ps` |
| View output from containers | `docker compose logs` |
| Execute a command in a running container | `docker compose exec web ls -l` |
| Execute a command in an interactive shell | `docker compose exec -it bash` |
| Scale a service | `docker compose scale web=3` |
| **Configuration and Help Commands** |
| Get help on a command | `docker compose help up` |
| Show the Docker Compose version information | `docker compose version` |
| Validate and view the compose file | `docker compose config` |
| Run a one-off command on a service | `docker compose run web python manage.py migrate` |

---

## Docker Swarm

| Description | Command Example |
|-------------|-----------------|
| **Swarm Management Commands** |
| Initialize a swarm | `docker swarm init` |
| Join a swarm | `docker swarm join --token <token>` |
| Leave a swarm | `docker swarm leave` |
| Update swarm configuration | `docker swarm update --task-history-limit 5` |
| Display the join token for a swarm | `docker swarm join-token worker` |
| **Service Management Commands** |
| List swarm services | `docker service ls` |
| List tasks for a service | `docker service ps <service_name>` |
| Create a new service | `docker service create --name web nginx` |
| Update a service | `docker service update --replicas 3 web` |
| Remove a service | `docker service rm web` |
| **Node Management Commands** |
| List swarm nodes | `docker node ls` |
| Update a node | `docker node update --availability drain <node_id>` |
| Remove a node | `docker node rm <node_id>` |

---

## Additional Docker Commands

See the [Docker CLI Reference](https://docs.docker.com/reference/cli/docker/) for a complete list of Docker commands and options.

- [Docker Images](https://docs.docker.com/reference/cli/docker/image/)
- [Docker Containers](https://docs.docker.com/reference/cli/docker/container/)
- [Docker Volumes](https://docs.docker.com/reference/cli/docker/volume/)
- [Docker Networks](https://docs.docker.com/reference/cli/docker/network/)
- [Docker Compose](https://docs.docker.com/reference/cli/docker/compose/)
- [Docker Swarm](https://docs.docker.com/reference/cli/docker/swarm/)