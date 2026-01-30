import React, { useState, useEffect } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { LayoutTemplate, Loader2, Crown, CheckCircle } from 'lucide-react';
import api_url from '../../config';

export default function TemplateSelection() {
    const { resumeData, setResumeData } = useResumeStore();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${api_url}/api/public/templates`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setTemplates(data.templates);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleSelect = (t) => {
        setResumeData({
            templateId: t._id,
            design: {
                ...resumeData.design,
                accentColor: t.structure?.colors?.primary || '#2563EB',
                font: t.structure?.fonts?.heading || 'Inter',
                layout: t.structure?.layout || 'modern'
            }
        });
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Choose your Template</h2>
                <p className="text-slate-400 text-sm">Pick a design. All templates are ATS-optimized.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map(t => {
                    const isSelected = resumeData.templateId === t._id;
                    return (
                        <div
                            key={t._id}
                            onClick={() => handleSelect(t)}
                            className={`cursor-pointer group relative rounded-xl border-2 overflow-hidden transition-all duration-300 ${isSelected
                                    ? 'border-blue-500 bg-blue-950/30 shadow-xl shadow-blue-500/30 scale-[1.02]'
                                    : 'border-slate-800 bg-slate-900 hover:border-blue-500/50 hover:shadow-lg'
                                }`}
                        >
                            {/* Larger Preview Thumbnail */}
                            <div className="h-48 bg-slate-800 relative overflow-hidden">
                                {t.thumbnail ? (
                                    <img
                                        src={t.thumbnail}
                                        alt={t.name}
                                        className={`w-full h-full object-cover transition-all duration-300 ${isSelected ? 'opacity-100 scale-105' : 'opacity-70 group-hover:opacity-90 group-hover:scale-105'
                                            }`}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <LayoutTemplate size={48} className={`${isSelected ? 'text-blue-400' : 'text-slate-600 group-hover:text-slate-500'} transition-colors`} />
                                    </div>
                                )}

                                {/* Strong Selection Checkmark */}
                                {isSelected && (
                                    <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center animate-in fade-in zoom-in duration-300">
                                        <div className="bg-blue-500 text-white rounded-full p-3 shadow-2xl">
                                            <CheckCircle size={24} className="animate-in zoom-in duration-200" />
                                        </div>
                                    </div>
                                )}

                                {t.isPremium && (
                                    <div className="absolute top-3 right-3 bg-yellow-500 text-slate-950 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                                        <Crown size={12} /> PRO
                                    </div>
                                )}
                            </div>

                            {/* Compact Info */}
                            <div className="p-3">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-300'} transition-colors`}>
                                        {t.name}
                                    </h3>
                                    {isSelected && (
                                        <span className="bg-blue-600 text-[10px] text-white px-2 py-0.5 rounded-full font-bold animate-in slide-in-from-right">✓ SELECTED</span>
                                    )}
                                </div>

                                {/* Single line description */}
                                <p className="text-[11px] text-slate-500 truncate mb-2">
                                    {t.category || 'Professional'} • {t.structure?.isATSoptimized ? 'ATS-Friendly' : 'Creative'}
                                </p>

                                {/* Color preview pills */}
                                <div className="flex items-center gap-1">
                                    <div className="w-5 h-5 rounded-md border-2 border-slate-700 shadow-inner" style={{ backgroundColor: t.structure?.colors?.primary }}></div>
                                    <div className="w-5 h-5 rounded-md border-2 border-slate-700 shadow-inner" style={{ backgroundColor: t.structure?.colors?.secondary }}></div>
                                    <span className="text-[9px] text-slate-600 ml-1 uppercase tracking-wide">Theme</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
