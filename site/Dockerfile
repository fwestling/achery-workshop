# Build context is the repo root (the site renders the library from ../src):
#   docker build -f site/Dockerfile .
FROM node:22-alpine AS builder

# pnpm comes from package.json's packageManager (pinned), not whatever is latest on build day
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY site/package.json ./site/package.json

# The site and what it needs from the library (achery-ui is a workspace dependency, so its own deps come too)
RUN pnpm install --frozen-lockfile --filter achery-workshop-site...

# Everything else the site reads: the library source, COMPONENTS.md, the root tsconfig it extends.
# The whole context, so a new input can't be forgotten here (.dockerignore keeps out node_modules and
# build output); the install above is cached on the package files alone.
COPY . .

WORKDIR /app/site
# Refuse to publish copy that still contains [PLACEHOLDER] markers
ENV SITE_STRICT=1
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/site/dist /usr/share/nginx/html
COPY site/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
