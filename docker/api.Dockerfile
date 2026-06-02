# ═══════════════════════════════════════
# Stage 1: Build
# ═══════════════════════════════════════
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY apps/api/package.json apps/api/package-lock.json* ./

# Install all dependencies (dev + prod) for build
RUN npm ci

# Copy source code
COPY apps/api/ .

# Generate Prisma client
RUN npx prisma generate

# Build NestJS
RUN npm run build

# ═══════════════════════════════════════
# Stage 2: Production
# ═══════════════════════════════════════
FROM node:20-alpine AS runner

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy package files and install production deps only
COPY apps/api/package.json apps/api/package-lock.json* ./
RUN npm ci --omit=dev

# Copy built output + Prisma client from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "dist/main.js"]
