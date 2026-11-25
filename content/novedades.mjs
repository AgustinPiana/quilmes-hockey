// Novedades del hockey. La primera de la lista es la más nueva y la que se destaca en la portada.
// Para sumar una: copiar un bloque, cambiar slug (único, sin espacios), textos e imagen.
// fecha: AAAA-MM-DD solo si se conoce el día exacto (se muestra y se informa a Google).
// etiqueta: lo que se muestra cuando no hay fecha exacta ("Temporada 2026", "Del archivo"...).

export const novedades = [
  {
    slug: 'damas-primeras-metropolitano-b-2026',
    fecha: '2026-10-31',
    categoria: 'Damas',
    titulo: 'Damas A cerró el Metropolitano B en lo más alto',
    resumen:
      'Con 60 puntos en 26 fechas, 18 triunfos y solo dos derrotas, el primer equipo de damas terminó el torneo en el primer puesto.',
    imagen: '/img/fotos/mayores-b-2022.jpg',
    cuerpo: `
      <p>El primer equipo de damas completó las 26 fechas del Metropolitano B 2026 en el primer lugar de la tabla: 60 puntos, 18 partidos ganados, 6 empatados y 2 perdidos, con 57 goles a favor y 34 en contra.</p>
      <p>La última fecha se jugó el sábado 31 de octubre en Quilmes, con victoria 3 a 1 sobre Gimnasia y Esgrima B. El ascenso ya estaba asegurado desde el 22 de septiembre, cuando el equipo le ganó 3 a 2 a Hurling.</p>
      <p>Damas B también tuvo un gran año en el Metropolitano D: terminó segunda y compartió la valla menos vencida del torneo: 17 goles en contra en 26 partidos.</p>
      <p>Las tablas completas y todos los resultados de la temporada están en la sección <a href="/partidos">Partidos</a>.</p>`,
  },
  {
    slug: 'objetivo-cumplido-damas-a-vuelve-a-la-a',
    fecha: '2026-09-22',
    categoria: 'Damas',
    titulo: 'Objetivo cumplido: Damas A vuelve a la máxima categoría',
    resumen:
      'Con un 3 a 2 sobre Hurling, una noche de martes con la tribuna llena y la nueva iluminación de la cancha central, el equipo cervecero regresó a la A tras un año.',
    imagen: '/img/fotos/sexta-a-2022.jpg',
    cuerpo: `
      <p>Quilmes A retornó a la máxima categoría del hockey tras vencer a Hurling por 3 a 2 el martes 22 de septiembre por la noche, por la fecha 20 del Metropolitano B, con una impresionante convocatoria de público y con la nueva iluminación de la cancha central de Cevallos y Conesa.</p>
      <p>El equipo cervecero logró, tras un año, retornar a la A. Después cerró el torneo en el primer puesto, con 60 puntos en 26 fechas.</p>
      <p>Todos los resultados de la temporada están en la sección <a href="/partidos">Partidos</a>.</p>`,
  },
  {
    slug: 'inscripciones-2026',
    fecha: null,
    etiqueta: 'Temporada 2026',
    categoria: 'Club',
    titulo: 'Inscripciones abiertas para la temporada 2026',
    resumen:
      'Desde escuelita y mini hasta mayores. La inscripción se hace con un formulario online.',
    imagen: '/img/fotos/novena-d-2022.jpg',
    cuerpo: `
      <p>Ya está abierto el formulario de inscripción 2026 para todas las categorías de damas y caballeros: escuela, mini, iniciación, de décima a quinta división, intermedia y mayores.</p>
      <p>Para jugar hace falta ser socio del Quilmes Atlético Club, tener el apto médico cargado en Buenos Aires Hockey y estar al día con el adicional de hockey.</p>
      <p>Los valores de los adicionales y el reglamento administrativo están en la sección <a href="/club#aranceles">El club</a>.</p>`,
    enlace: { texto: 'Ir al formulario de inscripción', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdRlVc0gEMSrEAKok8-1fYhCY09HwEWtayYDMmTqoPK0zAgzA/viewform' },
  },
  {
    slug: 'reglamento-administrativo-2026',
    fecha: null,
    etiqueta: 'Temporada 2026',
    categoria: 'Club',
    titulo: 'Reglamento administrativo 2026',
    resumen:
      'Pagos del 1 al 10 de cada mes, becas, licencias médicas, pases y bajas: todo lo que hay que saber para esta temporada.',
    imagen: '/img/fotos/techos-bancos.jpg',
    cuerpo: `
      <ul>
        <li>Los pagos se realizan del 1 al 10 de cada mes.</li>
        <li>Para entrenar y jugar hay que tener al día la cuota social y el adicional.</li>
        <li>Con más de un mes de mora en el adicional no se puede jugar el fin de semana; con más de dos, tampoco entrenar.</li>
        <li>Las multas que aplique la AHBA quedan a cargo de la persona o del equipo responsable.</li>
        <li>Las licencias médicas se informan en Administración durante el período indicado por el médico.</li>
        <li>Las becas (deportiva, social y administrativa) se piden en Administración y se otorgan por orden de inscripción y prioridad.</li>
        <li>Para la baja de hockey hay que escribir a quilmeshockey1911@gmail.com; la baja de la cuota social se tramita en la sede.</li>
        <li>Los pases se piden en Administración y solo se otorgan sin deuda.</li>
      </ul>`,
    enlace: { texto: 'Descargar el reglamento (PDF)', url: '/docs/reglamento-interno-2026.pdf' },
  },
  {
    slug: 'apto-medico-online',
    fecha: null,
    etiqueta: 'Temporada 2026',
    categoria: 'Trámites',
    titulo: 'El apto médico se carga online',
    resumen:
      'La AHBA centraliza los aptos en su plataforma. Junto con la evaluación pre-competitiva, es requisito para jugar.',
    imagen: '/img/fotos/sexta-a-2022.jpg',
    cuerpo: `
      <p>El apto médico de cada jugadora y jugador se carga en la plataforma de Buenos Aires Hockey. Es requisito para jugar.</p>
      <p>Además hay que completar la Evaluación Pre-Competitiva (E.P.C.): el formulario lo llena el jugador o su padre, madre o tutor, y después lo firma un médico cardiólogo, clínico o pediatra.</p>
      <p><a href="/docs/evaluacion-2023.pdf">Descargar la Evaluación Pre-Competitiva (PDF)</a></p>`,
    enlace: { texto: 'Cargar el apto médico', url: 'https://aptomedico.buenosaireshockey.ar/' },
  },
  {
    slug: 'charla-como-acompanar-a-mi-hijo-deportista',
    fecha: null,
    etiqueta: 'Para familias',
    categoria: 'Formativas',
    titulo: 'Cómo acompañar a mi hij@ deportista',
    resumen:
      'Una charla de la Asociación de Hockey de Buenos Aires para madres, padres y familias de las divisiones formativas.',
    imagen: '/img/fotos/septima-c-2022.jpg',
    cuerpo: `
      <p>La Asociación Amateur de Hockey sobre Césped de Buenos Aires preparó una charla para las familias de las divisiones formativas: cómo acompañar desde afuera, qué esperar de cada etapa y cómo vivir el deporte sin presiones.</p>
      <div class="video"><iframe src="https://www.youtube-nocookie.com/embed/THkrsGPVg00" title="Cómo acompañar a mi hij@ deportista" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`,
  },
  {
    slug: 'guadalupe-adorno-ignacio-nepote-selecciones',
    fecha: null,
    etiqueta: '2022',
    categoria: 'Selecciones',
    titulo: 'Leona y León: Guadalupe Adorno e Ignacio Nepote',
    resumen:
      'Dos jugadores del club integraron las selecciones nacionales mayores. Guadalupe fue parte del plantel de Las Leonas 2022.',
    imagen: '/img/fotos/nepote-adorno.jpg',
    cuerpo: `
      <p>Guadalupe Adorno e Ignacio Nepote, jugadores del Quilmes Atlético Club, integraron las selecciones nacionales mayores de hockey.</p>
      <p>Guadalupe formó parte del plantel de Las Leonas en 2022 y ese mismo año, junto a Juan Ronconi, había jugado el Sudamericano de Asunción. Se suman a una larga lista de jugadoras y jugadores del Q.A.C. que vistieron la camiseta argentina, que se puede ver en la sección <a href="/historia#figuras">Historia</a>.</p>`,
  },
  {
    slug: 'nuevos-arcos-y-techos-de-bancos',
    fecha: null,
    etiqueta: '2022',
    categoria: 'Infraestructura',
    titulo: 'Nuevos arcos de aluminio y techos para los bancos',
    resumen:
      'La sede de Cevallos sumó arcos de aluminio nuevos y techos para los bancos de suplentes.',
    imagen: '/img/fotos/nuevos-arcos.jpg',
    cuerpo: `
      <p>La sede de hockey de Cevallos 348 estrenó arcos de aluminio nuevos y techos para los bancos de suplentes.</p>
      <figure><img src="/img/fotos/techos-bancos.jpg" alt="Bancos de suplentes techados en la cancha de Cevallos" loading="lazy" width="720" height="480"></figure>`,
  },
  {
    slug: 'quinta-b-campeona-copa-quilmes-2022',
    fecha: null,
    etiqueta: '2022',
    categoria: 'Formativas',
    titulo: 'Quinta B, campeona de la Copa Quilmes 2022',
    resumen:
      'Un 2022 con muchas alegrías en las formativas: título para la Quinta B, subcampeonatos de Sexta B y Sexta C, y la Sub 14 en los Juegos Bonaerenses.',
    imagen: '/img/fotos/sexta-c-2022.jpg',
    cuerpo: `
      <p>La Quinta B se quedó con la Copa Quilmes 2022. La temporada también dejó los subcampeonatos de Sexta B y Sexta C, y la participación de la Sub 14 en los Juegos Bonaerenses.</p>
      <p>Las fotos de todas las divisiones están en la <a href="/fotos">galería</a>.</p>`,
  },
];
