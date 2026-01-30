import React from "react";
import { motion } from "framer-motion";
import { Brain, Shield, Zap, Layout, Download, Sparkles, CheckCircle, Smartphone } from "lucide-react";

const Features = () => {
    const features = [
        {
            icon: Brain,
            title: "AI-Powered Writing",
            description: "Generate professional summaries and experience descriptions instantly with our advanced AI models."
        },
        {
            icon: Shield,
            title: "ATS Optimization",
            description: "Built-in ATS checker ensures your resume passes automated screening systems used by top companies."
        },
        {
            icon: Layout,
            title: "Smart Formatting",
            description: "Automatically format your resume with one click. No more messing with margins and spacing."
        },
        {
            icon: Download,
            title: "PDF Export",
            description: "Download your resume in high-quality PDF format, ready for applications."
        },
        {
            icon: Sparkles,
            title: "Premium Templates",
            description: "Choose from a collection of professionally designed templates that stand out."
        },
        {
            icon: Zap,
            title: "Real-time Suggestions",
            description: "Get instant feedback on your resume content as you type."
        },
        {
            icon: CheckCircle,
            title: "Grammar Check",
            description: "Automatic grammar and spell checking to ensure error-free applications."
        },
        {
            icon: Smartphone,
            title: "Mobile Friendly",
            description: "Edit and view your resume on any device, anywhere, anytime."
        }
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
                        Powerful Features
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Everything you need to build a job-winning resume in minutes.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl hover:bg-slate-800 transition-colors"
                        >
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
