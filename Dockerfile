FROM node:16-alpine3.14

RUN npm install -g pnpm

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN pnpm install
COPY . . 

RUN pnpm run build

EXPOSE 4200

CMD ["node", "./.build/main.cjs"]
