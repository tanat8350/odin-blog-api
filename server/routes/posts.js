const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

const verifyToken = require("../middlewares/verifyToken");

router.get("/", postController.getPosts);
router.post("/", verifyToken, postController.postPost);
router.get("/published", postController.getPublishedPosts);
router.get("/:id", postController.getPost);
router.put("/:id", verifyToken, postController.updatePost);
router.delete("/:id", verifyToken, postController.deletePost);
router.get("/:id/comments", commentController.getComments);
router.post("/:id/comments", verifyToken, commentController.postComment);
router.get("/:postid/comments/:commentid", commentController.getComment);
router.put(
  "/:postid/comments/:commentid",
  verifyToken,
  commentController.updateComment,
);
router.delete(
  "/:postid/comments/:commentid",
  verifyToken,
  commentController.deleteComment,
);

module.exports = router;
