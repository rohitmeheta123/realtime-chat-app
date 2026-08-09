import express from 'express';
import { getMessages, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

// Placeholder routes for message API
router.get('/', getMessages);
router.post('/', sendMessage);

export default router;
