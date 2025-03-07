import express from "express";
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";
import { Blog } from "./models/Blog.js";
import { Comment } from "./models/Comment.js";

const app = express();
app.use(express.json());

mongoose.connect(DATABASE_URL).then(() => console.log("Mongoose Connected!"));

app.listen(3001, () => {
  console.log("server started!");
});
