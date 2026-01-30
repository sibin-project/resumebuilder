import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus, X, Save, Layout } from "lucide-react";

const TemplateManager = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "Professional",
        thumbnail: "",
        isPremium: false,
        structure: {
            layout: "modern",
            colors: {
                primary: "#2563eb",
                secondary: "#64748b",
                accent: "#8b5cf6"
            },
            fonts: {
                heading: "Inter",
                body: "Inter"
            },
            spacing: "comfortable"
        },
        isActive: true,
        html: "",
        css: ""
    });

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/templates`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setTemplates(data.templates);
            }
        } catch (err) {
            console.error("Failed to fetch templates", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const url = currentTemplate
            ? `${import.meta.env.VITE_API_URL}/api/admin/templates/${currentTemplate._id}`
            : `${import.meta.env.VITE_API_URL}/api/admin/templates`;

        const method = currentTemplate ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success) {
                fetchTemplates();
                resetForm();
            }
        } catch (err) {
            console.error("Failed to save template", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this template?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/templates/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setTemplates(templates.filter(t => t._id !== id));
            }
        } catch (err) {
            console.error("Failed to delete template", err);
        }
    };

    const startEdit = (template) => {
        setCurrentTemplate(template);
        setFormData({
            name: template.name,
            description: template.description,
            category: template.category,
            thumbnail: template.thumbnail || "",
            isPremium: template.isPremium,
            structure: template.structure,
            isActive: template.isActive,
            html: template.html || "",
            css: template.css || ""
        });
        setIsEditing(true);
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentTemplate(null);
        setFormData({
            name: "",
            description: "",
            category: "Professional",
            thumbnail: "",
            isPremium: false,
            structure: {
                layout: "modern",
                colors: {
                    primary: "#2563eb",
                    secondary: "#64748b",
                    accent: "#8b5cf6"
                },
                fonts: {
                    heading: "Inter",
                    body: "Inter"
                },
                spacing: "comfortable"
            },
            isActive: true,
            html: "",
            css: ""
        });
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Template Management</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                    >
                        <Plus size={20} /> New Template
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-slate-800 border border-slate-700 p-4 md:p-8 rounded-2xl max-w-3xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg md:text-xl font-bold text-white">
                            {currentTemplate ? "Edit Template" : "New Template"}
                        </h3>
                        <button onClick={resetForm} className="text-slate-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Template Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 h-24 resize-none"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                                >
                                    <option value="Professional">Professional</option>
                                    <option value="Creative">Creative</option>
                                    <option value="Modern">Modern</option>
                                    <option value="Minimal">Minimal</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Layout Style</label>
                                <select
                                    value={formData.structure.layout}
                                    onChange={e => setFormData({
                                        ...formData,
                                        structure: { ...formData.structure, layout: e.target.value }
                                    })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                                >
                                    <option value="modern">Modern</option>
                                    <option value="classic">Classic</option>
                                    <option value="minimal">Minimal</option>
                                    <option value="custom">Custom (HTML/CSS)</option>
                                </select>
                            </div>
                        </div>

                        {/* Colors */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-3">Colors</label>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Primary</label>
                                    <input
                                        type="color"
                                        value={formData.structure.colors.primary}
                                        onChange={e => setFormData({
                                            ...formData,
                                            structure: {
                                                ...formData.structure,
                                                colors: { ...formData.structure.colors, primary: e.target.value }
                                            }
                                        })}
                                        className="w-full h-10 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Secondary</label>
                                    <input
                                        type="color"
                                        value={formData.structure.colors.secondary}
                                        onChange={e => setFormData({
                                            ...formData,
                                            structure: {
                                                ...formData.structure,
                                                colors: { ...formData.structure.colors, secondary: e.target.value }
                                            }
                                        })}
                                        className="w-full h-10 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Accent</label>
                                    <input
                                        type="color"
                                        value={formData.structure.colors.accent}
                                        onChange={e => setFormData({
                                            ...formData,
                                            structure: {
                                                ...formData.structure,
                                                colors: { ...formData.structure.colors, accent: e.target.value }
                                            }
                                        })}
                                        className="w-full h-10 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Custom Code Section */}
                        <div className="border-t border-slate-700 pt-6">
                            <h4 className="text-lg font-semibold text-white mb-4">Advanced: Custom Code</h4>
                            <p className="text-sm text-slate-400 mb-4">
                                Override the default layout with custom HTML and CSS. Use placeholders like <code>{"{{name}}"}</code>, <code>{"{{email}}"}</code>, <code>{"{{summary}}"}</code>, etc.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Custom HTML</label>
                                    <textarea
                                        value={formData.html}
                                        onChange={e => setFormData({ ...formData, html: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-sm outline-none focus:border-blue-500 h-48"
                                        placeholder="<div class='resume'>
  <h1>{{name}}</h1>
  <p>{{summary}}</p>
</div>"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Custom CSS</label>
                                    <textarea
                                        value={formData.css}
                                        onChange={e => setFormData({ ...formData, css: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-sm outline-none focus:border-blue-500 h-48"
                                        placeholder=".resume { font-family: sans-serif; } h1 { color: blue; }"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail */}
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Thumbnail URL</label>
                            <input
                                type="text"
                                value={formData.thumbnail}
                                onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        {/* Toggles */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <label className="flex items-center gap-3 text-slate-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isPremium}
                                    onChange={e => setFormData({ ...formData, isPremium: e.target.checked })}
                                    className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-800"
                                />
                                Premium Template
                            </label>
                            <label className="flex items-center gap-3 text-slate-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-800"
                                />
                                Active
                            </label>
                        </div>

                        <div className="flex flex-col-reverse md:flex-row justify-end gap-4">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-3 text-slate-400 hover:text-white transition-colors border border-slate-700 rounded-xl"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <Save size={20} />
                                {currentTemplate ? "Update Template" : "Create Template"}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {loading ? (
                        <div className="col-span-full text-center py-12 text-slate-400">Loading templates...</div>
                    ) : templates.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-slate-400">No templates found</div>
                    ) : (
                        templates.map(template => (
                            <div key={template._id} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden group hover:border-blue-500/50 transition-colors">
                                {/* Thumbnail */}
                                {template.thumbnail ? (
                                    <div className="aspect-video bg-slate-700 overflow-hidden">
                                        <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                                        <Layout size={48} className="text-slate-600" />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-bold text-white">{template.name}</h3>
                                        <div className="flex gap-1">
                                            {template.isPremium && (
                                                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded text-xs font-bold">PRO</span>
                                            )}
                                            {!template.isActive && (
                                                <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs font-bold">Inactive</span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">{template.description}</p>
                                    <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
                                        <span className="bg-slate-700 px-2 py-1 rounded">{template.category}</span>
                                        <span className="bg-slate-700 px-2 py-1 rounded capitalize">{template.structure.layout}</span>
                                        <span className="bg-slate-700 px-2 py-1 rounded">{template.usageCount} uses</span>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => startEdit(template)}
                                            className="flex-1 p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors flex items-center justify-center gap-1"
                                        >
                                            <Edit size={16} /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(template._id)}
                                            className="flex-1 p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center justify-center gap-1"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default TemplateManager;
