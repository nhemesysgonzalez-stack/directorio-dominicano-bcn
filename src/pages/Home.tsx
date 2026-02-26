import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, TrendingUp, Users, ShieldCheck, Award } from 'lucide-react';
import { CATEGORIES } from '../types';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('Cataluña');

    return (
        <div className="w-full bg-white text-slate-900 overflow-x-hidden">
            {/* ── HERO SECTION (Premium Dark Style) ── */}
            <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 bg-[#001A3D] overflow-hidden">
                {/* Background Image with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1583526017992-66fd368d374f?q=80&w=1600&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-40"
                        alt="Cataluña Skyline"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#001A3D]/90 via-[#001A3D]/70 to-[#001A3D]"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-5xl md:text-[80px] font-black text-white mb-6 tracking-tighter leading-[0.9] uppercase">
                            NO TIENES QUE MIRAR EN VARIAS REDES SOCIALES <br />
                            <span className="text-[#D31F3B]">TODO EN UN LUGAR</span> <br /> 
                            CENTRALIZADO
                        </h1>
                        <p className="text-xl md:text-3xl text-white/90 font-black max-w-4xl mx-auto mb-16 leading-relaxed bg-[#D31F3B]/80 px-6 py-3 rounded-2xl">
                            AQUÍ TIENES TODOS LOS NEGOCIOS DOMINICANOS DE CATALUÑA
                        </p>
                    </motion.div>

                    {/* Search Bar - High Contrast */}
                    <div className="max-w-4xl mx-auto mb-20">
                        <div className="bg-white rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.4)] p-3 flex flex-col md:flex-row items-center gap-2">
                            <div className="flex-1 flex items-center gap-4 px-8 py-5 w-full">
                                <Search className="text-slate-300 shrink-0" size={28} />
                                <input
                                    type="text"
                                    placeholder="¿Qué buscas hoy?"
                                    className="w-full bg-transparent border-none outline-none focus:outline-none text-xl md:text-2xl font-bold placeholder:text-slate-300"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="hidden md:block h-12 w-px bg-slate-100 mx-4"></div>
                            <div className="hidden md:flex items-center gap-3 px-8 py-5 text-slate-400 font-bold whitespace-nowrap text-lg">
                                <MapPin size={24} className="text-[#D31F3B]" />
                                <select 
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="bg-transparent border-none outline-none focus:outline-none cursor-pointer text-[#002B5B]"
                                >
                                    <option value="Cataluña">Toda Cataluña</option>
                                    {CATEGORIES.filter(c=>false) /* Just to avoid unused warning, replacing below */}
                                    <option value="Barcelona (Capital y provincia)">Barcelona</option>
                                    <option value="Tarragona">Tarragona</option>
                                    <option value="Lleida">Lleida</option>
                                    <option value="Girona">Girona</option>
                                </select>
                            </div>
                            <Link
                                to={`/directorio?search=${searchTerm}${location !== 'Cataluña' ? `&city=${location}` : ''}`}
                                className="w-full md:w-auto px-16 py-7 bg-[#D31F3B] hover:bg-[#B31932] text-white font-black text-2xl uppercase tracking-widest rounded-[32px] transition-all text-center"
                            >
                                Buscar
                            </Link>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-10 md:gap-20">
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                                <Users size={24} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/50">UNIÓN COMUNITARIA</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#EAB308] border border-white/10">
                                <TrendingUp size={24} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/50">CRECIMIENTO LOCAL</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#D31F3B] border border-white/10">
                                <ShieldCheck size={24} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/50">CONFIANZA DIGITAL</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MISSION SECTION ── */}
            <section className="py-40 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="space-y-32">
                        {/* WHY */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                            <div className="md:col-span-4">
                                <h3 className="text-2xl font-black text-[#002B5B] uppercase tracking-wider mb-2">¿POR QUÉ ESTE DIRECTORIO?</h3>
                                <div className="h-2 w-20 bg-[#D31F3B]"></div>
                            </div>
                            <div className="md:col-span-8">
                                <p className="text-2xl text-slate-500 font-medium leading-relaxed italic">
                                    Nace de la necesidad de <span className="text-[#002B5B] font-black underline decoration-[#D31F3B]/20">centralizar nuestra fuerza comercial</span> en Cataluña. Es la herramienta para que ningún dominicano se sienta perdido y sepa dónde encontrar su sazón, su estilo y su gente.
                                </p>
                            </div>
                        </div>

                        {/* UTILITY */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                            <div className="md:col-span-4">
                                <h3 className="text-2xl font-black text-[#002B5B] uppercase tracking-wider mb-2">UTILIDAD E IMPORTANCIA</h3>
                                <div className="h-2 w-20 bg-[#D31F3B]"></div>
                            </div>
                            <div className="md:col-span-8">
                                <p className="text-2xl text-slate-500 font-medium leading-relaxed italic">
                                    No es solo una lista de teléfonos; es un <span className="text-[#002B5B] font-black">motor de búsqueda especializado</span> que valida la calidad de los servicios, facilitando la vida diaria del residente y del recién llegado.
                                </p>
                            </div>
                        </div>

                        {/* BENEFITS */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                            <div className="md:col-span-4">
                                <h3 className="text-2xl font-black text-[#002B5B] uppercase tracking-wider mb-2">BENEFICIOS DIRECTOS</h3>
                                <div className="h-2 w-20 bg-[#D31F3B]"></div>
                            </div>
                            <div className="md:col-span-8">
                                <p className="text-2xl text-slate-500 font-medium leading-relaxed italic">
                                    Para el usuario, <span className="text-[#D31F3B] font-black">seguridad y rapidez</span>. Para el dueño de negocio, una <span className="text-[#002B5B] font-black">vitrina premium</span> que lo conecta con clientes que ya están buscando lo que él ofrece.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SYNERGIES SECTION ── */}
            <section className="py-40 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <span className="badge bg-dr-blue/10 text-dr-blue mb-8 px-6 py-2">RED DE SINERGIAS</span>
                        <h2 className="text-6xl md:text-[80px] font-black text-[#002B5B] mb-10 tracking-tighter leading-[0.9]">Más que un Directorio, <br /> una Comunidad</h2>
                        <p className="text-2xl text-slate-400 font-bold max-w-3xl mx-auto italic">
                            Fomentamos la colaboración estratégica para que todos ganemos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* CARD 1 */}
                        <div className="bg-white p-16 rounded-[60px] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group">
                            <div className="size-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mb-10 group-hover:bg-dr-blue group-hover:text-white transition-all duration-500">
                                <TrendingUp size={36} />
                            </div>
                            <h4 className="text-3xl font-black text-[#002B5B] mb-8 uppercase leading-tight">PROVEEDORES <br /> DE CASA</h4>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                <span className="text-[#002B5B] font-black">Alianza Real:</span> Fruterías que suministran plátanos frescos a restaurantes dominicanos a precios preferenciales.
                            </p>
                        </div>

                        {/* CARD 2 */}
                        <div className="bg-white p-16 rounded-[60px] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group">
                            <div className="size-20 bg-orange-50 rounded-3xl flex items-center justify-center text-orange-600 mb-10 group-hover:bg-[#EAB308] group-hover:text-white transition-all duration-500">
                                <Users size={36} />
                            </div>
                            <h4 className="text-3xl font-black text-[#002B5B] mb-8 uppercase leading-tight">REFERIDOS <br /> ENTRE NEGOCIOS</h4>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                Peluquerías recomendando el colmado vecino, creando un flujo constante dentro de nuestra propia economía.
                            </p>
                        </div>

                        {/* CARD 3 */}
                        <div className="bg-white p-16 rounded-[60px] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group">
                            <div className="size-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mb-10 group-hover:bg-[#001A3D] group-hover:text-white transition-all duration-500">
                                <Award size={36} />
                            </div>
                            <h4 className="text-3xl font-black text-[#002B5B] mb-8 uppercase leading-tight">ALIANZAS <br /> DE EVENTOS</h4>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                DJs y Servicios de Catering colaborando para ofrecer paquetes premium en celebraciones de la comunidad.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CATEGORIES ── */}
            <section className="py-40 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-24">
                        <h2 className="text-6xl font-black text-[#002B5B] mb-4 tracking-tighter">Explora por Categoría</h2>
                        <p className="text-2xl text-slate-300 font-black uppercase tracking-[0.2em]">De nuestra gente para nuestra gente</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {CATEGORIES.map(cat => (
                            <Link
                                key={cat.id}
                                to={`/directorio?category=${cat.slug}`}
                                className="group flex flex-col items-center gap-8 p-14 rounded-[60px] bg-slate-50 border-2 border-transparent hover:border-dr-red hover:bg-white transition-all duration-500 text-center"
                            >
                                <div className="text-7xl group-hover:scale-125 transition-transform duration-500 filter drop-shadow-xl">{cat.icon || '📍'}</div>
                                <span className="font-black text-xs uppercase tracking-[0.3em] text-[#002B5B]">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MAP SECTION ── */}
            <section className="py-24 bg-surface-2 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="badge bg-[#D31F3B]/10 text-[#D31F3B] mb-4 px-6 py-2">UBICACIONES</span>
                        <h2 className="text-5xl md:text-7xl font-black text-[#002B5B] mb-6 tracking-tighter">Nuestra Vitrina en el Mapa</h2>
                        <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto">Encuentra a un solo clic qué negocios, peluquerías y restaurantes dominicanos están cerca de ti.</p>
                    </div>

                    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-slate-200 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                        {/* Static Map Image / Representation */}
                        <img 
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop" 
                            className="w-full h-full object-cover opacity-80"
                            alt="Mapa de Cataluña" 
                        />
                        <div className="absolute inset-0 bg-blue-900/10"></div>
                        
                        {/* Fake Pins */}
                        <div className="absolute top-[30%] left-[45%] group cursor-pointer">
                            <div className="size-10 bg-[#D31F3B] rounded-full flex items-center justify-center text-white shadow-xl border-2 border-white animate-bounce ring-4 ring-[#D31F3B]/30">
                                <MapPin size={24} />
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white p-4 rounded-3xl shadow-2xl w-64 transition-all pointer-events-none z-20">
                                <h4 className="font-black text-[#002B5B] uppercase text-sm mb-1">El Fogón Sabroso</h4>
                                <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Restaurantes • Barcelona</p>
                                <p className="text-xs text-gray-600 line-clamp-2">Comida criolla auténtica, el mejor mangú de la zona.</p>
                            </div>
                        </div>

                        <div className="absolute top-[45%] left-[60%] group cursor-pointer">
                            <div className="size-10 bg-[#EAB308] rounded-full flex items-center justify-center text-white shadow-xl border-2 border-white hover:scale-110 transition-transform ring-4 ring-[#EAB308]/30">
                                <MapPin size={24} />
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white p-4 rounded-3xl shadow-2xl w-64 transition-all pointer-events-none z-20">
                                <h4 className="font-black text-[#002B5B] uppercase text-sm mb-1">Frutas El Cibao</h4>
                                <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Fruterías • Badalona</p>
                                <p className="text-xs text-gray-600 line-clamp-2">Plátanos, yuca, batata y productos frescos cada martes.</p>
                            </div>
                        </div>

                        <div className="absolute top-[60%] left-[30%] group cursor-pointer">
                            <div className="size-10 bg-[#002B5B] rounded-full flex items-center justify-center text-white shadow-xl border-2 border-white hover:scale-110 transition-transform ring-4 ring-[#002B5B]/30">
                                <MapPin size={24} />
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white p-4 rounded-3xl shadow-2xl w-64 transition-all pointer-events-none z-20">
                                <h4 className="font-black text-[#002B5B] uppercase text-sm mb-1">Stylo's VIP</h4>
                                <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Peluquerías • L'Hospitalet</p>
                                <p className="text-xs text-gray-600 line-clamp-2">Cortes modernos, cerquillos perfectos y trenzas.</p>
                            </div>
                        </div>

                        {/* Map Overlay info */}
                        <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-96 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl">
                            <h3 className="font-black text-[#002B5B] text-xl mb-2">Explora en toda Cataluña</h3>
                            <p className="text-sm font-medium text-gray-600 mb-4">Navega por el mapa interactivo y descubre qué locales están cerca de donde vives o visitas.</p>
                            <Link to="/directorio" className="btn btn-primary w-full shadow-lg">Ver Directorio Completo</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 px-6 mb-24">
                <div className="max-w-7xl mx-auto bg-dr-red rounded-[80px] p-24 md:p-40 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(211,31,59,0.3)]">
                    <div className="absolute top-0 right-0 size-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <h2 className="text-5xl md:text-8xl font-black text-white mb-12 uppercase tracking-tighter leading-[0.9] max-w-5xl mx-auto">
                        Sé parte del crecimiento dominicano
                    </h2>
                    <p className="text-2xl text-white/50 font-bold mb-20 uppercase tracking-[0.3em]">Impulsa tu comercio hoy mismo</p>

                    <div className="flex flex-col sm:flex-row gap-8 justify-center">
                        <Link to="/registro" className="px-16 py-8 bg-white text-dr-red hover:bg-[#002B5B] hover:text-white font-black text-2xl uppercase tracking-widest rounded-[32px] transition-all">REGISTRAR MI NEGOCIO GRATIS</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
