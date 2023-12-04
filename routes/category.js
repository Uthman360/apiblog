import { Router } from "express";
import Category from "../controllers/category.js";
const router = Router();
router.use("/category",Category)
export default router;