# Use the official Node Alpine image as a base
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 4200 to the outside world
EXPOSE 4200

# Command to run the Angular development server
CMD ["npm", "start"]

