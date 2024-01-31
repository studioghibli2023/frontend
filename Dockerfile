# Use the official Node.js image as base
FROM node:latest as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
RUN ng build --prod

# Use nginx to serve the built Angular app
FROM nginx:latest

# Copy the built app from the previous stage to nginx html directory
COPY --from=builder /app/dist/ /usr/share/nginx/html

# Expose port 4200
EXPOSE 4200

# Command to run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
