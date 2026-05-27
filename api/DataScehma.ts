import mongoose, { Schema , model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI!);

const user: Schema = new Schema({
    name : {type: String,unique : true,required : true},
    password : {type: String,required : true}
})

const Content: Schema  = new Schema({
    Link : String,
    description: String,
    type : {type :String , enum :  ["article","video","image","audio","youtube","twitter","instagram","note"], },
    title : String,
    tags : [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    userId : {type : Schema.Types.ObjectId, ref : "user",required : true }
})

const tags: Schema  = new Schema({
    title : String
})

const Links: Schema  = new Schema({
    hash : String,
    userId : [{ type: Schema.Types.ObjectId, ref: "user",required : true ,unique : true}]
})

const userModel = model("user",user);
const contentModel = model("content",Content);
const tagModel = model("tag",tags);     
const linkModel = model("link",Links);

const Model = {userModel,contentModel,tagModel,linkModel};

export default Model;

