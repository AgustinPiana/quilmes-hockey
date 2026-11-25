// Contenido de cada página. Devuelve una lista que build.mjs convierte en HTML.

import { esc, img, icono, escudo, fechaNota, enlaceAttrs, externo, botonesRedes, redesActivas } from './build.mjs';
import { hitos, figuras, seleccionados, leonas1959 } from '../content/historia.mjs';
import { albumes } from '../content/fotos.mjs';
import { comision, aranceles } from '../content/sitio.mjs';

const equipos = [
  { id: 'hockey-damas', nombre: 'Damas A' },
  { id: 'hockey-caballeros', nombre: 'Caballeros A' },
  { id: 'hockey-damas-b', nombre: 'Damas B' },
  { id: 'hockey-caballeros-b', nombre: 'Caballeros B' },
];

function tarjetaNota(n, { grande = false, carga = 'lazy' } = {}) {
  return `<article class="nota${grande ? ' nota-grande' : ''}">
    <a href="/novedades/${n.slug}" class="nota-link">
      <div class="nota-foto">${img(n.imagen, '', { carga })}</div>
      <div class="nota-txt">
        <p class="nota-meta"><span>${esc(n.categoria)}</span>${n.fecha ? `<time datetime="${n.fecha}">${fechaNota(n)}</time>` : `<span>${esc(n.etiqueta || '')}</span>`}</p>
        <h3>${esc(n.titulo)}</h3>
        ${grande ? `<p class="nota-resumen">${esc(n.resumen)}</p>` : ''}
        <span class="leer">Leer nota ${icono('flecha')}</span>
      </div>
    </a>
  </article>`;
}

function titulo(kicker, texto, extra = '') {
  return `<div class="sec-titulo"><div><p class="kicker">${kicker}</p><h2>${texto}</h2></div>${extra}</div>`;
}

function cabeceraPagina(kicker, h1, bajada, foto) {
  return `<section class="cab-pag${foto ? ' cab-pag-foto' : ''}">
  ${foto ? `<div class="cab-pag-img">${img(foto, '', { carga: 'eager' })}</div>` : ''}
  <div class="ancho cab-pag-in">
    <p class="kicker">${kicker}</p>
    <h1>${h1}</h1>
    ${bajada ? `<p class="cab-pag-bajada">${bajada}</p>` : ''}
  </div>
</section>`;
}

const pesos = (n) => '$ ' + n.toLocaleString('es-AR');

function bandaSponsor() {
  return `<section class="banda-sponsor">
  <div class="ancho banda-sponsor-in">
    <div>
      <p class="kicker kicker-claro">Sponsors</p>
      <h2>¿Querés ser sponsor del hockey cervecero?</h2>
      <p>Más de 800 jugadoras y jugadores, partidos todos los fines de semana y una comunidad con más de cien años de historia. Sumá tu marca.</p>
    </div>
    <a class="btn btn-blanco" href="/sponsors#sumate">Contactate con nosotros ${icono('flecha')}</a>
  </div>
</section>`;
}

