#Los comandos se ejecutan en el orden que figuran acá cuando hago 'docker compose up --build'
    #sin --build solo ejecuta "CMD", cualquier cambio que haga en los archivos (COPY ..) o en las dependencias (npm install) no se vería reflejado

# sistema operativo y node para el contenedor, 22-alpine ya viene instalada por Node.js
FROM node:22-alpine

# Directorio de trabajo dentro del contenedor, creada sobre el fylesistem de 22-alpine, 
    #en '/app' se ejecutan todos los comandos que le siguen
WORKDIR /app

    # Copiar los archivos de dependencias
    COPY package*.json ./

    # Instalar dependencias en la imagen en '/app'
    RUN npm install

    # Copiar todo lo que no esté en .dockerignore en '/app'
    COPY . .

    # Exponer puerto del servidor. Es informativo, el mapeo real lo hace el 'docker-compose.yml'
    EXPOSE 3000

    # Comando por defecto al iniciar el contenedor
        #CMD ["npm", "run", "dev"] //lo cambié para que sea coherente con los scripts del 'package.json'
    CMD ["npm", "start"] 
        #ejecuta 'npm start'.