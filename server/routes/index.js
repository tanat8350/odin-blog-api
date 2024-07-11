const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, function (req, res, next) {
  res.json({ msg: "Hello World!", authData: req.authData });
});

module.exports = router;
