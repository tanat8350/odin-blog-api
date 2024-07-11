const Post = require("../models/post");
const asyncErrorHandler = require("../utlis/asyncErrorHandler");

exports.getUserPosts = asyncErrorHandler(async (req, res) => {
  const posts = await Post.find({
    author: req.params.id,
  }).exec();
  res.json(posts);
});
