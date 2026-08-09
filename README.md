# Real-Time Chat Application

## Overview

This project is a multi-platform real-time chat application built as a technical assignment. It features a shared Node.js/Express backend communicating with both a React Web client (Vite) and a React Native Mobile client (Expo) using REST APIs and Socket.io for real-time bidirectional communication.

*Note: This repository currently contains the **initial project architecture, containerization setup, and health check implementation**. Full messaging UI, persistence, and real-time events will be implemented in subsequent phases.*

---

## Tech Stack

- **Backend**: Node.js, Express, Socket.io, Mongoose, MongoDB, Docker
- **Web Client**: React, Vite, Axios, socket.io-client, Docker
- **Mobile Client**: React Native, Expo, Axios, socket.io-client
- **Orchestration**: Docker Compose

---

## Project Structure

```
realtime-chat-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── messageController.js
│   │   ├── models/
│   │   │   └── Message.js
│   │   ├── routes/
│   │   │   └── messageRoutes.js
│   │   ├── services/
│   │   │   └── messageService.js
│   │   ├── sockets/
│   │   │   └── chatSocket.js
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── .gitignore
│
├── web/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── .gitignore
│
├── mobile/
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── hooks/
│   │   └── utils/
│   │
│   ├── assets/
│   ├── app.json
│   ├── App.js
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   └── .gitignore
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) & Docker Compose
- [Expo Go](https://expo.dev/go) app (for physical mobile device testing) or Android/iOS Simulator

---

## Running with Docker

To spin up the **MongoDB**, **Backend**, and **Web Application** containers simultaneously:

```bash
docker compose up --build
```

### Exposed Endpoints & Services:
- **Web App**: [http://localhost:5173](http://localhost:5173)
- **Backend Server**: [http://localhost:5000](http://localhost:5000)
- **Health Check Endpoint**: [http://localhost:5000/health](http://localhost:5000/health)
- **MongoDB**: `localhost:27017`

---

## Running Mobile

The mobile application runs outside Docker using Expo:

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with **Expo Go** on an Android/iOS device or press `a` / `i` to launch in a simulator.

---

## Environment Variables

### Backend (`backend/.env`)
- `PORT`: Port number for Express server (Default: `5000`).
- `MONGODB_URI`: MongoDB connection string (Local: `mongodb://localhost:27017/realtime_chat`, Docker: `mongodb://mongodb:27017/realtime_chat`).

### Web (`web/.env`)
- `VITE_API_URL`: Backend REST API URL (Default: `http://localhost:5000`).
- `VITE_SOCKET_URL`: Backend Socket.io URL (Default: `http://localhost:5000`).

### Mobile (`mobile/.env`)
- `EXPO_PUBLIC_API_URL`: Backend REST API URL.
- `EXPO_PUBLIC_SOCKET_URL`: Backend Socket.io URL.

> ⚠️ **Important for Mobile Testing**: When testing on a **physical mobile device**, replace `localhost` with your host machine's LAN IP address (e.g., `http://192.168.x.x:5000`), as `localhost` inside a physical device points to the device itself.

---

## Current Architecture

```
+-------------------+        REST / Socket.io        +-------------------+
|  React Web App    | -----------------------------> |                   |
|  (Vite / Docker)  |                                |                   |
+-------------------+                                |  Node.js Backend  |       Mongoose       +-----------------+
                                                     | (Express/Sockets) | -------------------> | MongoDB (Docker)|
+-------------------+        REST / Socket.io        |     (Docker)      |                      +-----------------+
|  React Native App | -----------------------------> |                   |
|   (Expo Local)    |                                |                   |
+-------------------+                                +-------------------+
```

- **Web → Backend**: Communicates via Axios HTTP requests and Socket.io client.
- **Mobile → Backend**: Communicates via Axios HTTP requests and Socket.io client over host LAN network.
- **Backend → MongoDB**: Persists chat data via Mongoose ODM connected to the `realtime_chat` database.
- **Web/Mobile → Socket.io → Backend**: Real-time event transport layer.
