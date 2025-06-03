// blogManager.js

class BlogManager {
  constructor() {
    this.posts = [];
  }

  // Helper method to validate blog post structure
  validatePost(post) {
    const requiredFields = ['title', 'author', 'content', 'datePublished', 'likes', 'comments', 'tags'];
    for (const field of requiredFields) {
      if (!post.hasOwnProperty(field)) {
        throw new Error(`Missing field: ${field}`);
      }
    }
    if (typeof post.title !== 'string' || post.title.trim() === '') throw new Error("Title must be a non-empty string");
    if (this.posts.find(p => p.title === post.title)) throw new Error("Duplicate title");
  }

  addBlogPost(post) {
    this.validatePost(post);
    this.posts.push(post);
    return "Post added successfully";
  }

  readBlogPost(title) {
    const post = this.posts.find(p => p.title === title);
    return post || "Post not found";
  }

  updateBlogPost(title, updatedDetails) {
    const postIndex = this.posts.findIndex(p => p.title === title);
    if (postIndex === -1) return "Post not found";

    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...updatedDetails
    };
    return "Post updated successfully";
  }

  deleteBlogPost(title) {
    const postIndex = this.posts.findIndex(p => p.title === title);
    if (postIndex === -1) return "Post not found";
    this.posts.splice(postIndex, 1);
    return "Post deleted successfully";
  }
}

module.exports = BlogManager;
