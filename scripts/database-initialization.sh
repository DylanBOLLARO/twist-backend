#!/bin/bash

container_name="twist-backend"
container_id=$(docker ps -q -f "name=$container_name")

if [ -z "$container_id" ]; then
    echo "Container '$container_name' is not running."
else
    echo "Container '$container_name' is running. ID: $container_id"
    docker exec -it $container_id sh -c "npx prisma db push --force-reset"
fi