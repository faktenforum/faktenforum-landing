ARG NODE_VERSION=20.9

# Build stage
FROM node:${NODE_VERSION}-alpine as base

ARG PORT=3000

ENV NODE_ENV=production
ARG API_BASE_URL
WORKDIR /src

# Run a command that fails if API_BASE_URL is not set
# Build
FROM base as build
# check before build if variable is set
RUN test -n "$API_BASE_URL" || (echo "API_BASE_URL not set" && false)
COPY --link package.json package-lock.json .
RUN npm install --production=false

COPY --link . .

RUN BUILD_API_BASE_URL=$API_BASE_URL npm run build
RUN npm prune

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]
