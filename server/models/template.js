import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "Professional" },
    thumbnail: { type: String }, // URL to preview image
    isPremium: { type: Boolean, default: false },
    structure: {
        layout: { type: String, default: "modern" }, // modern, classic, minimal
        colors: {
            primary: { type: String, default: "#2563eb" },
            secondary: { type: String, default: "#64748b" },
            accent: { type: String, default: "#8b5cf6" }
        },
        fonts: {
            heading: { type: String, default: "Inter" },
            body: { type: String, default: "Inter" }
        },
        spacing: { type: String, default: "comfortable" }, // compact, comfortable, spacious
        sections: [{
            name: { type: String },
            enabled: { type: Boolean, default: true },
            order: { type: Number }
        }]
    },
    html: { type: String }, // Raw HTML for custom templates
    css: { type: String },  // Raw CSS for custom templates
    isActive: { type: Boolean, default: true },
    usageCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Template", templateSchema);
