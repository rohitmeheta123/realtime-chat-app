import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchMessages } from '../services/api';
import { getSocket } from '../services/socket';

export const useChat = (username) => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('connecting'); // 'connecting' | 'connected' | 'disconnected'
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  // 1. Fetch initial message history
  const loadHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchMessages(50);
      if (response && response.success) {
        setMessages(response.data || []);
      } else {
        setError('Unable to load messages. Please try again.');
      }
    } catch (err) {
      console.error('[useChat] Error loading messages:', err);
      setError('Unable to load messages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 2. Setup Socket.io connection & event listeners
  useEffect(() => {
    if (!username) return;

    loadHistory();

    const socket = getSocket();
    socketRef.current = socket;

    const registerUser = () => {
      setConnectionStatus('connected');
      socket.emit('join_chat', { username });
    };

    if (!socket.connected) {
      setConnectionStatus('connecting');
      socket.connect();
    } else {
      registerUser();
    }

    const onConnect = () => {
      registerUser();
    };

    const onDisconnect = () => {
      setConnectionStatus('disconnected');
    };

    const onConnectError = () => {
      setConnectionStatus('disconnected');
    };

    const onNewMessage = (newMsg) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === newMsg._id)) {
          return prev;
        }
        return [...prev, newMsg];
      });
    };

    const onOnlineUsers = (data) => {
      setOnlineUsers(data?.users || []);
    };

    const onUserOnline = (data) => {
      if (!data?.username) return;
      setOnlineUsers((prev) => {
        if (prev.includes(data.username)) return prev;
        return [...prev, data.username];
      });
    };

    const onUserOffline = (data) => {
      if (!data?.username) return;
      setOnlineUsers((prev) => prev.filter((u) => u !== data.username));
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    socket.on('new_message', onNewMessage);
    socket.on('online_users', onOnlineUsers);
    socket.on('user_online', onUserOnline);
    socket.on('user_offline', onUserOffline);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.off('new_message', onNewMessage);
      socket.off('online_users', onOnlineUsers);
      socket.off('user_online', onUserOnline);
      socket.off('user_offline', onUserOffline);
    };
  }, [username, loadHistory]);

  // 3. Send message via Socket.io acknowledgement
  const sendMessage = useCallback(
    async (messageText) => {
      const socket = socketRef.current || getSocket();
      if (!socket || !socket.connected) {
        throw new Error('Unable to send message. Socket disconnected.');
      }

      return new Promise((resolve, reject) => {
        socket.emit(
          'send_message',
          { sender: username, message: messageText },
          (ack) => {
            if (ack && ack.success) {
              resolve(ack.data);
            } else {
              const errMsg = ack?.message || 'Unable to send message';
              reject(new Error(errMsg));
            }
          }
        );
      });
    },
    [username]
  );

  return {
    messages,
    onlineUsers,
    connectionStatus,
    isLoading,
    error,
    sendMessage,
    refetchHistory: loadHistory,
  };
};
