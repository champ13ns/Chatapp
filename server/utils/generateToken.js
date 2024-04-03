import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

 function generateToken(id){
    console.log("id is ", id)
    const token =  jwt.sign({id} , process.env.PRIVATE_KEY)
    console.log("token ",token)
    return token;
}

export default generateToken;