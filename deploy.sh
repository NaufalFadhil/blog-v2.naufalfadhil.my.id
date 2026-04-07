#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# Deploy script for stashidea-docs frontend
# Builds multi-platform Docker image and deploys via SSH
# ============================================================

# -- Configuration (edit these) --------------------------------
IMAGE_NAME="stashidea-docs"
IMAGE_TAG="latest"
CONTAINER_NAME="stashidea-docs"
CONTAINER_PORT=3000
HOST_PORT=3000

SSH_HOST=""          # e.g. 192.168.1.100 or your-server.com
SSH_USER=""          # e.g. root or deploy
SSH_PORT=22
SSH_KEY=""           # optional: path to SSH key, e.g. ~/.ssh/id_rsa

# Target platform for the server (linux/amd64 for most VPS)
TARGET_PLATFORM="linux/amd64"
# ---------------------------------------------------------------

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[DEPLOY]${NC} $*"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }
err()  { echo -e "${RED}[ERROR]${NC} $*" >&2; exit 1; }

# Validate config
[[ -z "$SSH_HOST" ]] && err "SSH_HOST is not set. Edit deploy.sh and fill in your server details."
[[ -z "$SSH_USER" ]] && err "SSH_USER is not set. Edit deploy.sh and fill in your server details."

# Build SSH options
SSH_OPTS="-o StrictHostKeyChecking=accept-new -p ${SSH_PORT}"
[[ -n "$SSH_KEY" ]] && SSH_OPTS="$SSH_OPTS -i $SSH_KEY"

FULL_IMAGE="${IMAGE_NAME}:${IMAGE_TAG}"

# Step 1: Build multi-platform image
log "Building Docker image for ${TARGET_PLATFORM}..."
docker buildx build \
  --platform "${TARGET_PLATFORM}" \
  -t "${FULL_IMAGE}" \
  --load \
  .

# Step 2: Save image to tar
log "Saving image to tar..."
TEMP_TAR=$(mktemp /tmp/docker-image-XXXXXX.tar)
docker save "${FULL_IMAGE}" -o "${TEMP_TAR}"

# Step 3: Transfer to server
log "Transferring image to ${SSH_USER}@${SSH_HOST}..."
scp ${SSH_OPTS} "${TEMP_TAR}" "${SSH_USER}@${SSH_HOST}:/tmp/docker-image.tar"

# Step 4: Deploy on server
log "Deploying on server..."
# shellcheck disable=SC2087
ssh ${SSH_OPTS} "${SSH_USER}@${SSH_HOST}" << REMOTE_SCRIPT
set -euo pipefail

echo "[REMOTE] Loading Docker image..."
docker load -i /tmp/docker-image.tar
rm -f /tmp/docker-image.tar

echo "[REMOTE] Stopping old container (if exists)..."
docker stop ${CONTAINER_NAME} 2>/dev/null || true
docker rm ${CONTAINER_NAME} 2>/dev/null || true

echo "[REMOTE] Starting new container..."
docker run -d \
  --name ${CONTAINER_NAME} \
  --restart unless-stopped \
  -p ${HOST_PORT}:${CONTAINER_PORT} \
  ${FULL_IMAGE}

echo "[REMOTE] Cleaning up old images..."
docker image prune -f

echo "[REMOTE] Container status:"
docker ps --filter name=${CONTAINER_NAME} --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
REMOTE_SCRIPT

# Cleanup local temp file
rm -f "${TEMP_TAR}"

log "Deploy complete! App running at http://${SSH_HOST}:${HOST_PORT}"
