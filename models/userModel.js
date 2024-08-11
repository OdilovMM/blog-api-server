const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, provide your name"],
    },
    mobile: {
      type: String,
      required: [true, "Please, provide your mobile"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: validator.isEmail,
        message: "Please, provide valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please, provide your password"],
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
