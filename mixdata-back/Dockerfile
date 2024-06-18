FROM node:14.20.0
WORKDIR /mixdata
RUN ls -la && mkdir ./backup && mkdir ./logs
COPY . .
RUN mv .env.dev .env
RUN npm install
RUN npm run build
EXPOSE 9000
CMD sh ./docker-deploy.sh
