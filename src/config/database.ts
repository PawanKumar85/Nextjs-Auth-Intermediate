import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    const connection = mongoose.connection;

    connection.on("collected", () => {
      console.log("MongoDD connection Successfuly");
    });

    connection.on("error", (error) => {
      console.log("MongoDB connection error", error);
      process.exit(1);
    });
  } catch (error) {
    console.log(error);
    console.log("MongoDB connection failed");
  }
};

export default connectDB;
