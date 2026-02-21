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

    useEffect(() => {
        if (premiumBusinesses.length <= 1) return;
        const interval = setInterval(() => {
            setActiveFeaturedIndex((prev) => (prev + 1) % premiumBusinesses.length);
        }, 60000);
        return () => clearInterval(interval);
    }, [premiumBusinesses.length]);

    return (
        <div className="flex flex-col">
            {/* Hero Section - Clean & Direct */}
            <section className="hero-gradient py-24 md:py-32 relative text-white overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-in">
                        <h1 className="section-title text-white mb-4 text-shadow-lg leading-tight uppercase tracking-tighter">
                            Directorio Dominicano <span className="text-dr-red">Barcelona</span>
                        </h1>
                        <p className="text-lg md:text-xl font-medium opacity-90 mb-10 max-w-2xl mx-auto">
                            Encuentra los mejores restaurantes, servicios y negocios locales de nuestra comunidad. ¡Siéntete como en casa!
                        </p>

                        {/* Quick Info Bar - Horizontal & Discrete */}
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                <Users size={16} className="text-dr-gold" />
                                <span className="text-xs font-black uppercase tracking-widest">¿Quiénes Somos?</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                <TrendingUp size={16} className="text-dr-gold" />
                                <span className="text-xs font-black uppercase tracking-widest">Finalidad</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                <Award size={16} className="text-dr-gold" />
                                <span className="text-xs font-black uppercase tracking-widest">Beneficios</span>
                            </div>
                        </div>

                        {/* Search Box */}
                        <div className="bg-white/10 backdrop-blur-xl p-2 rounded-3xl border border-white/20 shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 text-white">
                                <Search size={22} className="text-white/60" />
                                <input
                                    type="text"
                                    placeholder="¿Qué buscas? (ex: Pica Pollo, Peluquería...)"
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

                        {/* Stats - Small & Clean */}
                        <div className="flex justify-center gap-8 mt-12 text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
                            <div className="flex items-center gap-2">
                                <span className="text-white">150+</span> Negocios
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white">2k+</span> Usuarios
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white">Calidad</span> Verificada
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Background Elements */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-dr-red/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-dr-blue/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            </section>

            {/* About / Info Section - Replaces the huge Header box */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                            <h3 className="text-dr-blue font-black uppercase text-xs tracking-[0.2em] mb-4">¿Quiénes Somos?</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                Somos la primera plataforma dedicada a <strong>centralizar y potenciar</strong> el comercio dominicano en Barcelona. Un punto de encuentro digital para nuestra gente.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                            <h3 className="text-dr-red font-black uppercase text-xs tracking-[0.2em] mb-4">Nuestra Finalidad</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                Facilitar que cada dominicano en Barcelona encuentre lo que busca al instante, mientras impulsamos el <strong>crecimiento colectivo</strong> de nuestros emprendedores.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                            <h3 className="text-dr-gold font-black uppercase text-xs tracking-[0.2em] mb-4">Beneficios</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                Información 100% verificada, visibilidad inmediata para tu negocio y acceso exclusivo a una <strong>red de sinergias</strong> y alianzas estratégicas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Synergies Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <span className="badge badge-blue mb-4 uppercase tracking-widest font-black">Red de Sinergias</span>
                        <h2 className="section-title mb-6">Más que un Directorio, una Comunidad</h2>
                        <p className="section-subtitle">Fomentamos la colaboración entre emprendedores dominicanos para que todos ganemos.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        <div className="card p-8 bg-surface-2 border-none hover:translate-y-[-8px] transition-all">
                            <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-dr-blue shadow-sm mb-6 mx-auto md:mx-0">
                                <TrendingUp size={28} />
                            </div>
                            <h3 className="text-lg font-black mb-4 uppercase tracking-tight">Suministros Estratégicos</h3>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                Una <strong>frutería dominicana</strong> puede vender sus productos frescos a un <strong>restaurante dominicano</strong> con precios preferenciales, ganando un cliente fijo y el restaurante un proveedor de confianza.
                            </p>
                        </div>
                        <div className="card p-8 bg-surface-2 border-none hover:translate-y-[-8px] transition-all">
                            <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-dr-red shadow-sm mb-6 mx-auto md:mx-0">
                                <Users size={28} />
                            </div>
                            <h3 className="text-lg font-black mb-4 uppercase tracking-tight">Alianzas de Eventos</h3>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                Una <strong>decoradora de eventos</strong> y un <strong>DJ</strong> pueden crear paquetes conjuntos para bautizos y bodas, ofreciendo un mejor precio final y asegurando trabajo para ambos.
                            </p>
                        </div>
                        <div className="card p-8 bg-surface-2 border-none hover:translate-y-[-8px] transition-all">
                            <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-dr-gold shadow-sm mb-6 mx-auto md:mx-0">
                                <Award size={28} />
                            </div>
                            <h3 className="text-lg font-black mb-4 uppercase tracking-tight">Fomento del Consumo</h3>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                Un <strong>colmado</strong> puede entregar cupones de descuento para una <strong>peluquería</strong> cercana, incentivando que los clientes consuman en todos los negocios del barrio.
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

            {/* Premium Showcase */}
            <section className="py-24 bg-dr-blue relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
                        <div className="text-white text-center md:text-left">
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">Showcase <span className="text-dr-gold">Gold</span></h2>
                            <p className="text-white/70 font-medium max-w-lg">Nuestros negocios premium rotan constantemente para darte la máxima visibilidad.</p>
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
                                    <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                                        <div className="flex items-center gap-1 text-dr-gold mb-2">
                                            <Star size={12} fill="currentColor" />
                                            <span className="text-xs font-black uppercase tracking-widest">{biz.rating_avg} Rating</span>
                                        </div>
                                        <h3 className="text-2xl font-black uppercase leading-none mb-2">{biz.name}</h3>
                                        <p className="text-white/60 text-xs line-clamp-2 font-medium">{biz.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ad Banner - Lower */}
            <div className="container mx-auto px-4 py-8">
                <AdBanner
                    type="horizontal"
                    imageUrl="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop"
                    linkUrl="/registro"
                    label="Anúnciate con nosotros"
                />
            </div>
        </div>
    );
};

export default Home;
