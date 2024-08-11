const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

//Export the model
module.exports = mongoose.model("Post", postSchema);
