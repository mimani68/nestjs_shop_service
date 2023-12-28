# Use the official Node.js 16.19.1-alpine image as base image
FROM node:16.19.1-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents to the working directory in the container
COPY . .

# Run the build script
RUN npm run build

# Command to start the application
CMD [ "node", "dist/src/main.js" ]

# Expose port 3000 to the outside world
EXPOSE 3000