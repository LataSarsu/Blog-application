const express = require("express");
const router = express.Router();
const BlogPost = require("../model/blogPost"); 

// Get all blog posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new blog post
router.post("/posts", async (req, res) => {
  const blogPost = new BlogPost({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });

  try {
    const newPost = await blogPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single blog post by ID
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a blog post
router.put("/posts/:id", async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a blog post
router.delete("/posts/:id", async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted post" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
