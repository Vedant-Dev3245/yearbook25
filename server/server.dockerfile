FROM node:latest

RUN apt-get update \
    && apt-get install -y netcat-traditional

ENV APP_HOME=/home/app/web

WORKDIR $APP_HOME

COPY server/package.json $APP_HOME
RUN npm install

COPY . $APP_HOME

EXPOSE 8000

# Create an app user 
RUN useradd --user-group --create-home --no-log-init --shell /bin/bash app
RUN chown -R app:app $APP_HOME

USER app

CMD ["npm", "start"]

# ENTRYPOINT ["/home/app/web/entrypoint.sh"]