import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { accessChat, createGroupChat, fetchChat } from '../controllers/chatController.js';

const app = express();

const router = express.Router();
router.post('/createGroupChat',protect, createGroupChat)

router.post('/:id' , protect , accessChat)  
router.get('/' , protect ,  fetchChat)
router.post('/renameGroupChat',protect, createGroupChat)
router.post('/addInGroup', protect, createGroupChat)
export default router;