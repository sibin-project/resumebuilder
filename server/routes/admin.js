import express from "express";
import User from "../models/user.js";
import Contact from "../models/contact.js";
import Blog from "../models/blog.js";
import Template from "../models/template.js";
import Resume from "../models/resume.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = express.Router();

// Protect all routes with admin middleware
router.use(adminMiddleware);

// --- DASHBOARD STATS ---
router.get("/stats", async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const contactCount = await Contact.countDocuments();
        const blogCount = await Blog.countDocuments();
        const templateCount = await Template.countDocuments();

        const atsStats = await Resume.aggregate([
            { $group: { _id: null, avgScore: { $avg: "$atsScore" } } }
        ]);
        const avgAtsScore = atsStats[0]?.avgScore || 0;

        res.json({
            success: true,
            stats: {
                users: userCount,
                contacts: contactCount,
                blogs: blogCount,
                templates: templateCount,
                avgAtsScore: Math.round(avgAtsScore)
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- USER MANAGEMENT ---
router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "User deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- CONTACT MANAGEMENT ---
router.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, contacts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.delete("/contacts/:id", async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Message deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- BLOG MANAGEMENT ---
router.post("/blog", async (req, res) => {
    try {
        const post = await Blog.create(req.body);
        res.json({ success: true, post });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.put("/blog/:id", async (req, res) => {
    try {
        const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, post });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.delete("/blog/:id", async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// --- TEMPLATE MANAGEMENT ---
router.get("/templates", async (req, res) => {
    try {
        const templates = await Template.find().sort({ createdAt: -1 });
        res.json({ success: true, templates });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post("/templates", async (req, res) => {
    try {
        const template = await Template.create(req.body);
        res.json({ success: true, template });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.put("/templates/:id", async (req, res) => {
    try {
        const template = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, template });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.delete("/templates/:id", async (req, res) => {
    try {
        await Template.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Template deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
