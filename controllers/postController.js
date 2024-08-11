const postService = require("../services/postService");

class PostController {
  async createPost(req, res) {
    try {
      const {} = req.body;
      const post = await postService.add(req.body);
      res.status(201).json({ message: "Add new post", post });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllPosts(req, res) {
    try {
      const { posts, postCounts } = await postService.getAllPost();
      res.status(201).json({ postCounts, message: "Success", posts });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteAPost(req, res) {
    try {
      const post = await postService.deletePost(req.params.postId);
      res.status(200).json({ message: "A post deleted", post });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async updatePost(req, res) {
    try {
      const { body, params } = req;
      const updatedPost = await postService.updatePost(body, params.postId);
      console.log(updatedPost);
      res.status(200).json({ message: "A post updated", updatedPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  async getSinglePost(req, res) {
    try {
      const singlePost = await postService.singlePost(req.params.postId);
      res.status(200).json(singlePost);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

module.exports = new PostController();
