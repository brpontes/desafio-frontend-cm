FROM node:10

WORKDIR /app

COPY /varejim-produto-web/ .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]