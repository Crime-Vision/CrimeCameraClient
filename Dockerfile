FROM bitnami/node:18.15.0
WORKDIR /app

EXPOSE 1234

CMD npm ci --legacy-peer-deps && npm run start
