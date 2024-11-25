# Usa una imagen base de Node.js
FROM node:16

# Actualiza e instala LibreOffice y otras dependencias necesarias
RUN apt-get update && \
    apt-get install -y libreoffice

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY . .

# Instalar dependencias
RUN yarn install

# Exponer el puerto que usa la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["yarn", "start"]
