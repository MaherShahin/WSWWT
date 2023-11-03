# Build Stage
FROM node:16 AS build-stage

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your frontend files
COPY . .

# Build the React app
RUN npm run build

# Production Stage
FROM node:16-slim

WORKDIR /usr/src/app

# Install serve globally
RUN npm install -g serve

# Copy the built app from the previous stage
COPY --from=build-stage /usr/src/app/build ./build

# Expose port 3000
EXPOSE 3000

# Start the serve tool
CMD ["serve", "-s", "build", "-l", "3000"]
