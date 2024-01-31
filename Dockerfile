# Use official Node.js image as the base image
FROM node:latest AS builder

# Set the working directory
WORKDIR /app

# Stage 1: Build the Angular application
FROM node:14 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --configuration production

# Stage 2: Serve the Angular application
FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Expose port 80 (default for nginx)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

