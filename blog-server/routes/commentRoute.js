import express from "express";
import { protect } from "../controllers/userController.js";
import {
  createComment,
  deleteComment,
  getAllComment,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", protect, createComment);
router.get("/:blogId", protect, getAllComment);
router
  .route("/:commentId")
  .patch(protect, updateComment)
  .delete(protect, deleteComment);

export default router;
