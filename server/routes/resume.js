import express from "express";
import { requireAuth } from "../middleware/auth.js";
import Resume from "../models/resume.js";

const router = express.Router();

// GET /api/resume/my-resumes
router.get("/my-resumes", requireAuth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    return res.json({ success: true, resumes });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/resume/:id
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.id });
    if (!resume) return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, resume });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST /api/resume/create
router.post("/create", requireAuth, async (req, res) => {
  try {
    const data = { ...req.body, userId: req.user.id };
    const resume = await Resume.create(data);
    return res.json({ success: true, resume });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT /api/resume/update/:id
router.put("/update/:id", requireAuth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!resume) return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, resume });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE /api/resume/delete/:id
router.delete("/delete/:id", requireAuth, async (req, res) => {
  try {
    const d = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!d) return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
