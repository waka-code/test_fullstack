FROM node:18-alpine AS build
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Angular source code
COPY . .

# Build the Angular app for production
RUN npm run build --prod

RUN ls -alt

### STAGE 2: Serve ###
FROM nginx:1.17.1-alpine

# Copy the Angular build output to nginx's default html folder
COPY --from=build /usr/src/app/dist/crud_frontend /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
