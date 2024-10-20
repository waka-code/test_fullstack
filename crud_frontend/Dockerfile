# Etapa 1: Build de la app Angular
FROM node:18-alpine AS build
WORKDIR /usr/src/app

# Copiar archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente de Angular
COPY . .

# Construir la aplicación Angular para producción
RUN npm run build --prod

# Etapa 2: Servir con NGINX
FROM nginx:1.17.1-alpine

# Copiar el build de Angular al directorio por defecto de NGINX
COPY --from=build /usr/src/app/dist/crud_frontend /usr/share/nginx/html

# Copiar la configuración optimizada de NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
