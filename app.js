import express from "express";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";
import { Blog } from "./models/Blog.js";
import { Comment } from "./models/Comment.js";

app.listen(3001, () => {
  console.log("server started!");
});
