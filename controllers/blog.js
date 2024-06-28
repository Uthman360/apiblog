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

// Create blog
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, body, auther, category } = req.body;
    const blog = await Blog.create({
      title,
      body,
      auther,
      category,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });
    return res.status(200).send({ msg: "success", blog });
  } catch (error) {
    return res.status(401).send({ error });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const allblog = await Blog.find({}).populate("auther");
    return res.status(200).send({ msg: "Success", allblog });
  } catch (error) {
    return res.status(401).send({ error });
  }
});

// Update blog
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, body, auther, category } = req.body;
    let updateFields = { title, body, auther, category };

    if (req.file) {
      updateFields.image = `/uploads/${req.file.filename}`;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateFields, { new: true }).populate("auther");
    if (!blog) {
      return res.status(404).send({ msg: "Blog not found" });
    }
    return res.status(200).send({ msg: "Success", blog });
  } catch (error) {
    return res.status(401).send({ error });
  }
});

// Delete blog
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).send({ msg: "Blog not found" });
    }
    return res.status(200).send({ msg: "Blog deleted", blog });
  } catch (error) {
    return res.status(401).send({ error });
  }
});

export default router;
