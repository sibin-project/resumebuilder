import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowRight, Search } from "lucide-react";

import api_url from "../config";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${api_url}/api/public/blog`);
            const data = await res.json();
            if (data.success) {
                setPosts(data.posts);
            }
        } catch (err) {
            console.error("Failed to fetch blog posts", err);
        } finally {
            setLoading(false);
        }
    };

    // Get unique categories
    const categories = ["All", ...new Set(posts.map(post => post.category))];

    // Filter posts
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Our Blog
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        Insights, tips, and stories to help you build better resumes
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <div className="mb-8 md:mb-12 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
                    {/* Search Bar */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${selectedCategory === category
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Posts Grid */}
                {loading ? (
                    <div className="text-center py-20 text-slate-400">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                        <p className="mt-4">Loading posts...</p>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No posts found</h3>
                        <p className="text-slate-400">
                            {searchTerm || selectedCategory !== "All"
                                ? "Try adjusting your search or filter"
                                : "Check back soon for new content!"}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredPosts.map((post, idx) => (
                            <motion.article
                                key={post._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all group"
                            >
                                {/* Post Image */}
                                {post.image && (
                                    <div className="aspect-video overflow-hidden bg-slate-700">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}

                                {/* Post Content */}
                                <div className="p-6">
                                    {/* Category & Date */}
                                    <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <Tag size={16} />
                                            <span className="bg-slate-700 px-2 py-1 rounded-lg text-xs font-medium">
                                                {post.category}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={16} />
                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                        {post.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    {/* Author & Read More */}
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <User size={16} />
                                            <span>{post.author || "Admin"}</span>
                                        </div>
                                        <Link
                                            to={`/blog/${post._id}`}
                                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-sm group-hover:gap-2 transition-all"
                                        >
                                            Read More <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}

                {/* Results Count */}
                {!loading && filteredPosts.length > 0 && (
                    <div className="mt-12 text-center text-slate-400">
                        Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
