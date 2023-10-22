import config from "config";
import { DatabaseError } from "../src/errors/DatabaseError";
import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI: string = config.get("mongoURI");
    const mongoose = await connect(mongoURI);
    mongoose.set("strictQuery", false);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    throw new DatabaseError();
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
