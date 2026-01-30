import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import aiRoutes from "./routes/ai.js";
import path from "path";
import resumeRoutes from './routes/resume.js'
import adminRoutes from "./routes/admin.js";
import publicRoutes from "./routes/public.js";

dotenv.config();
connectDB();

const app = express();

// CORS - allow frontend origin from env
const allowed = process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : ["http://localhost:5173"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowed.includes(origin) || origin.includes("localhost")) callback(null, true);
    else callback(new Error("CORS not allowed by server"), false);
  },
  credentials: true
}));

app.use(express.json({ limit: "50mb" })); // Increased limit for blog images

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use('/api/resume', resumeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Server active");
});
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: Date.now() });
});
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Admin routes loaded.");
});
