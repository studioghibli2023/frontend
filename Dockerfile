# Use an nginx base image
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built Angular app files to the container
COPY dist/* .

# Expose port 4200
EXPOSE 4200

# Command to run the Angular app using nginx
CMD ["nginx", "-g", "daemon off;"]
