import React from 'react';
import { ShieldCheck, Eye, Lock } from 'lucide-react';

const Privacy: React.FC = () => {
    return (
        <div className="bg-surface-2 min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-10 text-dr-red">
                        <Lock size={40} />
                        <h1 className="text-4xl font-black uppercase tracking-tight">Política de Privacidad</h1>
                    </div>

                    <div className="space-y-8 text-gray-600 font-medium leading-relaxed">
                        <section>
                            <h2 className="text-xl font-black text-dr-red uppercase mb-4 flex items-center gap-2">
                                <ShieldCheck size={18} /> 1. Recopilación de Datos
                            </h2>
                            <p>
                                Recopilamos información básica necesaria para el funcionamiento del directorio, como nombres de usuario, correos electrónicos y datos públicos de los negocios (teléfonos, direcciones y redes sociales).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-dr-red uppercase mb-4 flex items-center gap-2">
                                <Eye size={18} /> 2. Uso de la Información
                            </h2>
                            <p>
                                Sus datos se utilizan para:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Mantener y mejorar la visibilidad de su negocio.</li>
                                <li>Facilitar el contacto directo vía WhatsApp o teléfono.</li>
                                <li>Gestionar la suscripción Premium si aplica.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-dr-red uppercase mb-4">3. Suscripciones y Pagos</h2>
                            <p>
                                Los pagos se procesan de forma segura a través de plataformas externas (PayPal/Stripe). El Directorio Dominicano BCN no almacena los datos completos de sus tarjetas de crédito o débito.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-dr-red uppercase mb-4">4. Derechos del Usuario (GDPR)</h2>
                            <p>
                                Usted tiene derecho a acceder, rectificar o eliminar sus datos personales en cualquier momento desde su panel de perfil o contactando con nuestro soporte en nhemesysgonzalez@gmail.com.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-dr-red uppercase mb-4">5. Enlaces Externos</h2>
                            <p>
                                El directorio contiene enlaces a sitios web de terceros (redes sociales, webs de negocios). No somos responsables de las políticas de privacidad de estos sitios externos.
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

export default Privacy;
