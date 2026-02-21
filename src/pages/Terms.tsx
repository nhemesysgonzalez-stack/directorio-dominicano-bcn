import React from 'react';
import { Shield, FileText, Scale } from 'lucide-react';

const Terms: React.FC = () => {
    return (
        <div className="bg-surface-2 min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-10 text-dr-blue">
                        <Scale size={40} />
                        <h1 className="text-4xl font-black uppercase tracking-tight">Términos y Condiciones</h1>
                    </div>

                    <div className="space-y-8 text-gray-600 font-medium leading-relaxed">
                        <section>
                            <h2 className="text-xl font-black text-dr-blue uppercase mb-4 flex items-center gap-2">
                                <FileText size={18} /> 1. Aceptación de los Términos
                            </h2>
                            <p>
                                Al acceder y utilizar el Directorio Dominicano BCN, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-dr-blue uppercase mb-4 flex items-center gap-2">
                                <Shield size={18} /> 2. Registro de Negocios
                            </h2>
                            <p>
                                Los propietarios de negocios son responsables de la veracidad de la información proporcionada. El Directorio Dominicano BCN se reserva el derecho de retirar cualquier perfil que contenga información falsa, engañosa o que no cumpla con los estándares de la comunidad.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-dr-blue uppercase mb-4">3. Red de Sinergias</h2>
                            <p>
                                Nuestra plataforma fomenta la colaboración B2B (negocio a negocio). Los acuerdos alcanzados entre diferentes establecimientos (como descuentos de proveedores o alianzas estratégicas) son responsabilidad exclusiva de las partes implicadas.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-dr-blue uppercase mb-4">4. Propiedad Intelectual</h2>
                            <p>
                                Las marcas, logotipos y contenidos publicados por los negocios son propiedad de sus respectivos dueños. El diseño, código y estructura del directorio son propiedad exclusiva del Directorio Dominicano BCN.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-dr-blue uppercase mb-4">5. Limitación de Responsabilidad</h2>
                            <p>
                                El Directorio Dominicano BCN funciona como un puente de conexión. No nos hacemos responsables de la calidad de los servicios o productos finales ofrecidos por los negocios listados, aunque realizamos esfuerzos por verificar la legitimidad de cada uno.
                            </p>
                        </section>

                        <div className="pt-10 border-t border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
                            Última actualización: Febrero 2026
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
