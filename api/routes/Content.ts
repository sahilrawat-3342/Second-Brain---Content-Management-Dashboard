import express, { Request, Response } from "express";
import Model  from "../DataScehma";
import dotenv from "dotenv";
dotenv.config();

import verifyToken from "../Middleware/UserAuth";

const ContentRouter = express.Router();

ContentRouter.post("/create", verifyToken, async (req: Request, res: Response) => {
    const { title, type, Link, description } = req.body;
    //@ts-ignore
    const userId = req.userId;
    console.log(userId);

    try{
        const content = new Model.contentModel({
            Link,
            description,
            type,
            title,
            userId
        })
        await content.save();

        res.json({
            Success : true
        })
    }catch(err){
        res.json({
            Success : false,
            message : err.message

        })
    }
 })

ContentRouter.get("/all", verifyToken, async (req: Request, res: Response) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await Model.contentModel.find({userId}).populate("userId","name");
  
    res.json({
        content
    })
})

ContentRouter.delete("/delete", async (req: Request, res: Response) => {

    const contentId = req.body.contentId;

    await Model.contentModel.deleteOne({_id : contentId});
    
    res.json({
        Success : true
    })
})

export default ContentRouter;