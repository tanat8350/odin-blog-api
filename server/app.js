const express = require("express");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

require("dotenv").config();
const mongoDb = process.env.MONGODB_URI;

mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require("cors");
app.use(cors());

const indexRouter = require("./routes/index");
const authenticationRouter = require("./routes/authentication");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
app.use("/", indexRouter);
app.use("/", authenticationRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);

// app.use((err, req, res, next) => {
//   res.status(err.status || 500).json({ error: err });
// });

// next(err) // any input, express will assume it = error (even normal string)

// without any error handling for unspecified routes, at least for react, if router does not exist
// return 404 not found

const errorController = require("./controllers/errorController");
app.use(errorController);

app.listen(3000);

module.exports = app;
