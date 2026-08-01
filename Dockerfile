FROM node:24.14.1-alpine

WORKDIR /usr/src/app

ENV CI=true

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 3001

CMD ["pnpm", "run", "dev"]