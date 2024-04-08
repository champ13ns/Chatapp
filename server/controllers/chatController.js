import express from 'express'
import {chatModel} from './../models/chatModel.js'
import { UserModel } from '../models/UserModel.js';

// /api/chats/ (GET) -> get all the chats belonging to the logged In user.
// /api/chats/ (GET) -> get all the chats belonging to the logged In user.

const app = express()
app.use(express.json())

export const accessChat = async function(req,res){
    const userId = req.params.id;
    console.log("parms is ",userId)
    if(!userId) {
        res.json({
            message : "User id not present"
        })
        return;
    }
    let isChat = await chatModel.find({
        isGroupChat : false,
        $and : [
            { users : { $elemMatch : { $eq : req.user._id } } },
            { users : { $elemMatch : { $eq : userId } } },
        ]
    }).populate("users" , "-password").populate("latestMessage")
        console.log("isChat is ",isChat)
    isChat = await UserModel.populate(isChat , {
        path : "latestMessage.sender",
        select : "name pic email"
    })

    if(isChat.length > 0 ){
        res.send(isChat[0])
    } else{
        let chatData = {
            chatName : "sender",
            users : [req.user._id,userId]
        }
        const newChat = await chatModel.create(chatData);
        const FullChat = await chatModel.findOne({_id : newChat._id}).populate("users","-password")
        console.log("chat is ",FullChat);
        res.status(200).json({
            FullChat
        })
    }

}

export const fetchChat = async function(req,res){
    try{
        const userId = req.user._id;
        const allChats = await chatModel.find({
            users : {$elemMatch : {$eq : userId}  }
        }).populate("users","-password").populate("groupAdmin","-password").populate("latestMessage").sort({updatedAt : -1})
        
        console.log(allChats)
        res.status(200).json({
            allChats
        })
    } catch(err){
        res.status(400).json({
            err
        })
    }
}

// Create Group Chat

export const createGroupChat = async function(req,res){
    console.log("***************************************************************************************************************************");
    console.log(req.body)
    try {
        if(!req.body.users || !req.body.chatName){
           return res.status(202).json({
                message : "ChatName of Users are missing"
            })
        }
        const users = JSON.parse(req.body.users);
        if(!users || users.length <= 2){
           return res.status(200).json({
                message : "Group Chats must contain more than 2 users"
            })
        }
        users.push(req.user)
        const groupChat = await chatModel.create({
            chatName : req.body.chatName,
            isGroupChat : true,
            users : users,
            groupAdmin : req.user
        })
        console.log("GC ",groupChat)
        const fullGroupChat = await chatModel.findOne({_id : groupChat._id}).populate("users", "-password").populate("groupAdmin","-password")
        res.status(200).json({
            fullGroupChat
        })
    } catch (error) {
            res.status(500).json({
               err :  error.message
            })
    }
}

export const addToGroup = async function (req,res){
    try {
        if(!req.body.user || !req.body.chatName){
            
        }
    } catch (error) {
        
    }
}