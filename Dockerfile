# Usa una imagen base de Node.js
FROM node:16

# Exponer el puerto que usa la aplicación
EXPOSE 3000

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos del proyecto al contenedor
COPY . .

# Actualiza e instala LibreOffice y otras dependencias necesarias
RUN apt-get update && \
    apt-get install -y libreoffice libreoffice-common

# Instalar dependencias del proyecto
RUN yarn install

# Comando para iniciar la aplicación
CMD ["yarn", "start"]
