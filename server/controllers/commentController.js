const { body, validationResult } = require("express-validator");

const Comment = require("../models/comment");
const asyncErrorHandler = require("../utlis/asyncErrorHandler");

exports.getComments = asyncErrorHandler(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.id })
    .sort({ timestamp: -1 })
    .populate("author")
    .exec();
  res.json(comments);
});

const validateComment = body("content")
  .trim()
  .isLength({ min: 1 })
  .withMessage("Comment is required")
  .escape();

exports.postComment = [
  validateComment,
  asyncErrorHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const comment = new Comment({
      content: req.body.content,
      author: req.body.author,
      post: req.params.id,
    });

    const result = await comment.save();
    if (!result) {
      return res.sendStatus(400);
    }

    res.sendStatus(200);
  }),
];

exports.getComment = asyncErrorHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentid).exec();

  if (!comment) {
    return res.sendStatus(400);
  }

  res.status(200).json(comment);
});

exports.updateComment = [
  validateComment,
  asyncErrorHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const comment = new Comment({
      content: req.body.content,
      author: req.body.author,
      post: req.params.postid,
      _id: req.params.commentid,
    });

    const result = await Comment.findByIdAndUpdate(
      req.params.commentid,
      comment,
    );
    if (!result) {
      return res.sendStatus(400);
    }

    res.sendStatus(200);
  }),
];

exports.deleteComment = asyncErrorHandler(async (req, res, next) => {
  const result = await Comment.findByIdAndDelete(req.params.commentid);
  if (!result) {
    return res.sendStatus(400);
  }

  res.sendStatus(200);
});
