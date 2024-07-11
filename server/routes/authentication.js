const express = require("express");
const router = express.Router();

const authenticationController = require("../controllers/authenticationController");

router.post("/login", authenticationController.postLogin);

router.post("/signup", authenticationController.postSignup);

module.exports = router;
