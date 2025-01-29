# syntax=docker.io/docker/dockerfile:1

# Base image with Node.js 20 on Alpine Linux
FROM node:20-alpine AS base

# -----------------------------------------
# Stage 1: Dependencies
# -----------------------------------------
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package.json and lock files
COPY package.json package-lock.json* .npmrc* ./

# Install dependencies: checks for package-lock.json
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm install --force; \
  else echo "Lockfile not found." && exit 1; \
  fi

# -----------------------------------------
# Stage 2: Build
# -----------------------------------------
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of your source files
COPY . .

# Disable Next.js telemetry during build (optional)
ENV NEXT_TELEMETRY_DISABLED=1

# Make sure "build" script is defined in package.json (e.g., "build": "next build")
RUN npm run build

# -----------------------------------------
# Stage 3: Production
# -----------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy app artifacts: public, .next/standalone, and static files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to a non-root user
USER nextjs

# Expose port 80 for the container
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# The standalone output of Next.js builds a server.js file
CMD ["node", "server.js"]