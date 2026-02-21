import React from 'react';
import { Zap, Crown, Check, X, ChevronRight, Star, Camera, Play } from 'lucide-react';

interface PricingPlansProps {
    onSelect: (plan: 'negocio_gratis' | 'negocio_premium') => void;
    selectedPlan?: string;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ onSelect, selectedPlan }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto py-10">
            {/* Free Plan */}
            <div className={`card overflow-hidden transition-all duration-500 hover:shadow-2xl ${selectedPlan === 'negocio_gratis' ? 'ring-4 ring-dr-blue border-transparent' : 'border-2 border-gray-100'}`}>
                <div className="p-10 md:p-14 border-b border-gray-50 bg-white">
                    <div className="flex justify-between items-start mb-8">
                        <div className="size-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                            <Zap size={36} />
                        </div>
                        <span className="badge badge-blue px-4 py-1">Esencial</span>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tight mb-3">Plan Básico</h3>
                    <p className="text-gray-500 font-bold mb-8 leading-relaxed">Perfecto para empezar a tener presencia online en nuestra comunidad.</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black uppercase tracking-tighter">0€</span>
                        <span className="text-gray-400 font-bold text-lg">/siempre</span>
                    </div>
                </div>

                <div className="p-10 md:p-14 bg-surface-2/30">
                    <ul className="space-y-6 mb-12">
                        <li className="flex items-center gap-4 text-base font-bold text-gray-600">
                            <div className="size-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                <Check size={14} />
                            </div>
                            Perfil Comercial Básico
                        </li>
                        <li className="flex items-center gap-4 text-base font-bold text-gray-600">
                            <div className="size-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                <Check size={14} />
                            </div>
                            Botón de WhatsApp
                        </li>
                        <li className="flex items-center gap-4 text-base font-bold text-gray-400 opacity-60">
                            <X size={18} className="text-dr-red shrink-0" /> Galería Pro (10 fotos)
                        </li>
                        <li className="flex items-center gap-4 text-base font-bold text-gray-400 opacity-60">
                            <X size={18} className="text-dr-red shrink-0" /> Video Promocional
                        </li>
                        <li className="flex items-center gap-4 text-base font-bold text-gray-400 opacity-60">
                            <X size={18} className="text-dr-red shrink-0" /> Sello de Verificación
                        </li>
                    </ul>

                    <button
                        onClick={() => onSelect('negocio_gratis')}
                        className={`btn w-full btn-lg h-16 gap-3 text-lg ${selectedPlan === 'negocio_gratis' ? 'btn-primary shadow-xl shadow-dr-blue/20' : 'btn-outline border-2 hover:bg-dr-blue hover:text-white'}`}
                    >
                        Seleccionar Básico <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Premium Plan */}
            <div className={`card overflow-hidden transition-all duration-500 relative hover:shadow-2xl ${selectedPlan === 'negocio_premium' ? 'ring-4 ring-dr-gold border-transparent' : 'border-2 border-dr-gold/30 shadow-dr-gold/5'}`}>
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 p-6 pointer-events-none">
                    <div className="bg-dr-gold text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse">
                        Lo más buscado
                    </div>
                </div>

                <div className="p-10 md:p-14 border-b border-dr-gold/10 bg-gradient-to-br from-white via-white to-dr-gold/10">
                    <div className="flex justify-between items-start mb-8">
                        <div className="size-16 rounded-2xl bg-dr-gold text-white flex items-center justify-center shadow-2xl shadow-dr-gold/40">
                            <Crown size={36} />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tight mb-3">Premium <span className="text-dr-gold italic">Gold</span></h3>
                    <p className="text-gray-500 font-bold mb-8 leading-relaxed">Domina el mercado y crea sinergias potentes con otros negocios.</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black uppercase tracking-tighter text-dr-blue">10€</span>
                        <span className="text-gray-400 font-bold text-lg">/mes</span>
                    </div>
                </div>

                <div className="p-10 md:p-14 bg-white relative">
                    <ul className="space-y-6 mb-12 relative z-10">
                        <li className="flex items-center gap-4 text-base font-black text-dr-blue">
                            <div className="size-6 rounded-full bg-dr-gold/20 flex items-center justify-center text-dr-gold shrink-0">
                                <Star size={14} fill="currentColor" />
                            </div>
                            Visibilidad TOP Prioritaria
                        </li>
                        <li className="flex items-center gap-4 text-base font-black text-dr-blue">
                            <div className="size-6 rounded-full bg-dr-gold/20 flex items-center justify-center text-dr-gold shrink-0">
                                <Camera size={14} />
                            </div>
                            Galería de 10 fotos HD
                        </li>
                        <li className="flex items-center gap-4 text-base font-black text-dr-blue">
                            <div className="size-6 rounded-full bg-dr-gold/20 flex items-center justify-center text-dr-gold shrink-0">
                                <Play size={14} fill="currentColor" />
                            </div>
                            Video Promocional Activo
                        </li>
                        <li className="flex items-center gap-4 text-base font-black text-dr-blue">
                            <div className="size-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                <Check size={14} />
                            </div>
                            Acuerdos de Sinergia Activos
                        </li>
                        <li className="flex items-center gap-4 text-base font-black text-dr-blue">
                            <div className="size-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                <Check size={14} />
                            </div>
                            Sello Dorado "Verificado"
                        </li>
                    </ul>

                    <button
                        onClick={() => onSelect('negocio_premium')}
                        className="btn btn-primary bg-dr-blue border-none btn-lg h-16 w-full gap-3 text-lg shadow-2xl shadow-dr-blue/30 scale-105 hover:scale-110 transition-transform"
                    >
                        ¡Vuelvete Premium! <Crown size={20} />
                    </button>
                    <div className="mt-8 flex items-center justify-center gap-4 opacity-40">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
                        <div className="w-px h-4 bg-gray-300"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Pago 100% Seguro</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPlans;
