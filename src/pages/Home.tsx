import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Crown, ChevronRight, TrendingUp, Users, Award } from 'lucide-react';
import { CATEGORIES, type Business } from '../types';
import { supabase } from '../lib/supabase';
import AdBanner from '../components/AdBanner';

const Home: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [featuredBusinesses, setFeaturedBusinesses] = useState<Business[]>([]);

    // Filter premium businesses for the rotating showcase
    const premiumBusinesses = featuredBusinesses.filter(b => b.is_premium);

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
                },
                {
                    id: '2',
                    owner_id: 'real_owner_2',
                    name: 'Peluquería Jossi',
                    slug: 'peluqueria-estetica-jossi',
                    category: 'Belleza',
                    description: 'Especialistas en cabello latino, uñas y estética en Sagrada Familia.',
                    address: 'Carrer de Lepant, 226, Barcelona',
                    city: 'Barcelona',
                    phone: '931 72 80 15',
                    whatsapp: '34666295201',
                    images: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop'],
                    is_premium: true,
                    is_approved: true,
                    is_featured: true,
                    views: 1890,
                    clicks: 520,
                    rating_avg: 4.7,
                    rating_count: 85,
                    created_at: new Date().toISOString()
                },
                {
                    id: '3',
                    owner_id: 'real_owner_3',
                    name: 'Sabor Criollo',
                    slug: 'bar-restaurante-sabor-criollo',
                    category: 'Restaurantes',
                    description: 'Fusión auténtica de sabores dominicanos y mediterráneos en Nou Barris.',
                    address: 'Pg. de Fabra i Puig, 177, Barcelona',
                    city: 'Barcelona',
                    phone: '931 96 18 24',
                    whatsapp: '34931961824',
                    images: ['https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?q=80&w=800&auto=format&fit=crop'],
                    is_premium: true,
                    is_approved: true,
                    is_featured: true,
                    views: 2420,
                    clicks: 410,
                    rating_avg: 4.6,
                    rating_count: 92,
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

    useEffect(() => {
        if (premiumBusinesses.length <= 1) return;
        const interval = setInterval(() => {
            // Logic for rotation if needed, currently using activeFeaturedIndex which was unused
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
                            <div className="flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                    <Users size={16} className="text-dr-gold" />
                                    <span className="text-xs font-black uppercase tracking-widest">Unión Comunitaria</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                    <TrendingUp size={16} className="text-dr-gold" />
                                    <span className="text-xs font-black uppercase tracking-widest">Crecimiento Local</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                    <Award size={16} className="text-dr-gold" />
                                    <span className="text-xs font-black uppercase tracking-widest">Confianza Digital</span>
                                </div>
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
                            <h3 className="text-dr-blue font-black uppercase text-xs tracking-[0.2em] mb-4">¿Por qué este Directorio?</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                Nace de la necesidad de <strong>centralizar nuestra fuerza comercial</strong> en Barcelona. Es la herramienta para que ningún dominicano se sienta perdido y sepa dónde encontrar su sazón, su estilo y su gente.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                            <h3 className="text-dr-red font-black uppercase text-xs tracking-[0.2em] mb-4">Utilidad e Importancia</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                No es solo una lista de teléfonos; es un <strong>motor de búsqueda especializado</strong> que valida la calidad de los servicios, facilitando la vida diaria del residente y del recién llegado.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                            <h3 className="text-dr-gold font-black uppercase text-xs tracking-[0.2em] mb-4">Beneficios Directos</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                Para el usuario, <strong>seguridad y rapidez</strong>. Para el dueño de negocio, una <strong>vitrina premium</strong> que lo conecta con clientes que ya están buscando lo que él ofrece.
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
                            <h3 className="text-lg font-black mb-4 uppercase tracking-tight">Proveedores de Casa</h3>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                <strong>Ejemplo Real:</strong> Una frutería dominicana con plátanos frescos puede ceder productos a un restaurante dominicano a precios preferenciales. El restaurante ahorra y la frutería gana un cliente fijo para siempre.
                            </p>
                        </div>
                        <div className="card p-8 bg-surface-2 border-none hover:translate-y-[-8px] transition-all">
                            <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-dr-red shadow-sm mb-6 mx-auto md:mx-0">
                                <Users size={28} />
                            </div>
                            <h3 className="text-lg font-black mb-4 uppercase tracking-tight">Referidos entre Negocios</h3>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                Una peluquería puede recomendar a sus clientes el colmado de al lado para sus compras, creando un <strong>flujo constante de clientes</strong> que se quedan dentro de nuestra propia economía comunitaria.
                            </p>
                        </div>
                        <div className="card p-8 bg-surface-2 border-none hover:translate-y-[-8px] transition-all">
                            <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-dr-gold shadow-sm mb-6 mx-auto md:mx-0">
                                <Award size={28} />
                            </div>
                            <h3 className="text-lg font-black mb-4 uppercase tracking-tight">Alianzas de Eventos</h3>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                Cuando un DJ dominicano trabaja con un servicio de catering de la tierra para un evento, el beneficio se multiplica. Juntos ofrecen un <strong>paquete premium</strong> irresistible para el cliente final.
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
