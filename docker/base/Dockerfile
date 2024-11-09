# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory in the contain
WORKDIR /code

# Install dependencies
COPY package*.json ./
RUN npm install
