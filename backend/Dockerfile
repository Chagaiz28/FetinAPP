FROM node:alpine AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:alpine AS production
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main"]

FROM node:alpine AS development
WORKDIR /usr/src/app

COPY --from=build /usr/src/ ./       

CMD ["npm", "run", "start:dev"]
