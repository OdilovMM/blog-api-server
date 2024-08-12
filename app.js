require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({}));
app.use(cookieParser({}));
app.use(
  cors({
    credentials: true,
    origin: process.env.API_CLIENT,
  })
);

const postRoutes = require("./routes/postRouter");
const authRoutes = require("./routes/authRouter");

const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

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

// GLobal Errors handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
