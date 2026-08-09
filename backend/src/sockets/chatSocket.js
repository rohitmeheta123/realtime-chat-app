import { Server } from 'socket.io';
import { createMessage } from '../services/messageService.js';
import * as onlineUsersService from '../services/onlineUsersService.js';
import { SOCKET_EVENTS } from './socketEvents.js';

/**
 * Initializes Socket.io instance with real-time chat & online status event handlers
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

    // Handle join_chat event
    socket.on(SOCKET_EVENTS.JOIN_CHAT, (payload) => {
      try {
        const { username } = payload || {};
        if (!username || typeof username !== 'string' || username.trim().length === 0) {
          return;
        }

        const { username: registeredUser, isNewUser } = onlineUsersService.addUser(socket.id, username);

        if (!registeredUser) return;

        // Send current list of online users to the joining client
        socket.emit(SOCKET_EVENTS.ONLINE_USERS, {
          users: onlineUsersService.getOnlineUsers(),
        });

        // If this is a newly online username (first active socket), notify other connected clients
        if (isNewUser) {
          socket.broadcast.emit(SOCKET_EVENTS.USER_ONLINE, {
            username: registeredUser,
          });
        }
      } catch (error) {
        console.error(`[Socket Error] join_chat failed for socket ${socket.id}:`, error);
      }
    });

    // Handle send_message event
    socket.on(SOCKET_EVENTS.SEND_MESSAGE, async (payload, callback) => {
      const ack = typeof callback === 'function' ? callback : () => {};

      try {
        const { sender, message } = payload || {};

        // Persist message to MongoDB via shared messageService
        const savedMessage = await createMessage(sender, message);

        // Send acknowledgement back to sender client
        ack({
          success: true,
          data: savedMessage,
        });

        // Broadcast persisted message to all connected clients
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

      const { username, isUserOffline } = onlineUsersService.removeUser(socket.id);

      // Only broadcast user_offline if no active sockets remain for this username
      if (username && isUserOffline) {
        socket.broadcast.emit(SOCKET_EVENTS.USER_OFFLINE, {
          username,
        });
      }
    });
  });

  return io;
};
