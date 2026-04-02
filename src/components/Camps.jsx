import { Snowflake, Sun, Flame, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';
import data from '../data/content.json';

const ICONOS = { Snowflake, Sun, Flame };
const { campamentos } = data;

export default function Camps() {
  return (
    <section id="campamentos" className="bg-white py-20 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto">

        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy text-center mb-4">
          Campamentos Internacionales
        </h2>
        <p className="font-body text-gray-500 text-center max-w-xl mx-auto mb-12">
          Experiencias inmersivas de voleibol diseñadas para elevar tu juego al máximo nivel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campamentos.map((camp) => {
            const Icono = ICONOS[camp.icono] || Sun;
            return (
              <div
                key={camp.id}
                className="relative bg-brand-royal rounded-2xl border-2 border-brand-orange/60 overflow-hidden flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Franja decorativa superior */}
                <div className="h-2 bg-brand-orange" />

                <div className="flex flex-col flex-1 p-8 gap-5">
                  {/* Icono + Fecha */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center">
                      <Icono size={24} className="text-brand-orange" />
                    </div>
                    <span className="font-body text-white/60 text-xs uppercase tracking-widest font-semibold">
                      {camp.fecha}
                    </span>
                  </div>

                  {/* Nombre */}
                  <h3 className="font-heading font-bold text-xl text-white leading-snug">
                    {camp.nombre}
                  </h3>

                  {/* Descripción */}
                  <p className="font-body text-white/70 text-sm leading-relaxed flex-1">
                    {camp.descripcion}
                  </p>

                  {/* CTA */}
                  <a
                    href={getWhatsAppLink(`Informes sobre ${camp.nombre}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-brand-orange hover:bg-orange-600 text-white font-body font-semibold text-sm py-3 rounded-lg transition-colors duration-200"
                  >
                    <MessageCircle size={18} />
                    Pedir informes
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
