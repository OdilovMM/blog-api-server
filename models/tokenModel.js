const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
