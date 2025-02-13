const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");
const asyncErrorHandler = require("../utlis/asyncErrorHandler");

exports.getPosts = asyncErrorHandler(async (req, res) => {
  const posts = await Post.find().populate("author").exec();
  res.json(posts);
});

exports.getPublishedPosts = asyncErrorHandler(async (req, res) => {
  const posts = await Post.find({ isPublished: true })
    .populate("author")
    .exec();
  res.json(posts);
});

const validatePost = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title is required")
    .escape(),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Content is required")
    .escape(),
];

exports.postPost = [
  validatePost,
  asyncErrorHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      isPublished: req.body.isPublished,
      author: req.body.author,
    });

    const result = await post.save();
    if (!result) {
      return res.sendStatus(400);
    }

    res.sendStatus(200);
  }),
];

exports.deletePost = asyncErrorHandler(async (req, res) => {
  const result = await Post.findByIdAndDelete(req.params.id).exec();
  if (!result) {
    return res.sendStatus(400);
  }

  res.sendStatus(200);
});

exports.getPost = asyncErrorHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author").exec();
  if (!post) {
    return res.sendStatus(400);
  }

  res.json(post);
});

exports.updatePost = [
  validatePost,
  asyncErrorHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      timestamp: req.body.timestamp,
      isPublished: req.body.isPublished,
      _id: req.params.id,
    });

    const result = await Post.findByIdAndUpdate(req.params.id, post);
    if (!result) {
      return res.sendStatus(400);
    }

    res.sendStatus(200);
  }),
];
