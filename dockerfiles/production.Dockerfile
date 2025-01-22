FROM node:20-alpine AS base

RUN corepack enable
RUN apk add --no-cache libc6-compat

FROM base AS deps

WORKDIR /app

COPY ../package.json ../pnpm-lock.yaml ./

# TODO: 의존성 캐시 추가
RUN pnpm install --prod --frozen-lockfile

FROM base AS build

WORKDIR /app

COPY ../package.json ./
COPY ../src ./src
COPY ../pnpm-lock.yaml ./
COPY ../nest-cli.json ./
COPY ../tsconfig.json ./
COPY ../tsconfig.build.json ./

# TODO: 의존성 캐시 추가
RUN pnpm install --frozen-lockfile

RUN pnpm run build

FROM base AS staging

WORKDIR /app

ENV NODE_ENV=staging

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY ./.env.production ./.env.production

EXPOSE 8000

ENV PORT=8000

CMD ["node", "dist/main.js"]
