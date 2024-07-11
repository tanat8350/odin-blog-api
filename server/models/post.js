const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, minLength: 1, required: true },
  content: { type: String, minLength: 1, required: true },
  timestamp: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Post", PostSchema);
