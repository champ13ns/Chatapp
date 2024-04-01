import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    sender : { type : mongoose.Schema.Types.ObjectId , ref : "User" },
    content : {type : String , trim : true},
    chat : {type : mongoose.Types.ObjectId , ref:"Chat"}
} , {timestamps : true})

export const messageModel = mongoose.model('MessageModel' , messageSchema)
