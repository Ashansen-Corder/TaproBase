# ==========================================
# STAGE 1: Build Environment
# ==========================================
# Using Alpine Linux base image for minimal footprint and reduced attack surface
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package files FIRST to leverage Docker's layer caching
# This ensures 'npm install' only runs if dependencies change, saving build time
COPY package*.json ./

# Install dependencies cleanly
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the Vite/React application for production
RUN npm run build


# ==========================================
# STAGE 2: Production Environment
# ==========================================
# Using the unprivileged Nginx Alpine image to enforce the Principle of Least Privilege
# This ensures the container does NOT run as root, mitigating potential security risks
FROM nginxinc/nginx-unprivileged:alpine

# Copy the compiled static files from Stage 1 to Nginx's default serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080 (the default port for unprivileged Nginx)
EXPOSE 8080

# Healthcheck to verify the web server is responsive
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# Start Nginx in the foreground so the container doesn't exit
CMD ["nginx", "-g", "daemon off;"]