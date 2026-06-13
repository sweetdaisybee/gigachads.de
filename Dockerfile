FROM node:26.3.0-alpine3.24 AS base

FROM base AS pruner
RUN npm install -g pnpm@11.4.0 turbo@2.8.19
WORKDIR /app
COPY . .
RUN pnpm turbo prune @gigachads.de/api @gigachads.de/web --docker

FROM base AS builder
ARG DATABASE_URL=file:/app/data/gigachads.db
RUN npm install -g pnpm@11.4.0 turbo@2.8.19
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml /app
COPY --from=pruner /app/out/full/ /app
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @gigachads.de/shared build
RUN pnpm --filter @gigachads.de/prisma db:generate
RUN pnpm --filter @gigachads.de/prisma build
RUN pnpm --filter @gigachads.de/prisma db:deploy
RUN pnpm turbo build

FROM base AS installer
RUN npm install -g pnpm@11.4.0
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml /app
COPY --from=pruner /app/out/json/ /app
RUN pnpm install --prod --frozen-lockfile

FROM base AS runner
RUN apk add --no-cache \
    openssl \
    curl
WORKDIR /app
RUN addgroup --gid 1001 gigachads && \
    adduser \
    --disabled-password \
    --uid 1001 \
    --ingroup gigachads gigachads \
    --home /home/gigachads \
    --shell /bin/sh
RUN chown gigachads:gigachads /app
COPY --chown=gigachads:gigachads --from=installer /app/node_modules /app/node_modules
COPY --chown=gigachads:gigachads --from=installer /app/package.json /app/package.json
COPY --chown=gigachads:gigachads --from=installer /app/apps/api/ /app/apps/api/
COPY --chown=gigachads:gigachads --from=installer /app/apps/web /app/apps/web/
COPY --chown=gigachads:gigachads --from=installer /app/packages/shared /app/packages/shared
COPY --chown=gigachads:gigachads --from=installer /app/packages/prisma /app/packages/prisma
COPY --chown=gigachads:gigachads --from=builder /app/apps/web/dist /app/apps/web/dist
COPY --chown=gigachads:gigachads --from=builder /app/apps/api/dist /app/apps/api/dist
COPY --chown=gigachads:gigachads --from=builder /app/packages/shared/dist /app/packages/shared/dist
COPY --chown=gigachads:gigachads --from=builder /app/packages/prisma/dist /app/packages/prisma/dist
COPY --chown=gigachads:gigachads --from=builder /app/packages/prisma/prisma /app/packages/prisma/prisma
COPY --chown=gigachads:gigachads --from=builder /app/packages/prisma/prisma.config.js /app/packages/prisma/prisma.config.js
COPY --chown=gigachads:gigachads --from=builder /app/data/gigachads.db /app/data/gigachads.db
COPY --chown=gigachads:gigachads entrypoint.sh /entrypoint.sh 
USER gigachads
VOLUME /app/data
ENTRYPOINT ["/entrypoint.sh"]
