import { useEffect, useRef } from 'react';
import { Award, GraduationCap } from 'lucide-react';
import data from '../data/content.json';
import aboutMeImg from '../assets/aboutMeProfeGuero.jpeg';

const { bio, logros, diplomas } = data.trayectoria;

export default function Trajectory() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="trayectoria"
      ref={sectionRef}
      className="bg-brand-navy py-20 px-4 scroll-mt-20 opacity-0 translate-y-8 transition-all duration-700 ease-out"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Columna izquierda — Foto placeholder */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl border-4 border-brand-orange overflow-hidden bg-brand-royal/20 flex items-center justify-center">
            <img
              src={aboutMeImg}
              alt="ProfeGüero entrenador profesional de voleibol"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Columna derecha — Contenido */}
        <div className="flex flex-col gap-6">

          {/* Título */}
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-orange leading-tight">
            Más de 15 años formando campeones
          </h2>

          {/* Bio */}
          <p className="font-body text-white/70 text-base sm:text-lg leading-relaxed">
            {bio}
          </p>

          {/* Logros */}
          <ul className="flex flex-col gap-3">
            {logros.map((logro) => (
              <li key={logro} className="flex items-start gap-3">
                <Award size={20} className="text-brand-orange shrink-0 mt-0.5" />
                <span className="font-body text-white/90 text-sm sm:text-base">
                  {logro}
                </span>
              </li>
            ))}
          </ul>

          {/* Diplomas grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {diplomas.map((d) => (
              <div
                key={d.id}
                className="bg-brand-royal/20 border border-brand-royal/30 rounded-xl p-4 flex items-start gap-3"
              >
                <GraduationCap size={22} className="text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-bold text-white text-sm leading-snug">
                    {d.nombre}
                  </p>
                  <p className="font-body text-white/50 text-xs mt-1">
                    {d.institucion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
