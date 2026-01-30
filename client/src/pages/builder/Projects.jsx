import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical, FolderGit2, Link as LinkIcon, Code } from 'lucide-react';
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
const SortableProjectItem = ({ project, index, onUpdate, onRemove, expanded, onToggleExpand }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: project.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleTechChange = (e) => {
        const val = e.target.value;
        const techs = val.split(',').map(t => t.trim());
        onUpdate(project.id, 'technologies', techs);
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
                    onClick={() => onToggleExpand(project.id)}
                >
                    <div className="flex items-center gap-2">
                        <FolderGit2 size={16} className="text-blue-500" />
                        <h4 className="font-semibold text-slate-200 text-sm">
                            {project.title || "(Untitled Project)"}
                        </h4>
                    </div>
                    <div className="text-right sm:text-left sm:flex sm:items-center sm:justify-end">
                        <span className="text-xs text-slate-500 font-mono truncate max-w-[150px]">
                            {project.link || ""}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-3">
                    <button
                        onClick={() => onRemove(project.id)}
                        className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                    >
                        <Trash2 size={14} />
                    </button>
                    <button
                        onClick={() => onToggleExpand(project.id)}
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
                            <label className="form-label">Project Title</label>
                            <input
                                type="text"
                                value={project.title}
                                onChange={(e) => onUpdate(project.id, 'title', e.target.value)}
                                className="form-input"
                                placeholder="e.g. E-Commerce App"
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label className="form-label">Link (Optional)</label>
                            <div className="relative">
                                <LinkIcon size={14} className="absolute left-3 top-3 text-slate-500" />
                                <input
                                    type="text"
                                    value={project.link}
                                    onChange={(e) => onUpdate(project.id, 'link', e.target.value)}
                                    className="form-input pl-9"
                                    placeholder="e.g. github.com/my-repo"
                                />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="form-label">Technologies (comma separated)</label>
                            <div className="relative">
                                <Code size={14} className="absolute left-3 top-3 text-slate-500" />
                                <input
                                    type="text"
                                    value={project.technologies?.join(', ') || ''}
                                    onChange={handleTechChange}
                                    className="form-input pl-9"
                                    placeholder="e.g. React, Node.js, MongoDB"
                                />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="form-label">Description</label>
                            <textarea
                                rows={4}
                                value={project.description}
                                onChange={(e) => onUpdate(project.id, 'description', e.target.value)}
                                className="form-textarea"
                                placeholder="Describe what you built and what you learned..."
                            />
                            <AIToolbar
                                text={project.description}
                                onUpdate={(newText) => onUpdate(project.id, 'description', newText)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function Projects() {
    const { resumeData, addProject, updateProject, removeProject, reorderSection } = useResumeStore();
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
            const oldIndex = resumeData.projects.findIndex((item) => item.id === active.id);
            const newIndex = resumeData.projects.findIndex((item) => item.id === over.id);
            const newOrder = arrayMove(resumeData.projects, oldIndex, newIndex);
            reorderSection('projects', newOrder);
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(current => current === id ? null : id);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Projects</h2>
                    <p className="text-slate-400 text-sm">Showcase your best engineering or design projects.</p>
                </div>
                <button
                    onClick={() => addProject()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/20"
                >
                    <Plus size={16} /> Add Project
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={resumeData.projects.map(p => p.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4">
                        {resumeData.projects.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/30">
                                <FolderGit2 className="mx-auto h-12 w-12 text-slate-700 mb-3" />
                                <h3 className="text-slate-400 font-medium">No projects added yet</h3>
                                <p className="text-slate-600 text-xs mt-1">Click the button above to add a project</p>
                            </div>
                        ) : (
                            resumeData.projects.map((proj, index) => (
                                <SortableProjectItem
                                    key={proj.id}
                                    project={proj}
                                    index={index}
                                    onUpdate={updateProject}
                                    onRemove={removeProject}
                                    expanded={expandedId === proj.id}
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
