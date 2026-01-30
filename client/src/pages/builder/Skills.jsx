import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2, X } from 'lucide-react';

const SkillCategory = ({ skill, onUpdate, onRemove }) => {
    const [newItem, setNewItem] = useState("");

    const handleAddItem = (e) => {
        if (e.key === 'Enter' && newItem.trim()) {
            e.preventDefault();
            onUpdate(skill.id, 'items', [...skill.items, newItem.trim()]);
            setNewItem("");
        }
    };

    const handleRemoveItem = (index) => {
        const newItems = skill.items.filter((_, i) => i !== index);
        onUpdate(skill.id, 'items', newItems);
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => onUpdate(skill.id, 'name', e.target.value)}
                    className="bg-transparent text-slate-200 font-semibold focus:outline-none focus:border-b border-blue-500 w-1/2"
                    placeholder="Category Name (e.g. Frontend)"
                />
                <button onClick={() => onRemove(skill.id)} className="text-slate-600 hover:text-red-400">
                    <Trash2 size={14} />
                </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
                {skill.items.map((item, idx) => (
                    <span key={idx} className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded text-xs flex items-center gap-1 border border-blue-900/50">
                        {item}
                        <button onClick={() => handleRemoveItem(idx)} className="hover:text-white"><X size={10} /></button>
                    </span>
                ))}
            </div>

            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={handleAddItem}
                className="w-full bg-slate-950/50 border border-slate-700 rounded px-3 py-2 text-sm text-slate-300 focus:border-blue-500 outline-none"
                placeholder="Type skill and press Enter..."
            />
        </div>
    );
};

export default function Skills() {
    const { resumeData, addSkill, updateSkill, removeSkill } = useResumeStore();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Skills</h2>
                    <p className="text-slate-400 text-sm">Group your skills by category (e.g. Technical, Soft Skills).</p>
                </div>
                <button onClick={addSkill} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium">
                    <Plus size={16} /> Add Category
                </button>
            </div>

            <div>
                {resumeData.skills.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/30">
                        <h3 className="text-slate-400 font-medium">No skills added</h3>
                        <p className="text-slate-600 text-xs mt-1">Add a category to get started</p>
                    </div>
                )}
                {resumeData.skills.map(skill => (
                    <SkillCategory
                        key={skill.id}
                        skill={skill}
                        onUpdate={updateSkill}
                        onRemove={removeSkill}
                    />
                ))}
            </div>
        </div>
    );
}
