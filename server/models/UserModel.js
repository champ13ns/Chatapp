import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    username : {type : String , required : true},
    email : {type : String , required : true},
    isAdmin : {type : Boolean ,required: true,  deafult : false},
    password : {type : String , required : true},
    profilePic : {type : String , default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
})


userSchema.pre("save" , async function (next){
    // if(! this.isModified) next()
    console.log("gi")
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password)
    next();
})

userSchema.methods.comparePassword = async function(passsword){
    return await bcrypt.compare(passsword , this.password)
}

export const UserModel = mongoose.model('User',userSchema)