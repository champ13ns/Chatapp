import dotev from "dotenv";
import express from "express";
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import jwt from 'jsonwebtoken'
import { connectDB } from "./utils/db.js";
import cors from 'cors'

/**
 * /api/users/login -> body{email, password}
 * /api/users/signup -> body{username, email, password, profilePic}
 */

connectDB();

const app = express();  
app.use(cors())

app.listen(5000, ()=> {
    console.log('server started at port 5000')
}
)


app.use(express.json())
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
