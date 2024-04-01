import mongoose from "mongoose";
const UserSchema = mongoose.model({
    name : {type : String , required : true},
    email : {type : String , required : true},
    password : {type : String , required : true},
    profilePic : {type : String , required : true , default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
})

export const UserModel = mongoose.model('User',UserSchema)