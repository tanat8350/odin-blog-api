const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/:id", userController.getUserPosts);
router.get("/published/:id", userController.getUserPublishedPosts);

module.exports = router;
