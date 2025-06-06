# frontend/Dockerfile
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/gifts-frontend /usr/share/nginx/html
