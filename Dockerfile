FROM node:18-slim AS base

WORKDIR /usr/src/micuenta

COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/ldap/package.json packages/ldap/package.json

RUN npm ci

FROM node:18-slim AS builder
WORKDIR /usr/src/micuenta
COPY --from=base /usr/src/micuenta/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM node:18-slim AS runner
WORKDIR /usr/src/micuenta

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1
ARG BASE_PATH=/usr/src/micuenta/apps/web

COPY --from=builder ${BASE_PATH}/public ./apps/web/public
COPY --from=builder --chown=node:node ${BASE_PATH}/.next/standalone ./
COPY --from=builder --chown=node:node ${BASE_PATH}/.next/static ./apps/web/.next/static

USER node

EXPOSE 3000

ENV PORT=3000

CMD ["node", "apps/web/server.js"]