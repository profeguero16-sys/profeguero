import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Play, X } from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';
import data from '../data/content.json';

const { testimonios, videos } = data;

export default function SocialProof() {
  const [activeVideo, setActiveVideo] = useState(null);
  const { ref: refTest, inView: inViewTest } = useScrollReveal();
  const { ref: refVid, inView: inViewVid } = useScrollReveal();

  return (
    <section className="bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ---------- TESTIMONIOS ---------- */}
        <div className="mb-20" ref={refTest}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inViewTest ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy text-center mb-4"
          >
            Lo que dicen nuestros alumnos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inViewTest ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-gray-500 text-center max-w-xl mx-auto mb-12"
          >
            Resultados reales de atletas y familias que confiaron en el ProfeGüero.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonios.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inViewTest ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.2 + i * 0.12 }}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(10,25,47,0.12)' }}
                className="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-4 border border-gray-100"
              >
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
                >
                  <Quote size={32} className="text-brand-orange shrink-0" />
                </motion.div>
                <p className="font-body text-gray-600 text-sm sm:text-base leading-relaxed flex-1">
                  {t.comentario}
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-heading font-bold text-brand-navy text-sm">
                    {t.nombre}
                  </p>
                  <p className="font-body text-gray-400 text-xs">
                    {t.rol}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ---------- GALERÍA DE VIDEOS ---------- */}
        <div ref={refVid}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inViewVid ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy text-center mb-4"
          >
            ProfeGüero en Acción
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inViewVid ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-gray-500 text-center max-w-xl mx-auto mb-12"
          >
            Mira cómo se entrena con el Profe: técnica, intensidad y resultados.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((v, i) => (
              <motion.button
                key={v.id}
                onClick={() => setActiveVideo(v)}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inViewVid ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 + i * 0.12 }}
                whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}
                whileTap={{ scale: 0.97 }}
                className="group relative rounded-2xl overflow-hidden shadow-md aspect-video bg-brand-navy cursor-pointer"
              >
                <img
                  src={v.miniatura}
                  alt={v.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-navy/50 group-hover:bg-brand-navy/30 transition-colors duration-300 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-brand-orange/90 flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.15 }}
                    animate={{ boxShadow: ['0 0 0 0 rgba(255,107,0,0.4)', '0 0 0 12px rgba(255,107,0,0)', '0 0 0 0 rgba(255,107,0,0)'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  >
                    <Play size={28} className="text-white ml-1" fill="white" />
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="font-heading font-bold text-white text-sm text-left leading-snug">
                    {v.titulo}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- MODAL DE VIDEO ---------- */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-10 right-0 text-white hover:text-brand-orange transition-colors cursor-pointer"
                aria-label="Cerrar video"
              >
                <X size={28} />
              </button>
              <iframe
                src={activeVideo.url}
                title={activeVideo.titulo}
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
