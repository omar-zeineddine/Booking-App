import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();
dotenv.config();

// routes
import authRoute from "./routes/auth.js";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

// monitor mongoDB connection
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

// middlewares
app.use("/auth", authRoute);

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port: ${PORT}`);
});
