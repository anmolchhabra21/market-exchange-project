  <h3 align="center">Market-Exchange Project</h3>
  <p align="center">
This is an Implementation of how an Exchange Architecture works.
  </p>


## About the Project

Currently, this supports one market, TATA_INR, To reduce latency, all the transactions happen in memory/single node process without directly updating the database. However, snapshots are taken at some intervals (3s) to prevent the entries from being deleted, and we can also replay the events using a queue in case the main engine process ever goes down. For every transaction or order completed/canceled, a WebSocket Server emits these events(ticker/price) displayed on the frontend. I have tried to handle complex, asynchronous, and socket tasks using a scalable class-based Singleton Approach.
![Architecture](https://github.com/anmolchhabra21/market-exchange-project/blob/main/frontend/public/images/Architecture.png)

[Video](https://drive.google.com/file/d/17fIUYNVuNtS053MU0xFT9S5F1AAOtmxP/view?usp=sharing)

### Features
- Minimal Latency
- Real-time updates on orderbook, price and ticker
- Scalable Pub-Sub Service
- Redis queue for replaying after the last snapshot for recovery
- Executed quantity as the response to the user immediately after placing the order
- mMaker(Market Maker) service to emulate traffic
- Built as per standard Binance API Documentation

### Built With
- Next.js
- Typescript
- Redis
- Timescaledb
- WebSocket

## Getting Started

### Prerequisites
- Node JS & npm/nvm
- Typescript
- Docker (Other services can be installed directly or with Docker)

#### There are multiple processes/services in the repository: 

  - **`docker-compose`:** Running Redis and timescaledb images.
  - **`api`:** The main API and routing service:
  - **`engine`:** Central process, pulling and Executing orders from the queue, updating back to the user, and publishing to WebSocket server.
  - **`webSocketService`:** Scalable Pub-Sub service, ensuring proper subscription and removal logic for sockets.
  - **`frontend`:** Next.js frontend for the Exchange.
  - **`mMaker`:** Emulating traffic by randomly placing and canceling orders on the order-book.

### Installation & usage

- Clone the repo

- Start the dependencies, you can use the docker-compose to setup:

  ```bash
  docker-compose up -d
  ```
- You can check if all the services (ElasticSearch, Zookeeper, Kafka) are up and running by

  ```bash
  docker ps
  ```

-  To get any service running(say frontend), open a terminal: 
    ```bash
    cd frontend
    npm i 
    npm run dev
  
    # The running port will be displayed in the terminal.
    ```
- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
