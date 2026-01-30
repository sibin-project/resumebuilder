import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const adminMiddleware = async (req, res, next) => {
    try {
        // 1. Check for token
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Find user and check role
        const user = await User.findById(decoded.id);
        if (!user || user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied. Admin only." });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Admin middleware error:", err);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
