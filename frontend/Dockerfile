# ビルド環境の指定
FROM node:18-slim AS build
WORKDIR /app
RUN pwd
COPY package*.json ./
RUN npm ci --quiet
COPY . .
RUN npm run build

# 本番用環境の指定
FROM nginx:1.25 AS production
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
