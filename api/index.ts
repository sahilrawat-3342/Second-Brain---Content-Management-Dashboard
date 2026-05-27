import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv = require("dotenv");
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

app.use("/api/user",UserRouter);
app.use("/api/content",ContentRouter);
app.use("/api/shareLink",shareLinkRouter);


app.get("/", (req , res ) => {
  res.send("Hello World!");
});

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

// Connect to the database on every cold start
connectToDatabase();

export default app;