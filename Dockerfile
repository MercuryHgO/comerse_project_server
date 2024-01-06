FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD npx prisma migrate dev

CMD npm run build
CMD npm run app