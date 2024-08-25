import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { protect } from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, getAllBlogs);
router.post("/createBlog", protect, createBlog);
router
  .route("/:blogId")
  .get(protect, getBlog)
  .patch(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router;
