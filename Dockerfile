# Etapa 1: Imagem base para construir o projeto
FROM node:18 AS builder

# Diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o package.json e package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o código fonte para o diretório de trabalho
COPY . .

# Instale o TypeScript e compile o código
RUN npm install -g typescript
RUN tsc

# Etapa 2: Imagem base para executar o projeto
FROM node:18

# Diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o package.json e package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Copie o arquivo .env (se estiver na raiz do seu projeto)
COPY .env ./

# Instale as dependências do projeto
RUN npm install --only=production

# Copie os arquivos compilados do diretório de build
COPY --from=builder /usr/src/app/dist .

# Exponha a porta em que a aplicação vai rodar
EXPOSE 3000

# Defina o comando para iniciar a aplicação
CMD ["node", "index.js"]

