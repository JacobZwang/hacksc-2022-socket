FROM node:16

RUN npm install -g pnpm

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN pnpm install

COPY . . 

RUN pnpm run build

EXPOSE 3000

CMD ["node", "./build/main.cjs"]




