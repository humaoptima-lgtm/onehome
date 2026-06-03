# ═══════════════════════════════════════
# Stage 1: Build
# ═══════════════════════════════════════
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY apps/api/package.json ./

# Install all dependencies + dotenv (needed by prisma.config.ts) + prisma
RUN npm install && npm install dotenv prisma @prisma/client

# Copy source code + prisma config
COPY apps/api/ .

# Generate Prisma client
RUN npx prisma generate

# Build NestJS
RUN npm run build

# ═══════════════════════════════════════
# Stage 2: Production
# ═══════════════════════════════════════
FROM node:22-alpine AS runner

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy package files and install production deps only
COPY apps/api/package.json ./
RUN npm install --omit=dev && npm install dotenv @prisma/client

# Copy built output + Prisma client from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

# NestJS outputs to dist/src/main.js because prisma.config.ts is in the root
CMD ["node", "dist/src/main.js"]
