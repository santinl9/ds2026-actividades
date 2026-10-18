
FROM node:22-alpine

WORKDIR /app

    COPY package*.json ./

    RUN npm install

    COPY . .

    EXPOSE 3000

    # Comando por defecto al iniciar el contenedor. Ahora sí 'npm run dev' porque con "volumes:" actualiza sin necesidad de copiar
    CMD ["npm", "run", "dev"] 
