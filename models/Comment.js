import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    author: {
      type: String,
    },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", CommentSchema);
