FROM bitnami/node
WORKDIR /app

COPY . /app

RUN npm ci

EXPOSE 3001

CMD npm run start
