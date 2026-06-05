import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';
import { useScrollReveal } from '../utils/useScrollReveal';
import data from '../data/content.json';

const CATEGORIAS = ['Todos', ...new Set(data.cursos.map((c) => c.categoria))];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.08 },
  }),
};



export default function CoursesMenu() {
  const [filtro, setFiltro] = useState('Todos');
  const { ref, inView } = useScrollReveal();

  const cursosFiltrados =
    filtro === 'Todos'
      ? data.cursos
      : data.cursos.filter((c) => c.categoria === filtro);

  return (
    <section
      id="cursos"
      className="relative py-24 px-4 scroll-mt-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0d1f3c 0%, #0a192f 45%, #0d2a52 100%)',
      }}
    >
      {/* ── Manchas de color difusas (fondo liquid) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand-orange/10 blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-brand-royal/20 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-blue-500/5 blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto" ref={ref}>

        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading font-bold text-3xl sm:text-4xl text-white text-center mb-3"
        >
          Nuestros Cursos y Capacitaciones
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body text-white/50 text-center max-w-xl mx-auto mb-10"
        >
          Elige la categoría que necesitas y comienza tu formación profesional en voleibol.
        </motion.p>

        {/* Filtros — glass pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {CATEGORIAS.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFiltro(cat)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className={`font-body text-sm font-semibold px-5 py-2 rounded-full border transition-all duration-200 backdrop-blur-md ${
                filtro === cat
                  ? 'bg-brand-orange/90 text-white border-brand-orange shadow-lg shadow-orange-500/30'
                  : 'bg-white/8 text-white/70 border-white/15 hover:border-brand-orange/60 hover:text-white hover:bg-white/12'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {cursosFiltrados.map((curso, i) => (
              <motion.div
                key={curso.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{
                  y: -6,
                  boxShadow: '0 24px 48px rgba(255,107,0,0.18), 0 0 0 1px rgba(255,107,0,0.25)',
                }}
                className="relative flex flex-col rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)',
                }}
              >
                {/* Brillo superior interno */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                {/* Acento de color azul uniforme */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/10 pointer-events-none" />

                {/* Contenido */}
                <div className="relative flex flex-col flex-1 p-6 gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold font-body uppercase tracking-wider bg-brand-royal/25 text-blue-200 px-3 py-1 rounded-full border border-blue-400/20">
                      {curso.categoria}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold font-body uppercase tracking-wider bg-yellow-400/15 text-yellow-300 px-3 py-1 rounded-full border border-yellow-400/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                      {curso.modalidad}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white leading-snug">
                    {curso.titulo}
                  </h3>
                  <motion.p
                    className="font-heading font-black text-2xl text-brand-orange mt-auto"
                    animate={{ textShadow: ['0 0 0px #FF6B00', '0 0 12px #FF6B0055', '0 0 0px #FF6B00'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                  >
                    {curso.precio}
                  </motion.p>
                </div>

                {/* Botón CTA */}
                <div className="relative px-6 pb-6">
                  <motion.a
                    href={getWhatsAppLink(curso.titulo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(255,107,0,0.45)' }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 w-full bg-brand-orange hover:bg-orange-500 text-white font-body font-semibold text-sm py-3 rounded-xl transition-colors duration-200"
                  >
                    <MessageCircle size={18} />
                    Inscribirme
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
