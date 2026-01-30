import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical, GraduationCap } from 'lucide-react';
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

const SortableEducationItem = ({ education, index, onUpdate, onRemove, expanded, onToggleExpand }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: education.id });

    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div ref={setNodeRef} style={style} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-4 transition-all hover:border-slate-700">
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
                    onClick={() => onToggleExpand(education.id)}
                >
                    <div>
                        <h4 className="font-semibold text-slate-200 text-sm">
                            {education.institution || "(No Institution)"}
                        </h4>
                        <p className="text-xs text-slate-500">{education.degree || "(No Degree)"}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-3">
                    <button
                        onClick={() => onRemove(education.id)}
                        className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                    >
                        <Trash2 size={14} />
                    </button>
                    <button
                        onClick={() => onToggleExpand(education.id)}
                        className="p-1.5 text-slate-500 hover:text-slate-300 rounded transition-colors"
                    >
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </div>
            </div>

            {expanded && (
                <div className="p-4 border-t border-slate-800 bg-slate-950/30 space-y-4 animate-in fade-in slide-in-from-top-1">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="form-label">Institution / School</label>
                            <div className="relative">
                                <GraduationCap size={14} className="absolute left-3 top-3 text-slate-500" />
                                <input
                                    type="text"
                                    value={education.institution}
                                    onChange={(e) => onUpdate(education.id, 'institution', e.target.value)}
                                    className="form-input pl-9"
                                    placeholder="e.g. Stanford University"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="form-label">Degree / Field of Study</label>
                            <input
                                type="text"
                                value={education.degree}
                                onChange={(e) => onUpdate(education.id, 'degree', e.target.value)}
                                className="form-input"
                                placeholder="e.g. Bachelor of Science in Computer Science"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="form-label">Start Date</label>
                            <input
                                type="text"
                                value={education.startDate}
                                onChange={(e) => onUpdate(education.id, 'startDate', e.target.value)}
                                className="form-input"
                                placeholder="YYYY"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="form-label">End Date</label>
                            <input
                                type="text"
                                value={education.endDate}
                                onChange={(e) => onUpdate(education.id, 'endDate', e.target.value)}
                                className="form-input"
                                placeholder="YYYY or Present"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="form-label">Description (Optional)</label>
                            <textarea
                                rows={2}
                                value={education.description}
                                onChange={(e) => onUpdate(education.id, 'description', e.target.value)}
                                className="form-textarea"
                                placeholder="e.g. 4.0 GPA, Dean's List..."
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function Education() {
    const { resumeData, addEducation, updateEducation, removeEducation, reorderSection } = useResumeStore();
    const [expandedId, setExpandedId] = useState(null);

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = resumeData.education.findIndex((item) => item.id === active.id);
            const newIndex = resumeData.education.findIndex((item) => item.id === over.id);
            const newOrder = arrayMove(resumeData.education, oldIndex, newIndex);
            reorderSection('education', newOrder);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Education</h2>
                    <p className="text-slate-400 text-sm">Add your academic background</p>
                </div>
                <button onClick={addEducation} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium">
                    <Plus size={16} /> Add Education
                </button>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={resumeData.education.map(e => e.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4">
                        {resumeData.education.map((edu, index) => (
                            <SortableEducationItem
                                key={edu.id}
                                education={edu}
                                index={index}
                                onUpdate={updateEducation}
                                onRemove={removeEducation}
                                expanded={expandedId === edu.id}
                                onToggleExpand={(id) => setExpandedId(curr => curr === id ? null : id)}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
