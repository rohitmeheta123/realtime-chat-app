import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/database.js';
import { initSocket } from './sockets/chatSocket.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.io
initSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`[Server] Backend running on port ${PORT}`);
});
