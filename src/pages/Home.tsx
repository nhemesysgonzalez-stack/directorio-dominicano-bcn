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
        <div className="flex flex-col bg-white">
            {/* ── NEW HERO SECTION (Screenshot 2 Style) ── */}
            <section className="relative pt-32 pb-24 overflow-hidden border-b border-gray-100">
                <div className="absolute top-0 left-0 w-full h-[350px] z-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1583526017992-66fd368d374f?q=80&w=1600&auto=format&fit=crop"
                        className="w-full h-full object-cover mask-gradient-to-b"
                        alt="Barcelona Skyline"
                    />
                </div>

                <div className="container relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black text-[#002B5B] mb-4 uppercase tracking-tighter">
                            DIRECTORIO DOMINICANO BARCELONA
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 font-bold mb-12">
                            Encuentra los mejores restaurantes, servicios y negocios locales de nuestra comunidad. ¡Siéntete como en casa!
                        </p>
                    </motion.div>

                    {/* Clean Search Bar */}
                    <div className="max-w-4xl mx-auto mb-16 px-4">
                        <div className="flex flex-col md:flex-row items-center bg-white rounded-[40px] shadow-2xl overflow-hidden p-2 border border-gray-100">
                            <div className="flex-1 flex items-center px-6 py-4 gap-4 w-full">
                                <Search className="text-gray-300 shrink-0" size={24} />
                                <input
                                    type="text"
                                    placeholder="¿Qué buscas? (ej: Pica Pollo, Peluquería...)"
                                    className="w-full bg-transparent border-none focus:ring-0 text-xl font-bold placeholder:text-gray-300"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="hidden md:flex h-10 w-[1px] bg-gray-100"></div>
                            <div className="hidden md:flex items-center px-6 py-4 gap-2 text-gray-400 font-bold">
                                <MapPin size={20} className="text-[#D31F3B]" />
                                <span>Barcelona</span>
                            </div>
                            <Link
                                to={`/directorio?search=${searchTerm}`}
                                className="w-full md:w-auto px-12 py-5 bg-[#D31F3B] hover:bg-[#B31932] text-white font-black text-xl uppercase tracking-widest rounded-[32px] transition-all text-center"
                            >
                                Buscar
                            </Link>
                        </div>
                    </div>

                    {/* Info Badges */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-[#002B5B]/5 flex items-center justify-center text-[#002B5B]">
                                <Users size={18} />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#002B5B]">UNIÓN COMUNITARIA</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-[#EAB308]/5 flex items-center justify-center text-[#EAB308]">
                                <TrendingUp size={18} />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#002B5B]">CRECIMIENTO LOCAL</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-[#D31F3B]/5 flex items-center justify-center text-[#D31F3B]">
                                <ShieldCheck size={18} />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#002B5B]">CONFIANZA DIGITAL</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MISSION SECTION (Screenshot 2 Content) ── */}
            <section className="py-24 bg-white">
                <div className="container max-w-5xl px-4">
                    <div className="space-y-12">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="min-w-[300px]">
                                <h3 className="text-xl font-black text-[#002B5B] uppercase tracking-wider mb-2">¿POR QUÉ ESTE DIRECTORIO?</h3>
                            </div>
                            <p className="text-lg font-bold text-gray-600 leading-relaxed">
                                Nace de la necesidad de <span className="text-black font-black underline decoration-[#D31F3B]/30 underline-offset-4">centralizar nuestra fuerza comercial</span> en Barcelona. Es la herramienta para que ningún dominicano se sienta perdido y sepa dónde encontrar su sazón, su estilo y su gente.
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 items-start border-t border-gray-50 pt-12">
                            <div className="min-w-[300px]">
                                <h3 className="text-xl font-black text-[#002B5B] uppercase tracking-wider mb-2">UTILIDAD E IMPORTANCIA</h3>
                            </div>
                            <p className="text-lg font-bold text-gray-600 leading-relaxed">
                                No es solo una lista de teléfonos; es un <span className="text-black font-black">motor de búsqueda especializado</span> que valida la calidad de los servicios, facilitando la vida diaria del residente y del recién llegado.
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 items-start border-t border-gray-50 pt-12">
                            <div className="min-w-[300px]">
                                <h3 className="text-xl font-black text-[#002B5B] uppercase tracking-wider mb-2">BENEFICIOS DIRECTOS</h3>
                            </div>
                            <p className="text-lg font-bold text-gray-600 leading-relaxed">
                                Para el usuario, <span className="text-black font-black">seguridad y rapidez</span>. Para el dueño de negocio, una <span className="text-black font-black">vitrina premium</span> que lo conecta con clientes que ya están buscando lo que él ofrece.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SYNERGIES SECTION (The Core Update) ── */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="container px-4">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#002B5B]/10 text-[#002B5B] text-[10px] font-black uppercase tracking-widest mb-6">RED DE SINERGIAS</span>
                        <h2 className="text-5xl md:text-7xl font-black text-[#002B5B] mb-6 tracking-tighter">Más que un Directorio, una Comunidad</h2>
                        <p className="text-xl text-gray-400 font-bold max-w-2xl mx-auto">
                            Fomentamos la colaboración real entre emprendedores dominicanos para que todos ganemos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* CARD 1 */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col items-center text-center group">
                            <div className="size-16 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
                                <TrendingUp size={32} />
                            </div>
                            <h4 className="text-2xl font-black text-[#002B5B] mb-4 uppercase">PROVEEDORES DE CASA</h4>
                            <p className="text-gray-500 font-bold leading-relaxed">
                                <span className="text-black font-black underline decoration-blue-500/20">Ejemplo Real:</span> Una frutería dominicana con plátanos frescos puede ceder productos a un restaurante dominicano a precios preferenciales. El restaurante ahorra y la frutería gana un cliente fijo para siempre.
                            </p>
                        </div>

                        {/* CARD 2 */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col items-center text-center group">
                            <div className="size-16 rounded-3xl bg-orange-50 flex items-center justify-center text-orange-600 mb-8 group-hover:scale-110 transition-transform">
                                <Users size={32} />
                            </div>
                            <h4 className="text-2xl font-black text-[#002B5B] mb-4 uppercase tracking-tighter">REFERIDOS ENTRE NEGOCIOS</h4>
                            <p className="text-gray-500 font-bold leading-relaxed">
                                Una peluquería puede recomendar a sus clientes el colmado de al lado para sus compras, creando un <span className="text-black font-black underline decoration-orange-500/20">flujo constante de clientes</span> que se quedan dentro de nuestra propia economía comunitaria.
                            </p>
                        </div>

                        {/* CARD 3 */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col items-center text-center group">
                            <div className="size-16 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-110 transition-transform">
                                <Award size={32} />
                            </div>
                            <h4 className="text-2xl font-black text-[#002B5B] mb-4 uppercase">ALIANZAS DE EVENTOS</h4>
                            <p className="text-gray-500 font-bold leading-relaxed">
                                Cuando un DJ dominicano trabaja con un servicio de catering de la tierra para un evento, el beneficio se multiplica. Juntos ofrecen un <span className="text-black font-black underline decoration-indigo-500/20">paquete premium irresistible</span> para el cliente final.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CATEGORIES ── */}
            <section className="py-24 bg-white border-t border-gray-50">
                <div className="container px-4">
                    <div className="mb-16">
                        <h2 className="text-5xl font-black text-[#002B5B] mb-4 tracking-tighter">Explora por Categoría</h2>
                        <p className="text-xl text-gray-400 font-bold">Lo que necesites, de nuestra gente para nuestra gente.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {CATEGORIES.map(cat => (
                            <Link
                                key={cat.id}
                                to={`/directorio?category=${cat.slug}`}
                                className="group flex flex-col items-center gap-4 p-8 rounded-[32px] hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 text-center"
                            >
                                <div className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</div>
                                <span className="font-black text-[10px] uppercase tracking-widest text-[#002B5B]">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PREMIUM SHOWCASE ── */}
            <section className="py-24 bg-white">
                <div className="container px-4">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-20">
                        <div>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[#EAB308]/10 text-[#EAB308] text-[10px] font-black uppercase tracking-widest mb-6 border border-[#EAB308]/20">MIEMBROS DESTACADOS</span>
                            <h2 className="text-5xl font-black text-[#002B5B] mb-4 tracking-tighter">Negocios Gold Member</h2>
                            <p className="text-xl text-gray-400 font-bold">Calidad premium y compromiso con la comunidad.</p>
                        </div>
                        <Link to="/directorio" className="btn btn-outline border-2 px-10 py-4 text-[#002B5B] font-black uppercase tracking-widest text-xs rounded-2xl border-[#002B5B]/10 hover:border-[#002B5B]">Ver todos los negocios</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredBusinesses.map((biz) => (
                            <Link
                                key={biz.id}
                                to={`/negocio/${biz.slug}`}
                                className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100"
                            >
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img src={biz.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={biz.name} />
                                    <div className="absolute top-6 left-6">
                                        <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-2 text-[#002B5B] shadow-lg">
                                            <Crown size={14} className="text-[#EAB308]" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Premium Gold</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Star size={16} fill="#EAB308" className="text-[#EAB308]" />
                                        <span className="text-xs font-black uppercase tracking-widest text-[#EAB308]">Sabor Dominicano Superior</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-[#002B5B] uppercase leading-tight mb-4 group-hover:text-[#D31F3B] transition-colors">{biz.name}</h3>
                                    <p className="text-gray-500 font-bold line-clamp-2 mb-8 leading-relaxed font-medium">{biz.description}</p>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <MapPin size={16} className="text-[#D31F3B]" />
                                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">{biz.address}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FOOTER CTA ── */}
            <section className="py-24">
                <div className="container px-4">
                    <div className="bg-[#002B5B] rounded-[50px] p-16 md:p-24 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]"></div>
                        <h2 className="text-4xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter max-w-3xl mx-auto leading-none">
                            ¿Tienes un negocio? Únete a nosotros
                        </h2>
                        <p className="text-xl text-white/60 font-bold mb-12 uppercase tracking-widest">Impulsa tu comercio y genera sinergias reales</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/registro" className="px-12 py-5 bg-[#D31F3B] text-white font-black text-xl uppercase tracking-widest rounded-3xl hover:bg-white hover:text-[#002B5B] transition-all">REGISTRAR MI NEGOCIO</Link>
                            <Link to="/planes" className="px-12 py-5 border-2 border-white text-white font-black text-xl uppercase tracking-widest rounded-3xl hover:bg-white hover:text-[#002B5B] transition-all">VER PLANES PREMIUM</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
