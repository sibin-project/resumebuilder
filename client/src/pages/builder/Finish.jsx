import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Download, CheckCircle, AlertCircle, Eye, FileText, Loader2, Sparkles } from 'lucide-react';
import { usePdfExport } from '../../hooks/usePdfExport';
import LivePreview from '../../components/builder/LivePreview';
import { validateEmail, validatePhone, calculateSectionQuality } from '../../utils/validation';

export default function Finish() {
    const { resumeData } = useResumeStore();
    const { exportToPdf, isExporting, printRef } = usePdfExport();
    const [showFullPreview, setShowFullPreview] = useState(false);

    // Quality checks
    const checkResumeQuality = () => {
        const issues = [];
        const warnings = [];
        let score = 0;

        // Critical checks (blockers)
        if (!resumeData.personalDetails.fullName) {
            issues.push({ field: 'Full Name', message: 'Required for resume' });
        } else {
            score += 10;
        }

        const emailValidation = validateEmail(resumeData.personalDetails.email);
        if (!emailValidation.valid) {
            issues.push({ field: 'Email', message: emailValidation.error || 'Invalid email' });
        } else {
            score += 10;
        }

        const phoneValidation = validatePhone(resumeData.personalDetails.phone);
        if (!phoneValidation.valid) {
            issues.push({ field: 'Phone', message: phoneValidation.error || 'Invalid phone' });
        } else {
            score += 10;
        }

        if (!resumeData.personalDetails.location) {
            issues.push({ field: 'Location', message: 'Required for ATS systems' });
        } else {
            score += 5;
        }

        // Experience is OPTIONAL (for freshers)
        // But check if they have EITHER experience OR projects+education
        const hasExperience = resumeData.experience.length > 0;
        const hasProjects = resumeData.projects?.length > 0;
        const hasEducation = resumeData.education?.length > 0;

        if (!hasExperience && !hasProjects && !hasEducation) {
            issues.push({
                field: 'Content',
                message: 'Add at least one of: Work Experience, Projects, or Education'
            });
        } else {
            if (hasExperience) score += 25;
            else if (hasProjects && hasEducation) score += 25; // Freshers with projects + education get full points
            else if (hasProjects) score += 15; // Projects alone
            else if (hasEducation) score += 10; // Education alone
        }

        // Warnings (non-blocking)
        if (!resumeData.summary.content) {
            warnings.push({
                field: 'Summary',
                message: 'Professional summary strongly recommended for ATS'
            });
        } else {
            score += 15;
        }

        // Fresher-specific suggestions
        if (!hasExperience) {
            if (!hasProjects) {
                warnings.push({
                    field: 'Projects',
                    message: 'Add academic/personal projects to showcase your skills'
                });
            } else {
                score += 10; // Bonus for having projects as a fresher
            }

            if (!hasEducation) {
                warnings.push({
                    field: 'Education',
                    message: 'Add your education details (required for freshers)'
                });
            } else {
                score += 10; // Bonus for education
            }
        } else {
            // Experienced professional suggestions
            if (resumeData.experience.length < 2) {
                warnings.push({
                    field: 'Experience',
                    message: 'Consider adding more work experience for a stronger resume'
                });
            } else {
                score += 10;
            }
        }

        if (!resumeData.skills || resumeData.skills.length === 0) {
            warnings.push({
                field: 'Skills',
                message: 'Add your skills for better ATS keyword matching'
            });
        } else {
            score += 5;
        }

        return { issues, warnings, canExport: issues.length === 0, score };
    };

    const { issues, warnings, canExport, score } = checkResumeQuality();

    const handleExport = () => {
        if (!canExport) {
            alert('Please fix the required issues before exporting');
            return;
        }

        if (warnings.length > 0) {
            const proceed = window.confirm(
                `Your resume could be stronger:\n\n${warnings.map(w => `• ${w.message}`).join('\n')}\n\nExport anyway?`
            );
            if (!proceed) return;
        }

        exportToPdf(resumeData.personalDetails.fullName || 'My_Resume');
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 60) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Needs Work';
        return 'Incomplete';
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hidden print container */}
            <div className="absolute left-[-9999px] top-0 pointer-events-none">
                <div ref={printRef} style={{ width: '210mm', backgroundColor: 'white' }}>
                    <LivePreview printMode={true} scale={1} />
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Review & Export</h2>
                <p className="text-slate-400 text-sm">
                    Review your resume for completeness and export when ready.
                </p>
            </div>

            {/* Quality Score Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                            <Sparkles className="text-blue-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">Resume Quality Score</h3>
                            <p className="text-slate-400 text-xs">Based on ATS best practices</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                            {score}%
                        </div>
                        <div className={`text-xs font-medium ${getScoreColor(score)}`}>
                            {getScoreLabel(score)}
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-900 rounded-full h-2 mb-2">
                    <div
                        className={`h-2 rounded-full transition-all duration-500 ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                        style={{ width: `${score}%` }}
                    ></div>
                </div>
            </div>

            {/* Issues (Blocking) */}
            {issues.length > 0 && (
                <div className="bg-red-900/20 border border-red-900/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="text-red-400" size={20} />
                        <h3 className="text-red-400 font-bold">Fix These Issues (Required)</h3>
                    </div>
                    <ul className="space-y-2">
                        {issues.map((issue, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-red-300">
                                <span className="text-red-500 mt-0.5">✕</span>
                                <span>
                                    <strong>{issue.field}:</strong> {issue.message}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Warnings (Non-blocking) */}
            {warnings.length > 0 && issues.length === 0 && (
                <div className="bg-yellow-900/20 border border-yellow-900/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="text-yellow-400" size={20} />
                        <h3 className="text-yellow-400 font-bold">Suggested Improvements</h3>
                    </div>
                    <ul className="space-y-2">
                        {warnings.map((warning, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-yellow-300">
                                <span className="text-yellow-500 mt-0.5">⚠</span>
                                <span>
                                    <strong>{warning.field}:</strong> {warning.message}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Success State */}
            {issues.length === 0 && warnings.length === 0 && (
                <div className="bg-green-900/20 border border-green-900/50 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-400" size={20} />
                        <div>
                            <h3 className="text-green-400 font-bold">Resume Ready!</h3>
                            <p className="text-green-300 text-sm">Your resume meets all ATS requirements</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setShowFullPreview(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all border border-slate-700"
                >
                    <Eye size={18} />
                    Full Preview
                </button>

                <button
                    onClick={handleExport}
                    disabled={!canExport || isExporting}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${canExport
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                >
                    {isExporting ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Generating PDF...
                        </>
                    ) : (
                        <>
                            <Download size={18} />
                            Download PDF
                        </>
                    )}
                </button>
            </div>

            {/* Completion Checklist */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <FileText size={16} />
                    Completion Checklist
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                        {resumeData.personalDetails.fullName ? (
                            <CheckCircle size={14} className="text-green-500" />
                        ) : (
                            <AlertCircle size={14} className="text-slate-600" />
                        )}
                        <span className={resumeData.personalDetails.fullName ? 'text-slate-300' : 'text-slate-600'}>
                            Contact Info
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {resumeData.summary?.content ? (
                            <CheckCircle size={14} className="text-green-500" />
                        ) : (
                            <AlertCircle size={14} className="text-slate-600" />
                        )}
                        <span className={resumeData.summary?.content ? 'text-slate-300' : 'text-slate-600'}>
                            Professional Summary
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {resumeData.experience.length > 0 ? (
                            <CheckCircle size={14} className="text-green-500" />
                        ) : (
                            <AlertCircle size={14} className="text-slate-600" />
                        )}
                        <span className={resumeData.experience.length > 0 ? 'text-slate-300' : 'text-slate-600'}>
                            Work Experience ({resumeData.experience.length})
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {resumeData.education?.length > 0 ? (
                            <CheckCircle size={14} className="text-green-500" />
                        ) : (
                            <AlertCircle size={14} className="text-slate-600" />
                        )}
                        <span className={resumeData.education?.length > 0 ? 'text-slate-300' : 'text-slate-600'}>
                            Education ({resumeData.education?.length || 0})
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {resumeData.skills?.length > 0 ? (
                            <CheckCircle size={14} className="text-green-500" />
                        ) : (
                            <AlertCircle size={14} className="text-slate-600" />
                        )}
                        <span className={resumeData.skills?.length > 0 ? 'text-slate-300' : 'text-slate-600'}>
                            Skills ({resumeData.skills?.length || 0})
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {resumeData.projects?.length > 0 ? (
                            <CheckCircle size={14} className="text-green-500" />
                        ) : (
                            <AlertCircle size={14} className="text-slate-600" />
                        )}
                        <span className={resumeData.projects?.length > 0 ? 'text-slate-300' : 'text-slate-600'}>
                            Projects ({resumeData.projects?.length || 0})
                        </span>
                    </div>
                </div>
            </div>

            {/* Full Preview Modal */}
            {showFullPreview && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowFullPreview(false)}>
                    <div className="bg-slate-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-4 py-3 flex justify-between items-center">
                            <h3 className="text-white font-bold">Full Preview</h3>
                            <button
                                onClick={() => setShowFullPreview(false)}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-sm"
                            >
                                Close
                            </button>
                        </div>
                        <div className="p-8 flex justify-center">
                            <LivePreview scale={0.85} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
