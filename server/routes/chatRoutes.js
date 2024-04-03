import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { accessChat, fetchChat } from '../controllers/chatController.js';

const app = express();

const router = express.Router();

router.post('/' , protect , accessChat)
router.get('/',protect , fetchChat)
export default router;