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

// Update category
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!category) {
      return res.status(404).send({ msg: "Category not found" });
    }
    return res.status(200).send({ msg: "Success", category });
  } catch (err) {
    return res.status(401).send({ err });
  }
});

// Delete category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send({ msg: "Category not found" });
    }
    return res.status(200).send({ msg: "Category deleted", category });
  } catch (err) {
    return res.status(401).send({ err });
  }
});


export default router;
