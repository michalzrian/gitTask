# Use the official Node.js 20 image.
FROM node:20

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install app dependencies.
COPY package*.json ./
RUN npm install

# Copy app files.
COPY . .

# Build the app.
RUN npm run build

# Start the app.
CMD ["npm", "run", "start:prod"]
