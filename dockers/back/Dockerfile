FROM node:10

WORKDIR /app/back

COPY /varejim-produto-service/ .

RUN npm install sqlite3 --save
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]