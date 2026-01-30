import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    author: { type: String, default: "Admin" },
    category: { type: String, default: "General" },
    tags: [{ type: String }],
    published: { type: Boolean, default: true }
}, { timestamps: true });

// Pre-save hook to generate slug from title
blogSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
    next();
});

export default mongoose.model("Blog", blogSchema);
