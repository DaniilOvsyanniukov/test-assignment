FROM node:14 AS build
WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install react-scripts@4.0.3 -g

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
