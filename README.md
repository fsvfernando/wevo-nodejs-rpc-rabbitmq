# Rocketseat 2019 - Node.js and RabbitMQ
RPC Implementations with RabbitMQ

But what if we need to run a function on a remote computer and wait for the result? This pattern is commonly known as Remote Procedure Call or RPC.

## RabbitMQ
First of all, you need to install RabbitMQ and get it running before using the server and client.

## RabbitMQ with Docker
Install Docker
``` https://www.docker.com/products/docker-desktop ```

Image
``` https://hub.docker.com/_/rabbitmq/```

Run
```$ docker run -d --hostname my-rabbit --name rabbit13 -p 8080:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management```

## Server
```$ node server.js```

## Client
```$ node client.js 42```
