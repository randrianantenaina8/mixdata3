FROM node:20.9-bookworm-slim

RUN apt-get update && apt-get upgrade -y
RUN npm install -g npm@latest

COPY .docker/scripts/docker-entrypoint.dev.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
# USER node

VOLUME /home/node/opt/mixdata/mixdata-back

EXPOSE 9000

WORKDIR /home/node/opt/mixdata/mixdata-back

ENTRYPOINT ["docker-entrypoint.sh"]
