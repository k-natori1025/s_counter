# ビルド環境の指定(npm run testを追加)
FROM node:18-slim AS build
WORKDIR /app
RUN pwd
COPY package*.json ./
RUN npm ci --quiet
COPY . .
ENV REACT_APP_API_HOST http://localhost:3001
RUN npm run test && npm run build

# 本番用環境の指定
FROM nginx:1.25 AS production
COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
