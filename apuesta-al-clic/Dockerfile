# Usa una imagen de Node.js como base
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu aplicación al directorio de trabajo
COPY . .

# Instala las dependencias
RUN npm install

# Construye la aplicación (si es necesario)
RUN npm run build

# Expone el puerto en el que la aplicación escucha
EXPOSE 3000

# Comando de inicio de la aplicación
CMD ["npm", "start"]
