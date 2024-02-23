# Use the official Node.js 16 image as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ThermWatch/package.json ./
COPY ThermWatch/package-lock.json ./

# Install any dependencies
RUN npm install

# Bundle app source
COPY ThermWatch/ .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD [ "node", "server.js" ]