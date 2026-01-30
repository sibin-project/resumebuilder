import mongoose from "mongoose";
import dotenv from "dotenv";
import Template from "../models/template.js";
import path from "path";
import { fileURLToPath } from "url";

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const mockTemplates = [
    // 🔹 ATS Templates (Critical for job applications)
    {
        name: "ATS Optimized Pro",
        description: "Designed specifically for Applicant Tracking Systems. Clean, single-column layout with standard section headings that all ATS can parse accurately.",
        category: "ATS",
        thumbnail: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=500&h=700&fit=crop",
        isPremium: false,
        structure: {
            layout: "ats-single-column",
            colors: {
                primary: "#000000",
                secondary: "#333333",
                accent: "#000000"
            },
            fonts: {
                heading: "Arial",
                body: "Times New Roman"
            },
            spacing: "standard",
            isATSoptimized: true,
            features: [
                "No tables or columns",
                "Standard section headers",
                "Keyword optimized structure",
                "Clean text parsing",
                "No graphics or icons"
            ]
        },
        isActive: true
    },
    {
        name: "Professional Blue ATS",
        description: "Professional ATS-friendly layout with blue accents and project link support. Modeled after top engineering resumes.",
        category: "ATS",
        thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&h=700&fit=crop",
        isPremium: false,
        structure: {
            layout: "ats-professional-blue",
            colors: {
                primary: "#0e7490", // Cyan-700/Blue-ish
                secondary: "#155e75",
                accent: "#0891b2"
            },
            fonts: {
                heading: "Calibri",
                body: "Calibri"
            },
            spacing: "compact",
            isATSoptimized: true,
            features: [
                "Blue section headers",
                "Compact professional layout",
                "ATS optimized",
                "Clean hierarchy"
            ]
        },
        isActive: true
    },

    // 🔹 Modern Templates
    {
        name: "Neo-Tech Modern",
        description: "Futuristic design with geometric accents. Features a sidebar layout with skill progress bars and modern typography.",
        category: "Modern",
        thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=700&fit=crop",
        isPremium: false,
        structure: {
            layout: "modern",
            colors: {
                primary: "#3B82F6",
                secondary: "#1E40AF",
                accent: "#10B981"
            },
            fonts: {
                heading: "Poppins",
                body: "Inter"
            },
            spacing: "comfortable",
            features: [
                "Progress bar skills",
                "Sidebar layout",
                "Geometric shapes",
                "Social icons integration",
                "Timeline experience"
            ]
        },
        isActive: true
    }
];

const seedTemplates = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");

        // Clear existing templates
        await Template.deleteMany({});
        console.log("🗑️  Cleared existing templates");

        // Insert mock templates
        const createdTemplates = await Template.insertMany(mockTemplates);
        console.log(`✅ Successfully created ${createdTemplates.length} templates!`);

        console.log("\n🎯 ATS-Friendly Templates (Critical for job applications):");
        const atsTemplates = createdTemplates.filter(t => t.structure.isATSoptimized);
        atsTemplates.forEach((template, idx) => {
            console.log(`   📄 ${template.name} - ${template.description.substring(0, 80)}...`);
        });

        console.log("\n✨ All Created Templates:");
        createdTemplates.forEach((template, idx) => {
            const premiumBadge = template.isPremium ? "⭐ PRO" : "🆓 FREE";
            const atsBadge = template.structure.isATSoptimized ? "📋 ATS" : "";
            console.log(`   ${idx + 1}. ${template.name} (${template.category}) ${premiumBadge} ${atsBadge}`);
        });

        console.log("\n💡 Tips:");
        console.log("   • ATS templates are ESSENTIAL for job applications");
        console.log("   • Creative templates are best for portfolios/networking");
        console.log("   • Always test with ATS when applying for jobs");

        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding templates:", err);
        process.exit(1);
    }
};

seedTemplates();