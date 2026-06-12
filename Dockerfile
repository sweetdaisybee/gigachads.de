FROM node:26.3.0-bookworm AS base

FROM base AS pruner
RUN npm install -g turbo pnpm
WORKDIR /app
COPY . .
RUN pnpm turbo prune @gigachads.de/api @gigachads.de/web --docker

FROM base AS builder
ARG DATABASE_URL=file:/app/gigachads.db
RUN npm install -g turbo pnpm
WORKDIR /app
COPY --from=pruner /app/out/full/ /app
RUN pnpm install
RUN pnpm --filter @gigachads.de/shared build
RUN pnpm --filter @gigachads.de/prisma db:generate
RUN pnpm --filter @gigachads.de/prisma build
RUN pnpm --filter @gigachads.de/prisma db:deploy
RUN pnpm turbo build

FROM base AS installer
RUN npm install -g turbo pnpm
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN pnpm install --prod

FROM base AS runner
WORKDIR /app
RUN addgroup --gid 1001 gigachads && \
    adduser --uid 1001 --ingroup gigachads gigachads --home /home/gigachads --shell /bin/bash
COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/*.json /app
COPY --from=installer /app/*.yaml /app
COPY --from=installer /app/apps/api/ /app/apps/api/
COPY --from=installer /app/apps/web /app/apps/web/
COPY --from=installer /app/packages/shared /app/packages/shared
COPY --from=installer /app/packages/prisma /app/packages/prisma
COPY --from=builder /app/apps/web/dist /app/apps/web/dist
COPY --from=builder /app/apps/api/dist /app/apps/api/dist
COPY --from=builder /app/packages/shared/dist /app/packages/shared/dist
COPY --from=builder /app/packages/prisma/dist /app/packages/prisma/dist
COPY --from=builder /app/gigachads.db /app/gigachads.db
RUN chown -R gigachads:gigachads /app
USER gigachads
CMD ["npm", "run", "start"]
