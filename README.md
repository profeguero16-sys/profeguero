Rol y Objetivo:
Actúa como un Desarrollador Web Senior y Arquitecto Frontend. Vamos a inicializar y construir desde cero la Landing Page/E-commerce para "ProfeGüero", un formador internacional de voleibol. El sitio web se alojará en ProfeGüero.com.mx.

Stack Tecnológico y Mejores Prácticas:

Framework: React con Vite.

Estilos: Tailwind CSS (Mobile-first, diseño responsivo estricto).

Iconos: lucide-react (para iconos de voleibol, medallas, WhatsApp, etc.).

Arquitectura: Patrón de componentes modulares. Código limpio, DRY (Don't Repeat Yourself), y separación de lógica (datos en JSON, UI en componentes).

Sistema de Diseño (Tailwind Config):
Configura el tailwind.config.js extendiendo los colores con:

brand-orange: '#FF6B00' (Acción, CTAs, energía).

brand-navy: '#0A192F' (Fondos principales, elegancia).

brand-royal: '#0047AB' (Acentos, tarjetas, profundidad).

Tipografías: Usa una fuente sans-serif fuerte para los títulos (ej. Montserrat o Bebas Neue) y una legible para el cuerpo (ej. Inter o Roboto). Bordes ligeramente redondeados (rounded-lg o rounded-xl).

Arquitectura de Datos (JSON Data-Driven):
No hardcodees el contenido. Crea un archivo src/data/content.json o constantes separadas para:

cursos: Array de 22 objetos (id, titulo, categoria, precio, modalidad "En vivo/Online", imagen).

testimonios: Array de objetos (nombre, texto, avatar).

Lógica de Negocio (Integración WhatsApp):
Todo el flujo de conversión cierra en WhatsApp.

Crea un archivo utils/whatsapp.js.

Define la constante WHATSAPP_PHONE = "523531027315".

Exporta una función getWhatsAppLink(asunto) que retorne: https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola ProfeGüero, me interesa: ' + asunto)}.

Estructura de Componentes (Layout de arriba a abajo):
Crea los siguientes componentes e intégralos en App.jsx:

Navbar: Logo "ProfeGüero", links ancla a las secciones y botón CTA a WhatsApp. Responsivo (menú hamburguesa en móvil).

Hero: Video o imagen de fondo con overlay oscuro (brand-navy). Título "Formando los líderes del voleibol del mañana". Subtítulo sobre capacitación online para secundaria, prepa y universidad. Botón CTA gigante en brand-orange.

Trajectory (Autoridad y Biografía):

Layout a dos columnas. Izquierda: Foto profesional. Derecha: Biografía.

Lista de logros (Jugador profesional, certificaciones).

Grid o Slider para mostrar miniaturas de sus Doctorados y Diplomas (usa placeholders interactivos tipo Lightbox).

SocialProof (Testimonios y Galería de Videos):

Carrusel o Grid con testimonios en texto de alumnos.

Galería de videos responsiva (estilo YouTube embeds o videos HTML5) donde se vea al ProfeGüero demostrando ejercicios y entrenando alumnos.

CoursesMenu (Los 22 Cursos):

Sistema de pestañas/filtros (Fundamentos, Táctica, Packs).

Renderiza tarjetas dinámicas usando el JSON. Cada tarjeta usa el botón que llama a getWhatsAppLink(curso.titulo).

Camps (Campamentos Anuales): Tres tarjetas destacadas visualmente: Invierno, Semana Santa, Verano.

B2B_Store (Asesorías y Material):

Sección dividida en dos: 
A) Asesoría a Gimnasios (rutinas, preparación física).
B) Venta de Material Deportivo (Banner destacado: "Promo: Compra 5 balones y llévate 1 GRATIS").

BlogPreview (Consejos de Voley): Sección de 3 tarjetas de blog recientes para SEO.

Footer & FloatingWhatsApp: Pie de página con enlaces y un botón flotante de WhatsApp siempre visible en la esquina inferior derecha.

Instrucción de inicio:
Inicializa la estructura del proyecto. Comienza dándome el código para tailwind.config.js, utils/whatsapp.js, y el componente principal App.jsx ensamblando las secciones vacías. Luego iremos construyendo componente por componente.

🚀 Cómo proceder en tu VS Code:
Abre tu terminal en la carpeta donde harás el proyecto y corre: npm create vite@latest ProfeGüero-web -- --template react (para inicializar React con Vite).

Entra a la carpeta, instala Tailwind siguiendo la documentación oficial de Vite + Tailwind.

Con esto, Copilot sabrá exactamente qué tecnologías usar, qué colores aplicar, cómo manejar las bases de datos locales (JSON), cómo conectar el WhatsApp, y el orden exacto de la página.