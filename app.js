import express from "express";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";
import { Blog } from "./models/Blog.js";
import { Comment } from "./models/Comment.js";

const app = express();
app.use(express.json());

const asyncHandler = (handler) => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      switch (e.name) {
        case "ValidationError":
          res.status(400).send({ message: e.message });
          break;
        case "CastError":
          res.status(404).send({ message: e.message });
          break;
        default:
          res.status(500).send({ message: e.message });
          break;
      }
      console.log(e.name);
      console.log(e.message);
    }
  };
};

app.get(
  "/blogs",
  asyncHandler(async (req, res) => {
    const count = req.query.count || 0;

    const blogs = await Blog.find().limit(count);

    res.send(blogs);
  })
);

app.post(
  "/blogs",
  asyncHandler(async (req, res) => {
    const blog = await Blog.create(req.body);

    res.status(201).send(blog);
  })
);

mongoose.connect(DATABASE_URL).then(() => console.log("Mongoose Connected!"));

app.listen(3001, () => {
  console.log("server started!");
});
