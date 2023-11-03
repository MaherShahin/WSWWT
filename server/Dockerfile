# Step 1: Download and Extract the IMDb dataset
FROM alpine:latest as downloader

WORKDIR /download
RUN apk --no-cache add curl gzip
RUN curl -O https://datasets.imdbws.com/title.basics.tsv.gz
RUN gunzip title.basics.tsv.gz

# Step 2: Setup Node.js environment
FROM node:16

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Copy the IMDb dataset from the downloader stage
COPY --from=downloader /download/title.basics.tsv ./imdb_datasets/title.basics.tsv

# Transpile TypeScript to JavaScript
RUN npm run tsc

# Expose port 5000
EXPOSE 5000

# Command to run the app
CMD ["npm", "start"]
