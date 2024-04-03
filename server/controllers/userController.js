import express from "express";
import { UserModel } from "./../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

const app = express();

export async function Login(req, res) {
    const { email, password } = req.body;
    const User = await UserModel.findOne({ email });
    console.log("user is ", User);
    if(User === undefined) {
      return res.status(401).json({
        message : "User not yet registered"
      })
    }
    const returnRes = await User.comparePassword(password);
    console.log("Pass match ",returnRes)
    if (returnRes === true) {
       return res.status(200).json({
        message: "Login Success",
        id: User._id,
        username: User.username,
        email: User.email,
        isAdmin: User.isAdmin,
        pic: User.pic,
        token: generateToken(User._id),
      });
    } else {
      return res.status(401).json({
        message: "Wrong Password",
      });
    }
  
}

export async function signUp(req, res) {
  try {
    const { email, password, username, isAdmin } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.json({
        message: "User already exist",
      });
      return;
    }
    const newUser = await UserModel.create({
      email,
      password,
      username,
      isAdmin,
    });
    return res.status(200).json({
      message: "SignUp Success",
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      pic: newUser.pic,
    });
  } catch (err) {
    return res.status(401).json({
      message: err.message,
    });
  }
}

export async function getAllUsers(req,res){
  try{
    console.log(req.query.search)
    const keyword = req.query.search ? {
      $or : [
        { username : { $regex : req.query.search , $options: "i" } },
        { email : { $regex : req.query.search , $options: "i" } } 
      ]
    } : {}
    const users = await UserModel.find(keyword);
    console.log(users)
    return res.json({
      users
    })
  }
  catch(err){
    return res.json({
      message : err
    })
  }
}