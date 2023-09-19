# Development stage
FROM node:16 as development

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (o yarn.lock si estás usando Yarn)
COPY package*.json ./

# Instala las dependencias de desarrollo
RUN npm install

# Copia los archivos de configuración
COPY tsconfig.json tsconfig.node.json ./

# Copia el código fuente de la aplicación
COPY ./src ./src

# Comando de inicio para el entorno de desarrollo
CMD [ "npm", "run", "dev" ]

# Builder stage
FROM development as builder

# Build the app with devDependencies still installed from the "development" stage
RUN npm run build

# Clear dependencies and reinstall for production (no devDependencies)
RUN rm -rf node_modules
RUN npm ci --only=production

# Production stage
FROM alpine:latest as production

# Instala Node.js y certificados CA
RUN apk --no-cache add nodejs ca-certificates

# Establece el directorio de trabajo en el contenedor
WORKDIR /root/

# Copia los archivos de la etapa de compilación (builder)
COPY --from=builder /usr/src/app ./

# Comando de inicio para el entorno de producción
CMD [ "node", "dist/server/server.js" ]
