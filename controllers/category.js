import Router from "express";
import Category from "../models/category.js";
const router = Router();
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({
      name,
    });
    return res.status(200).send({ msg: "success", category });
  } catch (err) {
    return res.status(401).send({ err });
  }
});

router.get("/", async (req, res) => {
  try {
    const allcategory = await Category.find();
    return res.status(200).send({ msg: "Success", allcategory });
  } catch (error) {
    return res.status(401).send({ err });
  }
});

export default router;
