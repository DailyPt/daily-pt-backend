FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
#RUN npx nest build --webpack
EXPOSE 8080
CMD ["npm", "run", "start:prod"]