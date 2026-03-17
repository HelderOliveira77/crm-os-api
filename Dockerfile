# Usamos a versão 20-alpine por ser leve e estável
FROM node:20-alpine
WORKDIR /app
# Copia as receitas de módulos
COPY package*.json ./
# Instalar as dependências
RUN npm install
# Copia o teu código (incluindo o server.js que vês no VS Code)
COPY . .
# Expor a porta que a API usa
EXPOSE 3000
# Comando para iniciar
CMD ["npm", "start"]