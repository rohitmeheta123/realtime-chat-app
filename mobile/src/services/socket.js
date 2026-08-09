import { io } from 'socket.io-client';

const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL || 'http://localhost:5000';

export const createSocketConnection = () => {
  return io(SOCKET_URL, {
    autoConnect: true,
    transports: ['websocket', 'polling'],
  });
};
