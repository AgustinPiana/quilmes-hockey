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
  return `<section class="cab-pag">
  <div class="cab-pag-img">${img(foto, '', { carga: 'eager' })}</div>
  <div class="ancho cab-pag-in">
    <p class="kicker">${kicker}</p>
    <h1>${h1}</h1>
    ${bajada ? `<p class="cab-pag-bajada">${bajada}</p>` : ''}
  </div>
</section>`;
}

const pesos = (n) => '$ ' + n.toLocaleString('es-AR');

export function paginas({ sitio, contacto, accesos, federaciones, sponsors, novedades }) {
  const out = [];
  const [destacada, ...resto] = novedades;

  // ================= INICIO =================
  const portadas = [
    { src: '/img/portada-gol-1995.jpg', texto: 'Quilmes 1 – San Fernando 0, 1995', pos: 'center 30%' },
    { src: '/img/fotos/mayores-b-2022.jpg', texto: 'Damas, temporada 2022', pos: 'center 40%' },
    { src: '/img/historia/archivo-escaneado.jpg', texto: 'Caballeros en ataque', pos: 'center 35%' },
    { src: '/img/fotos/septima-a-caballeros-2022.jpg', texto: 'Séptima A caballeros, 2022', pos: 'center 40%' },
    { src: '/img/historia/damas-1956.jpg', texto: 'Damas campeonas, 1956', pos: 'center 30%' },
  ];
  const fotosInicio = [
    ['/img/fotos/mayores-b-2022.jpg', 'Damas Mayores B 2022'],
    ['/img/historia/damas-1956.jpg', 'Damas campeonas 1956'],
    ['/img/fotos/septima-a-caballeros-2022.jpg', 'Séptima A caballeros 2022'],
    ['/img/fotos/nepote-adorno.jpg', 'Ignacio Nepote y Guadalupe Adorno'],
    ['/img/historia/caballeros-1995.jpg', 'Caballeros campeones 1995'],
  ];
  const instagram = redesActivas.find((r) => r.id === 'instagram');
  const mailSponsor = `mailto:${contacto.emails[0]}?subject=${encodeURIComponent('Quiero ser sponsor del hockey')}`;

  out.push({
    ruta: '/',
    nav: '/',
    prioridad: 1.0,
    descripcion: sitio.descripcion,
    claseBody: 'inicio',
    precargar: portadas[0].src,
    cuerpo: `
<section class="hero" data-hero>
  <div class="hero-fotos">
    ${portadas
      .map(
        (p, i) => `<figure class="hero-foto${i === 0 ? ' activa' : ''}" data-texto="${esc(p.texto)}">${img(p.src, i === 0 ? 'Festejo de un gol de Quilmes ante San Fernando en 1995' : '', { carga: i === 0 ? 'eager' : 'lazy' }).replace('<img ', `<img style="object-position:${p.pos}" `)}</figure>`
      )
      .join('')}
  </div>
  <div class="ancho hero-in">
    <p class="kicker kicker-claro">Hockey · Desde 1911</p>
    <h1>Quilmes<br>Atlético Club</h1>
    <p class="hero-bajada">Damas y caballeros, de la escuelita a primera. Más de cien años jugando al hockey en Quilmes.</p>
    <div class="hero-pie">
      <div class="hero-btns">
        <a class="btn btn-blanco" href="${accesos[0].url}" target="_blank" rel="noopener">Inscribite 2026 ${icono('flecha')}</a>
      </div>
      <div class="hero-control">
        <p class="hero-epigrafe" data-epigrafe>${esc(portadas[0].texto)}</p>
        <div class="hero-puntos">${portadas.map((p, i) => `<button type="button" aria-label="Foto ${i + 1}"${i === 0 ? ' aria-current="true"' : ''} data-ir="${i}"></button>`).join('')}</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-novedades">
  <div class="ancho">
    <div class="ticker" aria-label="Últimos resultados">
      <p class="ticker-tit">Resultados</p>
      <div class="ticker-pista" data-resultados><p class="ticker-vacio">Cargando resultados…</p></div>
    </div>
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
    <div class="proximo" data-proximo hidden></div>
    <div class="equipos">
      ${equipos
        .map(
          (e) => `<a class="equipo" href="/partidos#${e.id}" data-equipo="${e.id}">
        <span class="equipo-nom">${e.nombre}</span>
        <span class="equipo-torneo">&nbsp;</span>
        <span class="equipo-pos"><strong>–</strong><small>posición</small></span>
        <span class="equipo-forma" aria-label="Últimos resultados"></span>
      </a>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="sec sec-azul">
  <div class="ancho historia-teaser">
    <div class="ht-foto">${img('/img/historia/damas-1956.jpg', 'Plantel de damas campeón de 1956 frente al chalet del club')}</div>
    <div class="ht-txt">
      <p class="kicker kicker-claro">Historia</p>
      <h2>Más de un siglo de hockey en Quilmes</h2>
      <p>En 1911 el club se afilió a la Asociación Argentina de Hockey sobre Césped. Desde entonces salieron de acá campeonatos, olímpicos, Leonas y Leones.</p>
      <dl class="ht-numeros">
        <div><dt>1911</dt><dd>Afiliación a la Asociación Argentina</dd></div>
        <div><dt>800</dt><dd>Jugadoras y jugadores</dd></div>
        <div><dt>3</dt><dd>Canchas sintéticas</dd></div>
        <div><dt>33</dt><dd>Títulos de primera</dd></div>
      </dl>
      <a class="ver-todo ver-todo-claro" href="/historia">Conocé la historia ${icono('flecha')}</a>
    </div>
  </div>
</section>

<section class="sec">
  <div class="ancho">
    ${titulo('Fotos', 'En cancha', `<div class="sec-links">${instagram ? `<a class="ver-todo" href="${instagram.url}" target="_blank" rel="noopener">${icono('instagram')} ${instagram.usuario}</a>` : ''}<a class="ver-todo" href="/fotos">Ver galería ${icono('flecha')}</a></div>`)}
    <div class="mosaico">
      ${fotosInicio.map(([s, a]) => `<a href="/fotos" class="mosaico-item">${img(s, a)}</a>`).join('')}
    </div>
  </div>
</section>

<section class="sponsors" id="sponsors">
  <div class="ancho sponsors-in">
    <p class="sponsors-tit">Sponsors</p>
    <ul class="sponsors-logos">
      ${sponsors.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener" title="${esc(s.nombre)} · ${esc(s.rubro)}">${img(s.logo, s.nombre)}</a></li>`).join('')}
    </ul>
    <a class="sponsors-cta" href="${mailSponsor}"><span>¿Querés ser nuestro sponsor?</span> Contactate con nosotros ${icono('flecha')}</a>
  </div>
</section>

<section class="federaciones">
  <div class="ancho fed-in">
    <p>Afiliados a</p>
    <ul>
      ${federaciones
        .map(
          (f) => `<li><a href="${f.url}" target="_blank" rel="noopener" title="${esc(f.nombre)}"><img src="${f.logo}" alt="${esc(f.sigla)}" loading="lazy" decoding="async"><span><strong>${f.sigla}</strong>${esc(f.nombre)}</span></a></li>`
        )
        .join('')}
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
    cuerpo: `${cabeceraPagina('Novedades', 'Lo último del hockey', 'Noticias, avisos y trámites de la subcomisión.', '/img/fotos/sexta-c-2022.jpg')}
<section class="sec sec-pegada">
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
    cuerpo: `${cabeceraPagina('Temporada 2026', 'Partidos y posiciones', 'Fixture, resultados y tablas de los torneos Metropolitanos de la Asociación de Hockey de Buenos Aires. Se actualiza solo varias veces por día.', '/img/fotos/septima-a-caballeros-2022.jpg')}
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
      <p>Consultas sobre inscripciones, aranceles o para sumarte como sponsor.</p>
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
    cuerpo: `${cabeceraPagina('Galería', 'Fotos', `${todas.length} fotos de la temporada, los campeones y el archivo del club.`, '/img/fotos/intermedia-c-2022.jpg')}
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
