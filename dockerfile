FROM node:16.18-alpine
RUN echo "America/Sao_Paulo" > /etc/timezone

ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN date

RUN npm install pm2 -g 

COPY . /app
WORKDIR /app

ARG NPM_TOKEN
RUN npm install
RUN rm -f .npmrc
ENV NODE_ICU_DATA="node_modules/full-icu"
ENV NODE_ENV=development

RUN npm run build

EXPOSE $PORT

CMD ["pm2-runtime", "pm2.yml"] 