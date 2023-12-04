import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    defaultImage: {
        type:String,
        default: "/images/default.png",
    },
    role:{
        type:String,
        required:true,
      }
},{timestamps:true});

const User = model("user",userSchema);

export default User;







