import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  category:{
    type:Schema.Types.String,
    ref:"category",
    required:true,
  },
  auther:{
    type:Schema.Types.ObjectId,
    ref:"user",
    required:true,
  }
},{timestamps:true});

const Blog = model("blog",blogSchema);

export default Blog