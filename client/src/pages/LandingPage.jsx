import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ResumeIllustration from "../components/ResumeIllustration";
import {
  Sparkles,
  Brain,
  Shield,
  Clock,
  ArrowRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { user } = useAuth();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <Navbar />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center z-10 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border border-white/10">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-sm font-medium text-gray-300">AI-Powered Resume Builder V2.0</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Craft Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">Dream Career</span>
              <br /> with Intelligent Design
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-10 leading-relaxed">
              Transform your professional story with AI-driven insights, ATS optimization, and premium templates designed to get you hired.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link to={user ? "/dashboard" : "/auth"}>
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 group">
                  Build Resume Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              variants={fadeInUp}
              className="mt-20 relative w-full max-w-5xl mx-auto"
            >
              <ResumeIllustration />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose <span className="text-blue-400">ResumeMint AI?</span></h2>
            <p className="text-gray-400 text-lg">Everything you need to stand out in today's competitive job market.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="text-purple-400" size={32} />,
                title: "AI Content Generation",
                desc: "Let our advanced AI write professional summaries and enhance your experience bullet points instantly."
              },
              {
                icon: <Shield className="text-blue-400" size={32} />,
                title: "ATS Optimization",
                desc: "Built-in ATS checker ensures your resume passes automated screening systems with high scores."
              },
              {
                icon: <Clock className="text-pink-400" size={32} />,
                title: "Real-time Formatting",
                desc: "Auto-format text, fix grammar, and ensure perfect consistency with a single click."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "98%", label: "Interview Rate" },
              { num: "50K+", label: "Resumes Built" },
              { num: "< 2min", label: "Creation Time" },
              { num: "4.9/5", label: "User Rating" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                  {stat.num}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-8"
          >
            Ready to Land Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Dream Job?</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to={user ? "/dashboard" : "/auth"}>
              <button className="px-10 py-5 rounded-full bg-white text-slate-900 font-bold text-xl hover:scale-105 transition-transform duration-300 shadow-2xl shadow-white/20">
                Create My Resume Free
              </button>
            </Link>
            <p className="mt-6 text-gray-400 text-sm">No credit card required • Free templates included</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;