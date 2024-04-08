import express from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { UserModel } from "../models/UserModel.js";

dotenv.config()
console.log(process.env.PRIVATE_KEY);

export const protect = async function (req, res, next) {
  try {
    console.log("start")
    console.log(req.headers.authorization);
    console.log(req.headers.authorization.startsWith("Bearer"));
    const x = req.headers.Authorization && req.headers.Authorization.startsWith("Bearer");
    console.log(x)
    if (req.headers.authorization) {
      console.log("inside ");
     let token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decoded =  jwt.verify(token, process.env.PRIVATE_KEY);
      console.log("decoded token is ", decoded);
      req.user = await UserModel.findById(decoded.id).select("-password");
      // console.log(req.user)
      next();
    } else {
      return res.status(401).json({
        message: "User Not Authorized",
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "User Not Authorized",
      err
    });
  }
};
