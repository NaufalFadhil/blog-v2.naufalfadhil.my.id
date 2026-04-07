# Deployment Guide — Docker + VPS

This guide covers deploying Blog Naufal Fadhil to a VPS using Docker.

Two strategies are covered:
1. **SSG (Static)** — Generate static files, serve with Nginx
2. **SSR (Server)** — Run Node.js server in Docker

---

## Option 1: SSG with Nginx (Recommended)

Best for documentation sites. Fast, no Node.js runtime needed.

### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run generate

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/.output/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Config

Create `nginx.conf` in project root:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;

    # Cache static assets
    location /_nuxt/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/index.html $uri.html /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data:; connect-src 'self'" always;
}
```

### Build & Run

```bash
# Build image
docker build -t blog-naufalfadhil .

# Run container
docker run -d \
  --name blog-naufalfadhil \
  --restart unless-stopped \
  -p 3000:80 \
  blog-naufalfadhil
```

Site available at `http://your-vps-ip:3000`

---

## Option 2: SSR with Node.js

Use this if you need server-side rendering.

### Dockerfile

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.output .output

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
```

### Build & Run

```bash
docker build -f Dockerfile.ssr -t blog-naufalfadhil .

docker run -d \
  --name blog-naufalfadhil \
  --restart unless-stopped \
  -p 3000:3000 \
  blog-naufalfadhil
```

---

## Docker Compose

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  blog:
    build: .
    container_name: blog-naufalfadhil
    restart: unless-stopped
    ports:
      - "3000:80"
```

```bash
# Start
docker compose up -d

# Rebuild after content changes
docker compose up -d --build

# View logs
docker compose logs -f blog

# Stop
docker compose down
```

---

## VPS Setup (Ubuntu/Debian)

### 1. Install Docker

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose plugin
sudo apt install docker-compose-plugin -y

# Verify
docker --version
docker compose version
```

### 2. Clone & Deploy

```bash
# Clone repository
git clone <your-repo-url> /opt/blog-naufalfadhil
cd /opt/blog-naufalfadhil

# Build and run
docker compose up -d --build
```

### 3. Reverse Proxy with Nginx (Host)

If you want to serve on port 80/443 with a domain:

```bash
sudo apt install nginx -y
```

Create `/etc/nginx/sites-available/blog-naufalfadhil`:

```nginx
server {
    listen 80;
    server_name blog.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/blog-naufalfadhil /etc/nginx/sites-enabled/

# Test & reload
sudo nginx -t
sudo systemctl reload nginx
```

### 4. SSL with Certbot

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d blog.yourdomain.com

# Auto-renewal is enabled by default
sudo certbot renew --dry-run
```

---

## CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to VPS
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /opt/blog-naufalfadhil
            git pull origin main
            docker compose up -d --build
```

Required GitHub Secrets:
- `VPS_HOST` — Your VPS IP or hostname
- `VPS_USER` — SSH username
- `VPS_SSH_KEY` — Private SSH key

---

## Updating Content

After adding or editing markdown files:

```bash
# Local: just save the file, dev server hot-reloads

# Production: rebuild the container
cd /opt/blog-naufalfadhil
git pull
docker compose up -d --build
```

---

## Troubleshooting

### Container won't start

```bash
# Check logs
docker logs blog-naufalfadhil

# Check if port is in use
sudo lsof -i :3000
```

### Build fails with memory error

```bash
# Increase Node memory limit in Dockerfile
ENV NODE_OPTIONS="--max-old-space-size=2048"
```

### Nginx 502 Bad Gateway

```bash
# Check if container is running
docker ps

# Check container health
docker logs blog-naufalfadhil

# Restart
docker compose restart
```
