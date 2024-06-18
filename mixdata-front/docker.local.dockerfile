FROM node:20.9-bookworm-slim

ENV HTTPS=true
ENV PORT=443
ENV WDS_SOCKET_PORT=${PORT}

RUN apt-get update && apt-get upgrade -y
RUN npm install -g npm@latest

COPY .docker/scripts/docker-entrypoint.dev.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

VOLUME /home/node/opt/mixdata/mixdata-front

EXPOSE ${PORT}

WORKDIR /home/node/opt/mixdata/mixdata-front

ENTRYPOINT ["docker-entrypoint.sh"]

USER node