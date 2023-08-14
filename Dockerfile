FROM node as builder

WORKDIR /project
COPY . /project
RUN npm install && npm run build

FROM nginx
COPY --from=builder /project/dist /usr/share/nginx/html