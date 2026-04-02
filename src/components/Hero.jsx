import { getWhatsAppLink } from '../utils/whatsapp';

export default function Hero() {
  return (
    <section className="bg-brand-navy min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">

        {/* Etiqueta superior */}
        <span className="inline-block bg-brand-royal/30 text-brand-orange font-body font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-brand-royal/50">
          Formación Profesional de Voleibol
        </span>

        {/* Título principal */}
        <h1 className="font-heading font-black text-white text-4xl sm:text-5xl md:text-6xl leading-tight">
          Formando los{' '}
          <span className="text-brand-orange">líderes del voleibol</span>{' '}
          del mañana
        </h1>

        {/* Subtítulo */}
        <p className="font-body text-white/70 text-lg sm:text-xl max-w-xl">
          Capacitación en línea para secundaria, prepa y universidad. Aprende
          de un entrenador con trayectoria profesional internacional.
        </p>

        {/* CTA */}
        <a
          href={getWhatsAppLink('Inscripción a cursos')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-3 bg-brand-orange hover:bg-orange-600 text-white font-heading font-bold text-lg px-10 py-4 rounded-xl shadow-lg shadow-orange-900/30 transition-all duration-200 hover:scale-105"
        >
          ¡Quiero inscribirme!
        </a>

        {/* Indicador de scroll */}
        <div className="mt-10 flex flex-col items-center gap-2 text-white/30">
          <span className="font-body text-xs tracking-widest uppercase">Descubre más</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
