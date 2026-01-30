import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";
import path from "path";
import { fileURLToPath } from "url";

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const debugUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");

        const email = "sibinc36@gmail.com";
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`❌ User with email ${email} not found.`);
        } else {
            console.log(`👤 User found: ${user.email}`);
            console.log(`   ID: ${user._id}`);
            console.log(`   Role: ${user.role}`);
            console.log(`   Provider: ${user.provider}`);

            if (user.role !== "admin") {
                console.log("⚠️ Role is NOT admin. Attempting to fix...");
                user.role = "admin";
                const savedUser = await user.save();
                console.log(`✅ Updated role to: ${savedUser.role}`);
            } else {
                console.log("✅ Role is correctly set to admin.");
            }
        }
        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
};

debugUser();
