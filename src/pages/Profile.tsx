import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
    User, Settings, LayoutDashboard,
    Plus, Edit3, Trash2, Camera, ExternalLink,
    TrendingUp, Eye, MessageCircle, Play
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { type Business, CATEGORIES, CITIES } from '../types';

const Profile: React.FC = () => {
    const { user, signOut } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<'profile' | 'businesses'>('profile');
    const [showBusinessForm, setShowBusinessForm] = useState(searchParams.get('setup') === 'business');
    const [myBusinesses, setMyBusinesses] = useState<Business[]>([]);
    const selectedPlan = 'negocio_gratis'; // Por ahora solo plan gratis

    // Business Form State
    const [formData, setFormData] = useState({
        name: '',
        category: 'Restaurantes',
        description: '',
        long_description: '',
        address: '',
        city: 'Cataluña',
        phone: '',
        whatsapp: '',
        instagram: '',
        facebook: '',
        website: '',
        video_url: ''
    });

    useEffect(() => {
        if (!user) navigate('/login');
        else fetchMyBusinesses();
    }, [user]);

    const fetchMyBusinesses = async () => {
        if (!user) return;
        try {
            const { data } = await supabase
                .from('dd_businesses')
                .select('*')
                .eq('owner_id', user.id);

            if (data) setMyBusinesses(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleCreateBusiness = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const slug = formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const newBusiness = {
            ...formData,
            owner_id: user.id,
            slug,
            images: ['https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?q=80&w=800&auto=format&fit=crop'], // Placeholder
            is_premium: selectedPlan === 'negocio_premium',
            is_approved: true, // Auto-approve for now
            is_featured: selectedPlan === 'negocio_premium',
            views: 0,
            clicks: 0,
            created_at: new Date().toISOString()
        };

        try {
            const { error } = await supabase.from('dd_businesses').insert(newBusiness);
            if (!error) {
                setShowBusinessForm(false);
                setSetupStep(0);
                fetchMyBusinesses();
            }
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div className="bg-surface-2 min-h-screen py-12">
            <div className="container mx-auto px-4">

                {/* Header Profile */}
                <div className="bg-white rounded-[40px] p-8 md:p-12 mb-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-10">
                    <div className="relative">
                        <div className="size-32 md:size-40 bg-dr-blue rounded-[40px] flex items-center justify-center text-white text-4xl font-black">
                            {user?.full_name[0] || 'U'}
                        </div>
                        <button className="absolute bottom-2 right-2 size-10 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-dr-blue transition-colors">
                            <Camera size={20} />
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                            <h1 className="text-3xl font-black uppercase tracking-tight">{user?.full_name}</h1>
                            {user?.role === 'negocio_premium' ? (
                                <span className="badge badge-premium">Premium User</span>
                            ) : (
                                <span className="badge badge-blue">{user?.role}</span>
                            )}
                        </div>
                        <p className="text-gray-500 font-bold mb-6">{user?.email}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`btn btn-sm gap-2 ${activeTab === 'profile' ? 'btn-primary' : 'btn-ghost'}`}
                            >
                                <Settings size={14} /> Ajustes
                            </button>
                            {user?.role.startsWith('negocio') && (
                                <button
                                    onClick={() => setActiveTab('businesses')}
                                    className={`btn btn-sm gap-2 ${activeTab === 'businesses' ? 'btn-primary' : 'btn-ghost'}`}
                                >
                                    <LayoutDashboard size={14} /> Mis Negocios
                                </button>
                            )}
                            <button onClick={() => signOut()} className="btn btn-ghost btn-sm text-dr-red hover:bg-red-50">Log Out</button>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="animate-in">
                    {activeTab === 'businesses' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-3xl font-black uppercase tracking-tight">Mis Negocios</h2>
                                <button
                                    onClick={() => {
                                        setShowBusinessForm(true);
                                        setSetupStep(0);
                                    }}
                                    className="btn btn-primary btn-lg gap-3 shadow-xl shadow-dr-blue/20"
                                >
                                    <Plus size={22} /> Publicar Local
                                </button>
                            </div>

                            {showBusinessForm ? (
                                <div className="space-y-12">
                                    <div className="card p-12 md:p-16 max-w-4xl mx-auto animate-in shadow-2xl border-none">
                                        <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-8">
                                            <div>
                                                <h3 className="text-2xl font-black uppercase tracking-tight">Detalles del Establecimiento</h3>
                                                <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest flex items-center gap-2">
                                                    MODO DE PUBLICACIÓN:
                                                    <span className="px-3 py-1 rounded-full text-[10px] bg-dr-blue/10 text-dr-blue border border-dr-blue/20">
                                                        GRATIS
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <form onSubmit={handleCreateBusiness} className="space-y-12">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                <div className="form-group">
                                                    <label className="form-label text-dr-blue font-black uppercase tracking-widest text-[10px] mb-3 block">Nombre del Negocio</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        className="form-input h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-2 focus:ring-dr-blue transition-all"
                                                        placeholder="Ej: El Rinconcito Dominicano"
                                                        value={formData.name}
                                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label text-dr-blue font-black uppercase tracking-widest text-[10px] mb-3 block">Categoría</label>
                                                    <select
                                                        className="form-input h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-2 focus:ring-dr-blue transition-all"
                                                        value={formData.category}
                                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                    >
                                                        {CATEGORIES.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label text-dr-blue font-black uppercase tracking-widest text-[10px] mb-3 block">Dirección Completa (Cataluña)</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="form-input h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-2 focus:ring-dr-blue transition-all"
                                                    placeholder="Carrer de..."
                                                    value={formData.address}
                                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label text-dr-blue font-black uppercase tracking-widest text-[10px] mb-3 block">Descripción Corta (Slogan)</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="form-input h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-2 focus:ring-dr-blue transition-all"
                                                    placeholder="Lo que te hace único..."
                                                    value={formData.description}
                                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label flex items-center justify-between text-dr-blue font-black uppercase tracking-widest text-[10px] mb-3 block">
                                                    Historia y Detalles
                                                </label>
                                                <textarea
                                                    className="form-input h-32 bg-gray-50 border-none rounded-2xl px-6 focus:ring-2 focus:ring-dr-blue transition-all"
                                                    placeholder="Cuéntanos la historia de tu negocio, especialidades, etc..."
                                                    value={formData.long_description}
                                                    onChange={e => setFormData({ ...formData, long_description: e.target.value })}
                                                />
                                            </div>

                                            {selectedPlan === 'negocio_premium' && (
                                                <div className="form-group animate-in">
                                                    <label className="form-label">URL de Video (YouTube/Vimeo)</label>
                                                    <div className="relative">
                                                        <Play className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                        <input
                                                            type="url" className="form-input pl-12"
                                                            placeholder="https://youtube.com/watch?v=..."
                                                            value={formData.video_url}
                                                            onChange={e => setFormData({ ...formData, video_url: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="form-group">
                                                    <label className="form-label">Dirección</label>
                                                    <input
                                                        type="text" required className="form-input"
                                                        placeholder="Carrer de..."
                                                        value={formData.address}
                                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Zona/Provincia (Cataluña)</label>
                                                    <select
                                                        className="form-input"
                                                        value={formData.city}
                                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                    >
                                                        {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="form-group">
                                                    <label className="form-label">Teléfono</label>
                                                    <input
                                                        type="text" required className="form-input"
                                                        value={formData.phone}
                                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">WhatsApp (Con código 34)</label>
                                                    <input
                                                        type="text" className="form-input"
                                                        placeholder="34600000000"
                                                        value={formData.whatsapp}
                                                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowBusinessForm(false)}
                                                    className="btn btn-outline btn-lg order-2 md:order-1 border-2 font-black uppercase tracking-widest"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-lg order-1 md:order-2 shadow-xl shadow-dr-blue/20 font-black uppercase tracking-widest"
                                                >
                                                    Publicar Local Now
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            ) : myBusinesses.length === 0 ? (

                                <div className="card p-20 text-center border-dashed border-2 border-gray-200">
                                    <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                        <Plus size={40} />
                                    </div>
                                    <h3 className="text-xl font-black mb-2">Aún no tienes negocios</h3>
                                    <p className="text-gray-500 font-medium mb-8">Empieza publicando tu primer local en el directorio.</p>
                                    <button onClick={() => setShowBusinessForm(true)} className="btn btn-primary">Publicar Negocio</button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {myBusinesses.map(biz => (
                                        <div key={biz.id} className="card group flex flex-col h-full overflow-hidden">
                                            <div className="relative aspect-video">
                                                <img src={biz.images[0]} className="w-full h-full object-cover" alt="" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <button className="size-10 bg-white rounded-xl flex items-center justify-center text-dr-blue hover:scale-110 transition-all shadow-lg"><Edit3 size={18} /></button>
                                                    <button className="size-10 bg-white rounded-xl flex items-center justify-center text-dr-red hover:scale-110 transition-all shadow-lg"><Trash2 size={18} /></button>
                                                </div>
                                                {biz.is_premium && <div className="absolute top-3 right-3 badge badge-premium px-2 py-0.5"><Crown size={10} /></div>}
                                            </div>
                                            <div className="p-6">
                                                <h4 className="font-black text-lg mb-1">{biz.name}</h4>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">{biz.category} • {biz.city}</p>

                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    <div className="bg-surface-2 p-3 rounded-xl">
                                                        <div className="flex items-center gap-1 text-[10px] font-black uppercase text-gray-400 mb-1">
                                                            <Eye size={10} /> Vistas
                                                        </div>
                                                        <span className="font-black text-dr-blue">{biz.views}</span>
                                                    </div>
                                                    <div className="bg-surface-2 p-3 rounded-xl">
                                                        <div className="flex items-center gap-1 text-[10px] font-black uppercase text-gray-400 mb-1">
                                                            <MessageCircle size={10} /> Clics WA
                                                        </div>
                                                        <span className="font-black text-dr-red">{biz.clicks}</span>
                                                    </div>
                                                </div>

                                                <Link to={`/negocio/${biz.slug}`} className="btn btn-outline btn-sm w-full gap-2">
                                                    Ver Perfil Público <ExternalLink size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}



                    {activeTab === 'profile' && (
                        <div className="max-w-2xl mx-auto card p-10">
                            <h2 className="text-2xl font-black mb-8 uppercase tracking-tight flex items-center gap-3">
                                <User className="text-dr-blue" /> Información de Cuenta
                            </h2>
                            <form className="space-y-6">
                                <div className="form-group">
                                    <label className="form-label">Nombre Completo</label>
                                    <input type="text" className="form-input" defaultValue={user?.full_name} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input type="email" disabled className="form-input bg-gray-50 opacity-60" defaultValue={user?.email} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Zona/Provincia (Cataluña)</label>
                                    <select className="form-input" defaultValue={user?.city || 'Cataluña'}>
                                        {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <button type="button" className="btn btn-primary w-full">Guardar Cambios</button>
                            </form>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Profile;
