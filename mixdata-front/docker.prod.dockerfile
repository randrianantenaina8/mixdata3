FROM node:20.9-bookworm-slim AS mixdata-builder

RUN npm install -g npm@latest

WORKDIR /front
# Copy app files
COPY . .
RUN yarn install

# Build the app
RUN yarn run build

# Bundle static assets with nginx
FROM nginx:1.25.4-alpine AS production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=mixdata-builder /front/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
