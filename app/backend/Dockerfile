# Usa a imagem node:16.14-alpine como base
FROM node:16.14-alpine

# Muda para o diretório de trabalho /app-backend
WORKDIR /app-backend

# Copia os package.json e package-lock.json para o container
COPY . .

# Instalar as dependências Node
RUN npm install

# Sinaliza que aplicação expõe a porta 3001
EXPOSE 3001

# Configura os comandos para iniciar a aplicação de acordo com as boas práticas
ENTRYPOINT ["npm", "run"]

CMD [ "start" ]