FROM node:20.13.1 AS base

FROM base AS development

WORKDIR /api

COPY package*.json ./

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENV NODE_ENV=development

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
