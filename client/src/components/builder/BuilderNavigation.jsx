import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const steps = [
    { path: 'templates', label: 'Template' },
    { path: 'personal', label: 'Personal Details' },
    { path: 'summary', label: 'Professional Summary' },
    { path: 'experience', label: 'Experience' },
    { path: 'education', label: 'Education' },
    { path: 'skills', label: 'Skills' },
    { path: 'projects', label: 'Projects' },
    { path: 'finish', label: 'Review & Export' }
];

export default function BuilderNavigation() {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract the current step path segment (e.g., 'personal' from '/builder/123/personal')
    const currentPath = location.pathname.split('/').pop();
    const currentIndex = steps.findIndex(s => s.path === currentPath);

    // Logic for Next/Prev
    const handleNext = () => {
        if (currentIndex < steps.length - 1) {
            navigate(steps[currentIndex + 1].path);
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            navigate(steps[currentIndex - 1].path);
        }
    };

    if (currentIndex === -1) return null;

    return (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
            <button
                onClick={handleBack}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentIndex === 0
                        ? 'text-slate-600 cursor-not-allowed'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
            >
                <ArrowLeft size={16} />
                Back
            </button>

            <button
                onClick={handleNext}
                disabled={currentIndex === steps.length - 1}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-900/20 transition-all transform active:scale-95"
            >
                {currentIndex === steps.length - 1 ? 'Finish' : 'Next Step'}
                <ArrowRight size={16} />
            </button>
        </div>
    );
}
