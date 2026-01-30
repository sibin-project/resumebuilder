import React, { useState } from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import { User, Briefcase, GraduationCap, Award, FolderKanban, FileText, CheckCircle, Eye, Download, ArrowLeft, Menu, X, Loader2 } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';
import LivePreview from '../components/builder/LivePreview';
import BuilderNavigation from '../components/builder/BuilderNavigation';
import { usePdfExport } from '../hooks/usePdfExport';
import { AnimatePresence, motion } from 'framer-motion';

const steps = [
    { id: 'templates', label: 'Template', icon: FileText, path: 'templates' },
    { id: 'personal', label: 'Personal', icon: User, path: 'personal' },
    { id: 'summary', label: 'Summary', icon: FileText, path: 'summary' },
    { id: 'experience', label: 'Experience', icon: Briefcase, path: 'experience' },
    { id: 'education', label: 'Education', icon: GraduationCap, path: 'education' },
    { id: 'skills', label: 'Skills', icon: Award, path: 'skills' },
    { id: 'projects', label: 'Projects', icon: FolderKanban, path: 'projects' },
    { id: 'finish', label: 'Review', icon: CheckCircle, path: 'finish' },
];

export default function BuilderLayout() {
    const { resumeData } = useResumeStore();
    const { id } = useParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showMobilePreview, setShowMobilePreview] = useState(false);

    const { exportToPdf, isExporting, printRef } = usePdfExport();

    const handleExport = () => {
        exportToPdf(resumeData.personalDetails.fullName || "My_Resume");
    };

    return (
        <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">

            {/* HIDDEN PRINT CONTAINER */}
            <div className="absolute left-[-9999px] top-0 pointer-events-none">
                <div ref={printRef}>
                    <LivePreview printMode={true} />
                </div>
            </div>

            {/* MOBILE OVERLAY FOR SIDEBAR */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                            className="fixed  left-0 top-0 bottom-0 w-72 bg-slate-950 z-50 border-r border-slate-800 p-4 flex flex-col lg:hidden"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-lg">Menu</span>
                                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-800 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>
                            <nav className="space-y-1 flex-1 overflow-y-auto">
                                {steps.map((step) => (
                                    <NavLink
                                        key={step.id}
                                        to={step.path}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900'
                                            }`
                                        }
                                    >
                                        <step.icon size={18} />
                                        {step.label}
                                    </NavLink>
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* DESKTOP SIDEBAR */}
            <aside className="w-64 border-r border-slate-800 hidden lg:flex flex-col bg-slate-950">
                <div className="h-14 flex items-center px-4 border-b border-slate-800">
                    <NavLink to="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft size={16} />
                        <span className="font-semibold text-sm">Dashboard</span>
                    </NavLink>
                </div>
                <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
                    {steps.map((step, index) => {
                        const currentIndex = steps.findIndex(s => window.location.pathname.endsWith(s.path));
                        const isCompleted = index < currentIndex;
                        return (
                            <NavLink
                                key={step.id}
                                to={step.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30 scale-[1.02]'
                                        : isCompleted
                                            ? 'text-green-400 hover:bg-slate-900'
                                            : 'text-slate-500 hover:bg-slate-900 hover:text-slate-400'
                                    }`
                                }
                            >
                                {isCompleted ? <CheckCircle size={16} className="text-green-500" /> : <step.icon size={16} />}
                                {step.label}
                                {isCompleted && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-green-500"></div>}
                            </NavLink>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-semibold">Progress</div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400 font-medium">Step {steps.findIndex(s => window.location.pathname.endsWith(s.path)) + 1 || 1} of {steps.length}</span>
                            <span className="text-slate-600">{Math.round(((steps.findIndex(s => window.location.pathname.endsWith(s.path)) + 1) / steps.length) * 100)}%</span>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-1.5">
                            <div
                                className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${((steps.findIndex(s => window.location.pathname.endsWith(s.path)) + 1) / steps.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col relative min-w-0">
                <header className="h-14 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 bg-slate-900/50 backdrop-blur z-10 sticky top-0">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white">
                            <Menu size={20} />
                        </button>
                        <h1 className="font-medium text-slate-200 truncate">
                            {steps.find(s => window.location.pathname.endsWith(s.path))?.label || 'Editor'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowMobilePreview(!showMobilePreview)}
                            className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-blue-400 rounded-full text-xs font-medium border border-slate-700"
                        >
                            <Eye size={14} />
                            {showMobilePreview ? 'Close' : 'Preview'}
                        </button>

                        <button
                            onClick={handleExport}
                            disabled={isExporting}
                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-medium transition-colors disabled:opacity-50 lg:hidden"
                        >
                            {isExporting ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                            <span className="hidden sm:inline">Export</span>
                        </button>

                        <span className="hidden lg:inline text-xs text-slate-500">Autosaved</span>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    <div className="max-w-2xl mx-auto pb-20">
                        <Outlet />
                        <BuilderNavigation />
                    </div>
                </div>
            </main>

            {/* PREMIUM PREVIEW PANEL */}
            <aside className="w-[400px] xl:w-[45%] border-l border-slate-800/50 bg-slate-950 backdrop-blur-xl hidden lg:flex flex-col flex-shrink-0 relative overflow-hidden">
                {/* Animated Background Gradients */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl"></div>
                </div>

                {/* Premium Header */}
                <div className="h-14 flex items-center justify-between px-4 border-b border-slate-800/50 bg-slate-950/95 backdrop-blur-md relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                            <div className="relative">
                                <Eye size={12} className="text-blue-400" />
                                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-xs font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">LIVE PREVIEW</span>
                        </div>
                    </div>
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-70"
                    >
                        {isExporting ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                        Export PDF
                    </button>
                </div>

                {/* Premium Preview Container */}
                <div className="flex-1 overflow-y-auto relative flex items-start justify-center p-2">
                    {/* Decorative Corner Elements */}
                    <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-blue-500/20 rounded-tl-xl"></div>
                    <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-purple-500/20 rounded-tr-xl"></div>
                    <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-purple-500/20 rounded-bl-xl"></div>
                    <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-blue-500/20 rounded-br-xl"></div>

                    {/* Enhanced Resume Preview */}
                    <div className="relative w-full h-auto flex flex-col items-center py-2">
                        {/* Glow Behind Resume */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[200mm] h-[280mm] bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 blur-2xl"></div>
                        </div>

                        {/* The Resume with Margins */}
                        <div className="relative transition-all duration-500 hover:scale-[1.01] m-2">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl opacity-50"></div>
                            <LivePreview scale={0.55} key={resumeData.templateId} />
                        </div>
                    </div>
                </div>
            </aside>

            {/* MOBILE PREVIEW MODAL */}
            <AnimatePresence>
                {showMobilePreview && (
                    <motion.div
                        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                        className="fixed inset-0 z-50 bg-slate-900 flex flex-col lg:hidden"
                    >
                        <div className="h-14 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950">
                            <h3 className="font-semibold text-white">Preview</h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleExport}
                                    className="p-2 bg-blue-600 rounded-full text-white"
                                    disabled={isExporting}
                                >
                                    {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                </button>
                                <button onClick={() => setShowMobilePreview(false)} className="p-2 bg-slate-800 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 bg-slate-900 flex justify-center">
                            <div className="w-full max-w-[210mm] scale-[0.6] origin-top-center transform-gpu">
                                <LivePreview />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
