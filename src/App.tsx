import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Directory from './pages/Directory';
import BusinessProfile from './pages/BusinessProfile';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ScrollToTop from './components/ScrollToTop';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const PAYPAL_CLIENT_ID = (import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb").replace(/\s/g, "");


function App() {
  return (
    <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "EUR", intent: "subscription" }}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/directorio" element={<Directory />} />
                <Route path="/negocio/:slug" element={<BusinessProfile />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/terminos" element={<Terms />} />
                <Route path="/privacidad" element={<Privacy />} />
              </Routes>
            </main>
            <footer className="bg-dr-navy text-white pt-24 pb-12 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dr-blue via-dr-red to-dr-gold"></div>

              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                  <div className="md:col-span-2">
                    <Link to="/" className="flex items-center gap-3 mb-6 group">
                      <div className="size-12 bg-white rounded-2xl flex items-center justify-center text-dr-blue font-black text-lg shadow-xl group-hover:scale-110 transition-transform">
                        DD
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="font-black text-2xl tracking-tighter">
                          Directorio <span className="text-dr-red">Dominicano</span>
                        </span>
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-white/40">
                          Cataluña
                        </span>
                      </div>
                    </Link>
                    <p className="text-white/50 text-base leading-relaxed max-w-sm mb-8">
                      La plataforma definitiva donde converge el talento, la cultura y el comercio de la comunidad dominicana en la Ciudad Condal.
                    </p>
                    <div className="flex gap-4">
                      {/* Redes Sociales Mock icons placeholders if needed */}
                      <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
                        <span className="material-symbols-outlined text-xl">public</span>
                      </div>
                      <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
                        <span className="material-symbols-outlined text-xl">share</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black uppercase tracking-widest text-xs text-dr-gold mb-6">Plataforma</h4>
                    <ul className="space-y-4">
                      <li><Link to="/directorio" className="text-white/60 hover:text-white transition-colors font-medium">Directorio Completo</Link></li>
                      <li><Link to="/registro" className="text-white/60 hover:text-white transition-colors font-medium">Registrar Negocio</Link></li>
                      <li><Link to="/login" className="text-white/60 hover:text-white transition-colors font-medium">Acceso Clientes</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-black uppercase tracking-widest text-xs text-dr-gold mb-6">Legal y Soporte</h4>
                    <ul className="space-y-4">
                      <li><Link to="/terminos" className="text-white/60 hover:text-white transition-colors font-medium">Términos de Uso</Link></li>
                      <li><Link to="/privacidad" className="text-white/60 hover:text-white transition-colors font-medium">Privacidad</Link></li>
                      <li>
                        <a
                          href="mailto:nhemesysgonzalez@gmail.com"
                          className="group/support flex flex-col gap-1"
                        >
                          <span className="text-white/60 group-hover/support:text-white transition-colors font-medium">Soporte Técnico</span>
                          <span className="text-[10px] font-black text-dr-red uppercase tracking-widest opacity-80 group-hover/support:opacity-100">nhemesysgonzalez@gmail.com</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
                    © 2026 Directorio Dominicano Cataluña. Unimos Fuerzas.
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/20 text-[10px] font-bold uppercase">Tecnología</span>
                    <div className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black uppercase text-white/40 border border-white/10 tracking-widest">
                      ComuniTarr Ecosystem
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </AuthProvider>
    </PayPalScriptProvider>
  );
}

export default App;
