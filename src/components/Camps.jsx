import { motion } from 'framer-motion';
import { Snowflake, Sun, Flame, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';
import { useScrollReveal } from '../utils/useScrollReveal';
import data from '../data/content.json';

const ICONOS = { Snowflake, Sun, Flame };
const { campamentos } = data;

export default function Camps() {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="campamentos" className="bg-white py-20 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto" ref={ref}>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy text-center mb-4"
        >
          Campamentos Internacionales
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body text-gray-500 text-center max-w-xl mx-auto mb-12"
        >
          Experiencias inmersivas de voleibol diseñadas para elevar tu juego al máximo nivel.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campamentos.map((camp, i) => {
            const Icono = ICONOS[camp.icono] || Sun;
            return (
              <motion.div
                key={camp.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 + i * 0.12 }}
                whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(255,107,0,0.2)' }}
                className="relative bg-brand-royal rounded-2xl border-2 border-brand-orange/60 overflow-hidden flex flex-col shadow-lg"
              >
                {/* Franja decorativa superior */}
                <div className="h-2 bg-brand-orange" />

                <div className="flex flex-col flex-1 p-8 gap-5">
                  {/* Icono + Fecha */}
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center"
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                    >
                      <Icono size={24} className="text-brand-orange" />
                    </motion.div>
                    <span className="font-body text-white/60 text-xs uppercase tracking-widest font-semibold">
                      {camp.fecha}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white leading-snug">
                    {camp.nombre}
                  </h3>
                  <p className="font-body text-white/70 text-sm leading-relaxed flex-1">
                    {camp.descripcion}
                  </p>

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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
