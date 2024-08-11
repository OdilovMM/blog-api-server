const Post = require("../models/postModel");
const uploadService = require("./uploadService");

class PostService {
  async add(data, image) {
    const filename = uploadService.upload(image);
    const post = await Post.create({ ...data, image: filename });
    return post;
  }

  async getAllPost() {
    const posts = await Post.find({});
    const postCounts = await Post.find({}).countDocuments();
    return { posts, postCounts };
  }

  async deletePost(id) {
    const isExist = await this.singlePost(id);
    if (!isExist) {
      throw new Error("Post is not exist");
    }

    const post = await Post.findByIdAndDelete({ _id: id });
    return post;
  }

  async updatePost(data, id) {
    const isExist = await this.singlePost(id);
    if (!isExist) {
      throw new Error("Post is not exist");
    }
    const existPost = await Post.findOne({ _id: id });
    if (!existPost) {
      throw new Error("Post ID is not exist");
    }
    const updatedPost = await Post.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedPost;
  }

  async singlePost(id) {
    const existPost = await Post.findOne({ _id: id });
    if (!existPost) {
      throw new Error("Post ID is not exist");
    }
    const singlePost = await Post.findById(id);
    return singlePost;
  }
}

module.exports = new PostService();
