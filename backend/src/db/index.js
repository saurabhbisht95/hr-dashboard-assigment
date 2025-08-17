import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/
            ${DB_NAME}`
        )
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Mongodb connection error", error);
        process.exit(1) //this is feature of node js which helps to exit the current process
    }
}

export default connectDB;