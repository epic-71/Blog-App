import mongoose from "mongoose";
import Comment from "./commentModel.js";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    description: {
      type: String,
      required: [true, "Message is required!"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Blog must belong to a user"],
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "userName",
  });

  next();
});

// Middleware to delete all comments related to a blog before deleting the blog
blogSchema.pre("findOneAndDelete", async function (next) {
    console.log(this.getFilter())
    const blog = await this.model.findOne(this.getFilter());
  
    if (blog) {
      await Comment.deleteMany({ blog: blog._id });
    }
  
    next();
  });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
