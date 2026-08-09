import Message from '../models/Message.js';

/**
 * Creates and persists a new message in MongoDB
 * @param {string} sender 
 * @param {string} message 
 * @returns {Promise<import('mongoose').Document>}
 */
export const createMessage = async (sender, message) => {
  if (!sender || typeof sender !== 'string' || sender.trim().length === 0) {
    const error = new Error('Invalid message data');
    error.name = 'ValidationError';
    throw error;
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    const error = new Error('Invalid message data');
    error.name = 'ValidationError';
    throw error;
  }

  const newMessage = await Message.create({
    sender: sender.trim(),
    message: message.trim(),
  });

  return newMessage;
};

/**
 * Retrieves messages from MongoDB in chronological order
 * @param {number|string} limit 
 * @returns {Promise<Array>}
 */
export const getMessages = async (limit) => {
  let parsedLimit = parseInt(limit, 10);
  if (isNaN(parsedLimit) || parsedLimit <= 0) {
    parsedLimit = 50;
  }
  if (parsedLimit > 100) {
    parsedLimit = 100;
  }

  // Fetch messages in chronological order (oldest first)
  const messages = await Message.find()
    .sort({ createdAt: 1 })
    .limit(parsedLimit);

  return messages;
};
