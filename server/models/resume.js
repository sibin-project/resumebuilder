import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Metadata
  title: { type: String, default: "My Resume" },
  templateId: { type: String, default: "modern" }, // modern, professional, creative, etc.

  // Visual Customization
  design: {
    accentColor: { type: String, default: "#2563EB" },
    font: { type: String, default: "Inter" },
    layout: { type: String, default: "comfortable" }, // 'compact', 'comfortable'
    sidebarTextColor: { type: String, default: "#ffffff" },
    mainTextColor: { type: String, default: "#1e293b" }
  },

  // STEP 2: Personal Details
  personalDetails: {
    fullName: { type: String, default: "" },
    jobTitle: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    website: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    photoUrl: { type: String, default: "" }
  },

  // STEP 3: Summary
  summary: {
    content: { type: String, default: "" },
    isAiGenerated: { type: Boolean, default: false }
  },

  // STEP 4: Experience
  experience: [{
    id: { type: String }, // For drag-and-drop key
    role: String,
    company: String,
    startDate: String,
    endDate: String,
    isCurrent: Boolean,
    location: String,
    description: String, // Rich text or bullet points
    enabled: { type: Boolean, default: true }
  }],

  // STEP 5: Education
  education: [{
    id: { type: String },
    degree: String,
    institution: String,
    startDate: String,
    endDate: String,
    description: String,
    enabled: { type: Boolean, default: true }
  }],

  // STEP 6: Skills (Categorized)
  skills: [{
    id: { type: String },
    name: String, // e.g. "Frontend", "Languages"
    items: [String], // ["React", "Vue", "Angular"]
    enabled: { type: Boolean, default: true }
  }],

  // STEP 7: Projects
  projects: [{
    id: { type: String },
    title: String,
    description: String,
    technologies: [String],
    link: String,
    enabled: { type: Boolean, default: true }
  }],

  // Certifications (Optional)
  certifications: [{
    id: { type: String },
    name: String,
    issuer: String,
    date: String,
    link: String,
    enabled: { type: Boolean, default: true }
  }],

  // ATS Optimization
  atsScore: { type: Number, default: 0 },

  // Progress Tracking
  completionPercentage: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: false }, // For sharing link

}, { timestamps: true });

export default mongoose.model("Resume", ResumeSchema);
