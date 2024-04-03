import mongoose from 'mongoose'
import dotevn from 'dotenv'
dotevn.config()
export const connectDB = async()=>{
    try{
        const connection = await mongoose.connect(`mongodb+srv://sachinfuloria9:${process.env.DB_PASSWORD}@cluster0.wxl4myy.mongodb.net/`)
        console.log("DB connected");
    } catch(err){
        console.log(err);
        process.exit();
    }   
   
}


