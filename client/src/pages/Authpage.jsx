import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, ArrowRight, CheckCircle } from "lucide-react";
import api from "../api/axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const nav = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const res = await api.post("/api/auth/firebase-login", {
        email: user.email,
        name: user.displayName,
        picture: user.photoURL
      });

      if (res.data.success) {
        login(res.data.user, res.data.token);
        nav("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900 p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl grid md:grid-cols-2 glass-card rounded-3xl overflow-hidden shadow-2xl relative z-10"
      >
        {/* Left Section - Branding */}
        <div className="p-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm"></div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold mb-6 text-white"
            >
              {isLogin ? "Welcome Back" : "Join the Revolution"}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {[
                "AI-Powered Resume Generation",
                "ATS Optimization Checker",
                "Premium Templates Library",
                "Real-time Grammar Check"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Section - Auth Form */}
        <div className="p-12 flex flex-col justify-center bg-slate-900/50">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-white mb-2">
                {isLogin ? "Sign In" : "Create Account"}
              </h3>
              <p className="text-gray-400">
                {isLogin ? "Access your dashboard" : "Start building for free"}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-8"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    className="w-6 h-6"
                  />
                  Continue with Google
                </>
              )}
            </motion.button>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-gray-500 bg-[#0f172a]">or</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-4">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors flex items-center justify-center gap-2 mx-auto group"
              >
                {isLogin ? "Create Account" : "Sign In"}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}