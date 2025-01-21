# Base image for building
FROM node:18-alpine as build

# Define build arguments
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_BACKEND_URL

ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build with Vite using environment variables
RUN npm run build

# Production image with Nginx
FROM nginx:alpine as PRODUCTION_IMAGE

# Copy the built app to the Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
