# Utiliza una imagen base de Node.js 18
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto (package.json y yarn.lock)
COPY package.json yarn.lock ./

# Instala las dependencias utilizando Yarn
RUN yarn install

# Copia el resto de los archivos del proyecto al directorio de trabajo en el contenedor
COPY . .

# Ejecuta el comando de construcción (yarn build)
RUN yarn build

# Comando de inicio para la aplicación (yarn start)
CMD ["yarn", "start"]
