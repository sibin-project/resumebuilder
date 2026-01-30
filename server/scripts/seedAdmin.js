import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";
import path from "path";
import { fileURLToPath } from "url";

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");

        const email = "sibinc36@gmail.com";
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`❌ User with email ${email} not found.`);
            console.log("Please log in with this email first to create the account.");
            process.exit(1);
        }

        user.role = "admin";
        await user.save();

        console.log(`✅ Successfully promoted ${email} to admin!`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding admin:", err);
        process.exit(1);
    }
};

seedAdmin();
