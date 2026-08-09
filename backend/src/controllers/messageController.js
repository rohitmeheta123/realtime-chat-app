import * as messageService from '../services/messageService.js';

/**
 * Controller for creating a message (POST /api/messages)
 */
export const createMessageController = async (req, res) => {
  try {
    const { sender, message } = req.body || {};

    const newMessage = await messageService.createMessage(sender, message);

    return res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid message data',
      });
    }

    console.error('[createMessageController Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Controller for getting messages (GET /api/messages)
 */
export const getMessagesController = async (req, res) => {
  try {
    const { limit } = req.query;

    const messages = await messageService.getMessages(limit);

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('[getMessagesController Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
