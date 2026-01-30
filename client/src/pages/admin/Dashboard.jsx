import React, { useState, useEffect } from "react";
import { Users, MessageSquare, FileText, TrendingUp, Layout } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
    const [stats, setStats] = useState({ users: 0, contacts: 0, blogs: 0, templates: 0, avgAtsScore: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (err) {
            console.error("Failed to fetch stats", err);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: "Total Users", value: stats.users, icon: Users, color: "bg-blue-500" },
        { label: "Messages", value: stats.contacts, icon: MessageSquare, color: "bg-purple-500" },
        { label: "Blog Posts", value: stats.blogs, icon: FileText, color: "bg-green-500" },
        { label: "Templates", value: stats.templates, icon: Layout, color: "bg-orange-500" },
        { label: "Avg ATS Score", value: stats.avgAtsScore || 0, icon: TrendingUp, color: "bg-pink-500" },
    ];

    if (loading) return <div className="text-white text-center py-12">Loading stats...</div>;

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Dashboard Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {statCards.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.color} bg-opacity-20 text-white`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                        </div>
                        <p className="text-slate-400 font-medium text-sm md:text-base">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Placeholder */}
            <div className="mt-8 md:mt-12">
                <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center text-slate-400">
                    Activity feed coming soon...
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
