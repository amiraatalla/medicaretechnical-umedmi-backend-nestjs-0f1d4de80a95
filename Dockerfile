FROM node:latest

WORKDIR /app

COPY ./src ./

# Copy dependency definitions
COPY nest-cli.json tsconfig.json package.json tsconfig.build.json package-lock.json ./

RUN npm i 

CMD ["npm","run", "start:dev"]
