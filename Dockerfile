FROM bitnami/node
WORKDIR /app

EXPOSE 1234

CMD npm ci --legacy-peer-deps && npm run start
