import { Express } from "express";
import { Router } from "express";
import UserAuth from "../Middleware/UserAuth";
import model from "../DataScehma";
import { generateHash } from "../utils";

const shareLinkRouter = Router();

shareLinkRouter.post("/ShareLink",UserAuth, async (req, res) => {
    const share = req.body.share;
    const hash = generateHash(10);

    if(share){
        const ExistingLink = await model.linkModel.findOne({ userId : req.userId });

        if(ExistingLink){
            res.json({
                Hash : ExistingLink.hash
            })
        return;
        }   
        await model.linkModel.create({
            hash : hash,
            //@ts-ignore
            userId : req.userId
        })
    }else{
        await model.linkModel.deleteOne({
            //@ts-ignore
            userId : req.userId
        });

        res.json({
            Message : "Link Deleted"
        })

        return;
    }

    res.json({
        Success : true,
        hash
    })

})

shareLinkRouter.get("/ShareLink/:hash",UserAuth, async (req, res) => {
    const hash = req.params.hash;
    console.log(hash);
    const link = await model.linkModel.findOne({
        hash : hash
    })

    if(!link){
        res.json({
            Success : false
        })
        return;
    }

    const content = await model.contentModel.find({
        userId : link.userId
    })

    const user = await model.userModel.findById(link.userId);

    res.json({
        UserName : user?.name ,
        content
    })
  
})

export default shareLinkRouter;