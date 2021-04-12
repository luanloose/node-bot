# Imagem de base
FROM node

# Rodar comandos para o puppeteer
RUN apt-get update
RUN apt-get upgrade
RUN apt-get install -y libatk1.0-0
RUN apt-get install -y libnss3-dev
RUN apt-get install -y libatk-bridge2.0-0
RUN apt-get install -y libcups2-dev
RUN apt-get install -y libxkbcommon-x11-0
RUN apt-get install -y libgbm-dev
RUN apt-get install -y libgtk-3-0
RUN apt-get install -y libasound2

# Configurando diretorio no container
WORKDIR /usr/app

# Copiar todos os arquivo package.json e yarn.lock
COPY package*.json .
#COPY yarn*.lock .

# Rodar comando yarn install para instalar bibliotecas
RUN yarn install

# Copiar todas as outras pastas
COPY . .

# Definir porta
EXPOSE 3000

# Rodar script
CMD [ "node", "src/index.js" ]