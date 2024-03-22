# Imagem base com Node.js
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de configuração do projeto para o diretório de trabalho
COPY package.json package-lock.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Construa a aplicação React com Vite
RUN npm run build

# Imagem para servir a aplicação construída
FROM nginx:stable-alpine

# Copie os arquivos construídos para o diretório de serviço do Nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Exponha a porta 80 para permitir conexões externas
EXPOSE 3000

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
