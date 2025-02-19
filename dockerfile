 # Use the official Node.js image as the base image
 FROM node:18-alpine

 # Set the working directory inside the container
 WORKDIR /app
 
 # Install dependencies
 COPY package*.json ./
 RUN npm install
 
 # Copy the rest of the application code
 COPY . .
 
 # Ensure TypeScript is installed globally
 RUN npm install -g typescript
 
 # Build the Next.js application
 RUN npm run build
 
 # Expose the port the app runs on
 EXPOSE 3000
 
 # Start the Next.js application
 CMD ["npm", "start"]
 