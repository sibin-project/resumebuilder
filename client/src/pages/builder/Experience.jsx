import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical, Calendar, Briefcase, MapPin } from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AIToolbar from '../../components/builder/AIToolbar';

// Sortable Item Component
const SortableExperienceItem = ({ experience, index, onUpdate, onRemove, expanded, onToggleExpand }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: experience.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-4 transition-all hover:border-slate-700">
            {/* Header / Summary View */}
            <div className="flex items-center p-4 bg-slate-900 select-none">
                <div
                    {...attributes}
                    {...listeners}
                    className="mr-3 cursor-grab text-slate-600 hover:text-slate-400 active:cursor-grabbing"
                >
                    <GripVertical size={16} />
                </div>

                <div
                    className="flex-1 cursor-pointer grid grid-cols-1 sm:grid-cols-2 gap-2"
                    onClick={() => onToggleExpand(experience.id)}
                >
                    <div>
                        <h4 className="font-semibold text-slate-200 text-sm">
                            {experience.role || "(No Role)"}
                        </h4>
                        <p className="text-xs text-slate-500">{experience.company || "(No Company)"}</p>
                    </div>
                    <div className="text-right sm:text-left sm:flex sm:items-center sm:justify-end">
                        <span className="text-xs text-slate-500 font-mono">
                            {experience.startDate} - {experience.isCurrent ? 'Present' : experience.endDate}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-3">
                    <button
                        onClick={() => onRemove(experience.id)}
                        className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                    >
                        <Trash2 size={14} />
                    </button>
                    <button
                        onClick={() => onToggleExpand(experience.id)}
                        className="p-1.5 text-slate-500 hover:text-slate-300 rounded transition-colors"
                    >
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </div>
            </div>

            {/* Expanded Form */}
            {expanded && (
                <div className="p-4 border-t border-slate-800 bg-slate-950/30 space-y-4 animate-in fade-in slide-in-from-top-1">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                            <label className="form-label">Job Title</label>
                            <div className="relative">
                                <Briefcase size={14} className="absolute left-3 top-3 text-slate-500" />
                                <input
                                    type="text"
                                    value={experience.role}
                                    onChange={(e) => onUpdate(experience.id, 'role', e.target.value)}
                                    className="form-input pl-9"
                                    placeholder="e.g. Senior Product Manager"
                                />
                            </div>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label className="form-label">Company</label>
                            <input
                                type="text"
                                value={experience.company}
                                onChange={(e) => onUpdate(experience.id, 'company', e.target.value)}
                                className="form-input"
                                placeholder="e.g. Google"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="form-label">Start Date</label>
                            <input
                                type="text"
                                value={experience.startDate}
                                onChange={(e) => onUpdate(experience.id, 'startDate', e.target.value)}
                                className="form-input"
                                placeholder="MM/YYYY"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="form-label flex justify-between">
                                End Date
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={experience.isCurrent}
                                        onChange={(e) => onUpdate(experience.id, 'isCurrent', e.target.checked)}
                                        className="w-3 h-3 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-[10px] font-normal text-slate-400">Current</span>
                                </div>
                            </label>
                            <input
                                type="text"
                                value={experience.endDate}
                                disabled={experience.isCurrent}
                                onChange={(e) => onUpdate(experience.id, 'endDate', e.target.value)}
                                className={`form-input ${experience.isCurrent ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="MM/YYYY"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="form-label">Location</label>
                            <div className="relative">
                                <MapPin size={14} className="absolute left-3 top-3 text-slate-500" />
                                <input
                                    type="text"
                                    value={experience.location}
                                    onChange={(e) => onUpdate(experience.id, 'location', e.target.value)}
                                    className="form-input pl-9"
                                    placeholder="e.g. New York, NY"
                                />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="form-label">Description (Bullet Points)</label>
                            <textarea
                                rows={5}
                                value={experience.description}
                                onChange={(e) => onUpdate(experience.id, 'description', e.target.value)}
                                className="form-textarea"
                                placeholder="• Achieved X by doing Y..."
                            />
                            <AIToolbar
                                text={experience.description}
                                onUpdate={(newText) => onUpdate(experience.id, 'description', newText)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function Experience() {
    const { resumeData, addExperience, updateExperience, removeExperience, reorderSection } = useResumeStore();
    const [expandedId, setExpandedId] = useState(null);

    // DnD Sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = resumeData.experience.findIndex((item) => item.id === active.id);
            const newIndex = resumeData.experience.findIndex((item) => item.id === over.id);
            const newOrder = arrayMove(resumeData.experience, oldIndex, newIndex);
            reorderSection('experience', newOrder);
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(current => current === id ? null : id);
    };

    // Add default experience item if empty (?) - No, user clicks add

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Work Experience</h2>
                    <p className="text-slate-400 text-sm">Add your relevant work experience, starting with the most recent.</p>
                </div>
                <button
                    onClick={() => {
                        addExperience();
                        // Ideally we auto-expand the new item, but need to know its ID.
                        // Can be handled by useEffect looking at array length increase.
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/20"
                >
                    <Plus size={16} /> Add Experience
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={resumeData.experience.map(exp => exp.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4">
                        {resumeData.experience.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/30">
                                <Briefcase className="mx-auto h-12 w-12 text-slate-700 mb-3" />
                                <h3 className="text-slate-400 font-medium">No experience added yet</h3>
                                <p className="text-slate-600 text-xs mt-1">Click the button above to get started</p>
                            </div>
                        ) : (
                            resumeData.experience.map((exp, index) => (
                                <SortableExperienceItem
                                    key={exp.id}
                                    experience={exp}
                                    index={index}
                                    onUpdate={updateExperience}
                                    onRemove={removeExperience}
                                    expanded={expandedId === exp.id}
                                    onToggleExpand={toggleExpand}
                                />
                            ))
                        )}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
