FROM node:20-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm ci

# Copiamos el resto del código del proyecto
COPY . .

# Exponemos el puerto 4200 (el que usa Angular por defecto para desarrollo)
EXPOSE 4200

# Ejecutamos el servidor de desarrollo de Angular. 
# El "--host 0.0.0.0" es OBLIGATORIO en Docker para que puedas acceder desde tu navegador en localhost.
CMD ["npm", "start", "--", "--host", "0.0.0.0"]