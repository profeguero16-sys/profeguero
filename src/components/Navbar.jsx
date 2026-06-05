import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 bg-brand-navy shadow-md"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="font-heading font-bold text-2xl text-brand-orange tracking-wide"
        >
          ProfeGüero
        </motion.a>

        {/* Links desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              whileHover={{ color: '#FF6B00', y: -2 }}
              className="font-body text-white/80 transition-colors duration-200 text-sm font-medium"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* CTA desktop */}
        <motion.a
          href={getWhatsAppLink('Información general')}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.07, boxShadow: '0 0 20px rgba(255,107,0,0.4)' }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-body font-semibold text-sm px-5 py-2 rounded-lg transition-colors duration-200"
        >
          Contáctame
        </motion.a>

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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-brand-navy border-t border-white/10 px-4 pb-4 flex flex-col gap-4 overflow-hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
