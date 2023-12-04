import { Router } from "express";
import Blog from "../models/blog.js";
import multer from "multer";
import path from "path";
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });


router.post("/", async (req, res) => {
  try {
    const { title, body,auther,category } = req.body;
    const blog = await Blog.create({
      title,
      body,
      auther,
      category
    });
    return res.status(200).send({ msg: "success", blog });
  } catch (error) {
    return res.status(401).send({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const allblog = await Blog.find({}).populate("auther");
    return res.status(200).send({ msg: "Success", allblog });
  } catch (error) {
    return res.status(401).send({ error });
  }
});

export default router;
