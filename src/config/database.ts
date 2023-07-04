import mongoose from "mongoose"
import "dotenv/config"
const connectToDatabase = async (): Promise<void> => {
  try {
    const db_uri = <string>process.env.MONGO_DB_URI
    await mongoose.connect(db_uri)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Error connecting to MongoDB" + error)
  }
}

export default connectToDatabase
