import React, { useState, useEffect } from "react";
import { Trash2, Edit, Plus, X } from "lucide-react";

const BlogManager = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "General",
        image: ""
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/public/blog`);
            const data = await res.json();
            if (data.success) {
                setPosts(data.posts);
            }
        } catch (err) {
            console.error("Failed to fetch posts", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const url = currentPost
            ? `${import.meta.env.VITE_API_URL}/api/admin/blog/${currentPost._id}`
            : `${import.meta.env.VITE_API_URL}/api/admin/blog`;

        const method = currentPost ? "PUT" : "POST";

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
                fetchPosts();
                setIsEditing(false);
                setFormData({ title: "", excerpt: "", content: "", category: "General", image: "" });
                setCurrentPost(null);
            }
        } catch (err) {
            console.error("Failed to save post", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this post?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/blog/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setPosts(posts.filter(p => p._id !== id));
            }
        } catch (err) {
            console.error("Failed to delete post", err);
        }
    };

    const startEdit = (post) => {
        setCurrentPost(post);
        setFormData({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            image: post.image || ""
        });
        setIsEditing(true);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Blog Management</h2>
                {!isEditing && (
                    <button
                        onClick={() => {
                            setCurrentPost(null);
                            setFormData({ title: "", excerpt: "", content: "", category: "General", image: "" });
                            setIsEditing(true);
                        }}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                    >
                        <Plus size={20} /> New Post
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-slate-800 border border-slate-700 p-4 md:p-8 rounded-2xl max-w-3xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg md:text-xl font-bold text-white">
                            {currentPost ? "Edit Post" : "New Post"}
                        </h3>
                        <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Excerpt</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 h-24 resize-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Content (Markdown supported)</label>
                            <textarea
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 h-48 md:h-64 font-mono text-sm"
                                required
                            />
                        </div>

                        <div className="flex flex-col-reverse md:flex-row justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-3 text-slate-400 hover:text-white transition-colors border border-slate-700 rounded-xl"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
                            >
                                {currentPost ? "Update Post" : "Publish Post"}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid gap-4">
                    {loading ? (
                        <div className="text-center py-12 text-slate-400">Loading posts...</div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">No posts found</div>
                    ) : (
                        posts.map(post => (
                            <div key={post._id} className="bg-slate-800 border border-slate-700 p-4 md:p-6 rounded-2xl group hover:border-blue-500/50 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="min-w-0">
                                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 truncate">{post.title}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-slate-400">
                                            <span className="bg-slate-700 px-2 py-1 rounded-lg">{post.category}</span>
                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex-shrink-0">
                                        <button
                                            onClick={() => startEdit(post)}
                                            className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                        >
                                            <Edit size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={20} />
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

export default BlogManager;
