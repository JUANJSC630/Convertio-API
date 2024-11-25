# Usa una imagen base de Node.js
FROM node:16

# Instala las dependencias del sistema necesarias para LibreOffice
RUN apt-get update && apt-get install -y \
  libreoffice \
  fonts-dejavu-core \
  && apt-get clean

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y yarn.lock para instalar dependencias
COPY package.json yarn.lock ./
RUN yarn install

# Copia todo el código del proyecto al contenedor
COPY . .

# Expone el puerto 3000 para que Render pueda acceder a tu aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["yarn", "start"]
