import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// routes
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";

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

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/hotels", hotelsRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/rooms", roomsRoute);

// error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port: ${PORT}`);
});
