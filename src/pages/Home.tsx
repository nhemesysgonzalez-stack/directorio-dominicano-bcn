import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Crown, TrendingUp, Users, ShieldCheck, Award } from 'lucide-react';
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
        <div className="w-full bg-white text-slate-900 font-sans">
            {/* ── HERO SECTION ── */}
            <section className="relative pt-44 pb-32 bg-slate-50 overflow-hidden">
                {/* Background Image Container */}
                <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden opacity-20 pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1583526017992-66fd368d374f?q=80&w=1600&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-slate-50/80 to-slate-50"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-[#002B5B] mb-8 uppercase tracking-tighter leading-none">
                            DIRECTORIO <br /> DOMINICANO <br /> BARCELONA
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 font-semibold max-w-4xl mx-auto mb-16">
                            Encuentra los mejores restaurantes, servicios y negocios locales de nuestra comunidad. ¡Siéntete como en casa!
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <div className="max-w-4xl mx-auto mb-20">
                        <div className="bg-white rounded-[40px] shadow-[0_25px_60px_-15px_rgba(0,43,91,0.2)] border border-slate-100 p-3 flex flex-col md:flex-row items-center gap-2">
                            <div className="flex-1 flex items-center gap-4 px-8 py-5 w-full">
                                <Search className="text-slate-300 shrink-0" size={28} />
                                <input
                                    type="text"
                                    placeholder="¿Qué buscas? (ej: Pica Pollo, Peluquería...)"
                                    className="w-full bg-transparent border-none outline-none focus:outline-none text-xl md:text-2xl font-bold placeholder:text-slate-300"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="hidden md:block h-12 w-px bg-slate-100 mx-4"></div>
                            <div className="hidden md:flex items-center gap-3 px-8 py-5 text-slate-400 font-bold whitespace-nowrap text-lg">
                                <MapPin size={24} className="text-[#D31F3B]" />
                                <span>Barcelona</span>
                            </div>
                            <Link
                                to={`/directorio?search=${searchTerm}`}
                                className="w-full md:w-auto px-14 py-6 bg-[#D31F3B] hover:bg-[#B31932] text-white font-black text-2xl uppercase tracking-widest rounded-[32px] transition-all text-center shadow-2xl shadow-red-500/20"
                            >
                                Buscar
                            </Link>
                        </div>
                    </div>

                    {/* Quality Badges */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex items-center gap-4 group">
                            <div className="size-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#002B5B]">
                                <Users size={20} />
                            </div>
                            <span className="text-sm font-black uppercase tracking-[0.3em] text-[#002B5B]">UNIÓN COMUNITARIA</span>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="size-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#EAB308]">
                                <TrendingUp size={20} />
                            </div>
                            <span className="text-sm font-black uppercase tracking-[0.3em] text-[#002B5B]">CRECIMIENTO LOCAL</span>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="size-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#D31F3B]">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="text-sm font-black uppercase tracking-[0.3em] text-[#002B5B]">CONFIANZA DIGITAL</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MISSION SECTION ── */}
            <section className="py-32 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 gap-20">
                        {/* Statement 1 */}
                        <div className="flex flex-col md:flex-row gap-12 md:items-start group">
                            <div className="md:min-w-[350px]">
                                <h3 className="text-2xl font-black text-[#002B5B] uppercase tracking-wider mb-2">¿POR QUÉ ESTE DIRECTORIO?</h3>
                                <div className="h-1.5 w-20 bg-[#D31F3B]/10 rounded-full group-hover:w-32 transition-all duration-500"></div>
                            </div>
                            <p className="text-2xl text-slate-600 font-medium leading-relaxed">
                                Nace de la necesidad de <span className="text-[#002B5B] font-black underline decoration-[#D31F3B]/30 underline-offset-8">centralizar nuestra fuerza comercial</span> en Barcelona. Es la herramienta para que ningún dominicano se sienta perdido y sepa dónde encontrar su sazón, su estilo y su gente.
                            </p>
                        </div>

                        {/* Statement 2 */}
                        <div className="flex flex-col md:flex-row gap-12 md:items-start group pt-16 border-t border-slate-50">
                            <div className="md:min-w-[350px]">
                                <h3 className="text-2xl font-black text-[#002B5B] uppercase tracking-wider mb-2">UTILIDAD E IMPORTANCIA</h3>
                                <div className="h-1.5 w-20 bg-[#D31F3B]/10 rounded-full group-hover:w-32 transition-all duration-500"></div>
                            </div>
                            <p className="text-2xl text-slate-600 font-medium leading-relaxed">
                                No es solo una lista de teléfonos; es un <span className="text-[#002B5B] font-black">motor de búsqueda especializado</span> que valida la calidad de los servicios, facilitando la vida diaria del residente y del recién llegado.
                            </p>
                        </div>

                        {/* Statement 3 */}
                        <div className="flex flex-col md:flex-row gap-12 md:items-start group pt-16 border-t border-slate-50">
                            <div className="md:min-w-[350px]">
                                <h3 className="text-2xl font-black text-[#002B5B] uppercase tracking-wider mb-2">BENEFICIOS DIRECTOS</h3>
                                <div className="h-1.5 w-20 bg-[#D31F3B]/10 rounded-full group-hover:w-32 transition-all duration-500"></div>
                            </div>
                            <p className="text-2xl text-slate-600 font-medium leading-relaxed">
                                Para el usuario, <span className="text-[#D31F3B] font-black">seguridad y rapidez</span>. Para el dueño de negocio, una <span className="text-[#002B5B] font-black border-b-4 border-[#EAB308]/20">vitrina premium</span> que lo conecta con clientes que ya están buscando lo que él ofrece.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SYNERGIES SECTION ── */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <span className="inline-block px-5 py-2 rounded-full bg-[#002B5B]/10 text-[#002B5B] text-xs font-black uppercase tracking-[0.3em] mb-8">RED DE SINERGIAS</span>
                        <h2 className="text-6xl md:text-8xl font-black text-[#002B5B] mb-8 tracking-tighter">Más que un Directorio, <br /> una Comunidad</h2>
                        <p className="text-2xl text-slate-400 font-bold max-w-3xl mx-auto">
                            Fomentamos la colaboración estratégica entre emprendedores dominicanos para que todos ganemos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* CARD 1 */}
                        <div className="bg-white p-16 rounded-[60px] shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col items-center text-center group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="size-24 rounded-[32px] bg-blue-50 flex items-center justify-center text-blue-600 mb-10 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                <TrendingUp size={40} />
                            </div>
                            <h4 className="text-3xl font-black text-[#002B5B] mb-6 uppercase tracking-tight">PROVEEDORES <br /> DE CASA</h4>
                            <p className="text-slate-500 font-semibold text-lg leading-relaxed">
                                <span className="text-[#002B5B] font-black">Ejemplo Real:</span> Una frutería dominicana con plátanos frescos cediendo productos a un restaurante dominicano a precios preferenciales.
                            </p>
                        </div>

                        {/* CARD 2 */}
                        <div className="bg-white p-16 rounded-[60px] shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col items-center text-center group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="size-24 rounded-[32px] bg-orange-50 flex items-center justify-center text-orange-600 mb-10 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                                <Users size={40} />
                            </div>
                            <h4 className="text-3xl font-black text-[#002B5B] mb-6 uppercase tracking-tight">REFERIDOS <br /> ENTRE NEGOCIOS</h4>
                            <p className="text-slate-500 font-semibold text-lg leading-relaxed">
                                Una peluquería recomendando a sus clientes el colmado de al lado, creando un flujo constante dentro de nuestra propia economía.
                            </p>
                        </div>

                        {/* CARD 3 */}
                        <div className="bg-white p-16 rounded-[60px] shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col items-center text-center group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="size-24 rounded-[32px] bg-indigo-50 flex items-center justify-center text-indigo-600 mb-10 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                <Award size={40} />
                            </div>
                            <h4 className="text-3xl font-black text-[#002B5B] mb-6 uppercase tracking-tight">ALIANZAS <br /> DE EVENTOS</h4>
                            <p className="text-slate-500 font-semibold text-lg leading-relaxed">
                                DJs dominicanos trabajando con servicios de catering de la tierra para un evento, ofreciendo un paquete premium irresistible.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CATEGORIES ── */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-20">
                        <h2 className="text-6xl font-black text-[#002B5B] mb-4 tracking-tight">Explora por Categoría</h2>
                        <p className="text-2xl text-slate-400 font-bold italic">De nuestra gente para nuestra gente.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {CATEGORIES.map(cat => (
                            <Link
                                key={cat.id}
                                to={`/directorio?category=${cat.slug}`}
                                className="group flex flex-col items-center gap-6 p-12 rounded-[50px] bg-slate-50 border-2 border-transparent hover:border-[#D31F3B] hover:bg-white transition-all duration-300 text-center"
                            >
                                <div className="text-6xl group-hover:scale-125 transition-transform duration-500">{cat.icon || '📍'}</div>
                                <span className="font-black text-xs uppercase tracking-[0.2em] text-[#002B5B]">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto bg-[#002B5B] rounded-[80px] p-24 md:p-40 text-center relative overflow-hidden">
                    {/* Decorative Blur */}
                    <div className="absolute -top-40 -right-40 size-96 bg-blue-400 opacity-20 rounded-full blur-[100px]"></div>
                    <div className="absolute -bottom-40 -left-40 size-96 bg-red-400 opacity-10 rounded-full blur-[100px]"></div>

                    <h2 className="text-5xl md:text-8xl font-black text-white mb-12 uppercase tracking-tighter leading-none max-w-5xl mx-auto">
                        ¿Tienes un negocio? Únete a nosotros
                    </h2>
                    <p className="text-2xl text-white/50 font-bold mb-20 uppercase tracking-[0.3em]">Impulsa tu comercio y genera sinergias reales</p>

                    <div className="flex flex-col sm:flex-row gap-8 justify-center">
                        <Link to="/registro" className="px-16 py-8 bg-[#D31F3B] hover:bg-white hover:text-[#002B5B] text-white font-black text-2xl uppercase tracking-widest rounded-[32px] transition-all shadow-2xl shadow-black/40">REGISTRAR MI NEGOCIO</Link>
                        <Link to="/planes" className="px-16 py-8 border-4 border-white/20 hover:border-white text-white font-black text-2xl uppercase tracking-widest rounded-[32px] transition-all">VER PLANES PREMIUM</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
