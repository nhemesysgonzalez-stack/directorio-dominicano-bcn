import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    MapPin, Phone, MessageSquare, Instagram, Facebook, Globe, Clock,
    Star, Crown, Share2, ChevronLeft, Play, Award,
    ShieldCheck, ArrowRight, Camera, TrendingUp, Zap
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type Business, type Review } from '../types';
import { supabase } from '../lib/supabase';

// Fix Leaflet marker icon issue
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


const BusinessProfile: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [business, setBusiness] = useState<Business | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        fetchBusiness();
    }, [slug]);

    const fetchBusiness = async () => {
        setLoading(true);
        // Mock data for initial development
        const mockBusiness: Business = {
            id: '1',
            owner_id: 'real_owner_1',
            name: 'Restaurante Paraíso VIP',
            slug: 'restaurante-paraiso-vip',
            category: 'Restaurantes',
            description: 'Especialistas en comida dominicana. Mofongo, sancocho y un ambiente espectacular en Sants-Badal.',
            long_description: 'Ubicado en el corazón de Sants-Badal, Restaurante Paraíso VIP es un referente de la gastronomía dominicana en Cataluña. Ofrecemos los platos más tradicionales con el sabor auténtico de nuestra tierra, desde un mofongo bien sazonado hasta el clásico sancocho nacional.\n\nVen a disfrutar de nuestra hospitalidad en un ambiente familiar y vibrante, ideal para celebraciones o una comida tranquila con lo mejor de Quisqueya.',
            address: 'Carrer de Carreras I Candi, 1, 08028 Cataluña',
            city: 'Cataluña',
            lat: 41.3735,
            lng: 2.1284,
            phone: '932 77 74 37',
            whatsapp: '34932777437',
            instagram: 'elparaisovip',
            facebook: 'restaurante-paraiso-vip',
            website: 'www.elparaisovip.com',
            email: 'info@elparaisovip.com',
            logo_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=100&auto=format&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop'
            ],
            schedule: 'Mar-Dom: 13:00 - 23:30. Lunes cerrado.',
            is_premium: true,
            is_approved: true,
            is_featured: true,
            views: 3150,
            clicks: 840,
            rating_avg: 4.5,
            rating_count: 120,
            created_at: new Date().toISOString()
        };

        const mockReviews: Review[] = [
            { id: 'r1', user_id: 'u1', business_id: '1', rating: 5, comment: '¡El mejor sancocho de Cataluña! Me sentí como en mi casa.', user_name: 'Rosa M.', created_at: new Date().toISOString() },
            { id: 'r2', user_id: 'u2', business_id: '1', rating: 4, comment: 'Muy buena comida, pero el local se llena mucho los fines de semana. Recomiendo reservar.', user_name: 'Juan P.', created_at: new Date().toISOString() }
        ];

        try {
            const { data } = await supabase
                .from('dd_businesses')
                .select('*')
                .eq('slug', slug)
                .single();

            if (data) setBusiness(data);
            else setBusiness(mockBusiness);
            setReviews(mockReviews);
        } catch (e) {
            setBusiness(mockBusiness);
            setReviews(mockReviews);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 py-20 bg-surface-2">
            <div className="spinner"></div>
            <span className="text-xs font-black uppercase tracking-widest text-dr-blue">Cargando perfil...</span>
        </div>
    );

    if (!business) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-12 text-center bg-surface-2">
            <h2 className="text-3xl font-black mb-4">Negocio no encontrado</h2>
            <Link to="/directorio" className="btn btn-primary">Volver al Directorio</Link>
        </div>
    );

    return (
        <div className="bg-surface-2 min-h-screen pb-32">
            {/* Gallery Header */}
            <section className="relative h-[400px] md:h-[600px] overflow-hidden bg-black">
                <div className="absolute inset-0 opacity-80 transition-opacity">
                    <img
                        src={business.images[activeImage]}
                        alt={business.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <Link to="/directorio" className="btn btn-outline border-white/20 text-white bg-white/10 backdrop-blur-md btn-sm">
                            <ChevronLeft size={16} /> Volver
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="text-white max-w-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="badge badge-blue">{business.category}</span>
                                {business.is_premium && (
                                    <span className="badge badge-premium gap-1">
                                        <Crown size={12} /> Premium
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter leading-none">{business.name}</h1>
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="stars">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star key={i} size={16} className={i <= (business.rating_avg || 5) ? 'star fill-current' : 'star-empty'} />
                                        ))}
                                    </div>
                                    <span className="font-bold">({business.rating_count} reseñas)</span>
                                </div>
                                <div className="flex items-center gap-2 font-bold text-white/80">
                                    <MapPin size={18} className="text-dr-red" />
                                    {business.address}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="btn btn-outline border-white/20 text-white bg-white/10 backdrop-blur-md gap-2">
                                <Share2 size={18} /> Compartir
                            </button>
                            <button className="btn btn-red gap-2">
                                <Award size={18} /> Guardar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Thumbnail Navigation */}
                <div className="absolute bottom-12 right-12 hidden md:flex flex-col gap-3 p-2 bg-black/40 backdrop-blur-lg rounded-3xl border border-white/10">
                    {business.images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveImage(i)}
                            className={`size-16 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-dr-gold scale-110 shadow-lg' : 'border-transparent opacity-50'}`}
                        >
                            <img src={img} className="w-full h-full object-cover" alt={`Thumb ${i}`} />
                        </button>
                    ))}
                    <button className="size-16 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                        <Camera size={24} />
                    </button>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="card p-10">
                            <h2 className="text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
                                <ShieldCheck className="text-dr-blue" /> Sobre nosotros
                            </h2>
                            <div className="space-y-6 text-gray-600 font-medium text-lg leading-relaxed whitespace-pre-line">
                                {business.long_description || business.description}
                            </div>
                        </div>

                        {/* Video Placeholder if Premium */}
                        {business.is_premium && (
                            <div className="card overflow-hidden bg-black h-96 relative flex items-center justify-center group cursor-pointer">
                                <img
                                    src={business.images[1]}
                                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
                                    alt="Video cover"
                                />
                                <div className="relative z-10 size-24 rounded-full bg-white/20 backdrop-blur-xl border-2 border-white flex items-center justify-center text-white scale-125 group-hover:bg-dr-red group-hover:border-dr-red transition-all">
                                    <Play size={40} className="fill-current ml-2" />
                                </div>
                                <div className="absolute bottom-8 left-8 text-white">
                                    <span className="badge badge-premium mb-2">Video promocional</span>
                                    <h3 className="text-xl font-black uppercase tracking-tight">Vibra con {business.name}</h3>
                                </div>
                            </div>
                        )}

                        {/* Location (Real Map) */}
                        <div className="card p-10">
                            <h2 className="text-2xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
                                <MapPin className="text-dr-red" /> Ubicación en Tiempo Real
                            </h2>
                            <div className="h-[400px] w-full rounded-3xl overflow-hidden border-4 border-white shadow-xl mb-6 relative z-0">
                                <MapContainer
                                    center={[business.lat || 41.3851, business.lng || 2.1734]}
                                    zoom={15}
                                    scrollWheelZoom={false}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[business.lat || 41.3851, business.lng || 2.1734]}>
                                        <Popup>
                                            <div className="p-2">
                                                <h4 className="font-black border-b border-gray-100 pb-1 mb-1">{business.name}</h4>
                                                <p className="text-[10px] font-bold text-gray-400">{business.address}</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-outline flex-1 gap-2 border-2"
                                >
                                    Abrir en Google Maps <ArrowRight size={18} />
                                </a>
                                <button className="btn btn-primary flex-1 gap-2 shadow-xl shadow-dr-blue/20">
                                    ¿Cómo llegar hoy?
                                </button>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="card p-10">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-black uppercase tracking-tight">Reseñas</h2>
                                <div className="flex flex-col items-center">
                                    <span className="text-4xl font-black text-dr-blue leading-none">{business.rating_avg}</span>
                                    <div className="stars mt-1">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="star fill-current" />)}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {reviews.map(rev => (
                                    <div key={rev.id} className="flex gap-6 pb-8 border-b border-gray-100 last:border-0">
                                        <div className="size-14 rounded-2xl bg-surface-2 flex items-center justify-center text-dr-blue text-xl font-black">
                                            {rev.user_name?.[0] || 'U'}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-black text-lg">{rev.user_name}</span>
                                                <span className="text-xs font-bold text-gray-400">{new Date(rev.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <div className="stars mb-4">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <Star key={i} size={14} className={i <= rev.rating ? 'star fill-current' : 'star-empty'} />
                                                ))}
                                            </div>
                                            <p className="text-gray-600 font-medium leading-relaxed italic">"{rev.comment}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="btn btn-outline btn-lg w-full mt-8">Escribir una reseña</button>
                        </div>
                    </div>

                    {/* Sidebar Actions */}
                    <div className="space-y-8">
                        {/* Sinergy Card - The Core Bridge Feature */}
                        <div className="card p-8 bg-[#002B5B] text-white overflow-hidden relative shadow-2xl shadow-blue-900/40 border border-white/5">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <TrendingUp size={120} />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#EAB308]">
                                        <Zap size={24} fill="currentColor" />
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter">RED DE SINERGIAS</h3>
                                </div>

                                <div className="space-y-8">
                                    {/* WANT SYNERGY WITH */}
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#EAB308] mb-4">QUIERO SINERGIAS CON:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {(business.synergy_desires || ['Colmados', 'Restaurantes', 'Catering', 'DJ/Eventos']).map(cat => (
                                                <span key={cat} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/80">
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CURRENT PARTNERS */}
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">SINERGIAS ACTIVAS ✅</h4>
                                        <div className="space-y-3">
                                            {(business.synergy_partners || ['Colmado Carlos', 'Sabor Latino Cataluña']).map(partner => (
                                                <div key={partner} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                                                    <div className="size-2 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                                                    <span className="text-xs font-bold">{partner}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* REAL EXAMPLE */}
                                    <div className="p-6 bg-white/5 rounded-3xl border border-dashed border-white/20">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 italic">EJEMPLO DE ÉXITO:</h4>
                                        <p className="text-xs font-medium leading-relaxed italic text-white/70">
                                            {business.synergy_description || `"Compartimos excedente de materias primas con restaurantes cercanos para reducir mermas y asegurar frescura diaria."`}
                                        </p>
                                    </div>

                                    {/* THE BRIDGE BUTTON */}
                                    <div className="pt-4">
                                        <a
                                            href={`mailto:${business.email || 'info@directorio.com'}?subject=Sinergia con ${business.name}`}
                                            className="w-full flex items-center justify-center gap-3 py-5 bg-[#EAB308] hover:bg-white text-[#002B5B] font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all"
                                        >
                                            <TrendingUp size={18} /> MATERIALIZAR SINERGIA
                                        </a>
                                        <p className="text-center text-[9px] font-bold text-white/30 mt-4 uppercase tracking-widest">
                                            Somos el puente entre tu negocio y el progreso
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className="card p-8 bg-dr-blue text-white sticky top-32">
                            <h3 className="text-xl font-black mb-8 uppercase tracking-tight">¿Hablamos?</h3>

                            <div className="space-y-6">
                                <a
                                    href={`https://wa.me/${business.whatsapp}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="whatsapp-btn w-full justify-center btn-lg"
                                >
                                    <MessageSquare size={20} /> WHATSAPP DIRECTO
                                </a>

                                <a
                                    href={`tel:${business.phone}`}
                                    className="btn btn-outline border-white text-white w-full btn-lg hover:bg-white hover:text-dr-blue"
                                >
                                    <Phone size={18} /> LLAMAR AHORA
                                </a>
                            </div>

                            <div className="mt-10 pt-10 border-t border-white/10 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <Clock size={18} className="text-dr-gold" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black uppercase text-white/60 block mb-1">Horario de atención</span>
                                        <p className="text-sm font-bold leading-relaxed">{business.schedule}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    {business.instagram && (
                                        <a href={`https://instagram.com/${business.instagram}`} className="size-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-dr-gold hover:text-dr-blue transition-all">
                                            <Instagram size={22} />
                                        </a>
                                    )}
                                    {business.facebook && (
                                        <a href="#" className="size-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-dr-gold hover:text-dr-blue transition-all">
                                            <Facebook size={22} />
                                        </a>
                                    )}
                                    {business.website && (
                                        <a href={`http://${business.website}`} className="size-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-dr-gold hover:text-dr-blue transition-all">
                                            <Globe size={22} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Promotions card if premium */}
                        {business.is_premium && (
                            <div className="card p-8 bg-gradient-to-br from-dr-red/5 to-white border-2 border-dr-red/20 overflow-hidden relative">
                                <div className="absolute -top-10 -right-10 size-32 bg-dr-red/10 rounded-full"></div>
                                <h3 className="text-xl font-black mb-6 uppercase tracking-tight text-dr-red">Promociones</h3>
                                <div className="space-y-4">
                                    <div className="p-5 bg-white rounded-2xl border border-dr-red/10 shadow-sm relative z-10">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-dr-red mb-2 block">Oferta Exclusiva</span>
                                        <h4 className="font-black text-lg mb-1">-15% Primer Pedido</h4>
                                        <p className="text-xs text-gray-500 font-bold mb-4 line-clamp-2">Solo para nuevos clientes que vengan desde el Directorio Dominicano.</p>
                                        <button className="btn btn-red btn-sm w-full uppercase tracking-widest">Obtener Cupón</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default BusinessProfile;
