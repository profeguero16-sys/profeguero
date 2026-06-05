import { motion } from 'framer-motion';
import { ShoppingBag, Dumbbell, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';
import { useScrollReveal } from '../utils/useScrollReveal';
import data from '../data/content.json';

const { material, consultoria } = data;

export default function Marketplace() {
  const { ref: refA, inView: inViewA } = useScrollReveal();
  const { ref: refB, inView: inViewB } = useScrollReveal();

  return (
    <section id="material" className="bg-slate-50 py-20 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* ========== SECCIÓN A — MATERIAL DEPORTIVO ========== */}
        <motion.div
          ref={refA}
          initial={{ opacity: 0, y: 40 }}
          animate={inViewA ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative bg-brand-navy rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Acento decorativo */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange via-brand-royal to-brand-orange" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Lado izquierdo — Promo */}
            <div className="flex flex-col justify-center p-10 md:p-14 gap-6">
              <motion.div
                className="w-14 h-14 rounded-2xl bg-brand-orange/20 flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ShoppingBag size={28} className="text-brand-orange" />
              </motion.div>
              <span className="inline-block bg-brand-orange text-white font-heading font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full w-fit">
                Oferta Especial
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-white leading-tight">
                {material.promocion}
              </h2>
              <p className="font-body text-white/60 text-base leading-relaxed">
                {material.descripcion}
              </p>
              <motion.a
                href={getWhatsAppLink(material.cta)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(255,107,0,0.45)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-body font-semibold text-sm px-8 py-4 rounded-xl transition-colors duration-200 w-fit"
              >
                <MessageCircle size={18} />
                {material.cta}
              </motion.a>
            </div>

            {/* Lado derecho — Imagen */}
            <div className="hidden md:flex items-center justify-center bg-brand-royal/20 p-10">
              <img
                src="https://placehold.co/500x400/0A192F/FF6B00?text=Material+Deportivo"
                alt="Material deportivo ProfeGüero"
                className="w-full max-w-sm rounded-xl object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* ========== SECCIÓN B — CONSULTORÍA B2B ========== */}
        <motion.div
          ref={refB}
          initial={{ opacity: 0, y: 40 }}
          animate={inViewB ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-2xl shadow-lg p-10 md:p-14 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center"
        >
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-royal/10 flex items-center justify-center">
                <Dumbbell size={24} className="text-brand-royal" />
              </div>
              <span className="font-body text-brand-royal text-xs uppercase tracking-widest font-semibold">
                Servicio Profesional
              </span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-brand-navy leading-tight">
              {consultoria.titulo}
            </h2>
            <p className="font-body text-gray-500 text-base leading-relaxed max-w-2xl">
              {consultoria.descripcion}
            </p>
          </div>
          <motion.a
            href={getWhatsAppLink(consultoria.cta)}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-royal text-white font-body font-semibold text-sm px-8 py-4 rounded-xl transition-colors duration-200 whitespace-nowrap"
          >
            <MessageCircle size={18} />
            Solicitar asesoría
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
