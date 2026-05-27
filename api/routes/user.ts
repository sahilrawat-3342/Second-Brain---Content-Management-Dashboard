import express, { Request, Response } from "express";
import Model  from "../DataScehma";
// export userModel properly in DataScehma.ts
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const UserRouter = express.Router();

UserRouter.post("/signup", async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    const user = new Model.userModel({
      name,
      password : hashedPassword,
    });

    await user.save();

    res.json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

UserRouter.post("/login", async (req: Request, res: Response) => {
  const { name, password } = req.body;

  try {
    const user = await Model.userModel.findOne({ name });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password as string);

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,      
      sameSite: "lax",    
      maxAge: 60 * 60 * 1000
});


    

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name },
    });

    }catch (err: any) {

    res.status(400).json({
      success: false,
      message: err.message,

    });
  }
});

export default UserRouter;
