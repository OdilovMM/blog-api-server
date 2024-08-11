require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");


app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({}));

const postRouter = require("./routes/postRouter");

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/post", postRouter);

module.exports = app;
