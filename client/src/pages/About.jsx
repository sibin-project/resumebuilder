import React from "react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        About Us
                    </h1>
                    <p className="text-xl text-gray-400">
                        Empowering careers through intelligent technology.
                    </p>
                </motion.div>

                <div className="space-y-12 text-gray-300 leading-relaxed text-lg">
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                        <p>
                            At ResumeMint AI, we believe that everyone deserves a career they love. Our mission is to democratize access to professional career tools, using advanced artificial intelligence to help job seekers stand out in a crowded market. We're building the future of career development, one resume at a time.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">The Story</h2>
                        <p>
                            Founded in 2024, ResumeMint started with a simple observation: great candidates were being overlooked because of poor resume formatting. We set out to solve this by combining world-class design with cutting-edge AI. Today, we've helped thousands of professionals land interviews at top companies around the globe.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong className="text-white">Innovation:</strong> We constantly push the boundaries of what's possible with AI.</li>
                            <li><strong className="text-white">Accessibility:</strong> Professional tools should be available to everyone.</li>
                            <li><strong className="text-white">Privacy:</strong> Your career data is personal, and we treat it with the highest security.</li>
                            <li><strong className="text-white">Success:</strong> We only succeed when you get hired.</li>
                        </ul>
                    </motion.section>
                </div>
            </div>
        </div>
    );
};

export default About;
