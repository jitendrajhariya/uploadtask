# Make & Upload Files to S3 using Node.js + RabbitMQ + Docker

## Overview

This project simulates file creation and uploads to AWS S3 using a task model pattern and RabbitMQ for job distribution.

### Components

- **App1**: Initiates tasks (100 file creation/upload jobs)
- **App2**: Worker that performs file generation and "upload"
- **RabbitMQ**: Message queue for job distribution
- **Docker Compose**: To orchestrate services

## How to Run

```bash
docker-compose up --build
```

Open RabbitMQ dashboard at http://localhost:15672 (guest/guest)

## Debugging

To debug inside Docker with VSCode, use the Remote - Containers extension.
