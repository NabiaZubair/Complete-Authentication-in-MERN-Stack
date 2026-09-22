import mongoose, { connect } from "mongoose"
import config from "./config.js"


const connectDB= async () => {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("Database connected successfully")
    } catch (err) {
        console.log("connection failed:",err.message)
    }
}

export default connectDB

