FROM bitnami/node
WORKDIR /app

EXPOSE 1234

CMD npm install --legacy-peer-deps && npm run start
