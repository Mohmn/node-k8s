
# Project: Fibonacci Service with Kubernetes and RabbitMQ

This project demonstrates a Fibonacci number generation service, leveraging Kubernetes for scaling, RabbitMQ for message queuing, and Redis for data caching. The setup ensures efficient handling of requests and graceful error management.

## Features

- [x] Generate Fibonacci numbers
- [x] Scale using Kubernetes (K8s)
- [x] Use RabbitMQ for asynchronous task processing
- [ ] Use Redis for caching results
- [ ] Gracefully handle errors

## Setup and Configuration

### Running RabbitMQ on Docker

```bash
docker run -d --name rabbitmq -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```