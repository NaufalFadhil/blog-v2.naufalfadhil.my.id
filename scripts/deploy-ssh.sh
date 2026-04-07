#!/usr/bin/env bash
set -Eeuo pipefail
echo "Starting SSH deployment script..."
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Load .env if present (does not override already-exported vars)
if [[ -f "$ROOT_DIR/.env" ]]; then
  set -o allexport
  source "$ROOT_DIR/.env"
  set +o allexport
fi

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: required command '$1' is not installed." >&2
    exit 1
  fi
}
echo "Checking required commands..."
require_cmd docker
require_cmd ssh

: "${SSH_HOST:?Set SSH_HOST, example: 203.0.113.10}"
: "${SSH_USER:?Set SSH_USER, example: ubuntu}"

SSH_PORT="${SSH_PORT:-22}"
PLATFORM="${PLATFORM:-linux/amd64}"
DOCKERFILE="${DOCKERFILE:-Dockerfile}"
IMAGE_NAME="${IMAGE_NAME:-naufalfadhil-blog}"
CONTAINER_NAME="${CONTAINER_NAME:-blog-naufalfadhil}"
HOST_PORT="${HOST_PORT:-}"
CONTAINER_PORT="${CONTAINER_PORT:-3000}"
REMOTE_NETWORK="${REMOTE_NETWORK:-}"
REMOTE_ENV_FILE="${REMOTE_ENV_FILE:-}"
echo "test"
echo "SSH_PORT: ${SSH_PORT}"

if [[ -n "${IMAGE_TAG:-}" ]]; then
  TAG="$IMAGE_TAG"
elif git rev-parse --short HEAD >/dev/null 2>&1; then
  TAG="$(git rev-parse --short HEAD)"
else
  TAG="$(date +%Y%m%d%H%M%S)"
fi

IMAGE_REF="${IMAGE_NAME}:${TAG}"
REMOTE_TARGET="${SSH_USER}@${SSH_HOST}"
SSH_OPTS="-o StrictHostKeyChecking=accept-new -p ${SSH_PORT}"
SCP_OPTS="-o StrictHostKeyChecking=accept-new -P ${SSH_PORT}"
TEMP_TAR="$(mktemp /tmp/docker-image-XXXXXX.tar)"
trap 'rm -f "$TEMP_TAR"' EXIT

echo "==> Building image for ${PLATFORM}..."
docker buildx build \
  --platform "$PLATFORM" \
  --file "$DOCKERFILE" \
  --tag "$IMAGE_REF" \
  --load \
  .

echo "==> Saving image to tar..."
docker save "$IMAGE_REF" -o "$TEMP_TAR"

echo "==> Transferring image to ${REMOTE_TARGET} ($(du -h "$TEMP_TAR" | cut -f1))..."
scp ${SCP_OPTS} "$TEMP_TAR" "${REMOTE_TARGET}:/tmp/docker-image.tar"

echo "==> Deploying on ${REMOTE_TARGET}:${SSH_PORT}..."
ssh ${SSH_OPTS} "$REMOTE_TARGET" \
  "IMAGE_REF='$IMAGE_REF' CONTAINER_NAME='$CONTAINER_NAME' HOST_PORT='$HOST_PORT' CONTAINER_PORT='$CONTAINER_PORT' REMOTE_NETWORK='$REMOTE_NETWORK' REMOTE_ENV_FILE='$REMOTE_ENV_FILE' bash -s" <<'EOSSH'
set -Eeuo pipefail

echo "-> Loading image..."
docker load -i /tmp/docker-image.tar
rm -f /tmp/docker-image.tar

if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}$"; then
  echo "-> Replacing existing container: ${CONTAINER_NAME}"
  docker rm -f "${CONTAINER_NAME}" >/dev/null
fi

RUN_ARGS=(
  -d
  --name "${CONTAINER_NAME}"
  --restart unless-stopped
)

if [[ -n "${HOST_PORT}" ]]; then
  RUN_ARGS+=(-p "${HOST_PORT}:${CONTAINER_PORT}")
fi

if [[ -n "${REMOTE_NETWORK}" ]]; then
  RUN_ARGS+=(--network "${REMOTE_NETWORK}")
fi

if [[ -n "${REMOTE_ENV_FILE}" ]]; then
  RUN_ARGS+=(--env-file "${REMOTE_ENV_FILE}")
fi

docker run "${RUN_ARGS[@]}" "${IMAGE_REF}"
docker image prune -f >/dev/null || true

echo "-> Deploy success. Container status:"
docker ps --filter "name=${CONTAINER_NAME}" --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}'
EOSSH

echo "==> Done"
