import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Simple Pricing
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Start for free, upgrade for power.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Free Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl relative"
                    >
                        <h3 className="text-2xl font-bold mb-2">Free</h3>
                        <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                        <p className="text-gray-400 mb-8">Perfect for getting started</p>
                        <ul className="space-y-4 mb-8">
                            {["1 Resume", "Basic Templates", "PDF Export", "Basic AI Suggestions"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <Check size={18} className="text-green-400" /> {item}
                                </li>
                            ))}
                        </ul>
                        <Link to="/auth" className="block w-full py-3 px-6 rounded-xl bg-slate-700 hover:bg-slate-600 text-center font-semibold transition-colors">
                            Get Started
                        </Link>
                    </motion.div>

                    {/* Pro Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-b from-blue-900/20 to-slate-800/50 border border-blue-500/50 p-8 rounded-3xl relative transform md:-translate-y-4"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                            Most Popular
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Pro</h3>
                        <div className="text-4xl font-bold mb-6">$12<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                        <p className="text-gray-400 mb-8">For serious job seekers</p>
                        <ul className="space-y-4 mb-8">
                            {["Unlimited Resumes", "All Premium Templates", "Advanced AI Writing", "ATS Optimization", "Priority Support"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <Check size={18} className="text-blue-400" /> {item}
                                </li>
                            ))}
                        </ul>
                        <Link to="/auth" className="block w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-center font-semibold transition-colors shadow-lg shadow-blue-500/25">
                            Upgrade Now
                        </Link>
                    </motion.div>

                    {/* Enterprise Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl relative"
                    >
                        <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                        <div className="text-4xl font-bold mb-6">Custom</div>
                        <p className="text-gray-400 mb-8">For teams and organizations</p>
                        <ul className="space-y-4 mb-8">
                            {["Team Management", "Custom Branding", "API Access", "Dedicated Account Manager", "SSO Integration"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <Check size={18} className="text-purple-400" /> {item}
                                </li>
                            ))}
                        </ul>
                        <Link to="/contact" className="block w-full py-3 px-6 rounded-xl bg-slate-700 hover:bg-slate-600 text-center font-semibold transition-colors">
                            Contact Sales
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
