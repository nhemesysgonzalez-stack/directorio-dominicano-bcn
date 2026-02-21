import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Crown, ChevronRight, TrendingUp, Users, Award } from 'lucide-react';
import { CATEGORIES, type Business } from '../types';
import { supabase } from '../lib/supabase';
import AdBanner from '../components/AdBanner';

const Home: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [featuredBusinesses, setFeaturedBusinesses] = useState<Business[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);

    // Filter premium businesses for the rotating showcase
    const premiumBusinesses = featuredBusinesses.filter(b => b.is_premium);

    useEffect(() => {
        const fetchFeatured = async () => {
            setLoading(true);
            // Mock data for initial development while DB tables are created
            const mockFeatured: Business[] = [
                {
                    id: '1',
                    owner_id: 'owner1',
                    name: 'Restaurante El Criollo',
                    slug: 'restaurante-el-criollo',
                    category: 'Restaurantes',
                    description: 'El auténtico sabor dominicano en el corazón de Barcelona. Mofongo, Sancocho y el mejor Pica Pollo.',
                    address: 'Carrer de Trafalgar, 45, Barcelona',
                    city: 'Barcelona',
                    phone: '934 12 34 56',
                    whatsapp: '600112233',
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
                    description: 'Todos los productos de nuestra tierra: plátanos, salami Induveca, maltas y más.',
                    address: 'Carrer de la Unió, 12, Barcelona',
                    city: 'Barcelona',
                    phone: '931 22 33 44',
                    whatsapp: '611223344',
                    images: ['https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop'],
                    is_premium: true,
                    is_approved: true,
                    is_featured: true,
                    views: 890,
                    clicks: 210,
                    rating_avg: 4.5,
                    rating_count: 32,
                    created_at: new Date().toISOString()
                },
                {
                    id: '3',
                    owner_id: 'owner3',
                    name: 'Peluquería Estilo Dominicano',
                    slug: 'peluqueria-estilo-dominicano',
                    category: 'Belleza',
                    description: 'Especialistas en cortes dominicanos, blowout y color. Ven a ponerte bella.',
                    address: 'Avinguda del Paral·lel, 120, Barcelona',
                    city: 'Barcelona',
                    phone: '933 44 55 66',
                    whatsapp: '622334455',
                    images: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop'],
                    is_premium: true,
                    is_approved: true,
                    is_featured: true,
                    views: 740,
                    clicks: 180,
                    rating_avg: 4.9,
                    rating_count: 45,
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
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    // Effect for rotating premium businesses every minute (60s)
    useEffect(() => {
        if (premiumBusinesses.length <= 1) return;

        const interval = setInterval(() => {
            setActiveFeaturedIndex((prev) => (prev + 1) % premiumBusinesses.length);
        }, 60000); // 1 minute as requested

        return () => clearInterval(interval);
    }, [premiumBusinesses.length]);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="hero-gradient py-24 md:py-32 relative text-white overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center animate-in">
                        <h1 className="section-title text-white mb-6 text-shadow-lg leading-tight uppercase tracking-tighter">
                            La Red Unificada de <span className="text-dr-red">Negocios Dominicanos</span> en Barcelona
                        </h1>
                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-10 border border-white/20 animate-in fade-in duration-1000">
                            <div className="flex flex-col md:flex-row gap-8 text-left">
                                <div className="flex-1">
                                    <h3 className="text-dr-gold font-black uppercase text-xs tracking-[0.2em] mb-3">¿Quiénes Somos?</h3>
                                    <p className="text-sm font-medium leading-relaxed opacity-90">
                                        Somos la primera plataforma dedicada a <strong>centralizar y potenciar</strong> el comercio dominicano en Barcelona. Un punto de encuentro digital para nuestra gente.
                                    </p>
                                </div>
                                <div className="hidden md:block w-px bg-white/10"></div>
                                <div className="flex-1">
                                    <h3 className="text-dr-gold font-black uppercase text-xs tracking-[0.2em] mb-3">Nuestra Finalidad</h3>
                                    <p className="text-sm font-medium leading-relaxed opacity-90">
                                        Facilitar que cada dominicano en Barcelona encuentre lo que busca al instante, mientras impulsamos el <strong>crecimiento colectivo</strong> de nuestros emprendedores.
                                    </p>
                                </div>
                                <div className="hidden md:block w-px bg-white/10"></div>
                                <div className="flex-1">
                                    <h3 className="text-dr-gold font-black uppercase text-xs tracking-[0.2em] mb-3">Beneficios</h3>
                                    <p className="text-sm font-medium leading-relaxed opacity-90">
                                        Información 100% verificada, visibilidad inmediata para tu negocio y acceso exclusivo a una <strong>red de sinergias</strong> y alianzas estratégicas.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Search Box */}
                        <div className="bg-white/10 backdrop-blur-xl p-2 rounded-3xl border border-white/20 shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 text-white">
                                <Search size={22} className="text-white/60" />
                                <input
                                    type="text"
                                    placeholder="¿Qué estás buscando? (ex: Pica Pollo)"
                                    className="bg-transparent border-none outline-none w-full text-lg placeholder:text-white/50"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="hidden md:block w-px bg-white/20 h-10 my-auto"></div>
                            <div className="flex items-center gap-2 px-4 py-3 text-white">
                                <MapPin size={22} className="text-white/60" />
                                <span className="font-bold">Barcelona</span>
                            </div>
                            <Link
                                to={`/directorio?search=${searchTerm}`}
                                className="btn btn-red btn-lg shadow-xl"
                            >
                                Buscar
                            </Link>
                        </div>

                        {/* Premium Rotating Spotlight */}
                        {!loading && premiumBusinesses.length > 0 && (
                            <div className="mt-12 animate-in slide-in-from-bottom-4 duration-1000">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-dr-gold">Destacado del Momento</p>
                                <Link
                                    to={`/negocio/${premiumBusinesses[activeFeaturedIndex].slug}`}
                                    className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md p-2 pr-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all group"
                                >
                                    <img
                                        src={premiumBusinesses[activeFeaturedIndex].images[0]}
                                        className="size-14 rounded-xl object-cover shadow-lg"
                                        alt=""
                                    />
                                    <div className="text-left">
                                        <h4 className="font-black text-sm uppercase tracking-tight group-hover:text-dr-gold transition-colors">
                                            {premiumBusinesses[activeFeaturedIndex].name}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <Star size={10} className="text-dr-gold fill-dr-gold" />
                                                <span className="text-[10px] font-bold">{premiumBusinesses[activeFeaturedIndex].rating_avg}</span>
                                            </div>
                                            <span className="text-[8px] opacity-40 uppercase font-bold tracking-widest">• {premiumBusinesses[activeFeaturedIndex].category}</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="ml-auto opacity-40 group-hover:translate-x-1 transition-all" />
                                </Link>
                                <div className="flex justify-center gap-1 mt-4">
                                    {premiumBusinesses.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1 rounded-full transition-all duration-1000 ${i === activeFeaturedIndex ? 'w-8 bg-dr-gold' : 'w-2 bg-white/20'}`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mt-16 text-white/80">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={18} className="text-dr-gold" />
                                <span className="font-black">150+ Negocios</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={18} className="text-dr-gold" />
                                <span className="font-black">2k+ Usuarios</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award size={18} className="text-dr-gold" />
                                <span className="font-black">Calidad DR</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Badges Visualization */}
                <div className="absolute top-20 -left-10 size-40 bg-dr-red rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute bottom-10 -right-10 size-60 bg-dr-blue rounded-full opacity-10 blur-3xl"></div>
            </section>

            {/* Top Ad Banner */}
            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <AdBanner
                    type="horizontal"
                    imageUrl="https://images.unsplash.com/photo-1596443686812-2f45229eebc3?q=80&w=1200&auto=format&fit=crop"
                    linkUrl="/registro"
                    label="Anuncio: Promoción Especial"
                />
            </div>

            {/* Why Join Section (Snergies) */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <span className="badge badge-blue mb-4">¿Por qué estar aquí?</span>
                        <h2 className="section-title mb-6">Más que un Directorio, una Red de Sinergias</h2>
                        <p className="section-subtitle">Fomentamos la colaboración entre emprendedores dominicanos para que todos ganemos.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card p-8 bg-surface-2 border-none hover:translate-y-[-8px] transition-all">
                            <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-dr-blue shadow-sm mb-6">
                                <TrendingUp size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Economía Circular</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                Una <strong>frutería</strong> puede ofrecer descuentos especiales en excedentes a <strong>restaurantes</strong> de la red, reduciendo costes y desperdicio.
                            </p>
                        </div>
                        <div className="card p-8 bg-surface-2 border-none hover:translate-y-[-8px] transition-all">
                            <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-dr-red shadow-sm mb-6">
                                <Users size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Alianzas de Eventos</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                Una <strong>floristería</strong> y un <strong>DJ</strong> pueden crear paquetes conjuntos para bodas y bautizos, atrayendo más clientes juntos.
                            </p>
                        </div>
                        <div className="card p-8 bg-surface-2 border-none hover:translate-y-[-8px] transition-all">
                            <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-dr-gold shadow-sm mb-6">
                                <Award size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Ventas Cruzadas</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                Un <strong>colmado</strong> puede promocionar las ofertas de una <strong>peluquería</strong> cercana a cambio de visibilidad mutua en sus locales.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="section-title mb-4">Explora por Categoría</h2>
                            <p className="section-subtitle">Lo que necesites, de nuestra gente para nuestra gente.</p>
                        </div>
                        <Link to="/directorio" className="btn btn-ghost group">
                            Ver todo <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {CATEGORIES.slice(0, 11).map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/directorio?category=${cat.slug}`}
                                className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-gray-100 hover:border-dr-blue hover:shadow-xl transition-all group animate-in"
                            >
                                <div
                                    className="size-16 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-sm"
                                    style={{ backgroundColor: `${cat.color}10`, color: cat.color }}
                                >
                                    {cat.icon}
                                </div>
                                <span className="font-bold text-sm text-gray-700">{cat.name}</span>
                            </Link>
                        ))}
                        <Link
                            to="/directorio"
                            className="flex flex-col items-center justify-center gap-4 p-8 rounded-3xl border-2 border-dashed border-gray-200 hover:border-dr-blue transition-all group"
                        >
                            <div className="size-16 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-dr-blue">
                                <Search size={32} />
                            </div>
                            <span className="font-bold text-sm text-gray-500">Más...</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Banner Publicitario Medio */}
            <div className="container mx-auto px-4 py-8">
                <AdBanner
                    type="horizontal"
                    imageUrl="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop"
                    linkUrl="/registro"
                    label="Tu publicidad aquí - Reach thousands"
                />
            </div>


            {/* Premium Intelligence - Live Showcase */}
            <section className="py-24 bg-dr-blue relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
                        <div className="text-white">
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">Showcase <span className="text-dr-gold">Gold</span></h2>
                            <p className="text-white/70 font-medium max-w-lg">Nuestros negocios premium rotan cada minuto para darte la máxima visibilidad.</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="size-3 bg-dr-gold rounded-full animate-bounce"></div>
                            <div className="size-3 bg-dr-gold rounded-full animate-bounce delay-100"></div>
                            <div className="size-3 bg-dr-gold rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredBusinesses.map((biz, idx) => (
                            <Link
                                key={biz.id}
                                to={`/negocio/${biz.slug}`}
                                className={`card group overflow-hidden border-none transform transition-all duration-700 hover:scale-[1.02] ${idx === 1 ? 'lg:translate-y-12' : ''}`}
                            >
                                <div className="relative aspect-[4/5]">
                                    <img src={biz.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                                        <span className="badge badge-premium px-3 py-1 text-[10px] w-fit">Premium Gold</span>
                                        <div className="size-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                                            <Crown size={20} />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6 text-white">
                                        <div className="flex items-center gap-1 text-dr-gold mb-2">
                                            <Star size={12} fill="currentColor" />
                                            <span className="text-xs font-black uppercase tracking-widest">{biz.rating_avg} Rating</span>
                                        </div>
                                        <h3 className="text-2xl font-black uppercase leading-none mb-2">{biz.name}</h3>
                                        <p className="text-white/60 text-sm line-clamp-2 font-medium">{biz.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                {/* Visual elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-dr-gold/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-dr-red/5 rounded-full blur-3xl -ml-48 -mb-48"></div>
            </section>

            {/* Banner Publicitario Inferior */}
            <div className="container mx-auto px-4 py-8">
                <AdBanner
                    type="horizontal"
                    imageUrl="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop"
                    linkUrl="/registro"
                    label="Anúnciate con nosotros"
                />
            </div>


            {/* Pricing / Join Section */}
            <section className="py-24 bg-white overflow-hidden relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <span className="badge badge-blue mb-6">Impulsa tu negocio</span>
                            <h2 className="section-title mb-6 leading-none">
                                ¿Tienes un negocio <span className="text-dr-red italic">dominicano</span>?
                            </h2>
                            <p className="text-lg text-gray-500 font-medium mb-10 leading-relaxed">
                                Únete al directorio más grande de España y conecta con miles de clientes de nuestra comunidad. Tenemos planes para todos los tamaños.
                            </p>

                            <ul className="space-y-4 mb-10">
                                <li className="flex items-start gap-3">
                                    <div className="size-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5">
                                        <TrendingUp size={14} />
                                    </div>
                                    <div>
                                        <span className="font-black text-sm block">Mayor Visibilidad</span>
                                        <span className="text-xs text-gray-400 font-bold">Aparece en las primeras posiciones de búsqueda.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="size-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5">
                                        <Users size={14} />
                                    </div>
                                    <div>
                                        <span className="font-black text-sm block">Clientes Directos</span>
                                        <span className="text-xs text-gray-400 font-bold">Botón directo a WhatsApp para tus clientes.</span>
                                    </div>
                                </li>
                            </ul>

                            <div className="flex flex-wrap gap-4">
                                <Link to="/registro" className="btn btn-primary btn-lg px-12 shadow-2xl shadow-dr-blue/20">Registrarme Ahora</Link>
                                <Link to="/beneficios" className="btn btn-outline btn-lg">Saber más</Link>
                            </div>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <div className="pricing-card featured relative z-10">
                                <div className="absolute top-0 right-0 bg-dr-red text-white py-2 px-6 rounded-bl-3xl font-black text-xs uppercase tracking-widest shadow-lg">
                                    Top Recomendado
                                </div>
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Plan Premium</h3>
                                    <p className="text-white/60 font-bold text-sm">Escala tu negocio al máximo</p>
                                </div>
                                <div className="flex items-center justify-center gap-1 mb-8">
                                    <span className="text-5xl font-black">10€</span>
                                    <span className="text-white/60 font-bold">/mes</span>
                                </div>
                                <ul className="space-y-4 text-left mb-10">
                                    <li className="flex items-center gap-3 font-bold text-sm">
                                        <span className="material-symbols-outlined text-dr-gold">check_circle</span>
                                        Perfil Destacado y Badge Gold
                                    </li>
                                    <li className="flex items-center gap-3 font-bold text-sm">
                                        <span className="material-symbols-outlined text-dr-gold">check_circle</span>
                                        Galería de hasta 10 fotos
                                    </li>
                                    <li className="flex items-center gap-3 font-bold text-sm">
                                        <span className="material-symbols-outlined text-dr-gold">check_circle</span>
                                        Video promocional en perfil
                                    </li>
                                    <li className="flex items-center gap-3 font-bold text-sm">
                                        <span className="material-symbols-outlined text-dr-gold">check_circle</span>
                                        Estadísticas detalladas de clics
                                    </li>
                                    <li className="flex items-center gap-3 font-bold text-sm">
                                        <span className="material-symbols-outlined text-dr-gold">check_circle</span>
                                        Sección de Promociones propia
                                    </li>
                                </ul>
                                <Link to="/registro?plan=premium" className="btn btn-gold btn-lg w-full font-black uppercase tracking-widest">
                                    Elegir Premium
                                </Link>
                                <p className="mt-6 text-[10px] text-white/40 font-bold uppercase tracking-widest">Sin compromiso • Cancela cuando quieras</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
