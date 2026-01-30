import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Examples = () => {
    const examples = [
        { role: "Software Engineer", company: "Tech Corp", type: "Modern" },
        { role: "Marketing Manager", company: "Creative Agency", type: "Professional" },
        { role: "Product Designer", company: "Design Studio", type: "Minimal" },
        { role: "Data Scientist", company: "AI Lab", type: "Classic" },
        { role: "Sales Director", company: "Global Sales", type: "Professional" },
        { role: "Project Manager", company: "Build It Inc", type: "Modern" },
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Resume Examples
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        See how others have used ResumeMint to land their dream jobs.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {examples.map((ex, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:bg-slate-800 transition-colors group"
                        >
                            <div className="aspect-[3/4] bg-white rounded-lg mb-6 opacity-90 group-hover:opacity-100 transition-opacity shadow-lg overflow-hidden relative">
                                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-300">
                                    Preview
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-1">{ex.role}</h3>
                            <p className="text-gray-400 text-sm mb-4">{ex.company} • {ex.type} Template</p>
                            <Link
                                to="/builder"
                                className="text-blue-400 font-medium hover:text-blue-300 transition-colors"
                            >
                                Use this example →
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Examples;
