'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    Plus,
    Edit,
    Trash2,
    Save,
    X,
    Image as ImageIcon,
    Type,
    Layout,
    LogOut,
    Layers,
    Briefcase,
    GraduationCap,
    MessageSquare,
    Users,
    FileCheck,
    Download,
    Phone,
    Mail,
    User,
    AlertTriangle,
    CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';

// ─── URL Validation ───────────────────────────────────────────────
function isValidImageUrl(url: string | undefined | null): boolean {
    if (!url || url.trim() === '') return false;
    try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
        return false;
    }
}

function getSafeImageUrl(url: string | undefined | null): string {
    if (isValidImageUrl(url)) return url as string;
    return 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80';
}

// ─── Toast Notification Component ─────────────────────────────────
interface ToastData {
    id: number;
    message: string;
    type: 'error' | 'success';
}

function ToastContainer({ toasts, onDismiss }: { toasts: ToastData[]; onDismiss: (id: number) => void }) {
    return (
        <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3" style={{ maxWidth: 420 }}>
            <AnimatePresence>
                {toasts.map((t) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, x: 80, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 80, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={`flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl cursor-pointer ${t.type === 'error'
                            ? 'bg-red-50/95 border-red-200 text-red-800 shadow-red-500/10'
                            : 'bg-emerald-50/95 border-emerald-200 text-emerald-800 shadow-emerald-500/10'
                            }`}
                        onClick={() => onDismiss(t.id)}
                    >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${t.type === 'error' ? 'bg-red-100' : 'bg-emerald-100'
                            }`}>
                            {t.type === 'error'
                                ? <AlertTriangle className="w-4 h-4 text-red-500" />
                                : <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            }
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm leading-snug">{t.message}</p>
                            <p className="text-[10px] font-medium opacity-60 mt-0.5 uppercase tracking-wider">Tap to dismiss</p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

type ContentType = 'trainings' | 'services' | 'industries' | 'inquiries' | 'trainers' | 'licenses';

interface TabConfig {
    id: ContentType;
    label: string;
    icon: React.ElementType;
    api: string;
    isPrivate?: boolean;
}

const TABS: TabConfig[] = [
    { id: 'trainings', label: 'Trainings', icon: GraduationCap, api: '/api/trainings' },
    { id: 'services', label: 'Services', icon: Briefcase, api: '/api/services' },
    { id: 'industries', label: 'Industries', icon: Layers, api: '/api/industries' },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare, api: '/api/inquiries', isPrivate: true },
    { id: 'trainers', label: 'Trainers', icon: Users, api: '/api/trainers', isPrivate: true },
    { id: 'licenses', label: 'Licenses', icon: FileCheck, api: '/api/licenses', isPrivate: true }
];

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState<ContentType>('trainings');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [items, setItems] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // ─── Toast State ──────────────────────────────────────────────
    const [toasts, setToasts] = useState<ToastData[]>([]);
    const toastIdRef = React.useRef(0);

    const showToast = (message: string, type: 'error' | 'success' = 'error') => {
        const id = ++toastIdRef.current;
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
    };

    const dismissToast = (id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    // ─── Image URL Validation Errors ──────────────────────────────
    const [imageUrlErrors, setImageUrlErrors] = useState<Record<string, string>>({});

    const fetchItems = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(TABS.find(t => t.id === activeTab)!.api);
            const data = await res.json();
            // Normalize MongoDB _id → id for all items
            const normalized = Array.isArray(data)
                ? data.map((item: Record<string, unknown>) => ({
                    ...item,
                    id: item.id || item._id,
                }))
                : [];
            setItems(normalized);
        } catch (error) {
            console.error(`Failed to fetch ${activeTab}:`, error);
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem) return;

        // ─── URL Validation before saving ─────────────────────────
        if (['trainings', 'services', 'industries'].includes(activeTab)) {
            const errors: string[] = [];
            const newUrlErrors: Record<string, string> = {};

            if (editingItem.image && editingItem.image.trim() !== '' && !isValidImageUrl(editingItem.image)) {
                errors.push('Hero Image URL');
                newUrlErrors.image = 'Please enter a valid URL starting with https://';
            }
            if (!editingItem.image || editingItem.image.trim() === '') {
                errors.push('Hero Image URL');
                newUrlErrors.image = 'Image URL is required';
            }

            if (activeTab !== 'trainings') {
                if (editingItem.secondaryImage && editingItem.secondaryImage.trim() !== '' && !isValidImageUrl(editingItem.secondaryImage)) {
                    errors.push('Secondary Image URL');
                    newUrlErrors.secondaryImage = 'Please enter a valid URL starting with https://';
                }
                if (!editingItem.secondaryImage || editingItem.secondaryImage.trim() === '') {
                    errors.push('Secondary Image URL');
                    newUrlErrors.secondaryImage = 'Image URL is required';
                }
            }

            setImageUrlErrors(newUrlErrors);

            if (errors.length > 0) {
                showToast(`⚠️ Invalid URL — Please add a valid image URL for: ${errors.join(', ')}. URLs must start with https://`, 'error');
                return;
            }
        }

        setImageUrlErrors({});

        // ─── Sanitize Slug ───────────────────────────────────────
        if (editingItem.slug) {
            editingItem.slug = editingItem.slug.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        }

        const api = TABS.find(t => t.id === activeTab)!.api;
        const method = editingItem.id ? 'PUT' : 'POST';
        const url = editingItem.id ? `${api}/${editingItem.id}` : api;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingItem),
            });
            if (res.ok) {
                fetchItems();
                setIsEditing(false);
                setEditingItem(null);
                showToast(`✅ ${activeTab.slice(0, -1)} saved successfully!`, 'success');
            }
        } catch (error) {
            console.error(`Failed to save ${activeTab}:`, error);
            showToast('❌ Failed to save. Please try again.', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) return;

        const api = TABS.find(t => t.id === activeTab)!.api;
        try {
            const res = await fetch(`${api}/${id}`, { method: 'DELETE' });
            if (res.ok) fetchItems();
        } catch (error) {
            console.error(`Failed to delete ${activeTab}:`, error);
        }
    };

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(items);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, activeTab);
        XLSX.writeFile(workbook, `${activeTab}_report_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });
            if (res.ok) {
                router.push('/ADMINTRYITTECH-LLP/login');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const startNew = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let base: any = {};
        if (activeTab === 'trainings') {
            base = { slug: '', title: '', description: '', longDescription: '', icon: 'Laptop', image: '', modules: [] };
        } else if (activeTab === 'services') {
            base = { slug: '', title: '', icon: 'Briefcase', image: '', secondaryImage: '', shortDescription: '', fullDescription: '', benefits: [], process: [] };
        } else if (activeTab === 'industries') {
            base = { slug: '', name: '', image: '', secondaryImage: '', icon: 'Cpu', info: '', overview: '', segments: [], solutions: [], insights: [], edge: [] };
        } else if (activeTab === 'trainers') {
            base = { name: '', mobile: '', email: '', expertise: '', details: {} };
        } else if (activeTab === 'licenses') {
            base = { name: '', license_number: '', start_date: '', end_date: '', status: 'Active', details: {} };
        }
        setEditingItem(base);
        setIsEditing(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const startEdit = (item: any) => {
        setEditingItem(item);
        setIsEditing(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleArrayAction = (field: string, action: 'add' | 'remove' | 'update', index?: number, value?: any) => {
        if (!editingItem) return;
        const current = [...(editingItem[field] || [])];
        if (action === 'add') current.push(value || '');
        if (action === 'remove' && index !== undefined) current.splice(index, 1);
        if (action === 'update' && index !== undefined) current[index] = value;
        setEditingItem({ ...editingItem, [field]: current });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDetailAction = (action: 'add' | 'remove' | 'update', key: string, value?: any, newKey?: string) => {
        if (!editingItem) return;
        const currentDetails = { ...(editingItem.details || {}) };
        if (action === 'add') currentDetails[key] = value || '';
        if (action === 'remove') delete currentDetails[key];
        if (action === 'update') {
            if (newKey && newKey !== key) {
                delete currentDetails[key];
                currentDetails[newKey] = value;
            } else {
                currentDetails[key] = value;
            }
        }
        setEditingItem({ ...editingItem, details: currentDetails });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderItemCard = (item: any) => {
        if (activeTab === 'inquiries') {
            return (
                <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {item.source}
                        </div>
                        <span className="text-slate-400 text-[10px] font-mono">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-900">{item.name}</h3>
                        <p className="text-[#008C78] font-bold text-sm tracking-tight">{item.service}</p>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-slate-50">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Phone className="w-3.5 h-3.5" /> {item.mobile}
                        </div>
                        {item.email && (
                            <div className="flex items-center gap-2 text-slate-500 text-sm line-clamp-1">
                                <Mail className="w-3.5 h-3.5" /> {item.email}
                            </div>
                        )}
                    </div>
                    <p className="text-slate-600 text-sm line-clamp-3 bg-slate-50 p-3 rounded-xl italic">
                        &quot;{item.message}&quot;
                    </p>
                </div>
            );
        }

        if (activeTab === 'trainers') {
            return (
                <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 bg-[#008C78]/10 rounded-2xl flex items-center justify-center mb-4">
                            <User className="text-[#008C78] w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900">{item.name}</h3>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">{item.expertise || 'General Expert'}</p>
                        <div className="mt-4 space-y-1 text-sm text-slate-600">
                            <p className="font-medium">📞 {item.mobile}</p>
                            <p className="font-medium">✉️ {item.email}</p>
                        </div>
                        {item.details && Object.keys(item.details).length > 0 && (
                            <div className="mt-4 pt-4 border-t border-slate-50 flex flex-wrap gap-2">
                                {Object.entries(item.details).slice(0, 3).map(([k, v], i) => (
                                    <div key={i} className="bg-slate-50/50 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-500 border border-slate-100">
                                        <span className="text-[#008C78] opacity-70 mr-1">{k}:</span> {v as string}
                                    </div>
                                ))}
                                {Object.keys(item.details).length > 3 && (
                                    <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest flex items-center px-1">
                                        +{Object.keys(item.details).length - 3} More
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2 mt-6 pt-6 border-t border-slate-50">
                        <button onClick={() => startEdit(item)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-[#008C78] hover:bg-[#008C78]/10 transition-all flex items-center justify-center">
                            <Edit className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            );
        }

        if (activeTab === 'licenses') {
            const isExpired = item.end_date ? new Date(item.end_date) < new Date() : false;
            return (
                <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block mb-4 ${isExpired ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                            {isExpired ? 'Expired' : item.status}
                        </div>
                        <h3 className="text-xl font-black text-slate-900">{item.name}</h3>
                        <p className="text-slate-400 font-mono text-xs mt-1">Ref: {item.license_number}</p>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-[10px] font-black text-slate-300 uppercase block">Valid From</span>
                                <span className="text-sm font-bold text-slate-600">{item.start_date ? new Date(item.start_date).toLocaleDateString() : '—'}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-black text-slate-300 uppercase block">Expires On</span>
                                <span className="text-sm font-bold text-slate-900">{item.end_date ? new Date(item.end_date).toLocaleDateString() : '—'}</span>
                            </div>
                        </div>
                        {item.details && Object.keys(item.details).length > 0 && (
                            <div className="mt-4 pt-4 border-t border-slate-50 flex flex-wrap gap-2">
                                {Object.entries(item.details).slice(0, 3).map(([k, v], i) => (
                                    <div key={i} className="bg-slate-50/50 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-500 border border-slate-100">
                                        <span className="text-[#008C78] opacity-70 mr-1">{k}:</span> {v as string}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2 mt-6 pt-6 border-t border-slate-50">
                        <button onClick={() => startEdit(item)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-[#008C78] hover:bg-[#008C78]/10 transition-all flex items-center justify-center">
                            <Edit className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div key={item.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 group hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
                    <Image
                        src={getSafeImageUrl(item.image)}
                        alt={item.title || item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-black text-xl tracking-tight leading-tight">
                            {item.title || item.name}
                        </h3>
                        <p className="text-white/60 text-xs font-mono mt-1">{item.slug}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <button onClick={() => startEdit(item)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-[#008C78] hover:bg-[#008C78]/10 transition-all flex items-center justify-center">
                            <Edit className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <main className="bg-slate-50 min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-[#020617] tracking-tight">Admin Console</h1>
                        <p className="text-slate-500 font-medium">Manage your website content and internal operations</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleLogout}
                            className="bg-white text-slate-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-all border border-slate-200"
                        >
                            <LogOut className="w-5 h-5" />
                            Log Out
                        </button>
                        {['inquiries', 'trainers', 'licenses'].includes(activeTab) && (
                            <button
                                onClick={handleExportExcel}
                                className="bg-white text-[#008C78] border border-[#008C78] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#008C78] hover:text-white transition-all shadow-lg shadow-[#008C78]/10"
                            >
                                <Download className="w-5 h-5" />
                                Export Excel
                            </button>
                        )}
                        {activeTab !== 'inquiries' && (
                            <button
                                onClick={startNew}
                                className="bg-[#008C78] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#020617] transition-all shadow-lg shadow-[#008C78]/20"
                            >
                                <Plus className="w-5 h-5" />
                                Add {activeTab.slice(0, -1)}
                            </button>
                        )}
                    </div>
                </header>

                <div className="flex p-1 bg-slate-200/50 rounded-2xl w-full overflow-x-auto mb-12">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-white text-[#008C78] shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                            {tab.isPrivate && <span className="text-[10px] bg-slate-100 px-1.5 rounded-sm">Pvt</span>}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64 text-slate-400 font-bold uppercase tracking-widest animate-pulse">
                        Synchronizing {activeTab}...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.length === 0 ? (
                            <div className="col-span-full text-center py-20 bg-white rounded-[32px] border border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No records found in {activeTab}</p>
                            </div>
                        ) : (
                            items.map((item) => renderItemCard(item))
                        )}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isEditing && (
                    <div className="fixed inset-0 z-50 flex items-center justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditing(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                            className="relative w-full max-w-4xl h-full bg-white shadow-2xl overflow-y-auto"
                        >
                            <div className="p-12 pb-40">
                                <div className="flex justify-between items-center mb-12">
                                    <div>
                                        <h2 className="text-3xl font-black text-[#020617] tracking-tight capitalize">
                                            {editingItem?.id ? 'Edit' : 'New'} {activeTab.slice(0, -1)}
                                        </h2>
                                        <p className="text-slate-400 font-medium tracking-tight">Update your private {activeTab.slice(0, -1)} registry</p>
                                    </div>
                                    <button onClick={() => setIsEditing(false)} className="w-12 h-12 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center transition-colors">
                                        <X className="w-6 h-6 text-slate-400" />
                                    </button>
                                </div>

                                <form onSubmit={handleSave} className="space-y-10">
                                    {/* Trainers Form */}
                                    {activeTab === 'trainers' && (
                                        <div className="space-y-8">
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Full Name</label>
                                                    <input value={editingItem.name} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} className="w-full bg-slate-50 p-4 border rounded-2xl font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Expertise</label>
                                                    <input value={editingItem.expertise} onChange={e => setEditingItem({ ...editingItem, expertise: e.target.value })} className="w-full bg-slate-50 p-4 border rounded-2xl font-bold" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Mobile</label>
                                                    <input value={editingItem.mobile} onChange={e => setEditingItem({ ...editingItem, mobile: e.target.value })} className="w-full bg-slate-50 p-4 border rounded-2xl font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Email</label>
                                                    <input value={editingItem.email} onChange={e => setEditingItem({ ...editingItem, email: e.target.value })} className="w-full bg-slate-50 p-4 border rounded-2xl font-bold" />
                                                </div>
                                            </div>

                                            {/* Dynamic Details Section */}
                                            <div className="space-y-6 pt-6 border-t border-slate-100">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Additional Credentials & Details</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDetailAction('add', `Field_${Object.keys(editingItem.details || {}).length + 1}`, '')}
                                                        className="text-[#008C78] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:opacity-70 transition-opacity p-2 bg-emerald-50 rounded-lg"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" /> Add More Fields
                                                    </button>
                                                </div>
                                                <div className="grid gap-4">
                                                    {Object.entries(editingItem.details || {}).map(([key, val], idx) => (
                                                        <div key={idx} className="flex gap-4 items-end bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                                            <div className="flex-1 space-y-2">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Label Name</label>
                                                                <input
                                                                    value={key}
                                                                    onChange={e => handleDetailAction('update', key, val, e.target.value)}
                                                                    className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 font-bold text-xs outline-none focus:border-[#008C78] transition-all"
                                                                    placeholder="e.g. Experience"
                                                                />
                                                            </div>
                                                            <div className="flex-[2] space-y-2">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Value / Info</label>
                                                                <input
                                                                    value={val as string}
                                                                    onChange={e => handleDetailAction('update', key, e.target.value)}
                                                                    className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 font-bold text-xs outline-none focus:border-[#008C78] transition-all"
                                                                    placeholder="e.g. 10+ Years in Tech"
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDetailAction('remove', key)}
                                                                className="w-10 h-10 flex-shrink-0 bg-white text-red-400 border border-red-50 rounded-xl flex items-center justify-center hover:bg-red-50 transition-colors shadow-sm"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {Object.keys(editingItem.details || {}).length === 0 && (
                                                        <p className="text-center py-6 text-slate-300 text-xs font-medium italic border-2 border-dashed border-slate-100 rounded-2xl">
                                                            No additional fields added yet.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Licenses Form */}
                                    {activeTab === 'licenses' && (
                                        <div className="space-y-8">
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">License Name</label>
                                                    <input value={editingItem.name} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} className="w-full bg-slate-50 p-4 border rounded-2xl font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">License Number</label>
                                                    <input value={editingItem.license_number} onChange={e => setEditingItem({ ...editingItem, license_number: e.target.value })} className="w-full bg-slate-50 p-4 border rounded-2xl font-bold" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Start Date</label>
                                                    <input type="date" value={editingItem.start_date?.split('T')[0]} onChange={e => setEditingItem({ ...editingItem, start_date: e.target.value })} className="w-full bg-slate-50 p-4 border rounded-2xl font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">End Date</label>
                                                    <input type="date" value={editingItem.end_date?.split('T')[0]} onChange={e => setEditingItem({ ...editingItem, end_date: e.target.value })} className="w-full bg-slate-50 p-4 border rounded-2xl font-bold" />
                                                </div>
                                            </div>

                                            {/* Dynamic Details Section */}
                                            <div className="space-y-6 pt-6 border-t border-slate-100">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Additional License Information</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDetailAction('add', `Info_${Object.keys(editingItem.details || {}).length + 1}`, '')}
                                                        className="text-[#008C78] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:opacity-70 transition-opacity p-2 bg-emerald-50 rounded-lg"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" /> Add More Fields
                                                    </button>
                                                </div>
                                                <div className="grid gap-4">
                                                    {Object.entries(editingItem.details || {}).map(([key, val], idx) => (
                                                        <div key={idx} className="flex gap-4 items-end bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                                            <div className="flex-1 space-y-2">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Detail Type</label>
                                                                <input
                                                                    value={key}
                                                                    onChange={e => handleDetailAction('update', key, val, e.target.value)}
                                                                    className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 font-bold text-xs outline-none focus:border-[#008C78] transition-all"
                                                                    placeholder="e.g. Issuing Body"
                                                                />
                                                            </div>
                                                            <div className="flex-[2] space-y-2">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Information</label>
                                                                <input
                                                                    value={val as string}
                                                                    onChange={e => handleDetailAction('update', key, e.target.value)}
                                                                    className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 font-bold text-xs outline-none focus:border-[#008C78] transition-all"
                                                                    placeholder="e.g. Microsoft Azure"
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDetailAction('remove', key)}
                                                                className="w-10 h-10 flex-shrink-0 bg-white text-red-400 border border-red-50 rounded-xl flex items-center justify-center hover:bg-red-50 transition-colors shadow-sm"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {Object.keys(editingItem.details || {}).length === 0 && (
                                                        <p className="text-center py-6 text-slate-300 text-xs font-medium italic border-2 border-dashed border-slate-100 rounded-2xl">
                                                            No custom fields added yet.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Standard Website Content Form */}
                                    {['trainings', 'services', 'industries'].includes(activeTab) && (
                                        <div className="space-y-10">
                                            <section className="space-y-6">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 border-b border-slate-100 pb-2">Identification & Visuals</h4>
                                                <div className="grid grid-cols-2 gap-8">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Title / Name</label>
                                                        <div className="relative">
                                                            <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                            <input
                                                                required
                                                                value={editingItem?.title || editingItem?.name || ''}
                                                                onChange={e => setEditingItem({ ...editingItem, [activeTab === 'industries' ? 'name' : 'title']: e.target.value })}
                                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 font-bold text-[#020617] outline-none border-transparent focus:border-[#008C78] transition-all"
                                                                placeholder="e.g. Advanced AI Training"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Slug</label>
                                                        <div className="relative">
                                                            <Layout className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                            <input
                                                                required
                                                                value={editingItem?.slug || ''}
                                                                onChange={e => {
                                                                    const val = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                                                                    setEditingItem({ ...editingItem, slug: val });
                                                                }}
                                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 font-bold text-[#020617] outline-none border-transparent focus:border-[#008C78] transition-all"
                                                                placeholder="e.g. ai-training"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-8">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Hero Image URL</label>
                                                        <div className="relative">
                                                            <ImageIcon className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${imageUrlErrors.image ? 'text-red-400' : 'text-slate-400'}`} />
                                                            <input
                                                                required
                                                                value={editingItem?.image || ''}
                                                                onChange={e => {
                                                                    setEditingItem({ ...editingItem, image: e.target.value });
                                                                    if (imageUrlErrors.image) setImageUrlErrors(prev => ({ ...prev, image: '' }));
                                                                }}
                                                                onBlur={() => {
                                                                    const val = editingItem?.image;
                                                                    if (val && val.trim() !== '' && !isValidImageUrl(val)) {
                                                                        setImageUrlErrors(prev => ({ ...prev, image: 'Please enter a valid URL (e.g. https://example.com/image.jpg)' }));
                                                                    } else {
                                                                        setImageUrlErrors(prev => ({ ...prev, image: '' }));
                                                                    }
                                                                }}
                                                                className={`w-full bg-slate-50 border rounded-2xl pl-12 pr-4 py-4 font-bold text-[#020617] outline-none transition-all ${imageUrlErrors.image
                                                                    ? 'border-red-400 bg-red-50/50 focus:border-red-500'
                                                                    : 'border-slate-200 focus:border-[#008C78]'
                                                                    }`}
                                                                placeholder="https://example.com/image.jpg"
                                                            />
                                                        </div>
                                                        {imageUrlErrors.image && (
                                                            <p className="text-red-500 text-xs font-bold flex items-center gap-1.5 mt-1">
                                                                <AlertTriangle className="w-3 h-3" />
                                                                {imageUrlErrors.image}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {activeTab !== 'trainings' && (
                                                        <div className="space-y-2">
                                                            <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Secondary Image URL</label>
                                                            <div className="relative">
                                                                <ImageIcon className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${imageUrlErrors.secondaryImage ? 'text-red-400' : 'text-slate-400'}`} />
                                                                <input
                                                                    required
                                                                    value={editingItem?.secondaryImage || ''}
                                                                    onChange={e => {
                                                                        setEditingItem({ ...editingItem, secondaryImage: e.target.value });
                                                                        if (imageUrlErrors.secondaryImage) setImageUrlErrors(prev => ({ ...prev, secondaryImage: '' }));
                                                                    }}
                                                                    onBlur={() => {
                                                                        const val = editingItem?.secondaryImage;
                                                                        if (val && val.trim() !== '' && !isValidImageUrl(val)) {
                                                                            setImageUrlErrors(prev => ({ ...prev, secondaryImage: 'Please enter a valid URL (e.g. https://example.com/image.jpg)' }));
                                                                        } else {
                                                                            setImageUrlErrors(prev => ({ ...prev, secondaryImage: '' }));
                                                                        }
                                                                    }}
                                                                    className={`w-full bg-slate-50 border rounded-2xl pl-12 pr-4 py-4 font-bold text-[#020617] outline-none transition-all ${imageUrlErrors.secondaryImage
                                                                        ? 'border-red-400 bg-red-50/50 focus:border-red-500'
                                                                        : 'border-slate-200 focus:border-[#008C78]'
                                                                        }`}
                                                                    placeholder="https://example.com/secondary.jpg"
                                                                />
                                                            </div>
                                                            {imageUrlErrors.secondaryImage && (
                                                                <p className="text-red-500 text-xs font-bold flex items-center gap-1.5 mt-1">
                                                                    <AlertTriangle className="w-3 h-3" />
                                                                    {imageUrlErrors.secondaryImage}
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </section>

                                            <section className="space-y-6">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 border-b border-slate-100 pb-2">Strategic Content</h4>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Short Description / Overview</label>
                                                    <textarea
                                                        required
                                                        value={editingItem?.description || editingItem?.shortDescription || editingItem?.info || ''}
                                                        onChange={e => setEditingItem({ ...editingItem, [activeTab === 'trainings' ? 'description' : activeTab === 'services' ? 'shortDescription' : 'info']: e.target.value })}
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-[#020617] min-h-[100px] outline-none border-transparent focus:border-[#008C78] transition-all"
                                                        placeholder="A concise summary..."
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Long Description / Full Overview</label>
                                                    <textarea
                                                        required
                                                        value={editingItem?.longDescription || editingItem?.fullDescription || editingItem?.overview || ''}
                                                        onChange={e => setEditingItem({ ...editingItem, [activeTab === 'trainings' ? 'longDescription' : activeTab === 'services' ? 'fullDescription' : 'overview']: e.target.value })}
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-[#020617] min-h-[200px] outline-none border-transparent focus:border-[#008C78] transition-all"
                                                        placeholder="Detailed story and strategy..."
                                                    />
                                                </div>
                                            </section>

                                            <section className="space-y-8">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 border-b border-slate-100 pb-2">Dynamic Components & Frameworks</h4>

                                                {activeTab === 'trainings' && (
                                                    <div className="space-y-4">
                                                        <div className="flex justify-between items-center">
                                                            <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Curriculum Modules</label>
                                                            <button type="button" onClick={() => handleArrayAction('modules', 'add')} className="text-[#008C78] text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#008C78]/5 px-4 py-2 rounded-lg transition-all">
                                                                <Plus className="w-4 h-4" /> Add Module
                                                            </button>
                                                        </div>
                                                        <div className="grid gap-3">
                                                            {editingItem?.modules?.map((m: string, idx: number) => (
                                                                <div key={idx} className="flex gap-4 items-center">
                                                                    <input value={m} onChange={e => handleArrayAction('modules', 'update', idx, e.target.value)} className="flex-1 bg-slate-50 border border-transparent focus:border-[#008C78] rounded-xl px-4 py-3 font-bold text-[#020617] outline-none transition-all" />
                                                                    <button type="button" onClick={() => handleArrayAction('modules', 'remove', idx)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {activeTab === 'services' && (
                                                    <div className="grid grid-cols-2 gap-12">
                                                        <div className="space-y-6">
                                                            <div className="flex justify-between items-center">
                                                                <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Key Benefits</label>
                                                                <button type="button" onClick={() => handleArrayAction('benefits', 'add')} className="text-[#008C78] text-[10px] font-black uppercase tracking-widest"><Plus className="w-3 h-3 inline mr-1" /> Add</button>
                                                            </div>
                                                            <div className="space-y-3">
                                                                {editingItem?.benefits?.map((b: string, idx: number) => (
                                                                    <div key={idx} className="flex gap-3">
                                                                        <input value={b} onChange={e => handleArrayAction('benefits', 'update', idx, e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-[#020617] outline-none" />
                                                                        <button type="button" onClick={() => handleArrayAction('benefits', 'remove', idx)} className="text-slate-300 hover:text-red-500"><X className="w-4 h-4" /></button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="space-y-6">
                                                            <div className="flex justify-between items-center">
                                                                <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Methodology Steps</label>
                                                                <button type="button" onClick={() => handleArrayAction('process', 'add')} className="text-[#008C78] text-[10px] font-black uppercase tracking-widest"><Plus className="w-3 h-3 inline mr-1" /> Add</button>
                                                            </div>
                                                            <div className="space-y-3">
                                                                {editingItem?.process?.map((p: string, idx: number) => (
                                                                    <div key={idx} className="flex gap-3">
                                                                        <input value={p} onChange={e => handleArrayAction('process', 'update', idx, e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-[#020617] outline-none" />
                                                                        <button type="button" onClick={() => handleArrayAction('process', 'remove', idx)} className="text-slate-300 hover:text-red-500"><X className="w-4 h-4" /></button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {activeTab === 'industries' && (
                                                    <div className="space-y-12">
                                                        {/* Segments Section */}
                                                        <div className="space-y-6">
                                                            <div className="flex justify-between items-center">
                                                                <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Market Segments Served</label>
                                                                <button type="button" onClick={() => handleArrayAction('segments', 'add', undefined, { title: '', description: '' })} className="text-[#008C78] text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                                                    <Plus className="w-4 h-4" /> Add Segment
                                                                </button>
                                                            </div>
                                                            <div className="space-y-4">
                                                                {editingItem?.segments?.map((s: any, idx: number) => (
                                                                    <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
                                                                        <div className="flex-1 space-y-4">
                                                                            <input placeholder="Segment Title" value={s.title} onChange={e => handleArrayAction('segments', 'update', idx, { ...s, title: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm" />
                                                                            <textarea placeholder="Segment Description" value={s.description} onChange={e => handleArrayAction('segments', 'update', idx, { ...s, description: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm min-h-[80px]" />
                                                                        </div>
                                                                        <button type="button" onClick={() => handleArrayAction('segments', 'remove', idx)} className="text-slate-300 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Solutions Section */}
                                                        <div className="space-y-6 pt-6 border-t border-slate-100">
                                                            <div className="flex justify-between items-center">
                                                                <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Strategic Solutions</label>
                                                                <button type="button" onClick={() => handleArrayAction('solutions', 'add', undefined, { title: '', description: '' })} className="text-[#008C78] text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                                                    <Plus className="w-4 h-4" /> Add Solution
                                                                </button>
                                                            </div>
                                                            <div className="space-y-4">
                                                                {editingItem?.solutions?.map((s: any, idx: number) => (
                                                                    <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
                                                                        <div className="flex-1 space-y-4">
                                                                            <input placeholder="Solution Title" value={s.title} onChange={e => handleArrayAction('solutions', 'update', idx, { ...s, title: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm" />
                                                                            <textarea placeholder="Solution Description" value={s.description} onChange={e => handleArrayAction('solutions', 'update', idx, { ...s, description: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm min-h-[80px]" />
                                                                        </div>
                                                                        <button type="button" onClick={() => handleArrayAction('solutions', 'remove', idx)} className="text-slate-300 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Insights Section */}
                                                        <div className="space-y-6 pt-6 border-t border-slate-100">
                                                            <div className="flex justify-between items-center">
                                                                <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Domain Insights</label>
                                                                <button type="button" onClick={() => handleArrayAction('insights', 'add', undefined, { title: '', category: '', image: '' })} className="text-[#008C78] text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                                                    <Plus className="w-4 h-4" /> Add Insight
                                                                </button>
                                                            </div>
                                                            <div className="space-y-4">
                                                                {editingItem?.insights?.map((s: any, idx: number) => (
                                                                    <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
                                                                        <div className="flex-1 space-y-4">
                                                                            <div className="grid grid-cols-2 gap-4">
                                                                                <input placeholder="Insight Title" value={s.title} onChange={e => handleArrayAction('insights', 'update', idx, { ...s, title: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm" />
                                                                                <input placeholder="Category (e.g. AI, Cloud)" value={s.category} onChange={e => handleArrayAction('insights', 'update', idx, { ...s, category: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm" />
                                                                            </div>
                                                                            <input placeholder="Image URL (Unsplash or similar)" value={s.image} onChange={e => handleArrayAction('insights', 'update', idx, { ...s, image: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm" />
                                                                        </div>
                                                                        <button type="button" onClick={() => handleArrayAction('insights', 'remove', idx)} className="text-slate-300 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Industry Edge Section */}
                                                        <div className="space-y-6 pt-6 border-t border-slate-100">
                                                            <div className="flex justify-between items-center">
                                                                <label className="text-xs font-black uppercase tracking-widest text-[#008C78]">Edge Advantages (The Innova Edge)</label>
                                                                <button type="button" onClick={() => handleArrayAction('edge', 'add', undefined, { title: '', description: '', icon: 'Shield' })} className="text-[#008C78] text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                                                    <Plus className="w-4 h-4" /> Add Edge
                                                                </button>
                                                            </div>
                                                            <div className="space-y-4">
                                                                {editingItem?.edge?.map((s: any, idx: number) => (
                                                                    <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
                                                                        <div className="flex-1 space-y-4">
                                                                            <div className="grid grid-cols-2 gap-4">
                                                                                <input placeholder="Edge Title" value={s.title} onChange={e => handleArrayAction('edge', 'update', idx, { ...s, title: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm" />
                                                                                <select value={s.icon} onChange={e => handleArrayAction('edge', 'update', idx, { ...s, icon: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm">
                                                                                    <option value="Shield">Shield (Security)</option>
                                                                                    <option value="Zap">Zap (Speed)</option>
                                                                                    <option value="Target">Target (Strategy)</option>
                                                                                    <option value="Globe">Globe (Global)</option>
                                                                                    <option value="BarChart3">BarChart3 (Growth)</option>
                                                                                    <option value="Cpu">Cpu (Tech)</option>
                                                                                </select>
                                                                            </div>
                                                                            <textarea placeholder="Edge Description" value={s.description} onChange={e => handleArrayAction('edge', 'update', idx, { ...s, description: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-bold text-sm min-h-[80px]" />
                                                                        </div>
                                                                        <button type="button" onClick={() => handleArrayAction('edge', 'remove', idx)} className="text-slate-300 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </section>
                                        </div>
                                    )}
                                </form>

                                <div className="fixed bottom-0 right-0 w-full max-w-4xl p-10 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex gap-6 z-10">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 px-8 py-5 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all text-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex-[2] px-8 py-5 bg-[#008C78] text-white font-black rounded-2xl hover:bg-[#020617] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#008C78]/30 text-lg"
                                    >
                                        <Save className="w-6 h-6" />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <ToastContainer toasts={toasts} onDismiss={dismissToast} />

            <Footer />
        </main>
    );
}
