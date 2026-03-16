FROM node:20
WORKDIR /app
# Copia as receitas de módulos
COPY package*.json ./
RUN npm install
# Copia o teu código (incluindo o server.js que vês no VS Code)
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]