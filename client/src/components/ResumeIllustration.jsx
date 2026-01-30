import React from "react";
import { motion } from "framer-motion";

const ResumeIllustration = () => {
    const paperVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const lineVariants = {
        hidden: { width: 0 },
        visible: (i) => ({
            width: "100%",
            transition: { delay: 0.5 + i * 0.1, duration: 0.5, ease: "easeInOut" }
        })
    };

    const scanVariants = {
        animate: {
            top: ["0%", "100%", "0%"],
            opacity: [0, 1, 0],
            transition: {
                duration: 3,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 1
            }
        }
    };

    const floatingBadgeVariants = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity
            }
        }
    };

    return (
        <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />

            {/* Resume Paper */}
            <motion.div
                variants={paperVariants}
                initial="hidden"
                animate="visible"
                className="relative w-[300px] md:w-[380px] h-[420px] md:h-[500px] bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 z-10"
            >
                {/* Header */}
                <div className="h-24 bg-slate-50 border-b border-slate-100 p-6 flex gap-4 items-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 }}
                        className="w-16 h-16 rounded-full bg-slate-200"
                    />
                    <div className="flex-1 space-y-2">
                        <motion.div
                            custom={0}
                            variants={lineVariants}
                            initial="hidden"
                            animate="visible"
                            className="h-4 bg-slate-800 rounded w-3/4"
                        />
                        <motion.div
                            custom={1}
                            variants={lineVariants}
                            initial="hidden"
                            animate="visible"
                            className="h-3 bg-blue-500 rounded w-1/2"
                        />
                    </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-6">
                    {/* Section 1 */}
                    <div className="space-y-3">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="h-3 bg-slate-200 rounded w-1/4 mb-4"
                        />
                        {[2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={lineVariants}
                                initial="hidden"
                                animate="visible"
                                className="h-2 bg-slate-100 rounded"
                            />
                        ))}
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-3">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.6 }}
                            className="h-3 bg-slate-200 rounded w-1/3 mb-4"
                        />
                        {[5, 6, 7, 8].map((i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={lineVariants}
                                initial="hidden"
                                animate="visible"
                                className="h-2 bg-slate-100 rounded"
                            />
                        ))}
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-3">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.0 }}
                            className="h-3 bg-slate-200 rounded w-1/4 mb-4"
                        />
                        {[9, 10].map((i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={lineVariants}
                                initial="hidden"
                                animate="visible"
                                className="h-2 bg-slate-100 rounded"
                            />
                        ))}
                    </div>
                </div>

                {/* Scanning Effect */}
                <motion.div
                    variants={scanVariants}
                    animate="animate"
                    className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20"
                />
            </motion.div>

            {/* Floating Badges */}
            <motion.div
                variants={floatingBadgeVariants}
                animate="animate"
                className="absolute -right-4 top-20 bg-white p-3 rounded-lg shadow-xl border border-green-100 flex items-center gap-2 z-20"
            >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700">ATS Optimized</span>
            </motion.div>

            <motion.div
                variants={floatingBadgeVariants}
                animate="animate"
                transition={{ delay: 1 }}
                className="absolute -left-4 bottom-32 bg-white p-3 rounded-lg shadow-xl border border-purple-100 flex items-center gap-2 z-20"
            >
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700">AI Enhanced</span>
            </motion.div>
        </div>
    );
};

export default ResumeIllustration;
