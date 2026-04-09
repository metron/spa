# ЭТАП 1: Сборка (называем этот этап "build")
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ЭТАП 2: Раздача статики (финальный образ)
# Берем готовый Nginx на базе очень легкого Alpine Linux (~5 МБ)
FROM nginx:alpine
# Копируем из ПЕРВОГО этапа (build) только папку dist в папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Копируем ваш конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
