import Comment from "../models/commentModel.js";
import AppError from "../utils/appError.js";

export const createComment = async (req, res, next) => {
  try {
    const { blog, comment } = req.body;
    const newComment = await Comment.create({
      comment,
      blog,
      user: req.user._id,
    });

    res.status(201).json({
      status: "success",
      message: "Comment successfully created",
      comment: newComment,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      blog: req.params.blogId,
    });

    res.status(200).json({
      status: "success",
      message: "All Comments",
      comments,
    });
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment)
      return next(new AppError("No document found with that ID", 400));

    if (!comment.user._id.equals(req.user._id)) {
      return next(new AppError("You can only update your own comment", 403));
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Comment successfully updated",
      comment: updatedComment,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment)
      return next(new AppError("No document found with that ID", 400));

    if (!comment.user._id.equals(req.user._id)) {
      return next(new AppError("You can only delete your own comment", 403));
    }

    await Comment.findByIdAndDelete(req.params.commentId);

    res.status(200).json({
      status: "success",
      message: "Comment successfully deleted",
      comment: null,
    });
  } catch (err) {
    next(err);
  }
};
