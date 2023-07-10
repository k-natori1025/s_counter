FROM node:lts-slim 

WORKDIR /front

ENV CI=true

# Build
# FROM base AS build
# COPY . /workspace
# WORKDIR /workspace
# ARG API_HOST
# RUN npm ci && npm run build

# # Hosting in nginx
# FROM nginx:latest AS production
# COPY --from=build /workspace/build /var/www
# COPY nginx.conf /etc/nginx/conf.d/default.conf