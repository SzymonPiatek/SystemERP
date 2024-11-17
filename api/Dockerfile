FROM node:20.13.1 AS base

FROM base AS development

WORKDIR /api

COPY package*.json ./

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENV NODE_ENV=development

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

FROM development AS builder


RUN npm run build

EXPOSE 3000


FROM base AS production

WORKDIR /

ENV NODE_ENV=production

COPY --from=builder /api/dist ./dist
COPY --from=builder /api/node_modules ./node_modules
COPY --from=builder /api/prisma ./prisma

EXPOSE 3000
EXPOSE 5555

CMD ["node", "./dist/server.js"]
