#!/bin/sh

if [ "$DATABASE" = "mongodb" ]; then
    echo "Waiting for mongo..."

    while ! nc -z $DATABASE_HOST $DATABASE_PORT; do
      sleep 0.1
    done

    echo "MongoDB started"
fi

# Make migrations and migrate the database.
echo "Starting node server. "

exec "$@"