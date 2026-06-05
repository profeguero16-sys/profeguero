import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, GraduationCap, X, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../utils/useScrollReveal';
import data from '../data/content.json';
import aboutMeImg from '../assets/aboutMeProfeGuero.jpeg';

const { bio, logros, diplomas } = data.trayectoria;

/* ── Modal visor de PDF ── */
function PdfModal({ diploma, onClose }) {
  return (
    <AnimatePresence>
      {diploma && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-4xl h-[90vh] bg-brand-navy rounded-2xl border border-brand-royal/40 shadow-2xl flex flex-col overflow-hidden"
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-brand-royal/30 shrink-0">
              <div className="flex items-center gap-3">
                <GraduationCap size={22} className="text-brand-orange" />
                <div>
                  <p className="font-heading font-bold text-white text-sm leading-tight">
                    {diploma.nombre}
                  </p>
                  <p className="font-body text-white/45 text-xs">{diploma.institucion}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={diploma.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-body text-xs text-white/50 hover:text-brand-orange transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                >
                  <ExternalLink size={14} />
                  Abrir en nueva pestaña
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Visor PDF */}
            <div className="flex-1 bg-gray-900">
              <iframe
                src={diploma.pdf}
                title={diploma.nombre}
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Trajectory() {
  const { ref, inView } = useScrollReveal({ amount: 0.1, once: true });
  const [selectedDiploma, setSelectedDiploma] = useState(null);

  return (
    <section
      id="trayectoria"
      ref={ref}
      className="bg-brand-navy py-20 px-4 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Columna izquierda — Foto */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <motion.div
            className="relative w-full max-w-sm aspect-[3/4] rounded-2xl border-4 border-brand-orange overflow-hidden bg-brand-royal/20"
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(255,107,0,0.3)' }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={aboutMeImg}
              alt="ProfeGüero entrenador profesional de voleibol"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </motion.div>

        {/* Columna derecha — Contenido */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-orange leading-tight">
            Más de 15 años formando campeones
          </h2>

          <p className="font-body text-white/70 text-base sm:text-lg leading-relaxed">
            {bio}
          </p>

          {/* Logros */}
          <ul className="flex flex-col gap-3">
            {logros.map((logro, i) => (
              <motion.li
                key={logro}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <Award size={20} className="text-brand-orange shrink-0 mt-0.5" />
                <span className="font-body text-white/90 text-sm sm:text-base">
                  {logro}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Diplomas grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {diplomas.map((d, i) => (
              <motion.button
                key={d.id}
                onClick={() => setSelectedDiploma(d)}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.03, borderColor: 'rgba(255,107,0,0.5)' }}
                whileTap={{ scale: 0.98 }}
                className="bg-brand-royal/20 border border-brand-royal/30 rounded-xl p-4 flex items-start gap-3 text-left cursor-pointer group transition-colors duration-200 hover:bg-brand-royal/30 hover:shadow-lg hover:shadow-brand-orange/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <GraduationCap size={22} className="text-brand-orange shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-heading font-bold text-white text-sm leading-snug">
                    {d.nombre}
                  </p>
                  <p className="font-body text-white/50 text-xs mt-1">
                    {d.institucion}
                  </p>
                  <p className="font-body text-brand-orange/70 text-xs mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ExternalLink size={11} />
                    Ver diploma
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal PDF */}
      <PdfModal diploma={selectedDiploma} onClose={() => setSelectedDiploma(null)} />
    </section>
  );
}
