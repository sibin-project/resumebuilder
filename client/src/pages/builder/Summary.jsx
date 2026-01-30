import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Wand2, Loader2, RotateCcw, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { generateSummary } from '../../api/ai';

export default function Summary() {
    const { resumeData, setResumeData } = useResumeStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSummaryChange = (e) => {
        setResumeData({
            summary: { ...resumeData.summary, content: e.target.value, isAiGenerated: false }
        });
        setError(null); // Clear error when user types
    };

    const handleGenerate = async () => {
        // Check if user has content before asking for AI generation
        if (resumeData.summary?.content && !resumeData.summary?.isAiGenerated) {
            const confirmed = window.confirm(
                "Replace Your Summary?\n\nYou've written a custom summary. AI will replace it.\n\nClick OK to replace with AI, or Cancel to keep yours."
            );
            if (!confirmed) return;
        }

        setLoading(true);
        setError(null);

        try {
            // Check if user is logged in
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Please log in to use AI features');
            }

            const result = await generateSummary(resumeData);
            if (result) {
                setResumeData({
                    summary: { content: result, isAiGenerated: true }
                });
            }
        } catch (error) {
            console.error("AI Summary Failed", error);

            // User-friendly error messages
            if (error.response?.status === 401) {
                setError('Authentication required. Please log in to use AI features.');
            } else if (error.response?.status === 429) {
                setError('Too many requests. Please wait a moment and try again.');
            } else if (error.response?.status === 500) {
                setError('AI service temporarily unavailable. Please try again later.');
            } else if (error.message.includes('Network Error')) {
                setError('Network error. Please check your connection.');
            } else {
                setError(error.message || 'Failed to generate summary. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Calculate word count
    const wordCount = resumeData.summary?.content
        ? resumeData.summary.content.split(/\s+/).filter(Boolean).length
        : 0;

    const isOptimal = wordCount >= 30 && wordCount <= 80;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Professional Summary</h2>
                <p className="text-slate-400 text-sm">
                    Write a compelling summary (30-80 words) that highlights your expertise, experience, and value proposition.
                </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        Summary Text
                        {wordCount > 0 && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isOptimal
                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                    : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                }`}>
                                {wordCount} words {isOptimal ? '✓ Optimal' : wordCount < 30 ? '⚠ Too short' : '⚠ Too long'}
                            </span>
                        )}
                    </label>
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="flex items-center gap-2 text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-3 py-1.5 rounded-full transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                        {loading
                            ? 'Generating...'
                            : resumeData.summary?.content
                                ? 'Rewrite with AI'
                                : 'Write Summary for Me'
                        }
                    </button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                        <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-xs text-red-400 font-medium">{error}</p>
                            {error.includes('log in') && (
                                <button
                                    onClick={() => window.location.href = '/auth'}
                                    className="mt-2 text-xs text-red-300 underline hover:text-red-200"
                                >
                                    Go to Login
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <div className="relative">
                    <textarea
                        rows={6}
                        value={resumeData.summary?.content || ""}
                        onChange={handleSummaryChange}
                        placeholder="e.g. Results-driven Software Engineer with 5+ years of experience in full-stack development. Proven track record of building scalable web applications using React and Node.js. Led cross-functional teams to deliver projects 20% ahead of schedule."
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-lg p-4 text-slate-200 placeholder-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none leading-relaxed"
                    />
                    {resumeData.summary?.isAiGenerated && (
                        <div className="absolute bottom-3 right-3">
                            <span className="flex items-center gap-1 text-[10px] text-purple-400 bg-purple-900/30 px-2 py-1 rounded-full border border-purple-800/50">
                                <Wand2 size={10} /> AI Generated
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-3 flex justify-between items-center">
                    <div className="text-xs text-slate-500">
                        {wordCount > 0 && (
                            <span>
                                {isOptimal
                                    ? '✓ Good length for ATS systems'
                                    : wordCount < 30
                                        ? 'Add more details (aim for 30-80 words)'
                                        : 'Too detailed (aim for 30-80 words)'
                                }
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => setResumeData({ summary: { content: '', isAiGenerated: false } })}
                        className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
                        disabled={!resumeData.summary?.content}
                    >
                        <RotateCcw size={12} /> Clear
                    </button>
                </div>
            </div>

            {/* Quality Hints */}
            {resumeData.summary?.content && (
                <div className="bg-blue-900/10 border border-blue-900/30 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                        <TrendingUp size={14} />
                        Quality Check
                    </h4>
                    <div className="space-y-2 text-xs">
                        {/* Check for numbers/metrics */}
                        <div className="flex items-center gap-2">
                            {resumeData.summary.content.match(/\d+/) ? (
                                <CheckCircle size={12} className="text-green-500" />
                            ) : (
                                <AlertCircle size={12} className="text-yellow-500" />
                            )}
                            <span className={resumeData.summary.content.match(/\d+/) ? 'text-slate-400' : 'text-yellow-400'}>
                                {resumeData.summary.content.match(/\d+/)
                                    ? 'Contains metrics/numbers ✓'
                                    : 'Consider adding years of experience or achievements'
                                }
                            </span>
                        </div>

                        {/* Check for action words */}
                        <div className="flex items-center gap-2">
                            {/led|built|designed|developed|managed|created|improved/i.test(resumeData.summary.content) ? (
                                <CheckCircle size={12} className="text-green-500" />
                            ) : (
                                <AlertCircle size={12} className="text-yellow-500" />
                            )}
                            <span className={/led|built|designed|developed|managed|created|improved/i.test(resumeData.summary.content) ? 'text-slate-400' : 'text-yellow-400'}>
                                {/led|built|designed|developed|managed|created|improved/i.test(resumeData.summary.content)
                                    ? 'Uses strong action verbs ✓'
                                    : 'Use action verbs (Led, Built, Designed, Improved)'
                                }
                            </span>
                        </div>

                        {/* Check word count */}
                        <div className="flex items-center gap-2">
                            {isOptimal ? (
                                <CheckCircle size={12} className="text-green-500" />
                            ) : (
                                <AlertCircle size={12} className="text-yellow-500" />
                            )}
                            <span className={isOptimal ? 'text-slate-400' : 'text-yellow-400'}>
                                {isOptimal
                                    ? 'Perfect length (30-80 words) ✓'
                                    : `Adjust length (current: ${wordCount} words, target: 30-80)`
                                }
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Tips */}
            <div className="bg-blue-900/10 border border-blue-900/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-400 mb-2">💡 Writing Tips</h4>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                    <li>Include your job title and years of experience</li>
                    <li>Highlight 2-3 key skills or technical competencies</li>
                    <li>Mention a major achievement with numbers if possible</li>
                    <li>Use industry-specific keywords for ATS optimization</li>
                    <li>Avoid using "I" - write in third person or implied first person</li>
                </ul>
            </div>
        </div>
    );
}
