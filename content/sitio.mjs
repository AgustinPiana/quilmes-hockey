// Datos generales del sitio. Todo lo que cambia seguido (links, redes, contacto) está acá.

export const sitio = {
  // Dominio definitivo. Se usa en canonical, sitemap y miniaturas para redes.
  url: 'https://www.hockeyquilmesac.com.ar',
  nombre: 'Quilmes Hockey',
  nombreLargo: 'Hockey · Quilmes Atlético Club',
  descripcion:
    'Sitio oficial del hockey del Quilmes Atlético Club. Hockey cervecero desde 1911: novedades, partidos, historia, fotos, inscripciones y sponsors.',
  // Datos en vivo de la AHBA (los genera el sitio Agenda del Cervecero cada pocas horas)
  datosPartidos: 'https://quilmes-sigma.vercel.app/data/quilmes.json',
};

export const contacto = {
  emails: ['quilmeshockey1911@gmail.com', 'administracion@hockeyquilmesac.com.ar'],
  telefonos: [
    { texto: '(011) 4224-6404', tel: '+541142246404' },
    { texto: '(011) 4253-1022', tel: '+541142531022' },
  ],
  sedes: [
    {
      nombre: 'Sede de hockey',
      direccion: 'Av. Cevallos 348, Quilmes',
      detalle: 'Dos canchas sintéticas: una de arena y otra de agua.',
      horario: 'Atención al socio: lunes a viernes de 16 a 20:45 h · sábados de 9 a 12:45 h',
      tel: '(011) 4224-6404',
      mapa: 'https://www.google.com/maps/search/?api=1&query=Cevallos+348+Quilmes+Buenos+Aires',
    },
    {
      nombre: 'Estadio Nacional',
      direccion: 'Av. Vicente López y Pasaje Las Leonas, Quilmes',
      detalle: 'Cancha sintética de agua, detrás del estadio de fútbol del Q.A.C.',
      horario: null,
      tel: null,
      mapa: 'https://www.google.com/maps/search/?api=1&query=Vicente+Lopez+y+Pasaje+Las+Leonas+Quilmes',
    },
    {
      nombre: 'Sede social',
      direccion: 'Guido y Paz, Quilmes',
      detalle: 'Trámites de socio y cuota social.',
      horario: 'Lunes a viernes de 12 a 20 h · sábados de 9 a 13 h',
      tel: '(011) 4253-3255',
      mapa: 'https://www.google.com/maps/search/?api=1&query=Guido+y+Paz+Quilmes+Buenos+Aires',
    },
  ],
};

// Redes. Si una queda vacía, no se muestra.
export const redes = [
  { id: 'instagram', nombre: 'Instagram', url: '' }, // TODO: completar con la cuenta oficial
  { id: 'facebook', nombre: 'Facebook', url: 'https://www.facebook.com/QACHOCKEY' },
  { id: 'x', nombre: 'X', url: 'https://twitter.com/HockeyQuilmesAC' },
  { id: 'youtube', nombre: 'YouTube', url: 'https://www.youtube.com/channel/UC1nO_D4mENQtxK5zKvy3Lvw' },
];

