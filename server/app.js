const express = require("express");
const compression = require("compression");
const helmet = require("helmet");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

require("dotenv").config();
const mongoDb = process.env.MONGODB_URI;

mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 60000, // 1 min
  max: 20,
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require("cors");
app.use(cors());

app.use(helmet());
app.use(compression());

const indexRouter = require("./routes/index");
const authenticationRouter = require("./routes/authentication");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
app.use("/", indexRouter);
app.use("/", authenticationRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);

const errorController = require("./controllers/errorController");
app.use(errorController);

app.listen(3000);

module.exports = app;
