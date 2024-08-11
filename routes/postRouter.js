const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Endpoint

router.post("/create-post", postController.createPost);
router.get("/get-all-posts", postController.getAllPosts);
router.delete("/delete-post/:postId", postController.deleteAPost);
router.patch("/update-post/:postId", postController.updatePost);
router.get("/get-single-post/:postId", postController.getSinglePost);

module.exports = router;
