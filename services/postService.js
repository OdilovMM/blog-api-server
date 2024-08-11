const Post = require("../models/postModel");
const uploadService = require("./uploadService");

class PostService {
  async add(data, image, author) {
    if (!data || !image) {
      throw new Error("All fields must be filled");
    }
    const filename = uploadService.upload(image);
    const post = await Post.create({ ...data, image: filename, author });
    return post;
  }

  async getAllPost() {
    const posts = await Post.find({}).populate("author");
    const postCounts = await Post.find({}).countDocuments();
    return { posts, postCounts };
  }

  async deletePost(id, authorId) {
    const existPost = await this.singlePost(id);
    if (!existPost) {
      throw new Error("Post is not found related with that ID");
    }

    if (existPost.author.toString() !== authorId.toString()) {
      throw new Error("Only author can delete this post");
    }

    const post = await Post.findByIdAndDelete({ _id: id });
    return post;
  }

  async updatePost(data, id, authorId) {
    const isExist = await this.singlePost(id);
    if (!isExist) {
      throw new Error("Post is not found related with that ID");
    }
    const existPost = await Post.findOne({ _id: id });
    if (!existPost) {
      throw new Error("Post is not found related with that ID");
    }

    if (existPost.author.toString() !== authorId.toString()) {
      throw new Error("Only author can update this post");
    }
    const updatedPost = await Post.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedPost;
  }

  async singlePost(id) {
    const existPost = await Post.findOne({ _id: id });
    if (!existPost) {
      throw new Error("Post is not found related with that ID");
    }
    const singlePost = await Post.findById(id);
    return singlePost;
  }
}

module.exports = new PostService();
