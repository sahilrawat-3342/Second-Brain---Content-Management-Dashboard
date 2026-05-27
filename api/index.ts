import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();



import UserRouter  from "./routes/user";
import ContentRouter  from "./routes/Content";
import shareLinkRouter  from "./routes/ShareLink";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables!");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

// Ensure database is connected before handling any requests
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

app.use("/api/user",UserRouter);
app.use("/api/content",ContentRouter);
app.use("/api/shareLink",shareLinkRouter);


app.get("/", (req , res ) => {
  res.send("Hello World!");
});

export default app;