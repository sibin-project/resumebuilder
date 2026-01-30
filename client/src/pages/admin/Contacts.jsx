import React, { useState, useEffect } from "react";
import { Trash2, Mail } from "lucide-react";

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contacts`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setContacts(data.contacts);
            }
        } catch (err) {
            console.error("Failed to fetch contacts", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this message?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contacts/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setContacts(contacts.filter(c => c._id !== id));
            }
        } catch (err) {
            console.error("Failed to delete contact", err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Messages</h2>

            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-12 text-slate-400">Loading messages...</div>
                ) : contacts.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">No messages found</div>
                ) : (
                    contacts.map(contact => (
                        <div key={contact._id} className="bg-slate-800 border border-slate-700 p-4 md:p-6 rounded-2xl hover:border-blue-500/50 transition-colors">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg flex-shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-white truncate">{contact.name}</h3>
                                        <p className="text-sm text-slate-400 truncate">{contact.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-4">
                                    <span className="text-xs text-slate-500">
                                        {new Date(contact.createdAt).toLocaleDateString()}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-3 md:p-4 rounded-xl text-sm md:text-base break-words">
                                {contact.message}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Contacts;