// Los botones de acceso que tenía la portada del sitio anterior.
export const accesos = [
  { titulo: 'Inscripción 2026', bajada: 'Formulario para nuevas jugadoras y jugadores', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdRlVc0gEMSrEAKok8-1fYhCY09HwEWtayYDMmTqoPK0zAgzA/viewform', destacado: true },
  { titulo: 'Asociate al club', bajada: 'Hacete socio del Quilmes A.C. online', url: 'https://quilmesaclub.accessfan.ar/' },
  { titulo: 'Apto médico', bajada: 'Carga del apto en Buenos Aires Hockey', url: 'https://aptomedico.buenosaireshockey.ar/' },
  { titulo: 'Evaluación pre-competitiva', bajada: 'Formulario E.P.C. para descargar (PDF)', url: '/docs/evaluacion-2023.pdf' },
  { titulo: 'Reglamento 2026', bajada: 'Reglamento administrativo interno (PDF)', url: '/docs/reglamento-interno-2026.pdf' },
  { titulo: 'Charla para familias', bajada: '“Cómo acompañar a mi hij@ deportista”', url: 'https://www.youtube.com/watch?v=THkrsGPVg00' },
  { titulo: 'Buenos Aires Hockey', bajada: 'Fixture, posiciones y noticias de la AHBA', url: 'https://buenosaireshockey.ar/' },
  { titulo: 'Sitio oficial del club', bajada: 'quilmesaclub.org.ar', url: 'http://quilmesaclub.org.ar/' },
];

export const federaciones = [
  { sigla: 'AHBA', nombre: 'Asociación de Hockey de Buenos Aires', url: 'https://buenosaireshockey.ar/' },
  { sigla: 'CAH', nombre: 'Confederación Argentina de Hockey', url: 'http://www.cahockey.org.ar/' },
  { sigla: 'FIH', nombre: 'Federación Internacional de Hockey', url: 'https://www.fih.hockey/' },
  { sigla: 'AAAH', nombre: 'Asociación Argentina de Árbitros de Hockey', url: 'http://aaahockey.org/' },
];

// Sponsors actuales. logo: ruta dentro de /img/sponsors.
export const sponsors = [
  { nombre: 'Rufino Pastor', rubro: 'Servicios fúnebres', logo: '/img/sponsors/rufino-pastor.jpg', url: 'http://www.rufinopastor.com.ar/www/index.html' },
];

// Comisión (fuente: sitio anterior, sección Institucional)
export const comision = [
  { cargo: 'Presidente', nombre: 'Dr. Juan Pablo Hourquebie' },
  { cargo: 'Secretaria', nombre: 'María Luján Gallego' },
  { cargo: 'Tesorera', nombre: 'Mariel Insua' },
  { cargo: 'Vocal', nombre: 'Ctdor. Gustavo Bosio' },
  { cargo: 'Vocal', nombre: 'Juan Guido Lucchelli' },
  { cargo: 'Delegado', nombre: 'Alejandro Daniel Golpe' },
];

// Adicionales mensuales desde febrero 2026 (no incluyen cuota social).
export const aranceles = {
  vigencia: 'febrero 2026',
  columnas: ['Del 1 al 10', 'Del 11 al 20', 'Del 21 al 30', 'Mes siguiente'],
  efectivo: [
    ['Mayores', 120000, 132000, 139000, 146000],
    ['5ta', 116000, 127000, 133000, 140000],
    ['6ta', 116000, 127000, 133000, 140000],
    ['7ma', 102000, 112000, 118000, 124000],
    ['8va', 95000, 104000, 109000, 115000],
    ['9na', 86000, 94000, 99000, 104000],
    ['10ma', 86000, 94000, 99000, 104000],
    ['Iniciación', 78000, 86000, 90000, 95000],
    ['Escuela', 95000, 104000, 109000, 115000],
    ['4ta', 35000, 38000, 40000, 42000],
    ['2da', 36000, 40000, 42000, 44000],
    ['Mini', 57000, 63000, 66000, 69000],
  ],
  transferencia: [
    ['Mayores', 130000, 142000, 149000, 156000],
    ['5ta', 126000, 137000, 143000, 150000],
    ['6ta', 126000, 137000, 143000, 150000],
    ['7ma', 112000, 122000, 128000, 134000],
    ['8va', 105000, 114000, 119000, 125000],
    ['9na', 96000, 104000, 109000, 114000],
    ['10ma', 96000, 104000, 109000, 114000],
    ['Iniciación', 88000, 96000, 100000, 105000],
    ['Escuela', 105000, 114000, 119000, 125000],
    ['4ta', 45000, 48000, 50000, 52000],
    ['2da', 46000, 50000, 52000, 54000],
    ['Mini', 67000, 73000, 76000, 79000],
  ],
};
