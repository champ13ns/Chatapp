import express from 'express'
import {chatModel} from './../models/chatModel.js'
import { UserModel } from '../models/UserModel.js';

// /api/chats/ (GET) -> get all the chats belonging to the logged In user.
// /api/chats/ (GET) -> get all the chats belonging to the logged In user.

export const accessChat = async function(req,res){
    const userId = req.body.userId;
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
        })
        console.log(allChats);
        res.status(200).json({
            allChats
        })
    } catch(err){
        res.status(400).json({
            err
        })
    }
}