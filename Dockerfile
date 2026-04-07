# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=20

# Stage 1: Build
FROM --platform=$BUILDPLATFORM node:${NODE_VERSION}-alpine AS builder

ARG TARGETPLATFORM
ARG NUXT_PUBLIC_AUTH_PASSWORD_HASH

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN NUXT_PUBLIC_AUTH_PASSWORD_HASH=$NUXT_PUBLIC_AUTH_PASSWORD_HASH npm run build


# Stage 2: Run
FROM --platform=$TARGETPLATFORM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY --from=builder /app/.output .output

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
