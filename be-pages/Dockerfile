FROM node:lts As development

WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install

COPY . .

RUN npm run build
RUN npx prisma generate



CMD ["node", "dist/apps/orders/main"]