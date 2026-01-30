import React, { useEffect, useState } from "react";
import { getMyResumes, deleteResume, updateResume } from "../api/resume";
import { analyzeResume } from "../api/ai";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Trash2,
  Edit3,
  Plus,
  FileText,
  Calendar,
  Sparkles,
  Download,
  Zap,
  Star,
  Search,
  Filter
} from "lucide-react";

export default function Dashboard() {
  const nav = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [analyzingId, setAnalyzingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const res = await getMyResumes();
      setResumes(res.data.resumes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    setDeletingId(id);
    try {
      await deleteResume(id);
      await fetchResumes();
    } catch (err) {
      console.error(err);
      alert("Failed to delete resume");
    } finally {
      setDeletingId(null);
    }
  };

  const handleAnalyze = async (resume) => {
    setAnalyzingId(resume._id);
    try {
      const { score } = await analyzeResume(resume);
      await updateResume(resume._id, { atsScore: score });
      await fetchResumes();
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume");
    } finally {
      setAnalyzingId(null);
    }
  };

  const filteredResumes = resumes.filter(r =>
    (r.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAtsScore = resumes.reduce((acc, r) => acc + (r.atsScore || 0), 0);
  const avgAtsScore = resumes.length ? Math.round(totalAtsScore / resumes.length) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900 p-6 pt-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Resumes</h1>
            <p className="text-gray-400">Manage and optimize your professional profiles</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => nav("/builder")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-blue-500/25 transition-all"
          >
            <Plus size={20} />
            Create New Resume
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Resumes", value: resumes.length, icon: FileText, color: "text-blue-400" },
            { label: "AI Optimizations", value: resumes.length * 3, icon: Sparkles, color: "text-purple-400" },
            { label: "ATS Score Avg", value: `${avgAtsScore}%`, icon: Star, color: "text-yellow-400" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Resumes Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredResumes.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-3xl">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={40} className="text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No resumes found</h3>
            <p className="text-gray-400 mb-8">Create your first AI-powered resume to get started</p>
            <button
              onClick={() => nav("/builder")}
              className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
            >
              Create New Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume, idx) => (
              <motion.div
                key={resume._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 rounded-2xl group hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {resume.name?.[0] || "R"}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleAnalyze(resume)}
                      className="p-2 hover:bg-white/10 rounded-lg text-gray-300 hover:text-yellow-400 transition-colors"
                      title="Analyze ATS Score"
                      disabled={analyzingId === resume._id}
                    >
                      {analyzingId === resume._id ? (
                        <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Star size={18} />
                      )}
                    </button>
                    <button
                      onClick={() => nav(`/builder?id=${resume._id}`)}
                      className="p-2 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                      title="Edit Resume"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(resume._id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-gray-300 hover:text-red-400 transition-colors"
                      title="Delete Resume"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{resume.name || "Untitled Resume"}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-10">
                  {resume.summary || "No summary added yet. Use AI to generate a professional summary."}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{new Date(resume.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-blue-400 border border-blue-500/20 flex items-center gap-1">
                    {resume.template || "Modern"}
                    {resume.atsScore > 0 && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-500" />
                        <span className="text-yellow-400 flex items-center gap-0.5">
                          <Star size={10} />
                          {resume.atsScore}%
                        </span>
                      </>
                    )}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}