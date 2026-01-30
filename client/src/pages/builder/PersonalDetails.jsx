import React, { useState, useEffect } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { User, Mail, Phone, MapPin, CheckCircle, AlertCircle, AlertTriangle, Globe } from 'lucide-react';
import { validateEmail, validatePhone, CHARACTER_LIMITS } from '../../utils/validation';

export default function PersonalDetails() {
    const { resumeData, updatePersonalDetail } = useResumeStore();
    const { personalDetails } = resumeData;

    // Validation state
    const [validation, setValidation] = useState({
        email: { valid: null, error: null, warning: null, suggestion: null },
        phone: { valid: null, error: null }
    });

    // Run validation on mount if data exists
    useEffect(() => {
        if (personalDetails.email) {
            const result = validateEmail(personalDetails.email);
            setValidation(prev => ({ ...prev, email: result }));
        }
        if (personalDetails.phone) {
            const result = validatePhone(personalDetails.phone);
            setValidation(prev => ({ ...prev, phone: result }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Enforce character limits
        if (CHARACTER_LIMITS[name] && value.length > CHARACTER_LIMITS[name]) {
            return;
        }

        // Real-time validation
        if (name === 'email') {
            const result = validateEmail(value);
            setValidation(prev => ({ ...prev, email: result }));
        } else if (name === 'phone') {
            const result = validatePhone(value);
            setValidation(prev => ({ ...prev, phone: result }));
        }

        updatePersonalDetail(name, value);
    };

    const handlePhoneBlur = () => {
        // Auto-format phone on blur
        if (personalDetails.phone && validation.phone.valid) {
            updatePersonalDetail('phone', validation.phone.display || personalDetails.phone);
        }
    };

    const handleEmailBlur = () => {
        // Use suggestion if accepted
        if (personalDetails.email && validation.email.normalized) {
            updatePersonalDetail('email', validation.email.normalized);
        }
    };

    const applySuggestion = (field, suggestedValue) => {
        updatePersonalDetail(field, suggestedValue);
        if (field === 'email') {
            const result = validateEmail(suggestedValue);
            setValidation(prev => ({ ...prev, email: result }));
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Personal Details</h2>
                <p className="text-slate-400 text-sm">Add your contact information. All fields are validated for ATS compatibility.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="col-span-1">
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-medium text-slate-400 uppercase">
                            Full Name *
                        </label>
                        <span className={`text-xs ${personalDetails.fullName.length > CHARACTER_LIMITS.fullName * 0.9 ? 'text-yellow-400' : 'text-slate-600'}`}>
                            {personalDetails.fullName.length}/{CHARACTER_LIMITS.fullName}
                        </span>
                    </div>
                    <div className="relative">
                        <User size={16} className="absolute left-3 top-3 text-slate-500" />
                        <input
                            type="text"
                            name="fullName"
                            value={personalDetails.fullName}
                            onChange={handleChange}
                            className={`w-full bg-slate-900 border ${personalDetails.fullName ? 'border-slate-600' : 'border-slate-700'
                                } rounded-lg pl-10 pr-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                            placeholder="e.g. John Doe"
                            required
                        />
                        {personalDetails.fullName && (
                            <CheckCircle size={16} className="absolute right-3 top-3 text-green-500" />
                        )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Use your full legal name</p>
                </div>

                {/* Job Title */}
                <div className="col-span-1">
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-medium text-slate-400 uppercase">
                            Job Title *
                        </label>
                        <span className={`text-xs ${personalDetails.jobTitle.length > CHARACTER_LIMITS.jobTitle * 0.9 ? 'text-yellow-400' : 'text-slate-600'}`}>
                            {personalDetails.jobTitle.length}/{CHARACTER_LIMITS.jobTitle}
                        </span>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="jobTitle"
                            value={personalDetails.jobTitle}
                            onChange={handleChange}
                            className={`w-full bg-slate-900 border ${personalDetails.jobTitle ? 'border-slate-600' : 'border-slate-700'
                                } rounded-lg px-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                            placeholder="e.g. Senior Software Engineer"
                            required
                        />
                        {personalDetails.jobTitle && (
                            <CheckCircle size={16} className="absolute right-3 top-3 text-green-500" />
                        )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Your current or target role</p>
                </div>

                {/* Email with Advanced Validation */}
                <div className="col-span-2">
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-medium text-slate-400 uppercase">
                            Email Address *
                        </label>
                        <span className="text-xs text-slate-600">
                            {personalDetails.email.length}/{CHARACTER_LIMITS.email}
                        </span>
                    </div>
                    <div className="relative">
                        <Mail size={16} className="absolute left-3 top-3 text-slate-500" />
                        <input
                            type="email"
                            name="email"
                            value={personalDetails.email}
                            onChange={handleChange}
                            onBlur={handleEmailBlur}
                            className={`w-full bg-slate-900 border ${validation.email.valid === true
                                    ? 'border-green-500/50'
                                    : validation.email.valid === false
                                        ? 'border-red-500/50'
                                        : 'border-slate-700'
                                } rounded-lg pl-10 pr-10 py-2.5 text-slate-100 focus:ring-2 ${validation.email.valid === true
                                    ? 'focus:ring-green-500'
                                    : validation.email.valid === false
                                        ? 'focus:ring-red-500'
                                        : 'focus:ring-blue-500'
                                } focus:border-transparent outline-none transition-all`}
                            placeholder="john@example.com"
                            required
                        />
                        {validation.email.valid === true && (
                            <CheckCircle size={16} className="absolute right-3 top-3 text-green-500" />
                        )}
                        {validation.email.valid === false && (
                            <AlertCircle size={16} className="absolute right-3 top-3 text-red-500" />
                        )}
                    </div>

                    {/* Email Error */}
                    {validation.email.error && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <AlertCircle size={12} />
                            {validation.email.error}
                        </p>
                    )}

                    {/* Email Warning/Suggestion */}
                    {validation.email.warning && validation.email.suggested && (
                        <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                            <p className="text-xs text-yellow-400 flex items-center gap-1">
                                <AlertTriangle size={12} />
                                {validation.email.warning}
                            </p>
                            <button
                                onClick={() => applySuggestion('email', validation.email.suggested)}
                                className="mt-1 text-xs text-yellow-300 hover:text-yellow-200 underline"
                            >
                                Click to use: {validation.email.suggested}
                            </button>
                        </div>
                    )}

                    {/* Email Success */}
                    {validation.email.valid && !validation.email.warning && (
                        <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                            <CheckCircle size={12} />
                            Email is valid and ATS-compatible
                        </p>
                    )}
                </div>

                {/* Phone with Auto-Formatting */}
                <div className="col-span-1">
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-medium text-slate-400 uppercase">
                            Phone Number *
                        </label>
                        <span className="text-xs text-slate-600">
                            {personalDetails.phone.length}/{CHARACTER_LIMITS.phone}
                        </span>
                    </div>
                    <div className="relative">
                        <Phone size={16} className="absolute left-3 top-3 text-slate-500" />
                        <input
                            type="tel"
                            name="phone"
                            value={personalDetails.phone}
                            onChange={handleChange}
                            onBlur={handlePhoneBlur}
                            className={`w-full bg-slate-900 border ${validation.phone.valid === true
                                    ? 'border-green-500/50'
                                    : validation.phone.valid === false
                                        ? 'border-red-500/50'
                                        : 'border-slate-700'
                                } rounded-lg pl-10 pr-10 py-2.5 text-slate-100 focus:ring-2 ${validation.phone.valid === true
                                    ? 'focus:ring-green-500'
                                    : validation.phone.valid === false
                                        ? 'focus:ring-red-500'
                                        : 'focus:ring-blue-500'
                                } focus:border-transparent outline-none transition-all`}
                            placeholder="+1 234 567 8900"
                            required
                        />
                        {validation.phone.valid === true && (
                            <CheckCircle size={16} className="absolute right-3 top-3 text-green-500" />
                        )}
                        {validation.phone.valid === false && (
                            <AlertCircle size={16} className="absolute right-3 top-3 text-red-500" />
                        )}
                    </div>

                    {validation.phone.error && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <AlertCircle size={12} />
                            {validation.phone.error}
                        </p>
                    )}

                    {validation.phone.valid && (
                        <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                            <CheckCircle size={12} />
                            Auto-formatted for ATS
                        </p>
                    )}
                </div>

                {/* Location */}
                <div className="col-span-1">
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-medium text-slate-400 uppercase">
                            Location *
                        </label>
                        <span className="text-xs text-slate-600">
                            {personalDetails.location.length}/{CHARACTER_LIMITS.location}
                        </span>
                    </div>
                    <div className="relative">
                        <MapPin size={16} className="absolute left-3 top-3 text-slate-500" />
                        <input
                            type="text"
                            name="location"
                            value={personalDetails.location}
                            onChange={handleChange}
                            className={`w-full bg-slate-900 border ${personalDetails.location ? 'border-slate-600' : 'border-slate-700'
                                } rounded-lg pl-10 pr-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                            placeholder="City, State/Country"
                            required
                        />
                        {personalDetails.location && (
                            <CheckCircle size={16} className="absolute right-3 top-3 text-green-500" />
                        )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">e.g. San Francisco, CA</p>
                </div>

                {/* Optional: LinkedIn */}
                <div className="col-span-1">
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase">
                        LinkedIn (Optional)
                    </label>
                    <div className="relative">
                        <Globe size={16} className="absolute left-3 top-3 text-slate-500" />
                        <input
                            type="url"
                            name="linkedin"
                            value={personalDetails.linkedin}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="linkedin.com/in/yourname"
                        />
                    </div>
                </div>

                {/* Optional: Website/Portfolio */}
                <div className="col-span-1">
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase">
                        Website/Portfolio (Optional)
                    </label>
                    <div className="relative">
                        <Globe size={16} className="absolute left-3 top-3 text-slate-500" />
                        <input
                            type="url"
                            name="website"
                            value={personalDetails.website}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="yourportfolio.com"
                        />
                    </div>
                </div>
            </div>

            {/* ATS Compatibility Info */}
            <div className="bg-blue-900/10 border border-blue-900/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                    <CheckCircle size={14} />
                    ATS Compatibility Check
                </h4>
                <div className="space-y-1 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                        {validation.email.valid ? (
                            <CheckCircle size={12} className="text-green-500" />
                        ) : (
                            <AlertCircle size={12} className="text-slate-600" />
                        )}
                        <span>Email format validated</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {validation.phone.valid ? (
                            <CheckCircle size={12} className="text-green-500" />
                        ) : (
                            <AlertCircle size={12} className="text-slate-600" />
                        )}
                        <span>Phone number normalized</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {personalDetails.fullName && personalDetails.fullName.length <= CHARACTER_LIMITS.fullName ? (
                            <CheckCircle size={12} className="text-green-500" />
                        ) : (
                            <AlertCircle size={12} className="text-slate-600" />
                        )}
                        <span>Character limits enforced</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
