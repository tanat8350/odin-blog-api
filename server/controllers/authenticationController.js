const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passport = require("../configs/passport");
require("dotenv").config();

const User = require("../models/user");

const userValidation = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username is required")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password is required")
    .escape(),
];

exports.postSignup = [
  userValidation,
  body("username").custom(async (value) => {
    const user = await User.findOne({ username: value });
    if (user) {
      return Promise.reject("Username already exists");
      throw new Error("Username already exists");
    }
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = new User({
      username: req.body.username,
    });

    if (req.body.admin_code === process.env.ADMIN_CODE) {
      user.isAdmin = true;
    }

    bcryptjs.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      user.password = hash;
      await user.save();
      res.sendStatus(200);
    });
  },
];

exports.postLogin = [
  userValidation,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    } else {
      passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err) {
          return res.status(500).json({ error: [{ msg: error }] });
        }
        if (!user) {
          return res.status(400).json({ error: [{ msg: info.message }] });
        }
        if (user) {
          jwt.sign({ id: user._id }, process.env.JWT_SECRET, (err, token) => {
            if (err) {
              next(err);
            }
            return res.json({ token, user });
          });
        }
      })(req, res, next);
    }
  },
];
