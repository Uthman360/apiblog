import { Router } from "express";
import Blog from "../controllers/blog.js";
const router = Router();
router.use("/blog",Blog)
export default router;