const postService = require("../services/postService");
const { StatusCodes } = require("http-status-codes");

class PostController {
  async createPost(req, res) {
    console.log(req.user);
    const post = await postService.add(req.body, req.files.image, req.user.id);
    res.status(StatusCodes.CREATED).json({ message: "Add new post", post });
  }

  async getAllPosts(req, res) {
    const { posts, postCounts } = await postService.getAllPost();

    res.status(StatusCodes.OK).json({ postCounts, message: "Success", posts });
  }

  async deleteAPost(req, res) {
    const authorId = req.user.id;
    const post = await postService.deletePost(req.params.postId, authorId);
    res.status(StatusCodes.OK).json({ message: "A post deleted", post });
  }

  async updatePost(req, res) {
    const { body, params } = req;
    const authorId = req.user.id;
    const updatedPost = await postService.updatePost(
      body,
      params.postId,
      authorId
    );
    res.status(StatusCodes.OK).json({ message: "A post updated", updatedPost });
  }

  async getSinglePost(req, res) {
    const singlePost = await postService.singlePost(req.params.postId);
    res.status(StatusCodes.OK).json(singlePost);
  }
}

module.exports = new PostController();
