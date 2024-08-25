import Blog from "../models/blogModel.js";
import AppError from "../utils/appError.js";

export const createBlog = async (req, res, next) => {
  try {
    const { title, description, r } = req.body;
    const newBlog = await Blog.create({
      title,
      description,
      author: req.user._id,
    });

    res.status(201).json({
      status: "success",
      message: "Blog successfully created",
      blog: newBlog,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();

    res.status(200).json({
      status: "success",
      message: "All blogs",
      blogs,
    });
  } catch (err) {
    next(err);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) return next(new AppError("No document found with that ID", 400));

    res.status(200).json({
      status: "success",
      message: "Blog",
      blog,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) return next(new AppError("No document found with that ID", 400));

    if (!blog.author._id.equals(req.user._id)) {
      return next(new AppError("You can only update your own post", 403));
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Blog successfully updated",
      blog: updatedBlog,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) return next(new AppError("No document found with that ID", 400));

    if (!blog.author._id.equals(req.user._id)) {
      return next(new AppError("You can only delete your own post", 403));
    }

    await Blog.findByIdAndDelete(req.params.blogId);

    res.status(200).json({
      status: "success",
      message: "Blog successfully deleted",
      blog: null,
    });
  } catch (err) {
    next(err);
  }
};
