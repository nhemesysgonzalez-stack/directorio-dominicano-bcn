import React from 'react';

const Terms: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-32 max-w-4xl">
            <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">Términos y Condiciones de Uso</h1>
            <div className="prose prose-lg dark:prose-invert">
                <p className="text-gray-600 font-medium mb-6">
                    Bienvenido al Directorio Dominicano BCN. Al utilizar nuestra plataforma, aceptas cumplir con los siguientes términos.
                </p>

                <h2 className="text-2xl font-bold mb-4">1. Descripción del Servicio</h2>
                <p className="mb-6">
                    Directorio Dominicano BCN es una plataforma publicitaria y de networking que permite a negocios locales dominicanos listar sus servicios y conectar con la comunidad. No somos responsables de las transacciones privadas entre usuarios y comerciantes.
                </p>

                <h2 className="text-2xl font-bold mb-4">2. Registro y Responsabilidad</h2>
                <p className="mb-6">
                    Los usuarios son responsables de la veracidad de la información proporcionada. Nos reservamos el derecho de eliminar perfiles que publiquen contenido fraudulento, ofensivo o que no represente legítimamente un negocio o servicio para nuestra comunidad.
                </p>

                <h2 className="text-2xl font-bold mb-4">3. Planes y Pagos</h2>
                <p className="mb-6">
                    Los planes Premium ofrecen visibilidad adicional. Los pagos se procesan de forma segura a través de nuestros proveedores (PayPal). No almacenamos datos de tarjetas de crédito.
                </p>

                <h2 className="text-2xl font-bold mb-4">4. Propiedad Intelectual</h2>
                <p className="mb-6">
                    El contenido subido por los usuarios pertenece a los mismos, otorgando al Directorio una licencia de visualización dentro de la plataforma. La marca Directorio Dominicano BCN es propiedad protegida.
                </p>

                <p className="mt-12 text-sm text-gray-400 font-bold italic">
                    Última actualización: 21 de Febrero de 2026.
                </p>
            </div>
        </div>
    );
};

export default Terms;
