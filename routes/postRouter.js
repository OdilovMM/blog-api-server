const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticated = require("../middlewares/authenticated");


// Endpoint

router.post("/create-post",authenticated, postController.createPost);
router.get("/get-all-posts", postController.getAllPosts);
router.delete("/delete-post/:postId",authenticated, postController.deleteAPost);
router.patch("/update-post/:postId",authenticated, postController.updatePost);
router.get("/get-single-post/:postId", postController.getSinglePost);

module.exports = router;
