import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

// Mock Data for Preview (used when user hasn't filled data yet)
const mockData = {
    personalDetails: {
        fullName: "Alex Morgan",
        jobTitle: "Senior Product Designer",
        email: "alex.morgan@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        website: "alexmorgan.design",
        linkedin: "linkedin.com/in/alexmorgan"
    },
    summary: "Creative and detail-oriented Product Designer with 5+ years of experience in building user-centric digital products. Proficient in Figma, prototyping, and design systems. Passionate about solving complex problems through elegant design solutions.",
    experience: [
        {
            id: "mock1",
            role: "Senior Product Designer",
            company: "TechFlow Inc.",
            startDate: "Jan 2021",
            endDate: "Present",
            isCurrent: true,
            location: "San Francisco, CA",
            description: "• Led the redesign of the core mobile application, increasing user retention by 25%\n• Collaborated with cross-functional teams to launch 3 major features\n• Established design system used across 5 product teams"
        },
        {
            id: "mock2",
            role: "UI/UX Designer",
            company: "Creative Studio",
            startDate: "Jun 2018",
            endDate: "Dec 2020",
            isCurrent: false,
            location: "New York, NY",
            description: "• Designed intuitive interfaces for web and mobile platforms for various clients\n• Conducted user research and usability testing to validate design decisions\n• Mentored 2 junior designers on best practices and workflows"
        }
    ],
    education: [
        {
            id: "mockEdu1",
            institution: "Rhode Island School of Design",
            degree: "Bachelor of Fine Arts in Graphic Design",
            startDate: "2014",
            endDate: "2018"
        }
    ],
    skills: [
        { id: "mockSkill1", name: "Design Tools", items: ["Figma", "Adobe XD", "Sketch", "Protopie"] },
        { id: "mockSkill2", name: "Development", items: ["HTML/CSS", "React Basics", "Design Systems"] }
    ],
    projects: [
        {
            id: "mockProj1",
            title: "E-Commerce Mobile App",
            description: "Designed a complete mobile shopping experience for a fashion brand, resulting in a 15% conversion rate increase.",
            technologies: ["Figma", "Protopie"],
            link: "behance.net/alex_ecommerce"
        }
    ]
};

