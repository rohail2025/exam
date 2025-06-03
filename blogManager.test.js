// blogManager.test.js

const BlogManager = require('./blogManager');

const samplePost = {
  title: "Understanding JavaScript Closures",
  author: { name: "Jane Doe", email: "jane@example.com" },
  content: "A closure is...",
  datePublished: "2024-10-09",
  likes: 120,
  comments: [{ user: "John Doe", message: "Great post!", date: "2024-10-10" }],
  tags: ["JavaScript", "Closures", "Functions"]
};

describe("BlogManager Library", () => {
  let blog;

  beforeEach(() => {
    blog = new BlogManager();
  });

  test("adds a blog post successfully", () => {
    const result = blog.addBlogPost(samplePost);
    expect(result).toBe("Post added successfully");
    expect(blog.posts.length).toBe(1);
  });

  test("throws error on missing required field", () => {
    const invalidPost = { ...samplePost };
    delete invalidPost.title;
    expect(() => blog.addBlogPost(invalidPost)).toThrow("Missing field: title");
  });

  test("throws error on duplicate title", () => {
    blog.addBlogPost(samplePost);
    expect(() => blog.addBlogPost(samplePost)).toThrow("Duplicate title");
  });

  test("reads a blog post successfully", () => {
    blog.addBlogPost(samplePost);
    const post = blog.readBlogPost(samplePost.title);
    expect(post.title).toBe(samplePost.title);
  });

  test("returns 'Post not found' if reading a non-existent post", () => {
    expect(blog.readBlogPost("Non-existent")).toBe("Post not found");
  });

  test("updates an existing post", () => {
    blog.addBlogPost(samplePost);
    const result = blog.updateBlogPost(samplePost.title, { likes: 200 });
    expect(result).toBe("Post updated successfully");
    expect(blog.readBlogPost(samplePost.title).likes).toBe(200);
  });

  test("returns 'Post not found' if updating a non-existent post", () => {
    expect(blog.updateBlogPost("Non-existent", { likes: 50 })).toBe("Post not found");
  });

  test("deletes a blog post successfully", () => {
    blog.addBlogPost(samplePost);
    const result = blog.deleteBlogPost(samplePost.title);
    expect(result).toBe("Post deleted successfully");
    expect(blog.readBlogPost(samplePost.title)).toBe("Post not found");
  });

  test("returns 'Post not found' if deleting a non-existent post", () => {
    expect(blog.deleteBlogPost("Non-existent")).toBe("Post not found");
  });
});
