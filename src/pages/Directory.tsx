import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Filter, Star, Crown, ChevronRight, Grid, Map as MapIcon } from 'lucide-react';
import { CATEGORIES, CITIES, type Business } from '../types';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';


const Directory: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    // Filters
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const city = searchParams.get('city') || 'Barcelona';

    useEffect(() => {
        fetchBusinesses();
    }, [search, category, city]);

    const fetchBusinesses = async () => {
        setLoading(true);
        const mockBusinesses: Business[] = [
            {
                id: '1',
                owner_id: 'owner1',
                name: 'Restaurante El Criollo',
                slug: 'restaurante-el-criollo',
                category: 'Restaurantes',
                description: 'El auténtico sabor dominicano en el corazón de Barcelona.',
                address: 'Carrer de Trafalgar, 45, Barcelona',
                city: 'Barcelona',
                phone: '934 12 34 56',
                images: ['https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?q=80&w=800&auto=format&fit=crop'],
                is_premium: true,
                is_approved: true,
                is_featured: true,
                views: 1250,
                clicks: 340,
                rating_avg: 4.8,
                rating_count: 56,
                created_at: new Date().toISOString()
            },
            {
                id: '2',
                owner_id: 'owner2',
                name: 'Colmado La Bendición',
                slug: 'colmado-la-bendicion',
                category: 'Colmados',
                description: 'Todos los productos de nuestra tierra.',
                address: 'Carrer de la Unió, 12, Barcelona',
                city: 'Barcelona',
                phone: '931 22 33 44',
                images: ['https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop'],
                is_premium: false,
                is_approved: true,
                is_featured: false,
                views: 890,
                clicks: 210,
                rating_avg: 4.5,
                rating_count: 32,
                created_at: new Date().toISOString()
            }
        ];

        try {
            let query = supabase
                .from('dd_businesses')
                .select('*')
                .eq('is_approved', true);

            if (category) query = query.eq('category', category);
            if (city) query = query.eq('city', city);

            const { data } = await query.order('is_premium', { ascending: false });

            if (data && data.length > 0) {
                setBusinesses(data);
            } else {
                let filtered = [...mockBusinesses];
                if (category) filtered = filtered.filter(b => b.category.toLowerCase() === category.toLowerCase());
                if (search) filtered = filtered.filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.description.toLowerCase().includes(search.toLowerCase()));
                setBusinesses(filtered);
            }
        } catch (e) {
            console.error(e);
            setBusinesses(mockBusinesses);
        } finally {
            setLoading(false);
        }
    };

    const updateParam = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) newParams.set(key, value);
        else newParams.delete(key);
        setSearchParams(newParams);
    };

    return (
        <div className="bg-dr-light min-h-screen pb-32">
            {/* ── STICKY SEARCH HEADER ── */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 pt-32 pb-8 sticky top-0 z-10 shadow-sm">
                <div className="container">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                        <div className="w-full lg:flex-1 search-container">
                            <div className="search-input-group !border-none">
                                <Search className="text-dr-blue" size={22} />
                                <input
                                    type="text"
                                    placeholder="¿Qué estás buscando hoy?"
                                    className="search-field !text-xl"
                                    value={search}
                                    onChange={(e) => updateParam('search', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex w-full lg:w-auto gap-4">
                            <div className="flex items-center gap-2 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 min-w-[180px]">
                                <MapPin size={18} className="text-dr-red" />
                                <select
                                    className="bg-transparent border-none outline-none font-black text-xs uppercase tracking-widest cursor-pointer w-full"
                                    value={city}
                                    onChange={(e) => updateParam('city', e.target.value)}
                                >
                                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${showFilters ? 'bg-dr-navy text-white' : 'bg-white border border-gray-100 text-dr-navy hover:border-dr-blue'
                                    }`}
                            >
                                <Filter size={18} /> {showFilters ? 'Cerrar' : 'Filtros'}
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap gap-3"
                            >
                                <button
                                    onClick={() => updateParam('category', '')}
                                    className={`px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest border-2 transition-all ${category === '' ? 'bg-dr-blue border-dr-blue text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400 hover:border-dr-blue'
                                        }`}
                                >
                                    TODAS
                                </button>
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => updateParam('category', cat.slug)}
                                        className={`px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest border-2 transition-all flex items-center gap-2 ${category === cat.slug ? 'bg-dr-blue border-dr-blue text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400 hover:border-dr-blue'
                                            }`}
                                    >
                                        <span>{cat.icon}</span> {cat.name}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* ── RESULTS SECTION ── */}
            <div className="container py-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                    <div>
                        <span className="section-tag">Explora</span>
                        <h2 className="section-head !mb-2 uppercase tracking-tight">
                            {businesses.length} Negocios <span className="text-dr-blue">Encontrados</span>
                        </h2>
                        <p className="text-sm text-text-muted font-medium">Mostrando resultados para <span className="text-dr-navy font-black">{category || 'Todas las categorías'}</span> en <span className="text-dr-navy font-black">{city}</span></p>
                    </div>

                    <div className="flex bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-dr-blue text-white shadow-xl' : 'text-gray-400'}`}
                        >
                            <Grid size={22} />
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`p-3 rounded-xl transition-all ${viewMode === 'map' ? 'bg-dr-blue text-white shadow-xl' : 'text-gray-400'}`}
                        >
                            <MapIcon size={22} />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-6">
                        <div className="spinner !w-12 !h-12 border-4"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-dr-blue animate-pulse">Buscando en la red...</span>
                    </div>
                ) : businesses.length === 0 ? (
                    <div className="bg-white rounded-[50px] p-24 text-center border border-gray-100 shadow-xl max-w-2xl mx-auto">
                        <div className="size-24 bg-gray-50 rounded-[30px] flex items-center justify-center mx-auto mb-10">
                            <Search size={40} className="text-gray-200" />
                        </div>
                        <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Sin resultados</h3>
                        <p className="text-text-muted font-medium mb-10 leading-relaxed">No hemos encontrado ningún negocio bajo estos términos. Intenta ampliar tu búsqueda o cambiar la categoría.</p>
                        <button
                            onClick={() => setSearchParams({ city: 'Barcelona' })}
                            className="btn btn-primary btn-lg"
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {businesses.map((biz, index) => (
                            <motion.div
                                key={biz.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={`/negocio/${biz.slug}`}
                                    className={`modern-card flex flex-col h-full !p-0 overflow-hidden group ${biz.is_premium ? 'ring-2 ring-dr-gold' : ''}`}
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={biz.images[0] || 'https://via.placeholder.com/800x450'}
                                            alt={biz.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-dr-navy/40 to-transparent"></div>

                                        {biz.is_premium && (
                                            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-2 rounded-xl text-dr-gold border border-white/20">
                                                <Crown size={20} />
                                            </div>
                                        )}

                                        <div className="absolute top-6 left-6 bg-white/90 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
                                            <Star size={14} className="text-dr-gold fill-dr-gold" />
                                            <span className="font-black text-xs text-dr-blue">{biz.rating_avg || '5.0'}</span>
                                        </div>
                                    </div>

                                    <div className="p-8 flex-grow flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-dr-blue mb-3">{biz.category}</span>
                                        <h3 className="text-2xl font-black mb-4 group-hover:text-dr-red transition-colors line-clamp-1">
                                            {biz.name}
                                        </h3>
                                        <p className="text-sm text-text-muted mb-8 line-clamp-2 leading-relaxed font-medium">
                                            {biz.description}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-text-muted">
                                                <MapPin size={16} className="text-dr-red" />
                                                <span className="text-[11px] font-black uppercase tracking-widest">{biz.city}</span>
                                            </div>
                                            <div className="size-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-dr-blue group-hover:text-white transition-all group-hover:border-dr-blue">
                                                <ChevronRight size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                ) : (
                    <div className="map-container relative rounded-[50px] overflow-hidden shadow-2xl bg-white border border-gray-100">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center p-12">
                                <MapIcon size={64} className="mx-auto mb-6 text-dr-blue opacity-10" />
                                <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">Próximamente</h4>
                                <p className="text-text-muted font-medium">La vista de mapa interactivo estará disponible en la próxima actualización.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Directory;
