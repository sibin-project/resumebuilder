import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    console.log("AdminRoute: Checking access...");
    console.log("AdminRoute: Token exists?", !!token);

    if (!token) {
        console.log("AdminRoute: No token, redirecting to auth.");
        return <Navigate to="/auth" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        console.log("AdminRoute: Decoded token:", decoded);

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        console.log("AdminRoute: LocalStorage User:", user);

        if (user.role !== "admin") {
            console.log("AdminRoute: User role is not admin. Role:", user.role);
            // Check if token has role, maybe localStorage is stale
            if (decoded.role === "admin") {
                console.log("AdminRoute: Token has admin role but localStorage doesn't. Trusting token.");
                // Optionally update localStorage here if you want
            } else {
                console.log("AdminRoute: Neither token nor localStorage has admin role. Redirecting.");
                return <Navigate to="/dashboard" replace />;
            }
        } else {
            console.log("AdminRoute: User is admin. Access granted.");
        }

        return children;
    } catch (error) {
        console.error("AdminRoute: Error decoding token:", error);
        localStorage.removeItem("token");
        return <Navigate to="/auth" replace />;
    }
};

export default AdminRoute;
