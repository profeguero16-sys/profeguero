import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

const NAV_LINKS = [
  { label: 'Cursos', href: '#cursos' },
  { label: 'Campamentos', href: '#campamentos' },
  { label: 'Material', href: '#material' },
  { label: 'Sobre mí', href: '#trayectoria' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-navy shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="font-heading font-bold text-2xl text-brand-orange tracking-wide">
          ProfeGüero
        </a>

        {/* Links desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-white/80 hover:text-brand-orange transition-colors duration-200 text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <a
          href={getWhatsAppLink('Información general')}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-body font-semibold text-sm px-5 py-2 rounded-lg transition-colors duration-200"
        >
          Contáctame
        </a>

        {/* Botón hamburguesa móvil */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-white p-1"
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden bg-brand-navy border-t border-white/10 px-4 pb-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-white/80 hover:text-brand-orange transition-colors duration-200 text-sm font-medium py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href={getWhatsAppLink('Información general')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center bg-brand-orange hover:bg-orange-600 text-white font-body font-semibold text-sm px-5 py-3 rounded-lg transition-colors duration-200"
          >
            Contáctame
          </a>
        </div>
      )}
    </header>
  );
}
