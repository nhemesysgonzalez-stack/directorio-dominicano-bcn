import React from 'react';

const Privacy: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-32 max-w-4xl">
            <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">Política de Privacidad</h1>
            <div className="prose prose-lg dark:prose-invert">
                <p className="text-gray-600 font-medium mb-6">
                    En Directorio Dominicano BCN, la privacidad de nuestra comunidad es nuestra prioridad.
                </p>

                <h2 className="text-2xl font-bold mb-4">1. Información que Recopilamos</h2>
                <p className="mb-6">
                    Recopilamos información básica de contacto (nombre, email, teléfono de negocio) y datos sobre tu emprendimiento para poder listarlo en el directorio.
                </p>

                <h2 className="text-2xl font-bold mb-4">2. Uso de la Información</h2>
                <p className="mb-6">
                    Tus datos de negocio (fotos, dirección, teléfono) son públicos por naturaleza en el directorio para que los clientes puedan encontrarte. Tu email personal se utiliza para comunicaciones administrativas y seguridad de la cuenta.
                </p>

                <h2 className="text-2xl font-bold mb-4">3. Cookies</h2>
                <p className="mb-6">
                    Utilizamos cookies técnicas necesarias para mantener tu sesión activa y mejorar tu experiencia de navegación.
                </p>

                <h2 className="text-2xl font-bold mb-4">4. Terceros</h2>
                <p className="mb-6">
                    No vendemos tus datos a terceros. Compartimos la información mínima necesaria con proveedores de pago (PayPal) y servicios de base de datos (Supabase) para el funcionamiento del sitio.
                </p>

                <p className="mt-12 text-sm text-gray-400 font-bold italic">
                    Última actualización: 21 de Febrero de 2026.
                </p>
            </div>
        </div>
    );
};

export default Privacy;
