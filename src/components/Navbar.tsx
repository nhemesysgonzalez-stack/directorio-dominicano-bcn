import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
    const { user, signOut, isAdmin, isPremium } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled
            ? 'py-4 bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20'
            : 'py-6 bg-transparent'
            }`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="size-12 bg-dr-blue rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        DD
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className={`font-black text-xl tracking-tighter transition-colors duration-500 ${scrolled ? 'text-dr-navy' : 'text-white'}`}>
                            Directorio <span className="text-dr-red">Dominicano</span>
                        </span>
                        <span className={`text-[10px] font-black uppercase tracking-[0.4em] opacity-60 transition-colors duration-500 ${scrolled ? 'text-dr-navy' : 'text-white'}`}>
                            Barcelona
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-1">
                        <Link to="/" className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive('/')
                            ? 'text-dr-blue bg-dr-blue/5'
                            : scrolled ? 'text-text-muted hover:text-dr-blue' : 'text-white/70 hover:text-white'
                            }`}>
                            Inicio
                        </Link>
                        <Link to="/directorio" className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive('/directorio')
                            ? 'text-dr-blue bg-dr-blue/5'
                            : scrolled ? 'text-text-muted hover:text-dr-blue' : 'text-white/70 hover:text-white'
                            }`}>
                            Explorar
                        </Link>
                    </div>

                    <div className="h-6 w-px bg-gray-200 dark:bg-white/10"></div>

                    {user ? (
                        <div className="flex items-center gap-4">
                            {isAdmin && (
                                <Link to="/admin" className="btn btn-outline py-2 px-4 text-[10px] border-dr-blue/20">
                                    <Shield size={14} /> Admin
                                </Link>
                            )}
                            <Link to="/perfil" className="flex items-center gap-3 p-1.5 pl-4 bg-dr-navy/5 dark:bg-white/5 rounded-full border border-black/5 hover:border-dr-blue transition-all group">
                                <div className="flex flex-col items-end">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${scrolled ? 'text-dr-navy' : 'text-white'}`}>
                                        {user.full_name.split(' ')[0]}
                                    </span>
                                    {isPremium && <span className="text-[8px] font-black text-dr-gold uppercase">Gold Member</span>}
                                </div>
                                <div className="size-9 bg-dr-blue rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                    <User size={18} />
                                </div>
                            </Link>
                            <button onClick={() => signOut()} className={`${scrolled ? 'text-gray-400' : 'text-white/40'} hover:text-dr-red transition-colors`} title="Cerrar Sesión">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className={`text-sm font-bold transition-all ${scrolled ? 'text-text' : 'text-white'} hover:opacity-70`}>
                                Iniciar Sesión
                            </Link>
                            <Link to="/registro" className="btn btn-primary !py-3 !px-6 shadow-xl">
                                Publicar Negocio
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-dr-navy bg-gray-100' : 'text-white bg-white/10'}`}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-8 space-y-6">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block font-black text-2xl uppercase tracking-tighter">Inicio</Link>
                            <Link to="/directorio" onClick={() => setIsMenuOpen(false)} className="block font-black text-2xl uppercase tracking-tighter">Explorar</Link>
                            <div className="h-px bg-gray-100"></div>
                            {user ? (
                                <div className="space-y-4">
                                    <Link to="/perfil" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 font-black uppercase text-sm tracking-widest">
                                        <div className="size-10 bg-dr-blue rounded-xl flex items-center justify-center text-white">
                                            <User size={20} />
                                        </div>
                                        Mi Perfil
                                    </Link>
                                    {isAdmin && (
                                        <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 font-black uppercase text-sm tracking-widest text-dr-blue">
                                            <div className="size-10 bg-dr-blue/10 rounded-xl flex items-center justify-center">
                                                <Shield size={20} />
                                            </div>
                                            Panel Admin
                                        </Link>
                                    )}
                                    <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="flex items-center gap-4 font-black uppercase text-sm tracking-widest text-dr-red w-full">
                                        <div className="size-10 bg-dr-red/10 rounded-xl flex items-center justify-center">
                                            <LogOut size={20} />
                                        </div>
                                        Cerrar Sesión
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn btn-outline w-full py-4">Iniciar Sesión</Link>
                                    <Link to="/registro" onClick={() => setIsMenuOpen(false)} className="btn btn-primary w-full py-4">Publicar Negocio</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
