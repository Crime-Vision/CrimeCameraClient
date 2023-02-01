FROM bitnami/node
WORKDIR /app

COPY . /app

EXPOSE 1234

CMD npm ci && npm run start
