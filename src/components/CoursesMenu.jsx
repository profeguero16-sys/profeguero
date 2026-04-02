import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';
import data from '../data/content.json';

const CATEGORIAS = ['Todos', ...new Set(data.cursos.map((c) => c.categoria))];

export default function CoursesMenu() {
  const [filtro, setFiltro] = useState('Todos');

  const cursosFiltrados =
    filtro === 'Todos'
      ? data.cursos
      : data.cursos.filter((c) => c.categoria === filtro);

  return (
    <section id="cursos" className="bg-white py-20 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto">

        {/* Título */}
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-navy text-center mb-4">
          Nuestros Cursos y Capacitaciones
        </h2>
        <p className="font-body text-gray-500 text-center max-w-xl mx-auto mb-10">
          Elige la categoría que necesitas y comienza tu formación profesional en voleibol.
        </p>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`font-body text-sm font-semibold px-5 py-2 rounded-full border transition-colors duration-200 ${
                filtro === cat
                  ? 'bg-brand-orange text-white border-brand-orange'
                  : 'bg-white text-brand-navy border-gray-300 hover:border-brand-orange hover:text-brand-orange'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cursosFiltrados.map((curso) => (
            <div
              key={curso.id}
              className="flex flex-col bg-gray-50 border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Contenido */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold font-body uppercase tracking-wider bg-brand-royal/10 text-brand-royal px-3 py-1 rounded-full">
                    {curso.categoria}
                  </span>
                  <span className="text-xs font-semibold font-body uppercase tracking-wider bg-brand-navy/10 text-brand-navy px-3 py-1 rounded-full">
                    {curso.modalidad}
                  </span>
                </div>

                {/* Título del curso */}
                <h3 className="font-heading font-bold text-lg text-brand-navy leading-snug">
                  {curso.titulo}
                </h3>

                {/* Precio */}
                <p className="font-heading font-black text-2xl text-brand-orange mt-auto">
                  {curso.precio}
                </p>
              </div>

              {/* Botón CTA */}
              <div className="px-6 pb-6">
                <a
                  href={getWhatsAppLink(curso.titulo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-brand-orange hover:bg-orange-600 text-white font-body font-semibold text-sm py-3 rounded-lg transition-colors duration-200"
                >
                  <MessageCircle size={18} />
                  Inscribirme
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
