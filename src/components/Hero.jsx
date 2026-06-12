import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppLink } from '../utils/whatsapp';

/* ── Slides del carrusel de fondo ── */
const BG_SLIDES = [
  {
    // Remate en partido de voleibol sala (indoor) — Pexels #6203591
    url: 'https://images.pexels.com/photos/6203591/pexels-photo-6203591.jpeg?auto=compress&cs=tinysrgb&w=1920',
    label: 'Voleibol de Sala',
  },
  {
    // Jugadores saltando en voleibol playa bajo cielo azul — Pexels #6180384
    url: 'https://images.pexels.com/photos/6180384/pexels-photo-6180384.jpeg?auto=compress&cs=tinysrgb&w=1920',
    label: 'Voleibol de Playa',
  },
  {
    // Amigos celebrando salto en cancha de playa — Pexels #12169253
    url: 'https://images.pexels.com/photos/12169253/pexels-photo-12169253.jpeg?auto=compress&cs=tinysrgb&w=1920',
    label: 'Vóley Playa Pro',
  },
  {
    // Equipo en entrenamiento de voleibol en gimnasio — Pexels #6203568
    url: 'https://images.pexels.com/photos/6203568/pexels-photo-6203568.jpeg?auto=compress&cs=tinysrgb&w=1920',
    label: 'Entrenamiento & Gimnasio',
  },
  {
    // Partido mixto de voleibol sala en cancha de madera — Pexels #6203581
    url: 'https://images.pexels.com/photos/6203581/pexels-photo-6203581.jpeg?auto=compress&cs=tinysrgb&w=1920',
    label: 'Competencia Indoor',
  },
];

const SLIDE_DURATION = 5000; // ms

/* ── Variantes ── */
const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delay } },
});
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

/* ── Partículas de fondo ── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 6 + 5,
  delay: Math.random() * 4,
}));

/* ── Pelotas de voleibol decorativas ── */
const BALLS = [
  { id: 0, x: 82, y: 6,  size: 120, rotDur: 15, floatDur: 7,   floatDelay: 0,   opacity: 0.14 },
  { id: 1, x: 2,  y: 58, size: 70,  rotDur: 10, floatDur: 5.5, floatDelay: 1.8, opacity: 0.11 },
  { id: 2, x: 68, y: 76, size: 48,  rotDur: 7,  floatDur: 4.5, floatDelay: 1,   opacity: 0.09 },
];

/* ── Stats ── */
const STATS = [
  { value: '10+', label: 'Años de experiencia' },
  { value: '500+', label: 'Alumnos formados' },
  { value: '8',   label: 'Países visitados' },
];

