import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowLeft, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";

import api_url from "../config";

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            const res = await fetch(`${api_url}/api/public/blog/${id}`);
            const data = await res.json();

            if (data.success) {
                setPost(data.post);
            } else {
                setError("Post not found");
            }
        } catch (err) {
            console.error("Failed to fetch blog post", err);
            setError("Failed to load post");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-4 text-slate-400">Loading post...</p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center py-20">
                    <div className="text-6xl mb-4">📭</div>
                    <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
                    <p className="text-slate-400 mb-8">{error || "The blog post you're looking for doesn't exist."}</p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = post.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate("/blog")}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </motion.button>

                {/* Article Header */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden"
                >
                    {/* Featured Image */}
                    {post.image && (
                        <div className="aspect-video md:aspect-[21/9] overflow-hidden bg-slate-700">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-6 md:p-12">
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <Tag size={16} />
                                <span className="bg-slate-700 px-3 py-1 rounded-lg text-xs font-medium text-blue-400">
                                    {post.category}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={16} />
                                <span>{post.author || "Admin"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{readingTime} min read</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Excerpt */}
                        <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed border-l-4 border-blue-500 pl-6 italic">
                            {post.excerpt}
                        </p>

                        {/* Divider */}
                        <div className="border-t border-slate-700 my-8"></div>

                        {/* Article Content with Markdown */}
                        <div className="prose prose-invert prose-lg max-w-none">
                            <ReactMarkdown
                                components={{
                                    h1: ({ children }) => (
                                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-8">{children}</h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-6">{children}</h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 mt-5">{children}</h3>
                                    ),
                                    p: ({ children }) => (
                                        <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">{children}</ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-2">{children}</ol>
                                    ),
                                    li: ({ children }) => (
                                        <li className="text-slate-300 ml-4">{children}</li>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="text-white font-bold">{children}</strong>
                                    ),
                                    code: ({ children }) => (
                                        <code className="bg-slate-900 text-blue-400 px-2 py-1 rounded text-sm">{children}</code>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-400 my-4">{children}</blockquote>
                                    ),
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-slate-700">
                                <h3 className="text-sm font-medium text-slate-400 mb-3">Tags:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-slate-700 text-slate-300 px-3 py-1 rounded-lg text-sm hover:bg-slate-600 transition-colors"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share & Navigate */}
                        <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                            <Link
                                to="/blog"
                                className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                            >
                                <ArrowLeft size={20} />
                                More Articles
                            </Link>

                            <div className="text-sm text-slate-400">
                                Published on {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </motion.article>
            </div>
        </div>
    );
};

export default BlogPost;