export default function LivePreview({ scale = 1, printMode = false }) {
    const { resumeData } = useResumeStore();

    const getDisplayValue = (section, field) => {
        const value = section === 'summary'
            ? resumeData[section]?.content
            : resumeData[section]?.[field];

        const mockValue = section === 'summary'
            ? mockData[section]
            : mockData[section]?.[field];

        if (value) return { value, isMock: false };
        if (printMode) return { value: '', isMock: false };
        return { value: mockValue, isMock: true };
    };

    // Lists handling
    const displayExperience = resumeData.experience.length > 0 ? resumeData.experience : (printMode ? [] : mockData.experience);
    const displayEducation = resumeData.education.length > 0 ? resumeData.education : (printMode ? [] : mockData.education);
    const displaySkills = resumeData.skills.length > 0 ? resumeData.skills : (printMode ? [] : mockData.skills);
    const displayProjects = resumeData.projects.length > 0 ? resumeData.projects : (printMode ? [] : mockData.projects);

    const fullName = getDisplayValue('personalDetails', 'fullName');
    const jobTitle = getDisplayValue('personalDetails', 'jobTitle');
    const email = getDisplayValue('personalDetails', 'email');
    const phone = getDisplayValue('personalDetails', 'phone');
    const location = getDisplayValue('personalDetails', 'location');
    const website = getDisplayValue('personalDetails', 'website');
    const linkedin = getDisplayValue('personalDetails', 'linkedin');
    const github = getDisplayValue('personalDetails', 'github');
    const summary = getDisplayValue('summary', 'content');

    const accentColor = resumeData.design?.accentColor || '#2563EB';

    return (
        <div
            id="resume-preview-id"
            className={`bg-white text-black w-[210mm] min-h-[297mm] ${printMode ? '' : 'shadow-2xl'}`}
            style={{
                transform: printMode ? 'none' : `scale(${scale})`,
                fontFamily: resumeData.design?.font || 'Inter, system-ui, sans-serif',
                transformOrigin: 'top center'
            }}
        >
            {/* HEADER SECTION - Modern Clean Design */}
            <header
                className="px-12 py-10 text-white relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`
                }}
            >
                {/* Decorative shapes */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10">
                    <h1
                        className={`text-5xl font-extrabold mb-2 tracking-tight ${fullName.isMock ? 'opacity-40' : ''}`}
                    >
                        {fullName.value}
                    </h1>
                    <p
                        className={`text-xl font-medium mb-6 ${jobTitle.isMock ? 'opacity-40' : ''}`}
                        style={{ color: 'rgba(255,255,255,0.95)' }}
                    >
                        {jobTitle.value}
                    </p>

                    {/* Contact Info - Horizontal Icons */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                        {email.value && (
                            <div className={`flex items-center gap-2 ${email.isMock ? 'opacity-40' : ''}`}>
                                <Mail size={14} />
                                <span>{email.value}</span>
                            </div>
                        )}
                        {phone.value && (
                            <div className={`flex items-center gap-2 ${phone.isMock ? 'opacity-40' : ''}`}>
                                <Phone size={14} />
                                <span>{phone.value}</span>
                            </div>
                        )}
                        {location.value && (
                            <div className={`flex items-center gap-2 ${location.isMock ? 'opacity-40' : ''}`}>
                                <MapPin size={14} />
                                <span>{location.value}</span>
                            </div>
                        )}
                        {website.value && (
                            <div className={`flex items-center gap-2 ${website.isMock ? 'opacity-40' : ''}`}>
                                <Globe size={14} />
                                <span className="underline">{website.value}</span>
                            </div>
                        )}
                        {linkedin.value && (
                            <div className={`flex items-center gap-2 ${linkedin.isMock ? 'opacity-40' : ''}`}>
                                <Linkedin size={14} />
                                <span className="underline">{linkedin.value}</span>
                            </div>
                        )}
                        {github.value && (
                            <div className={`flex items-center gap-2 ${github.isMock ? 'opacity-40' : ''}`}>
                                <Github size={14} />
                                <span className="underline">{github.value}</span>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT - Two Column Layout */}
            <div className="px-10 py-6">

                {/* PROFESSIONAL SUMMARY */}
                {summary.value && (
                    <section className="mb-8">
                        <h2
                            className="text-lg font-bold uppercase tracking-wide mb-3 pb-2 border-b-2"
                            style={{ borderColor: accentColor, color: accentColor }}
                        >
                            Professional Summary
                        </h2>
                        <p className={`text-gray-900 leading-relaxed text-sm ${summary.isMock ? 'opacity-40' : ''}`}>
                            {summary.value}
                        </p>
                    </section>
                )}

                {/* WORK EXPERIENCE */}
                {displayExperience.length > 0 && (
                    <section className="mb-8">
                        <h2
                            className="text-lg font-bold uppercase tracking-wide mb-4 pb-2 border-b-2"
                            style={{ borderColor: accentColor, color: accentColor }}
                        >
                            Work Experience
                        </h2>
                        <div className="space-y-5">
                            {displayExperience.map((exp, i) => (
                                <div key={exp.id || i} className={`${(printMode === false && resumeData.experience.length === 0) ? 'opacity-40' : ''}`}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-base font-bold text-black">{exp.role}</h3>
                                        <span className="text-xs font-semibold text-gray-800">
                                            {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <p className="text-sm font-medium text-gray-900">{exp.company}</p>
                                        {exp.location && <p className="text-xs text-gray-700">{exp.location}</p>}
                                    </div>
                                    <div className="text-sm text-gray-900 leading-relaxed">
                                        {exp.description.split('\n').map((line, idx) => (
                                            line.trim() && <p key={idx} className="mb-1">{line}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* PROJECTS */}
                {displayProjects.length > 0 && (
                    <section className="mb-8">
                        <h2
                            className="text-lg font-bold uppercase tracking-wide mb-4 pb-2 border-b-2"
                            style={{ borderColor: accentColor, color: accentColor }}
                        >
                            Projects
                        </h2>
                        <div className="space-y-4">
                            {displayProjects.map((proj, i) => (
                                <div key={proj.id || i} className={`${(printMode === false && resumeData.projects.length === 0) ? 'opacity-40' : ''}`}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-base font-bold text-black">{proj.title}</h3>
                                        {proj.link && (
                                            <span className="text-xs text-blue-600 underline">
                                                {proj.link.replace(/^https?:\/\//, '')}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-900 leading-relaxed mb-1">{proj.description}</p>
                                    {proj.technologies && proj.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {proj.technologies.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-0.5 text-xs font-medium rounded"
                                                    style={{
                                                        backgroundColor: `${accentColor}15`,
                                                        color: accentColor
                                                    }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* EDUCATION */}
                {displayEducation.length > 0 && (
                    <section className="mb-8">
                        <h2
                            className="text-lg font-bold uppercase tracking-wide mb-4 pb-2 border-b-2"
                            style={{ borderColor: accentColor, color: accentColor }}
                        >
                            Education
                        </h2>
                        <div className="space-y-4">
                            {displayEducation.map((edu, i) => (
                                <div key={edu.id || i} className={`${(printMode === false && resumeData.education.length === 0) ? 'opacity-40' : ''}`}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-base font-bold text-black">{edu.degree}</h3>
                                        <span className="text-xs font-semibold text-gray-800">
                                            {edu.startDate} – {edu.endDate}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{edu.institution}</p>
                                    {edu.description && (
                                        <p className="text-sm text-gray-800 mt-1">{edu.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* SKILLS */}
                {displaySkills.length > 0 && (
                    <section className="mb-8">
                        <h2
                            className="text-lg font-bold uppercase tracking-wide mb-4 pb-2 border-b-2"
                            style={{ borderColor: accentColor, color: accentColor }}
                        >
                            Skills
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {displaySkills.map((skill, i) => (
                                <div key={skill.id || i} className={`${(printMode === false && resumeData.skills.length === 0) ? 'opacity-40' : ''}`}>
                                    <h4 className="text-sm font-bold text-black mb-2">{skill.name}</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skill.items.map((item, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 text-xs font-medium rounded"
                                                style={{
                                                    backgroundColor: `${accentColor}10`,
                                                    color: accentColor,
                                                    border: `1px solid ${accentColor}30`
                                                }}
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
}
