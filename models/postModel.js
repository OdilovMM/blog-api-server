const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post must have a title"],
    },
    body: {
      type: String,
      required: [true, "Post must have a body"],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Post", postSchema);