/* ── SVG Pelota de voleibol ── */
function VolleyBall({ size, opacity }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <circle cx="50" cy="50" r="48" fill="white" />
      {/* Paneles de color */}
      <path d="M14 22 C30 14, 70 14, 86 22 C80 5, 62 2, 50 2 C38 2, 20 5, 14 22Z" fill="#FF6B00" opacity="0.55" />
      <path d="M2 50 C2 35, 8 23, 14 22 C11 36, 11 52, 14 66 C8 63, 2 58, 2 50Z" fill="#0047AB" opacity="0.5" />
      <path d="M98 50 C98 58, 92 63, 86 66 C89 52, 89 36, 86 22 C92 23, 98 35, 98 50Z" fill="#0047AB" opacity="0.5" />
      <path d="M14 78 C20 95, 38 98, 50 98 C62 98, 80 95, 86 78 C70 86, 30 86, 14 78Z" fill="#0A192F" opacity="0.45" />
      {/* Costuras */}
      <path d="M50 2 C36 22, 32 40, 36 56 C40 70, 50 82, 50 98" stroke="#0A192F" strokeWidth="2.2" fill="none" strokeOpacity="0.65" />
      <path d="M50 2 C64 22, 68 40, 64 56 C60 70, 50 82, 50 98" stroke="#0A192F" strokeWidth="2.2" fill="none" strokeOpacity="0.65" />
      <path d="M2 50 C18 43, 36 41, 50 41 C64 41, 82 43, 98 50" stroke="#0A192F" strokeWidth="2.2" fill="none" strokeOpacity="0.65" />
      <path d="M2 50 C18 57, 36 59, 50 59 C64 59, 82 57, 98 50" stroke="#0A192F" strokeWidth="2.2" fill="none" strokeOpacity="0.65" />
      {/* Brillo */}
      <ellipse cx="34" cy="29" rx="9" ry="5.5" fill="white" opacity="0.45" transform="rotate(-30 34 29)" />
    </svg>
  );
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BG_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="relative bg-brand-navy min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      {/* ── Carrusel de imágenes de fondo ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <img
            src={BG_SLIDES[currentSlide].url}
            alt={BG_SLIDES[currentSlide].label}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Capa oscura degradada para mantener legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/65 to-brand-navy/88" />
          {/* Overlay lateral sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/30 via-transparent to-brand-navy/20" />
        </motion.div>
      </AnimatePresence>

      {/* ── Partículas flotantes ── */}
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-brand-orange/20 pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Pelotas de voleibol flotando y rotando ── */}
      {BALLS.map((b) => (
        <motion.div
          key={b.id}
          className="absolute pointer-events-none select-none"
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
          animate={{ y: [0, -20, 0], rotate: [0, 360] }}
          transition={{
            y:      { duration: b.floatDur, delay: b.floatDelay, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: b.rotDur,   repeat: Infinity, ease: 'linear' },
          }}
        >
          <VolleyBall size={b.size} opacity={b.opacity} />
        </motion.div>
      ))}

      {/* ── Arco de trayectoria de remate (se dibuja solo) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M -30 820 Q 200 100, 720 300 Q 1100 460, 1480 80"
          fill="none"
          stroke="rgba(255,107,0,0.12)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.8, delay: 1.2, ease: 'easeInOut' }}
        />
        {/* Segunda línea de acento más sutil */}
        <motion.path
          d="M 1470 800 Q 1100 200, 720 380 Q 340 550, -20 120"
          fill="none"
          stroke="rgba(0,71,171,0.10)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: 1.8, ease: 'easeInOut' }}
        />
      </svg>

      {/* ── Resplandor central ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-brand-orange/5 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Contenido principal ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-6"
      >
        {/* Badge */}
        <motion.span
          variants={fadeDown}
          className="inline-block bg-brand-royal/30 text-brand-orange font-body font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-brand-royal/50"
        >
          Formación Profesional de Voleibol
        </motion.span>

        {/* Título */}
        <motion.h1
          variants={fadeUp(0)}
          className="font-heading font-black text-white text-4xl sm:text-5xl md:text-6xl leading-tight"
        >
          Formando los{' '}
          <motion.span
            className="text-brand-orange inline-block"
            animate={{ textShadow: ['0 0 0px #FF6B00', '0 0 24px #FF6B00aa', '0 0 0px #FF6B00'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            líderes del voleibol
          </motion.span>{' '}
          del mañana
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          variants={fadeUp(0.1)}
          className="font-body text-white/70 text-lg sm:text-xl max-w-xl"
        >
          Capacitación en línea para secundaria, prepa y universidad. Aprende
          de un entrenador con trayectoria profesional internacional.
        </motion.p>

        {/* ── Stats animados ── */}
        <motion.div variants={fadeUp(0.22)} className="flex gap-8 sm:gap-12 mt-1">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 1 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.span
                className="font-heading font-black text-brand-orange text-2xl sm:text-3xl leading-none"
                animate={{ textShadow: ['0 0 0px #FF6B00', '0 0 14px #FF6B00aa', '0 0 0px #FF6B00'] }}
                transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {stat.value}
              </motion.span>
              <span className="font-body text-white/45 text-xs text-center leading-tight max-w-[80px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Divisor decorativo */}
        <motion.div
          variants={fadeUp(0.3)}
          className="w-20 h-px bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent"
        />

        {/* CTA */}
        <motion.a
          variants={fadeUp(0.35)}
          href={getWhatsAppLink('Inscripción a cursos')}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.07, boxShadow: '0 0 32px rgba(255,107,0,0.55)' }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 inline-flex items-center gap-3 bg-brand-orange text-white font-heading font-bold text-lg px-10 py-4 rounded-xl shadow-lg shadow-orange-900/30 transition-colors duration-200 hover:bg-orange-600"
        >
          ¡Quiero inscribirme!
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUp(0.5)}
          className="mt-10 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="font-body text-xs tracking-widest uppercase">Descubre más</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* ── Etiqueta del slide actual ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${currentSlide}`}
          className="absolute top-24 right-5 z-10 hidden sm:flex items-center gap-2"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span className="font-body text-white/50 text-xs uppercase tracking-widest">
            {BG_SLIDES[currentSlide].label}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* ── Indicadores / Dots ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {BG_SLIDES.map((slide, i) => (
          <button
            key={i}
            aria-label={`Ir a ${slide.label}`}
            onClick={() => setCurrentSlide(i)}
            className={`rounded-full transition-all duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
              i === currentSlide
                ? 'w-7 h-2 bg-brand-orange shadow-lg shadow-orange-500/40'
                : 'w-2 h-2 bg-white/30 hover:bg-white/55'
            }`}
          />
        ))}
      </div>

      {/* ── Barra de progreso del slide ── */}
      {!paused && (
        <motion.div
          key={`progress-${currentSlide}`}
          className="absolute bottom-0 left-0 h-0.5 bg-brand-orange/70 z-10"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
        />
      )}
    </section>
  );
}
