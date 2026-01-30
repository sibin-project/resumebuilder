import express from "express";
import Contact from "../models/contact.js";
import Blog from "../models/blog.js";
import Template from "../models/template.js";

const router = express.Router();

// Submit Contact Form
router.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        await Contact.create({ name, email, message });
        res.json({ success: true, message: "Message sent successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Blog Posts (Public)
router.get("/blog", async (req, res) => {
    try {
        const posts = await Blog.find({ published: true }).sort({ createdAt: -1 });
        res.json({ success: true, posts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Single Blog Post
router.get("/blog/:id", async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post) return res.status(404).json({ success: false, message: "Post not found" });
        res.json({ success: true, post });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Templates (Public - only active ones)
router.get("/templates", async (req, res) => {
    try {
        const templates = await Template.find({ isActive: true }).sort({ createdAt: -1 });
        res.json({ success: true, templates });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Single Template
router.get("/templates/:id", async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);
        if (!template) return res.status(404).json({ success: false, message: "Template not found" });
        res.json({ success: true, template });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
