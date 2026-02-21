import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Crown, TrendingUp, Users, ShieldCheck, Award, ChevronRight, Zap } from 'lucide-react';
import { CATEGORIES, type Business } from '../types';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [featuredBusinesses, setFeaturedBusinesses] = useState<Business[]>([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            const mockFeatured: Business[] = [
                {
                    id: '1',
                    owner_id: 'real_owner_1',
                    name: 'Restaurante Paraíso VIP',
                    slug: 'restaurante-paraiso-vip',
                    category: 'Restaurantes',
                    description: 'Especialistas en comida dominicana. Mofongo, sancocho y un ambiente espectacular en Sants-Badal.',
                    address: 'Carrer De Carreras I Candi, 08028, Barcelona',
                    city: 'Barcelona',
                    phone: '932 77 74 37',
                    whatsapp: '932777437',
                    images: ['https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop'],
                    is_premium: true,
                    is_approved: true,
                    is_featured: true,
                    views: 3150,
                    clicks: 840,
                    rating_avg: 4.5,
                    rating_count: 120,
                    created_at: new Date().toISOString()
                }
            ];

            try {
                const { data } = await supabase
                    .from('dd_businesses')
                    .select('*')
                    .eq('is_featured', true)
                    .eq('is_approved', true)
                    .limit(3);

                if (data && data.length > 0) setFeaturedBusinesses(data);
                else setFeaturedBusinesses(mockFeatured);
            } catch (e) {
                setFeaturedBusinesses(mockFeatured);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <div className="w-full bg-white text-[#0F172A]">
            {/* ── HERO SECTION ── */}
            <section className="relative pt-40 pb-20 bg-[#F1F5F9] overflow-hidden">
                {/* Background Image Container */}
                <div className="absolute top-0 left-0 w-full h-[450px] overflow-hidden opacity-30 pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1583526017992-66fd368d374f?q=80&w=1600&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#F1F5F9]/0 via-[#F1F5F9]/50 to-[#F1F5F9]"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-7xl font-black text-[#002B5B] mb-6 uppercase tracking-tight leading-[1.1]">
                            DIRECTORIO DOMINICANO <br className="hidden md:block" /> BARCELONA
                        </h1>
                        <p className="text-lg md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto mb-12">
                            Encuentra los mejores restaurantes, servicios y negocios locales de nuestra comunidad. ¡Siéntete como en casa!
                        </p>
                    </motion.div>

                    {/* Search Bar - Bulletproof Flexbox */}
                    <div className="max-w-4xl mx-auto mb-16">
                        <div className="bg-white rounded-3xl md:rounded-full shadow-2xl border border-slate-100 p-2 flex flex-col md:flex-row items-center gap-2">
                            <div className="flex-1 flex items-center gap-3 px-6 py-4 w-full">
                                <Search className="text-slate-300 shrink-0" size={24} />
                                <input
                                    type="text"
                                    placeholder="¿Qué buscas? (Pica Pollo, Peluquería...)"
                                    className="w-full bg-transparent border-none outline-none focus:ring-0 text-lg md:text-xl font-bold placeholder:text-slate-300"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="hidden md:block h-10 w-[1px] bg-slate-100 mx-2"></div>
                            <div className="hidden md:flex items-center gap-2 px-6 py-4 text-slate-400 font-bold whitespace-nowrap">
                                <MapPin size={22} className="text-[#D31F3B]" />
                                <span>Barcelona</span>
                            </div>
                            <Link
                                to={`/directorio?search=${searchTerm}`}
                                className="w-full md:w-auto px-10 py-5 bg-[#D31F3B] hover:bg-[#B31932] text-white font-black text-xl uppercase tracking-widest rounded-2xl md:rounded-full transition-all text-center shadow-lg shadow-red-200"
                            >
                                Buscar
                            </Link>
                        </div>
                    </div>

                    {/* Quick Stats Badges */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                        <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-5 py-2 rounded-full border border-white/50">
                            <Users size={18} className="text-[#002B5B]" />
                            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-[#002B5B]">UNIÓN COMUNITARIA</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-5 py-2 rounded-full border border-white/50">
                            <TrendingUp size={18} className="text-[#EAB308]" />
                            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-[#002B5B]">CRECIMIENTO LOCAL</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-5 py-2 rounded-full border border-white/50">
                            <ShieldCheck size={18} className="text-[#D31F3B]" />
                            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-[#002B5B]">CONFIANZA DIGITAL</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MISSION SECTION ── */}
            <section className="py-24 bg-white border-b border-slate-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="space-y-16">
                        {/* Box 1 */}
                        <div className="flex flex-col md:flex-row gap-8 md:items-start p-8 md:p-0 rounded-[40px] border border-slate-100 md:border-none">
                            <div className="md:min-w-[280px]">
                                <h3 className="text-xl font-black text-[#002B5B] uppercase tracking-wide">¿POR QUÉ ESTE DIRECTORIO?</h3>
                            </div>
                            <p className="text-xl text-slate-600 font-medium leading-relaxed">
                                Nace de la necesidad de <span className="text-[#002B5B] font-black border-b-4 border-[#D31F3B]/20">centralizar nuestra fuerza comercial</span> en Barcelona. Es la herramienta para que ningún dominicano se sienta perdido y sepa dónde encontrar su gente.
                            </p>
                        </div>

                        {/* Box 2 */}
                        <div className="flex flex-col md:flex-row gap-8 md:items-start p-8 md:p-0 rounded-[40px] border border-slate-100 md:border-none">
                            <div className="md:min-w-[280px]">
                                <h3 className="text-xl font-black text-[#002B5B] uppercase tracking-wide">UTILIDAD E IMPORTANCIA</h3>
                            </div>
                            <p className="text-xl text-slate-600 font-medium leading-relaxed">
                                No es solo una lista de teléfonos; es un <span className="text-[#002B5B] font-black">motor de búsqueda especializado</span> que valida la calidad de los servicios localmente.
                            </p>
                        </div>

                        {/* Box 3 */}
                        <div className="flex flex-col md:flex-row gap-8 md:items-start p-8 md:p-0 rounded-[40px] border border-slate-100 md:border-none">
                            <div className="md:min-w-[280px]">
                                <h3 className="text-xl font-black text-[#002B5B] uppercase tracking-wide">BENEFICIOS DIRECTOS</h3>
                            </div>
                            <p className="text-xl text-slate-600 font-medium leading-relaxed">
                                Para el usuario, <span className="text-[#D31F3B] font-black">seguridad y rapidez</span>. Para el dueño de negocio, una <span className="text-[#002B5B] font-black underline decoration-[#D31F3B]/30 underline-offset-8">vitrina premium</span> para conectar con nuevos clientes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SYNERGIES SECTION ── */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#002B5B]/10 text-[#002B5B] text-[10px] font-black uppercase tracking-[0.2em] mb-6">RED DE SINERGIAS</span>
                        <h2 className="text-5xl md:text-7xl font-black text-[#002B5B] mb-6 tracking-tight">Más que un Directorio, <br className="hidden md:block" /> una Comunidad</h2>
                        <p className="text-xl text-slate-400 font-bold max-w-2xl mx-auto">
                            Fomentamos la colaboración real entre nuestros emprendedores dominicanos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* SYNERGY CARD 1 */}
                        <div className="bg-white p-12 rounded-[48px] shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col items-center text-center group">
                            <div className="size-20 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
                                <TrendingUp size={36} />
                            </div>
                            <h4 className="text-2xl font-black text-[#002B5B] mb-6 uppercase tracking-tight leading-tight">PROVEEDORES <br /> DE CASA</h4>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                <span className="text-[#002B5B] font-bold">Ejemplo:</span> Fruterías que suministran plátanos frescos a restaurantes del barrio a precios especiales, ganando clientes fijos.
                            </p>
                        </div>

                        {/* SYNERGY CARD 2 */}
                        <div className="bg-white p-12 rounded-[48px] shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col items-center text-center group">
                            <div className="size-20 rounded-3xl bg-orange-50 flex items-center justify-center text-orange-600 mb-8 group-hover:scale-110 transition-transform">
                                <Users size={36} />
                            </div>
                            <h4 className="text-2xl font-black text-[#002B5B] mb-6 uppercase tracking-tight leading-tight">REFERIDOS <br /> ENTRE NEGOCIOS</h4>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                Peluquerías que recomiendan el colmado vecino a sus clientes, manteniendo el flujo dentro de nuestra economía.
                            </p>
                        </div>

                        {/* SYNERGY CARD 3 */}
                        <div className="bg-white p-12 rounded-[48px] shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col items-center text-center group">
                            <div className="size-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-110 transition-transform">
                                <Award size={36} />
                            </div>
                            <h4 className="text-2xl font-black text-[#002B5B] mb-6 uppercase tracking-tight leading-tight">ALIANZAS <br /> DE EVENTOS</h4>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                DJs dominicanos colaborando con caterings de la tierra para ofrecer paquetes premium en celebraciones locales.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CATEGORIES ── */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-5xl font-black text-[#002B5B] mb-4 tracking-tight">Explora por Categoría</h2>
                        <p className="text-xl text-slate-400 font-bold">De nuestra gente, para nuestra gente.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {CATEGORIES.map(cat => (
                            <Link
                                key={cat.id}
                                to={`/directorio?category=${cat.slug}`}
                                className="group flex flex-col items-center gap-5 p-10 rounded-[40px] bg-slate-50/50 hover:bg-white transition-all border-2 border-transparent hover:border-slate-100 hover:shadow-lg text-center"
                            >
                                <div className="text-5xl group-hover:scale-110 transition-transform mb-2">
                                    {cat.icon || '📍'}
                                </div>
                                <span className="font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#002B5B] line-clamp-1">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURED MEMBERS ── */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-20">
                        <div>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[#EAB308]/10 text-[#EAB308] text-[10px] font-black uppercase tracking-widest mb-6 border border-[#EAB308]/20">NEGOCIOS PREMIUM</span>
                            <h2 className="text-5xl font-black text-[#002B5B] tracking-tight">Miembros Gold</h2>
                        </div>
                        <Link to="/directorio" className="px-8 py-4 bg-[#F1F5F9] text-[#002B5B] font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-[#002B5B] hover:text-white transition-all">Ver todos</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {featuredBusinesses.map((biz) => (
                            <Link
                                key={biz.id}
                                to={`/negocio/${biz.slug}`}
                                className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all"
                            >
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img src={biz.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={biz.name} />
                                    <div className="absolute top-6 left-6">
                                        <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full flex items-center gap-2 text-[#002B5B] shadow-lg border border-slate-100">
                                            <Crown size={14} className="text-[#EAB308]" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Premium Gold</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Star size={16} fill="#EAB308" className="text-[#EAB308]" />
                                        <span className="text-xs font-black uppercase tracking-widest text-[#EAB308]">Sabor 5.0</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-[#002B5B] uppercase leading-none mb-6 group-hover:text-[#D31F3B] transition-colors">{biz.name}</h3>
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <MapPin size={18} className="text-[#D31F3B]" />
                                        <span className="text-[11px] font-black uppercase tracking-widest">{biz.address}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="bg-[#002B5B] rounded-[60px] p-20 md:p-32 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                        <h2 className="text-4xl md:text-7xl font-black text-white mb-10 uppercase tracking-tight leading-none max-w-4xl mx-auto">
                            Impulsa tu negocio con nosotros
                        </h2>
                        <p className="text-xl text-slate-300 font-bold mb-16 uppercase tracking-[0.2em]">Únete a la mayor red dominicana de Barcelona</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/registro" className="px-14 py-6 bg-[#D31F3B] hover:bg-white hover:text-[#002B5B] text-white font-black text-xl uppercase tracking-widest rounded-3xl transition-all shadow-xl shadow-red-950/20">Registrar mi Negocio</Link>
                            <Link to="/planes" className="px-14 py-6 border-2 border-white/20 hover:border-white text-white font-black text-xl uppercase tracking-widest rounded-3xl transition-all">Ver Planes</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
