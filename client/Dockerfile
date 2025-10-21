# ------------------------------
# Use official lightweight Node.js image
# ------------------------------
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# ------------------------------
# Copy dependency files first for better caching
# ------------------------------
COPY package*.json ./

# Install dependencies
RUN npm ci

# ------------------------------
# Copy the rest of your project files
# ------------------------------
COPY . .

# ------------------------------
# Expose port used by Vite dev server (default 5173)
# ------------------------------
EXPOSE 5173

# ------------------------------
# 🟢 DEVELOPMENT MODE (default)
# ------------------------------
CMD ["npm", "run", "dev" ,  "--", "--host", "0.0.0.0"]


# ======================================================================
# 🏗️ PRODUCTION BUILD (commented out example)
# ======================================================================
# 1️⃣ Build production files using Vite
# RUN npm run build
#
# 2️⃣ Use an official Nginx image to serve the build output
# FROM nginx:alpine AS production
#
# 3️⃣ Copy the Vite build output from previous stage
# COPY --from=0 /app/dist /usr/share/nginx/html
#
# 4️⃣ Expose Nginx default port
# EXPOSE 80
#
# 5️⃣ Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]
# ======================================================================
