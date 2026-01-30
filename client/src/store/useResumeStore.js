import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const useResumeStore = create((set, get) => ({
    // Resume Data - Structure matches Mongoose Schema
    resumeData: {
        title: "Untitled Resume",
        templateId: "modern",
        design: {
            accentColor: "#2563EB",
            font: "Inter",
            layout: "comfortable",
        },
        personalDetails: {
            fullName: "", jobTitle: "", email: "", phone: "", location: "", website: "", linkedin: "", github: "", photoUrl: ""
        },
        summary: { content: "", isAiGenerated: false },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: []
    },

    // UI State
    isSaving: false,

    // --- Actions ---

    // 1. General Updates
    setResumeData: (newData) => set((state) => ({
        resumeData: { ...state.resumeData, ...newData }
    })),

    // 2. Personal Details
    updatePersonalDetail: (field, value) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            personalDetails: { ...state.resumeData.personalDetails, [field]: value }
        }
    })),

    // 3. Experience Actions
    addExperience: () => set((state) => ({
        resumeData: {
            ...state.resumeData,
            experience: [
                ...state.resumeData.experience,
                {
                    id: uuidv4(),
                    role: "", company: "", startDate: "", endDate: "",
                    isCurrent: false, location: "", description: "", enabled: true
                }
            ]
        }
    })),

    updateExperience: (id, field, value) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }
    })),

    removeExperience: (id) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter(exp => exp.id !== id)
        }
    })),

    // 4. Education Actions
    addEducation: () => set((state) => ({
        resumeData: {
            ...state.resumeData,
            education: [
                ...state.resumeData.education,
                {
                    id: uuidv4(),
                    degree: "", institution: "", startDate: "", endDate: "",
                    description: "", enabled: true
                }
            ]
        }
    })),

    updateEducation: (id, field, value) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map(edu =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        }
    })),

    removeEducation: (id) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter(edu => edu.id !== id)
        }
    })),

    // 5. Skills Actions
    addSkill: () => set((state) => ({
        resumeData: {
            ...state.resumeData,
            skills: [
                ...state.resumeData.skills,
                { id: uuidv4(), name: "", items: [], enabled: true }
            ]
        }
    })),

    updateSkill: (id, field, value) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.map(s => s.id === id ? { ...s, [field]: value } : s)
        }
    })),

    removeSkill: (id) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter(s => s.id !== id)
        }
    })),

    // 6. Projects Actions
    addProject: () => set((state) => ({
        resumeData: {
            ...state.resumeData,
            projects: [
                ...state.resumeData.projects,
                { id: uuidv4(), title: "", link: "", description: "", technologies: [], enabled: true }
            ]
        }
    })),

    updateProject: (id, field, value) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
        }
    })),

    removeProject: (id) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter(p => p.id !== id)
        }
    })),

    // 6. Generic Reorder
    reorderSection: (sectionKey, newItems) => set((state) => ({
        resumeData: {
            ...state.resumeData,
            [sectionKey]: newItems
        }
    }))
}));
