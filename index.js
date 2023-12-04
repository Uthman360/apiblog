import express from "express";
import cors from "cors";
import User from "./routes/user.js";
import Blog from "./routes/blog.js";
import mongoose from "./db/index.js";
import Category from "./routes/category.js"
const app = express();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected");
});

app.use(express.json());
app.use(cors());

app.use("/", User);
app.use("/", Blog);
app.use("/", Category);

app.listen(1000);
