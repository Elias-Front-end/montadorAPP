FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app

COPY backend/package.json backend/package-lock.json* ./backend/
WORKDIR /app/backend
RUN npm ci

COPY frontend/package.json frontend/package-lock.json* ./frontend/
WORKDIR /app/frontend
RUN npm ci

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY --from=deps /app/frontend/node_modules ./frontend/node_modules

COPY backend ./backend
COPY frontend ./frontend

WORKDIR /app/backend
RUN npx prisma generate
RUN npm run build

WORKDIR /app/frontend
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system Next.js --uid 1001

COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/package.json ./backend/package.json
COPY --from=builder /app/backend/node_modules ./backend/node_modules
COPY --from=builder /app/backend/prisma ./backend/prisma

COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/package.json ./frontend/package.json
COPY --from=builder /app/frontend/node_modules ./frontend/node_modules

USER Next.js

EXPOSE 4000 3000

WORKDIR /app/backend
ENV PORT=4000
ENV NODE_ENV=production

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod & cd ../frontend && npm start"]