import { Server } from 'socket.io';
import { createMessage } from '../services/messageService.js';
import { SOCKET_EVENTS } from './socketEvents.js';

/**
 * Initializes Socket.io instance with real-time chat event handlers
 * @param {import('http').Server} server 
 */
export const initSocket = (server) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

  const io = new Server(server, {
    cors: {
      origin: clientUrl,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Handle send_message event from client
    socket.on(SOCKET_EVENTS.SEND_MESSAGE, async (payload, callback) => {
      const ack = typeof callback === 'function' ? callback : () => {};

      try {
        const { sender, message } = payload || {};

        // Persist message to MongoDB via shared messageService
        const savedMessage = await createMessage(sender, message);

        // Send acknowledgement back to the sender client
        ack({
          success: true,
          data: savedMessage,
        });

        // Broadcast the persisted message document to all connected clients
        io.emit(SOCKET_EVENTS.NEW_MESSAGE, savedMessage);
      } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
          return ack({
            success: false,
            message: 'Invalid message data',
          });
        }

        console.error(`[Socket Error] send_message failed for socket ${socket.id}:`, error);
        return ack({
          success: false,
          message: 'Unable to send message',
        });
      }
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};
