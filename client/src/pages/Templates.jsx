import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Crown, Sparkles } from "lucide-react";

import api_url from "../config";

const Templates = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const res = await fetch(`${api_url}/api/public/templates`);
            const data = await res.json();
            if (data.success) {
                setTemplates(data.templates);
            }
        } catch (err) {
            console.error("Failed to fetch templates", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectTemplate = (template) => {
        // Store selected template in localStorage for ResumeBuilder
        localStorage.setItem("selectedTemplate", JSON.stringify(template));
        navigate("/builder");
    };

    // Color mapping for categories
    const categoryColors = {
        Professional: "from-blue-500 to-blue-600",
        Modern: "from-purple-500 to-purple-600",
        Creative: "from-pink-500 to-pink-600",
        Minimal: "from-gray-500 to-gray-600"
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Professional Templates
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        Choose from our collection of ATS-friendly templates designed to get you hired.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                        <p className="mt-4 text-slate-400">Loading templates...</p>
                    </div>
                ) : templates.length === 0 ? (
                    <div className="text-center py-20">
                        <Sparkles size={64} className="mx-auto mb-4 text-slate-600" />
                        <h3 className="text-2xl font-bold text-white mb-2">No templates available</h3>
                        <p className="text-slate-400">Check back soon for new templates!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {templates.map((template, idx) => (
                            <motion.div
                                key={template._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
                            >
                                {/* Template Preview */}
                                {template.thumbnail ? (
                                    <div className="aspect-[3/4] overflow-hidden bg-slate-700">
                                        <img
                                            src={template.thumbnail}
                                            alt={template.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ) : (
                                    <div className={`aspect-[3/4] bg-gradient-to-br ${categoryColors[template.category] || 'from-blue-500 to-purple-500'} opacity-30 group-hover:opacity-40 transition-opacity flex items-center justify-center`}>
                                        <div className="w-3/4 h-3/4 bg-white/90 shadow-2xl rounded-lg transform group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                )}

                                {/* Premium Badge */}
                                {template.isPremium && (
                                    <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-lg">
                                        <Crown size={14} />
                                        PRO
                                    </div>
                                )}

                                {/* Template Info */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-bold text-white">{template.name}</h3>
                                        <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">
                                            {template.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                        {template.description}
                                    </p>

                                    {/* Color Preview */}
                                    <div className="flex gap-2 mb-4">
                                        <div
                                            className="w-6 h-6 rounded-full border-2 border-slate-600"
                                            style={{ backgroundColor: template.structure.colors.primary }}
                                            title="Primary Color"
                                        />
                                        <div
                                            className="w-6 h-6 rounded-full border-2 border-slate-600"
                                            style={{ backgroundColor: template.structure.colors.secondary }}
                                            title="Secondary Color"
                                        />
                                        <div
                                            className="w-6 h-6 rounded-full border-2 border-slate-600"
                                            style={{ backgroundColor: template.structure.colors.accent }}
                                            title="Accent Color"
                                        />
                                    </div>

                                    <button
                                        onClick={() => handleSelectTemplate(template)}
                                        className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                                    >
                                        Use Template
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Templates;