export function paginas({ sitio, contacto, accesos, federaciones, sponsors, novedades }) {
  const out = [];
  const [destacada, ...resto] = novedades;

  // ================= INICIO =================
  const accesosHtml = accesos
    .map(
      (a, i) => `<li><a class="acceso${a.destacado ? ' acceso-dest' : ''}" href="${a.url}"${enlaceAttrs(a.url)}>
        <span class="acceso-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="acceso-txt"><strong>${esc(a.titulo)}</strong><span>${esc(a.bajada)}</span></span>
        ${icono(externo(a.url) || a.url.endsWith('.pdf') ? 'externo' : 'flecha')}
      </a></li>`
    )
    .join('');

  const fotosInicio = [
    ['/img/fotos/mayores-b-2022.jpg', 'Damas Mayores B 2022'],
    ['/img/historia/damas-1956.jpg', 'Damas campeonas 1956'],
    ['/img/fotos/septima-a-caballeros-2022.jpg', 'Séptima A caballeros 2022'],
    ['/img/fotos/nepote-adorno.jpg', 'Ignacio Nepote y Guadalupe Adorno'],
    ['/img/historia/caballeros-1995.jpg', 'Caballeros campeones 1995'],
  ];

  out.push({
    ruta: '/',
    nav: '/',
    prioridad: 1.0,
    descripcion: sitio.descripcion,
    claseBody: 'inicio',
    precargar: '/img/portada-gol-1995.jpg',
    cuerpo: `
<section class="hero">
  <div class="hero-foto">${img('/img/portada-gol-1995.jpg', 'Festejo de un gol de Quilmes ante San Fernando en 1995, con la tribuna llena', { carga: 'eager' })}</div>
  <div class="ancho hero-in">
    <div class="hero-txt">
      <p class="kicker kicker-claro">Quilmes Atlético Club · Desde 1911</p>
      <h1>Hockey<br>cervecero</h1>
      <p class="hero-bajada">Damas y caballeros, de la escuelita a primera. Más de cien años jugando en Quilmes.</p>
      <div class="hero-btns">
        <a class="btn btn-blanco" href="${accesos[0].url}" target="_blank" rel="noopener">Inscribite 2026 ${icono('flecha')}</a>
        <a class="btn btn-linea" href="/partidos">Partidos y posiciones</a>
      </div>
    </div>
    <aside class="hero-partido" data-proximo aria-live="polite">
      <p class="kicker kicker-claro">Próximo partido</p>
      <p class="hp-vacio">Cargando fixture…</p>
    </aside>
  </div>
  <p class="hero-epigrafe ancho">Quilmes 1 – San Fernando 0, 1995</p>
</section>

<section class="resultados" aria-label="Últimos resultados">
  <div class="ancho resultados-in" data-resultados>
    <p class="res-tit">Últimos resultados</p>
    <div class="res-lista"><p class="res-vacio">Cargando…</p></div>
    <a class="res-mas" href="/partidos">Ver todo ${icono('flecha')}</a>
  </div>
</section>

<section class="sec">
  <div class="ancho">
    ${titulo('Accesos rápidos', 'Trámites y links')}
    <ul class="accesos">${accesosHtml}</ul>
  </div>
</section>

<section class="sec sec-gris">
  <div class="ancho">
    ${titulo('Novedades', 'Lo último del hockey', `<a class="ver-todo" href="/novedades">Todas las novedades ${icono('flecha')}</a>`)}
    <div class="notas-inicio">
      ${tarjetaNota(destacada, { grande: true })}
      <div class="notas-col">${resto.slice(0, 3).map((n) => tarjetaNota(n)).join('')}</div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="ancho">
    ${titulo('Temporada 2026', 'Nuestros equipos', `<a class="ver-todo" href="/partidos">Fixture y tablas ${icono('flecha')}</a>`)}
    <div class="equipos" data-equipos>
      ${equipos
        .map(
          (e) => `<a class="equipo" href="/partidos#${e.id}" data-equipo="${e.id}">
        <span class="equipo-nom">${e.nombre}</span>
        <span class="equipo-torneo">—</span>
        <span class="equipo-pos"><strong>–</strong><small>posición</small></span>
        <span class="equipo-forma" aria-label="Últimos resultados"></span>
      </a>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="numeros">
  <div class="ancho numeros-in">
    <div><strong>1911</strong><span>Año de afiliación a la Asociación Argentina de Hockey</span></div>
    <div><strong>800</strong><span>Jugadoras y jugadores, de escuelita a mayores</span></div>
    <div><strong>3</strong><span>Canchas sintéticas entre Cevallos y el Estadio Nacional</span></div>
    <div><strong>33</strong><span>Títulos de primera: 17 de damas y 16 de caballeros</span></div>
  </div>
</section>

<section class="sec">
  <div class="ancho historia-teaser">
    <div class="ht-foto">${img('/img/historia/damas-1956.jpg', 'Plantel de damas campeón de 1956 frente al chalet del club')}</div>
    <div class="ht-txt">
      <p class="kicker">Historia</p>
      <h2>Más de un siglo<br>de hockey en Quilmes</h2>
      <p>En 1911 el club se afilió a la Asociación Argentina de Hockey sobre Césped. Desde entonces salieron de acá campeonatos, olímpicos, Leonas y Leones.</p>
      <ol class="ht-hitos">
        <li><strong>1925</strong> Las damas ganan ocho ligas seguidas</li>
        <li><strong>1959</strong> Diez jugadoras del Q.A.C. en la primera Selección</li>
        <li><strong>2008</strong> Caballeros, título XVI con gol de oro</li>
      </ol>
      <a class="btn btn-azul" href="/historia">Conocé la historia ${icono('flecha')}</a>
    </div>
  </div>
</section>

<section class="sec sec-azul">
  <div class="ancho">
    ${titulo('Fotos', 'En cancha', `<a class="ver-todo ver-todo-claro" href="/fotos">Ver galería ${icono('flecha')}</a>`)}
    <div class="mosaico">
      ${fotosInicio.map(([s, a]) => `<a href="/fotos" class="mosaico-item">${img(s, a)}</a>`).join('')}
    </div>
  </div>
</section>

<section class="sec">
  <div class="ancho">
    ${titulo('Nos acompañan', 'Sponsors')}
    <ul class="sponsors-lista">
      ${sponsors
        .map(
          (s) => `<li><a href="${s.url}" target="_blank" rel="noopener" class="sponsor">${img(s.logo, s.nombre)}<span>${esc(s.nombre)}</span></a></li>`
        )
        .join('')}
      <li><a href="/sponsors#sumate" class="sponsor sponsor-libre"><strong>Tu marca acá</strong><span>Sumate como sponsor</span></a></li>
    </ul>
  </div>
</section>

${bandaSponsor()}

<section class="sec seguinos">
  <div class="ancho seguinos-in">
    <div>
      <p class="kicker">Redes</p>
      <h2>Seguí al hockey cervecero</h2>
      <p>Resultados, fotos y avisos de cada fin de semana.</p>
    </div>
    <ul class="redes-grandes">
      ${redesActivas
        .map((r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${icono(r.id)}<span>${r.nombre}</span>${icono('externo', 'ico ico-chico')}</a></li>`)
        .join('')}
    </ul>
  </div>
</section>

<section class="federaciones">
  <div class="ancho fed-in">
    <p>Afiliados a</p>
    <ul>
      ${federaciones.map((f) => `<li><a href="${f.url}" target="_blank" rel="noopener"><strong>${f.sigla}</strong><span>${esc(f.nombre)}</span></a></li>`).join('')}
    </ul>
  </div>
</section>`,
  });

  // ================= NOVEDADES =================
  out.push({
    ruta: '/novedades',
    nav: '/novedades',
    titulo: 'Novedades',
    descripcion: 'Noticias del hockey del Quilmes Atlético Club: resultados, inscripciones, trámites, selecciones y vida del club.',
    prioridad: 0.9,
    migas: [{ nombre: 'Novedades', url: '/novedades' }],
    cuerpo: `${cabeceraPagina('Novedades', 'Lo último del hockey', 'Noticias, avisos y trámites de la subcomisión.')}
<section class="sec">
  <div class="ancho">
    <div class="notas-lista">
      ${tarjetaNota(destacada, { grande: true, carga: 'eager' })}
      ${resto.map((n) => tarjetaNota(n)).join('')}
    </div>
  </div>
</section>`,
  });

  novedades.forEach((n, i) => {
    const otras = novedades.filter((o) => o !== n).slice(0, 3);
    const urlNota = `${sitio.url}/novedades/${n.slug}`;
    const compartir = encodeURIComponent(urlNota);
    const texto = encodeURIComponent(n.titulo);
    out.push({
      ruta: `/novedades/${n.slug}`,
      nav: '/novedades',
      titulo: n.titulo,
      descripcion: n.resumen,
      imagen: n.imagen,
      imagenAlt: n.titulo,
      tipo: 'article',
      prioridad: 0.6,
      modificado: n.fecha || undefined,
      migas: [
        { nombre: 'Novedades', url: '/novedades' },
        { nombre: n.titulo, url: `/novedades/${n.slug}` },
      ],
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: n.titulo,
          description: n.resumen,
          image: [sitio.url + n.imagen],
          ...(n.fecha ? { datePublished: n.fecha } : {}),
          author: { '@type': 'Organization', name: 'Quilmes Atlético Club · Hockey', url: sitio.url },
          publisher: { '@id': `${sitio.url}/#organizacion` },
          mainEntityOfPage: urlNota,
        },
      ],
      cuerpo: `
<article class="articulo">
  <header class="art-cab ancho-texto">
    <nav class="migas" aria-label="Ruta"><a href="/">Inicio</a> / <a href="/novedades">Novedades</a></nav>
    <p class="nota-meta"><span>${esc(n.categoria)}</span>${n.fecha ? `<time datetime="${n.fecha}">${fechaNota(n)}</time>` : `<span>${esc(n.etiqueta || '')}</span>`}</p>
    <h1>${esc(n.titulo)}</h1>
    <p class="art-bajada">${esc(n.resumen)}</p>
  </header>
  <figure class="art-foto ancho">${img(n.imagen, n.titulo, { carga: 'eager' })}</figure>
  <div class="art-cuerpo ancho-texto">
    ${n.cuerpo}
    ${n.enlace ? `<p><a class="btn btn-azul" href="${n.enlace.url}"${enlaceAttrs(n.enlace.url)}>${esc(n.enlace.texto)} ${icono(externo(n.enlace.url) ? 'externo' : 'flecha')}</a></p>` : ''}
    <div class="compartir">
      <span>Compartir</span>
      <a href="https://wa.me/?text=${texto}%20${compartir}" target="_blank" rel="noopener" aria-label="Compartir por WhatsApp">${icono('whatsapp')}</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${compartir}" target="_blank" rel="noopener" aria-label="Compartir en Facebook">${icono('facebook')}</a>
      <a href="https://twitter.com/intent/tweet?text=${texto}&url=${compartir}" target="_blank" rel="noopener" aria-label="Compartir en X">${icono('x')}</a>
      <button type="button" data-copiar="${urlNota}" aria-label="Copiar enlace">${icono('link')}<span class="copiado" hidden>Copiado</span></button>
    </div>
  </div>
</article>
<section class="sec sec-gris">
  <div class="ancho">
    ${titulo('Seguí leyendo', 'Más novedades', `<a class="ver-todo" href="/novedades">Todas ${icono('flecha')}</a>`)}
    <div class="notas-tres">${otras.map((o) => tarjetaNota(o)).join('')}</div>
  </div>
</section>`,
    });
  });

  // ================= PARTIDOS =================
  out.push({
    ruta: '/partidos',
    nav: '/partidos',
    titulo: 'Partidos, fixture y posiciones',
    descripcion:
      'Fixture, resultados y tablas de posiciones de Damas A, Damas B, Caballeros A y Caballeros B del Quilmes Atlético Club en los torneos Metropolitanos de la AHBA.',
    prioridad: 0.9,
    migas: [{ nombre: 'Partidos', url: '/partidos' }],
    cuerpo: `${cabeceraPagina('Temporada 2026', 'Partidos y posiciones', 'Fixture, resultados y tablas de los torneos Metropolitanos de la Asociación de Hockey de Buenos Aires. Se actualiza solo varias veces por día.')}
<section class="sec">
  <div class="ancho">
    <div class="pestanas" role="tablist" aria-label="Equipos">
      ${equipos.map((e, i) => `<button role="tab" type="button" id="tab-${e.id}" aria-controls="${e.id}" aria-selected="${i === 0}" data-tab="${e.id}">${e.nombre}</button>`).join('')}
    </div>
    ${equipos
      .map(
        (e, i) => `<div class="panel-equipo" role="tabpanel" id="${e.id}" aria-labelledby="tab-${e.id}"${i === 0 ? '' : ' hidden'} data-panel="${e.id}">
      <p class="cargando">Cargando partidos de ${e.nombre}…</p>
    </div>`
      )
      .join('')}
    <p class="fuente">Fuente: Asociación de Hockey de Buenos Aires. Los horarios pueden cambiar: confirmalos en <a href="https://buenosaireshockey.ar/" target="_blank" rel="noopener">buenosaireshockey.ar</a>. <span data-actualizado></span></p>
  </div>
</section>`,
  });

  // ================= EL CLUB =================
  const tablaAranceles = (filas) => `<div class="tabla-scroll"><table class="tabla">
      <thead><tr><th scope="col">Categoría</th>${aranceles.columnas.map((c) => `<th scope="col">${c}</th>`).join('')}</tr></thead>
      <tbody>${filas.map(([cat, ...v]) => `<tr><th scope="row">${cat}</th>${v.map((x) => `<td>${pesos(x)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;

  out.push({
    ruta: '/club',
    nav: '/club',
    titulo: 'El club: sedes, inscripción y aranceles',
    descripcion:
      'Sedes, canchas, cómo inscribirse, categorías, aranceles 2026, reglamento y contacto del hockey del Quilmes Atlético Club. Av. Cevallos 348, Quilmes.',
    prioridad: 0.9,
    migas: [{ nombre: 'El club', url: '/club' }],
    cuerpo: `${cabeceraPagina('El club', 'Jugar en Quilmes', 'Sedes, inscripción, aranceles y todo lo que necesitás para sumarte al hockey cervecero.', '/img/fotos/septima-c-2022.jpg')}

<nav class="subnav" aria-label="En esta página">
  <div class="ancho"><a href="#sumate">Cómo sumarte</a><a href="#categorias">Categorías</a><a href="#aranceles">Aranceles</a><a href="#reglamento">Reglamento</a><a href="#sedes">Sedes</a><a href="#comision">Comisión</a><a href="#contacto">Contacto</a></div>
</nav>

<section class="sec" id="sumate">
  <div class="ancho">
    ${titulo('Inscripción', 'Cómo sumarte')}
    <ol class="pasos">
      <li><span>01</span><h3>Hacete socio</h3><p>Para jugar hay que ser socio del Quilmes Atlético Club. Se puede hacer online o en la sede social de Guido y Paz.</p><a href="https://quilmesaclub.accessfan.ar/" target="_blank" rel="noopener">Asociarme ${icono('externo', 'ico ico-chico')}</a></li>
      <li><span>02</span><h3>Completá la inscripción</h3><p>Llená el formulario de inscripción 2026 con los datos de la jugadora o el jugador.</p><a href="${accesos[0].url}" target="_blank" rel="noopener">Formulario ${icono('externo', 'ico ico-chico')}</a></li>
      <li><span>03</span><h3>Apto médico y E.P.C.</h3><p>Cargá el apto médico en Buenos Aires Hockey y completá la Evaluación Pre-Competitiva firmada por un médico.</p><a href="https://aptomedico.buenosaireshockey.ar/" target="_blank" rel="noopener">Cargar apto ${icono('externo', 'ico ico-chico')}</a></li>
      <li><span>04</span><h3>Adicional al día</h3><p>El adicional de hockey se paga del 1 al 10 de cada mes, junto con la cuota social.</p><a href="#aranceles">Ver valores ${icono('flecha', 'ico ico-chico')}</a></li>
    </ol>
  </div>
</section>

<section class="sec sec-gris" id="categorias">
  <div class="ancho dos-col">
    <div>
      <p class="kicker">Categorías</p>
      <h2>De la escuelita a primera</h2>
      <p>Damas y caballeros entrenan y compiten en los torneos de la Asociación de Hockey de Buenos Aires. Todos los fines de semana hay partidos de campeonato en nuestras canchas.</p>
    </div>
    <ul class="categorias">
      <li><strong>Escuela</strong><span>Primeros pasos con el palo</span></li>
      <li><strong>Mini e Iniciación</strong><span>Juego y fundamentos</span></li>
      <li><strong>10ma a 7ma</strong><span>Divisiones formativas</span></li>
      <li><strong>6ta y 5ta</strong><span>Juveniles</span></li>
      <li><strong>Intermedia</strong><span>El paso a primera</span></li>
      <li><strong>Mayores</strong><span>Damas A, B, C y D · Caballeros A y B</span></li>
    </ul>
  </div>
</section>

<section class="sec" id="aranceles">
  <div class="ancho">
    ${titulo('Aranceles', `Adicionales desde ${aranceles.vigencia}`)}
    <p class="aclaracion">Valores mensuales en pesos. No incluyen la cuota social. El valor sube según el día del mes en que se pague.</p>
    <div class="pestanas pestanas-chicas" role="tablist" aria-label="Forma de pago">
      <button role="tab" type="button" aria-selected="true" aria-controls="ar-efectivo" id="tab-ar-efectivo" data-tab="ar-efectivo">Efectivo</button>
      <button role="tab" type="button" aria-selected="false" aria-controls="ar-transf" id="tab-ar-transf" data-tab="ar-transf">Transferencia o débito</button>
    </div>
    <div role="tabpanel" id="ar-efectivo" aria-labelledby="tab-ar-efectivo">${tablaAranceles(aranceles.efectivo)}</div>
    <div role="tabpanel" id="ar-transf" aria-labelledby="tab-ar-transf" hidden>${tablaAranceles(aranceles.transferencia)}</div>
    <div class="notas-ar">
      <div><h3>Hermanos</h3><p>El tercer hermano tiene 50% de descuento sobre el adicional y el cuarto, 100%. En ambos casos se abonan la cuota social y el micro.</p></div>
      <div><h3>Micros</h3><p>Desde marzo se abona una cuota de traslados que cubre los viajes de visitante de 10ma a 5ta. Los amistosos de pretemporada se pagan en cada viaje.</p></div>
      <div><h3>Tercer tiempo</h3><p>No está incluido en la cuota: se abona en cada encuentro directamente al concesionario.</p></div>
    </div>
  </div>
</section>

<section class="sec sec-gris" id="reglamento">
  <div class="ancho dos-col">
    <div>
      <p class="kicker">Reglamento administrativo 2026</p>
      <h2>Lo que hay que saber</h2>
      <p>El adicional se cobra junto con la cuota social del mes. Se considera al día a quien tenga pago el mes anterior al mes en curso.</p>
      <a class="btn btn-azul" href="/docs/reglamento-interno-2026.pdf" target="_blank" rel="noopener">Descargar reglamento (PDF) ${icono('externo')}</a>
    </div>
    <ul class="lista-check">
      <li>Pagos del 1 al 10 de cada mes.</li>
      <li>Para entrenar y jugar hay que tener al día la cuota social y el adicional.</li>
      <li>Con más de un mes de mora no se juega el fin de semana; con más de dos, tampoco se entrena.</li>
      <li>Becas deportivas, sociales y administrativas: se piden en Administración.</li>
      <li>Licencias médicas y pases: se tramitan en Administración. Los pases solo se otorgan sin deuda.</li>
      <li>Baja de hockey: por mail a ${contacto.emails[0]}. La baja de la cuota social se tramita en la sede.</li>
      <li>No se permite ingresar al predio con animales ni con indumentaria de otros clubes de fútbol de AFA.</li>
    </ul>
  </div>
</section>

<section class="sec" id="sedes">
  <div class="ancho">
    ${titulo('Dónde estamos', 'Sedes y canchas')}
    <div class="sedes">
      ${contacto.sedes
        .map(
          (s) => `<div class="sede">
        <h3>${s.nombre}</h3>
        <p class="sede-dir">${icono('pin')} ${s.direccion}</p>
        <p>${s.detalle}</p>
        ${s.horario ? `<p class="sede-hor">${s.horario}</p>` : ''}
        ${s.tel ? `<p>Tel. ${s.tel}</p>` : ''}
        <a href="${s.mapa}" target="_blank" rel="noopener">Cómo llegar ${icono('externo', 'ico ico-chico')}</a>
      </div>`
        )
        .join('')}
    </div>
    <div class="mapa">
      <iframe title="Mapa de la sede de hockey, Av. Cevallos 348, Quilmes" src="https://maps.google.com/maps?q=Cevallos%20348%2C%20Quilmes&t=m&z=15&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>

<section class="sec sec-gris" id="comision">
  <div class="ancho">
    ${titulo('Institucional', 'Subcomisión de hockey')}
    <ul class="comision">
      ${comision.map((c) => `<li><span>${c.cargo}</span><strong>${c.nombre}</strong></li>`).join('')}
    </ul>
  </div>
</section>

<section class="sec" id="contacto">
  <div class="ancho contacto">
    <div>
      <p class="kicker">Contacto</p>
      <h2>Escribinos</h2>
      <p>Consultas sobre inscripciones, pruebas, aranceles o sponsoreo.</p>
    </div>
    <ul class="contacto-lista">
      ${contacto.emails.map((e) => `<li><a href="mailto:${e}">${icono('mail')}<span>${e}</span></a></li>`).join('')}
      ${contacto.telefonos.map((t) => `<li><a href="tel:${t.tel}">${icono('tel')}<span>${t.texto}</span></a></li>`).join('')}
      ${redesActivas.map((r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${icono(r.id)}<span>${r.nombre}</span></a></li>`).join('')}
    </ul>
  </div>
</section>`,
  });

  // ================= HISTORIA =================
  out.push({
    ruta: '/historia',
    nav: '/historia',
    titulo: 'Historia: más de un siglo de hockey',
    descripcion:
      'La historia del hockey del Quilmes Atlético Club desde 1911: campeonatos de damas y caballeros, olímpicos, Leonas, Leones y los cien años de hockey cervecero.',
    imagen: '/img/historia/damas-1956.jpg',
    prioridad: 0.8,
    migas: [{ nombre: 'Historia', url: '/historia' }],
    cuerpo: `${cabeceraPagina('Desde 1911', 'Historia', 'Conocer nuestra historia nos ayuda a consolidar nuestro futuro.', '/img/historia/caballeros-historico.jpg')}

<section class="sec">
  <div class="ancho dos-col intro-historia">
    <p class="entrada">El Quilmes Atlético Club fue creciendo como una ciudad dentro de otra. Detrás del más popular de los deportes, cobijó el atletismo, el tenis, el vóley, el judo y la natación. Pero el hockey merece una mención aparte: se practica desde 1911, cuando el club se afilió a la Asociación Argentina de Hockey sobre Césped.</p>
    <div>
      <p>Una de las impulsoras del hockey femenino fue Esther Ross, que llegó de Irlanda y en 1907 fundó el colegio Miss Ross, hoy Quilmes High School. En 1923 nació la Buenos Aires Ladies Hockey League y al año siguiente las Quilmes Girls ganaron su primer campeonato.</p>
      <p>Hoy unos 800 jugadores pasan por el club y todos los fines de semana se juegan partidos de campeonato en Cevallos y Conesa. El hockey de Quilmes demostró en estos más de cien años que está a la altura de lo que se propuso desde el principio: ser un grande.</p>
    </div>
  </div>
</section>

<section class="sec sec-gris">
  <div class="ancho">
    ${titulo('Línea de tiempo', 'Momentos que nos marcaron')}
    <ol class="linea">
      ${hitos
        .map(
          (h) => `<li class="hito${h.imagen ? ' hito-foto' : ''}">
        <span class="hito-anio">${h.anio}</span>
        <div class="hito-txt">
          <h3>${esc(h.titulo)}</h3>
          <p>${esc(h.texto)}</p>
        </div>
        ${h.imagen ? `<figure>${img(h.imagen, h.titulo)}</figure>` : ''}
      </li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="sec" id="figuras">
  <div class="ancho">
    ${titulo('Orgullo cervecero', 'Olímpicos y seleccionados')}
    <div class="figuras">
      ${figuras
        .map(
          (f) => `<article class="figura">
        <div class="figura-foto">${img(f.imagen, f.nombre)}</div>
        <p class="kicker">${f.rama}</p>
        <h3>${esc(f.nombre)}</h3>
        <p>${esc(f.logros)}</p>
      </article>`
        )
        .join('')}
    </div>
    <div class="otros-sel">
      <h3>También vistieron la celeste y blanca</h3>
      <ul>${seleccionados.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="sec sec-azul">
  <div class="ancho dos-col leonas">
    <figure>${img('/img/historia/seleccion-1959.jpg', 'La primera Selección Argentina femenina de hockey, 1959')}</figure>
    <div>
      <p class="kicker kicker-claro">1959 · También fueron Leonas</p>
      <h2>Diez de las primeras Leonas eran de Quilmes</h2>
      <p>En 1959 Argentina jugó por primera vez un torneo internacional, en Holanda. Diez de las integrantes de aquel seleccionado eran jugadoras del Q.A.C.:</p>
      <ul class="nombres">${leonas1959.map((n) => `<li>${n}</li>`).join('')}</ul>
      <p>Ese mismo año, sin sus diez titulares, el equipo de Quilmes salió subcampeón.</p>
    </div>
  </div>
</section>

<section class="sec">
  <div class="ancho dos-col">
    <div>
      <p class="kicker">Homenaje</p>
      <h2>Laura “Chita” Vega</h2>
      <p>Jugadora del plantel femenino desde 1944 y campeona de primera en 1952, 1954, 1955, 1956, 1957, 1958, 1960, 1961 y 1964. Fue una de las diez jugadoras del club en la Selección de 1959, primera árbitra internacional y entrenadora de la Selección femenina en 1963 y 1967.</p>
      <p>Integró la subcomisión de hockey y la comisión directiva del club, y dirigió la primera de damas en épocas difíciles junto a sus amigas Lucila y Julia Echelini. Dedicó gran parte de su vida a este deporte.</p>
    </div>
    <blockquote class="cita">
      <p>“Es lo más lindo que me pudo pasar. Uno se prepara para trabajar, para el estudio, para todo lo demás, pero lo del hockey me llegó como tocado por una varita.”</p>
      <footer><strong>Alfredo Quacquarini</strong> Tres Juegos Olímpicos, Olimpia de Plata 1973 y coordinador del club. Entrevista del centenario, por Sebastián Galazzi.</footer>
    </blockquote>
  </div>
</section>

<section class="sec sec-gris">
  <div class="ancho">
    ${titulo('Archivo', 'La historia en fotos', `<a class="ver-todo" href="/fotos#campeones">Ver todas ${icono('flecha')}</a>`)}
    <div class="mosaico">
      ${albumes
        .find((a) => a.id === 'campeones')
        .fotos.slice(0, 5)
        .map((f) => `<a href="/fotos#campeones" class="mosaico-item">${img(f.src, f.texto)}</a>`)
        .join('')}
    </div>
  </div>
</section>`,
  });

  // ================= FOTOS =================
  const todas = albumes.flatMap((a) => a.fotos.map((f) => ({ ...f, album: a.id })));
  out.push({
    ruta: '/fotos',
    nav: '/fotos',
    titulo: 'Fotos',
    descripcion: 'Galería de fotos del hockey del Quilmes Atlético Club: temporada 2022, equipos campeones, archivo histórico y figuras.',
    imagen: '/img/fotos/mayores-b-2022.jpg',
    prioridad: 0.7,
    migas: [{ nombre: 'Fotos', url: '/fotos' }],
    cuerpo: `${cabeceraPagina('Galería', 'Fotos', `${todas.length} fotos de la temporada, los campeones y el archivo del club.`)}
<section class="sec">
  <div class="ancho">
    <div class="filtros" role="group" aria-label="Filtrar álbum">
      <button type="button" aria-pressed="true" data-filtro="todas">Todas</button>
      ${albumes.map((a) => `<button type="button" aria-pressed="false" data-filtro="${a.id}">${a.nombre}</button>`).join('')}
    </div>
    <ul class="galeria" data-galeria>
      ${todas
        .map(
          (f, i) => `<li data-album="${f.album}"><a href="${f.src}" data-foto="${i}" data-texto="${esc(f.texto)}">${img(f.src, f.texto)}<span>${esc(f.texto)}</span></a></li>`
        )
        .join('')}
    </ul>
  </div>
</section>
<dialog class="visor" data-visor aria-label="Foto ampliada">
  <button type="button" class="visor-cerrar" data-cerrar aria-label="Cerrar">×</button>
  <button type="button" class="visor-nav visor-ant" data-ant aria-label="Foto anterior">‹</button>
  <figure><img alt=""><figcaption></figcaption></figure>
  <button type="button" class="visor-nav visor-sig" data-sig aria-label="Foto siguiente">›</button>
</dialog>`,
  });

  // ================= SPONSORS =================
  out.push({
    ruta: '/sponsors',
    nav: '/sponsors',
    titulo: 'Sponsors: sumá tu marca',
    descripcion:
      'Sponsors del hockey del Quilmes Atlético Club. ¿Querés ser nuestro sponsor? Más de 800 jugadores y partidos todos los fines de semana. Contactate con nosotros.',
    prioridad: 0.8,
    migas: [{ nombre: 'Sponsors', url: '/sponsors' }],
    cuerpo: `${cabeceraPagina('Sponsors', 'Los que hacen crecer al hockey', 'Gracias a las empresas que nos acompañan cada temporada.')}
<section class="sec">
  <div class="ancho">
    <ul class="sponsors-lista sponsors-grande">
      ${sponsors
        .map(
          (s) => `<li><a href="${s.url}" target="_blank" rel="noopener" class="sponsor">${img(s.logo, s.nombre)}<span>${esc(s.nombre)}</span><small>${esc(s.rubro)}</small></a></li>`
        )
        .join('')}
      ${'<li><a href="#sumate" class="sponsor sponsor-libre"><strong>Tu marca acá</strong><span>Hay lugar para vos</span></a></li>'.repeat(Math.max(1, 4 - (sponsors.length % 4)))}
    </ul>
  </div>
</section>

<section class="sec sec-azul" id="sumate">
  <div class="ancho dos-col sumate">
    <div>
      <p class="kicker kicker-claro">¿Querés ser nuestro sponsor?</p>
      <h2>Contactate con nosotros</h2>
      <p>Tu marca junto a uno de los clubes con más historia del hockey argentino.</p>
      <ul class="por-que">
        <li><strong>+800</strong><span>jugadoras y jugadores, con sus familias</span></li>
        <li><strong>3</strong><span>canchas sintéticas con partidos todos los fines de semana</span></li>
        <li><strong>1911</strong><span>más de un siglo de historia y una comunidad que se mueve con el club</span></li>
      </ul>
      <h3>Formas de acompañar</h3>
      <ul class="formas">
        <li>Cartelería en las canchas</li>
        <li>Indumentaria de los equipos</li>
        <li>Presencia en la web y las redes</li>
        <li>Torneos, eventos y tercer tiempo</li>
      </ul>
      <p class="aclaracion-clara">Armamos la propuesta a medida de cada empresa.</p>
    </div>
    <form class="form" data-form-sponsor data-destino="${contacto.emails[0]}">
      <h3>Dejanos tus datos</h3>
      <label>Nombre y apellido<input name="nombre" autocomplete="name" required></label>
      <label>Empresa o marca<input name="empresa" autocomplete="organization" required></label>
      <div class="form-dos">
        <label>Email<input name="email" type="email" autocomplete="email" required></label>
        <label>Teléfono<input name="telefono" type="tel" autocomplete="tel"></label>
      </div>
      <label>¿Qué te interesa?<textarea name="mensaje" rows="4" placeholder="Contanos sobre tu marca y qué tipo de acompañamiento te interesa"></textarea></label>
      <button class="btn btn-blanco" type="submit">Enviar consulta ${icono('flecha')}</button>
      <p class="form-nota">Se abre tu correo con el mensaje listo para enviar a ${contacto.emails[0]}.</p>
    </form>
  </div>
</section>`,
  });

  // ================= 404 =================
  out.push({
    ruta: '/404',
    archivo: '404.html',
    titulo: 'Página no encontrada',
    descripcion: 'La página que buscás no existe.',
    noindex: true,
    cuerpo: `<section class="error-404">
  <div class="ancho">
    ${escudo('escudo escudo-404')}
    <p class="kicker">Error 404</p>
    <h1>Afuera de la cancha</h1>
    <p>La página que buscás no existe o cambió de lugar.</p>
    <a class="btn btn-azul" href="/">Volver al inicio ${icono('flecha')}</a>
  </div>
</section>`,
  });

  return out;
}
