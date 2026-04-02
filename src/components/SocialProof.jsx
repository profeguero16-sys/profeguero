import { useState } from 'react';
import { Quote, Play, X } from 'lucide-react';
import data from '../data/content.json';

const { testimonios, videos } = data;

export default function SocialProof() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ---------- TESTIMONIOS ---------- */}
        <div className="mb-20">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy text-center mb-4">
            Lo que dicen nuestros alumnos
          </h2>
          <p className="font-body text-gray-500 text-center max-w-xl mx-auto mb-12">
            Resultados reales de atletas y familias que confiaron en el ProfeGüero.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonios.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <Quote size={32} className="text-brand-orange shrink-0" />
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
              </div>
            ))}
          </div>
        </div>

        {/* ---------- GALERÍA DE VIDEOS ---------- */}
        <div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy text-center mb-4">
            ProfeGüero en Acción
          </h2>
          <p className="font-body text-gray-500 text-center max-w-xl mx-auto mb-12">
            Mira cómo se entrena con el Profe: técnica, intensidad y resultados.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveVideo(v)}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 aspect-video bg-brand-navy cursor-pointer"
              >
                <img
                  src={v.miniatura}
                  alt={v.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-brand-navy/50 group-hover:bg-brand-navy/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-brand-orange/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play size={28} className="text-white ml-1" fill="white" />
                  </div>
                </div>
                {/* Título */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="font-heading font-bold text-white text-sm text-left leading-snug">
                    {v.titulo}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- MODAL DE VIDEO ---------- */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
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
          </div>
        </div>
      )}
    </section>
  );
}
