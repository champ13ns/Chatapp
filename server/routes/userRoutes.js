import express from 'express'
import { Login, signUp , getAllUsers} from './../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js';
const app = express();


const router = express.Router()

router.post('/login' , Login)
router.post('/signup', signUp)
router.get('/' ,protect , getAllUsers)  // /api/users?search=sachin


export default router;