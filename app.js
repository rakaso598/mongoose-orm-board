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
          res.status(400).send({ message: "잘못된 형식의 데이터입니다." });
          break;
        case "CastError":
          res.status(404).send({ message: "해당 데이터가 존재하지 않습니다." });
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

app.get(
  "/blogs/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).send({ message: "Cannot find given id" });
    }

    res.send(blog);
  })
);

app.post(
  "/blogs",
  asyncHandler(async (req, res) => {
    const blog = await Blog.create(req.body);

    res.status(201).send(blog);
  })
);

app.delete(
  "/blogs/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      res.status(404).send({ message: "cannot find given id" });
      return;
    }

    res.sendStatus(204);
  })
);

app.patch(
  "/blogs/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).setDefaultEncoding({ message: "cannot find given id" });
      return;
    }

    Object.keys(req.body).forEach((key) => {
      blog[key] = req.body[key];
    });

    await blog.save();

    res.send(blog);
  })
);

app.get(
  "/comments/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const comment = await Comment.findById(id);

    if (!comment) {
      res.status(404).send({ message: "Cannot find given id" });
    }

    res.send(comment);
  })
);

app.post(
  "/comments",
  asyncHandler(async (req, res) => {
    const comment = await Comment.create(req.body);

    res.status(201).send(comment);
  })
);

app.delete(
  "/comments/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      res.status(404).send({ message: "cannot find given id" });
      return;
    }

    res.sendStatus(204);
  })
);

app.patch(
  "/comments/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const comment = await Comment.findById(id);
    if (!comment) {
      res.status(404).setDefaultEncoding({ message: "cannot find given id" });
      return;
    }

    Object.keys(req.body).forEach((key) => {
      comment[key] = req.body[key];
    });

    await comment.save();

    res.send(comment);
  })
);

mongoose.connect(DATABASE_URL).then(() => console.log("Mongoose Connected!"));

app.listen(3001, () => {
  console.log("server started!");
});
