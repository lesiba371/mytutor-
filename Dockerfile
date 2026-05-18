# ─── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (layer-cache friendly)
COPY package*.json ./
RUN npm ci --prefer-offline

# Copy source and export as a static web bundle
COPY . .
RUN npx expo export --platform web

# ─── Stage 2: Serve ────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Copy the static build from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx config (SPA routing + gzip + asset caching)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
