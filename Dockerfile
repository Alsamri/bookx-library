# Multi-stage build for Next.js
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .


ENV NEXT_TELEMETRY_DISABLED=1

# Build arguments 
ARG DATABASE_URL
ARG AUTH_SECRET
ARG NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
ARG NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
ARG IMAGEKIT_PRIVATE_KEY
ARG NEXT_PUBLIC_API_ENDPOINT
ARG UPSTASH_REDIS_URL
ARG UPSTASH_REDIS_TOKEN
ARG QSTASH_URL
ARG QSTASH_TOKEN
ARG RESEND_WORKFLOW
ARG NEXT_PROD_API_ENDPOINT

# Set as environment variables for build
ENV DATABASE_URL=${DATABASE_URL}
ENV AUTH_SECRET=${AUTH_SECRET}
ENV NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=${NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
ENV NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=${NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
ENV IMAGEKIT_PRIVATE_KEY=${IMAGEKIT_PRIVATE_KEY}
ENV NEXT_PUBLIC_API_ENDPOINT=${NEXT_PUBLIC_API_ENDPOINT}
ENV UPSTASH_REDIS_URL=${UPSTASH_REDIS_URL}
ENV UPSTASH_REDIS_TOKEN=${UPSTASH_REDIS_TOKEN}
ENV QSTASH_URL=${QSTASH_URL}
ENV QSTASH_TOKEN=${QSTASH_TOKEN}
ENV RESEND_WORKFLOW=${RESEND_WORKFLOW}
ENV NEXT_PROD_API_ENDPOINT=${NEXT_PROD_API_ENDPOINT}

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]