# ---- deps ----
FROM node:20-alpine AS deps
WORKDIR /app

# Copy only dependency files first (better caching)
COPY package.json package-lock.json ./
RUN npm ci

# ---- build ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js
RUN npm run build

# ---- run (production) ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# If your Next output is standard, keep these:
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Copy the built app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# If you have next.config.js/mjs and it is required at runtime, copy it too:
# COPY --from=builder /app/next.config.* ./

# Install only production deps
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm","start"]