require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({}));

const postRoutes = require("./routes/postRouter");
const authRoutes = require("./routes/authRouter");

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/auth", authRoutes);

module.exports = app;
