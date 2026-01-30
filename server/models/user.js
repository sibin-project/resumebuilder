import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },

  // 👇 IMPORTANT for Google login
  picture: { type: String, default: null },

  provider: { type: String, default: "google" },

  // for email/password accounts (optional)
  password: { type: String, default: null },

  role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
