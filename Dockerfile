FROM node:18-alpine
WORKDIR /usr/src/app

# If no package.json exists, create one and install express
COPY . .

RUN [ -f package.json ] || npm init -y && npm install express

EXPOSE 3001

CMD ["node", "app.js"]
