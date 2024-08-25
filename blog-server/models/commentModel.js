import mongoose from "mongoose";

const commentModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment must belong to a user"],
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: [true, "Comment must belong to a blog"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required!"],
    },
  },
  {
    timestamps: true,
  }
);

commentModel.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "userName",
  });

  next();
});

const Comment = mongoose.model("Comment", commentModel);
export default Comment;
