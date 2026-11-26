// Genera el sitio estático en /dist a partir de /src y /content.
// Uso: node scripts/build.mjs   (sin dependencias)

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { sitio, contacto, redes, accesos, federaciones, sponsors } from '../content/sitio.mjs';
import { novedades } from '../content/novedades.mjs';
import { paginas } from './paginas.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(raiz, 'src');
const dist = join(raiz, 'dist');

// ---------- utilidades ----------
export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const tamanos = new Map();
// Lee ancho y alto de un JPEG para evitar saltos de diseño al cargar.
export function medida(ruta) {
  if (tamanos.has(ruta)) return tamanos.get(ruta);
  const archivo = join(src, ruta);
  let r = { w: 800, h: 600 };
  if (existsSync(archivo)) {
    const b = readFileSync(archivo);
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      const largo = b.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) {
        r = { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
        break;
      }
      i += 2 + largo;
    }
  }
  tamanos.set(ruta, r);
  return r;
}

export function img(ruta, alt, { clase = '', carga = 'lazy', sizes = '' } = {}) {
  const { w, h } = medida(ruta);
  return `<img src="${ruta}" alt="${esc(alt)}" width="${w}" height="${h}"${clase ? ` class="${clase}"` : ''} loading="${carga}" decoding="async"${sizes ? ` sizes="${sizes}"` : ''}>`;
}

const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
export function fechaNota(n) {
  if (!n.fecha) return n.etiqueta || '';
  const [a, m, d] = n.fecha.split('-').map(Number);
  return `${d} de ${meses[m - 1]} de ${a}`;
}

export const externo = (url) => /^https?:\/\//.test(url);
export const enlaceAttrs = (url) => (externo(url) ? ' target="_blank" rel="noopener"' : '');

// ---------- íconos ----------
export const icono = (id, clase = 'ico') => `<svg class="${clase}" aria-hidden="true"><use href="#i-${id}"/></svg>`;

const simbolos = `
<symbol id="i-flecha" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></symbol>
<symbol id="i-externo" viewBox="0 0 24 24"><path d="M8 6h10v10M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></symbol>
<symbol id="i-facebook" viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V22h3.4Z"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><path fill="currentColor" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></symbol>
<symbol id="i-youtube" viewBox="0 0 24 24"><path fill="currentColor" d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2C1.1 8.9 1.1 12 1.1 12s0 3.1.4 4.8a2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8ZM9.8 15.1V8.9l5.6 3.1-5.6 3.1Z"/></symbol>
<symbol id="i-instagram" viewBox="0 0 24 24"><path fill="currentColor" d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21.2 8c-.1-1.6-.4-3-1.6-4.1C18.5 2.8 17.1 2.4 15.5 2.3c-1.6-.1-6.4-.1-8 0C5.9 2.4 4.5 2.8 3.4 3.9S1.9 6.4 1.8 8c-.1 1.6-.1 6.4 0 8 .1 1.6.4 3 1.6 4.1s2.5 1.5 4.1 1.6c1.6.1 6.4.1 8 0 1.6-.1 3-.4 4.1-1.6 1.1-1.1 1.5-2.5 1.6-4.1.1-1.6.1-6.4 0-8Zm-2.1 9.7a3.2 3.2 0 0 1-1.8 1.8c-1.3.5-4.3.4-5.6.4s-4.4.1-5.6-.4a3.2 3.2 0 0 1-1.8-1.8c-.5-1.3-.4-4.3-.4-5.7s-.1-4.4.4-5.7A3.2 3.2 0 0 1 6.1 4.5c1.3-.5 4.3-.4 5.6-.4s4.4-.1 5.6.4a3.2 3.2 0 0 1 1.8 1.8c.5 1.3.4 4.3.4 5.7s.1 4.4-.4 5.7Z"/></symbol>
<symbol id="i-whatsapp" viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.2c-.2.2-.3.2-.6.1a7.4 7.4 0 0 1-3.7-3.2c-.3-.5.3-.5.8-1.6.1-.2 0-.3 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4l-.5-.3ZM12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2Zm0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.3 8.3 0 1 1 12 20.3Z"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><path d="M3 5h18v14H3zM3 6l9 7 9-7" fill="none" stroke="currentColor" stroke-width="1.8"/></symbol>
<symbol id="i-tel" viewBox="0 0 24 24"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="1.8"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></symbol>
<symbol id="i-link" viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" fill="none" stroke="currentColor" stroke-width="1.8"/></symbol>
`;
const escudoSimbolo = readFileSync(join(raiz, 'scripts', 'escudo-symbol.html'), 'utf8');
export const escudo = (clase = 'escudo') => `<svg class="${clase}" aria-hidden="true" viewBox="0 0 612 694"><use href="#escudo"/></svg>`;

// ---------- partes comunes ----------
const nav = [
  { url: '/novedades', texto: 'Novedades' },
  { url: '/partidos', texto: 'Partidos' },
  { url: '/club', texto: 'El club' },
  { url: '/historia', texto: 'Historia' },
  { url: '/fotos', texto: 'Fotos' },
  { url: '/club#contacto', texto: 'Contacto' },
];
const inscripcion = accesos.find((a) => a.destacado);
export const redesActivas = redes.filter((r) => r.url);

export function botonesRedes(clase = 'redes') {
  return `<ul class="${clase}">${redesActivas
    .map((r) => `<li><a href="${r.url}" target="_blank" rel="noopener" aria-label="${r.nombre}">${icono(r.id)}</a></li>`)
    .join('')}</ul>`;
}

function encabezado(actual) {
  return `
<a class="saltar" href="#contenido">Ir al contenido</a>
<div class="barra-sup">
  <div class="ancho barra-sup-in">
    <p>${icono('pin')} Sede de hockey · Av. Cevallos 348, Quilmes</p>
    <div class="barra-sup-der">
      <a href="http://quilmesaclub.org.ar/" target="_blank" rel="noopener">Quilmes Atlético Club ${icono('externo', 'ico ico-chico')}</a>
      ${botonesRedes('redes redes-mini')}
    </div>
  </div>
</div>
<header class="cabecera" data-cabecera>
  <div class="ancho cabecera-in">
    <a class="marca" href="/" aria-label="Quilmes Hockey, inicio">
      ${escudo()}
      <span class="marca-txt"><span>Quilmes</span><span>Hockey</span></span>
    </a>
    <nav class="menu" id="menu" aria-label="Principal">
      <ul>
        ${nav
          .map((n) => `<li><a href="${n.url}"${actual === n.url ? ' aria-current="page"' : ''}>${n.texto}</a></li>`)
          .join('')}
      </ul>
      <a class="btn btn-azul menu-cta" href="${inscripcion.url}" target="_blank" rel="noopener">Inscripción 2026</a>
      ${botonesRedes('redes menu-redes')}
    </nav>
    <button class="hamburguesa" type="button" aria-controls="menu" aria-expanded="false" data-menu>
      <span></span><span></span><span class="sr">Menú</span>
    </button>
  </div>
</header>`;
}

function pie() {
  const anio = new Date().getFullYear();
  return `
<footer class="pie">
  <div class="ancho">
    <div class="pie-grilla">
      <div class="pie-club">
        <a class="pie-marca" href="/">${escudo()}<span>Quilmes Atlético Club<strong>Hockey</strong></span></a>
        ${botonesRedes('redes redes-pie')}
      </div>
      <div>
        <h3>Sedes</h3>
        ${contacto.sedes
          .map((s) => `<p><a href="${s.mapa}" target="_blank" rel="noopener"><strong>${s.nombre}</strong> · ${s.direccion}</a></p>`)
          .join('')}
      </div>
      <div>
        <h3>Contacto</h3>
        ${contacto.emails.map((e) => `<p><a href="mailto:${e}">${e}</a></p>`).join('')}
        <p>${contacto.telefonos.map((t) => `<a href="tel:${t.tel}">${t.texto}</a>`).join(' · ')}</p>
      </div>
      <div>
        <h3>Trámites</h3>
        <ul class="pie-tramites">
          ${accesos.map((a) => `<li><a href="${a.url}"${enlaceAttrs(a.url)}>${esc(a.titulo)}</a></li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="pie-legal">
      <p>© ${anio} Subcomisión de Hockey · Quilmes Atlético Club</p>
      <a href="https://keep-ds.com" target="_blank" rel="noopener">Powered by <b>Keep</b></a>
    </div>
  </div>
</footer>`;
}

const jsonLdOrg = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  '@id': `${sitio.url}/#organizacion`,
  name: 'Quilmes Atlético Club · Hockey',
  alternateName: ['Quilmes Hockey', 'QAC Hockey', 'Hockey Quilmes A.C.'],
  sport: 'Field hockey',
  url: sitio.url + '/',
  logo: `${sitio.url}/icono-512.png`,
  image: `${sitio.url}/og.jpg`,
  foundingDate: '1911',
  email: contacto.emails[0],
  telephone: contacto.telefonos[0].tel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Cevallos 348',
    addressLocality: 'Quilmes',
    addressRegion: 'Buenos Aires',
    addressCountry: 'AR',
  },
  parentOrganization: { '@type': 'SportsOrganization', name: 'Quilmes Atlético Club', url: 'http://quilmesaclub.org.ar/' },
  memberOf: { '@type': 'SportsOrganization', name: 'Asociación de Hockey de Buenos Aires', url: 'https://buenosaireshockey.ar/' },
  sameAs: redesActivas.map((r) => r.url),
};

function documento(p) {
  const url = sitio.url + (p.ruta === '/' ? '/' : p.ruta);
  const titulo = p.ruta === '/' ? `${sitio.nombreLargo} | Hockey cervecero desde 1911` : `${p.titulo} | ${sitio.nombre}`;
  const imagen = sitio.url + (p.imagen || '/og.jpg');
  const ld = [jsonLdOrg, ...(p.jsonLd || [])];
  if (p.migas) {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ nombre: 'Inicio', url: '/' }, ...p.migas].map((m, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: m.nombre,
        item: sitio.url + m.url,
      })),
    });
  }
  return `<!doctype html>
<html lang="es-AR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(p.descripcion)}">
<link rel="canonical" href="${url}">
${p.noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#232f5f">
<meta property="og:type" content="${p.tipo || 'website'}">
<meta property="og:site_name" content="${esc(sitio.nombreLargo)}">
<meta property="og:locale" content="es_AR">
<meta property="og:title" content="${esc(p.tituloSocial || p.titulo || titulo)}">
<meta property="og:description" content="${esc(p.descripcion)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${imagen}">
${p.imagen ? '' : '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">'}
<meta property="og:image:alt" content="${esc(p.imagenAlt || 'Escudo del Quilmes Atlético Club · Hockey')}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@HockeyQuilmesAC">
<meta name="twitter:title" content="${esc(p.tituloSocial || p.titulo || titulo)}">
<meta name="twitter:description" content="${esc(p.descripcion)}">
<meta name="twitter:image" content="${imagen}">
<link rel="icon" href="/escudo.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preload" href="/fonts/archivo-variable.woff2" as="font" type="font/woff2" crossorigin>
${p.precargar ? `<link rel="preload" href="${p.precargar}" as="image" fetchpriority="high">` : ''}
<link rel="preconnect" href="https://quilmes-sigma.vercel.app" crossorigin>
<link rel="stylesheet" href="/css/estilos.css?v=${version}">
<script type="application/ld+json">${JSON.stringify(ld.length === 1 ? ld[0] : ld)}</script>
</head>
<body class="${p.claseBody || ''}">
<svg width="0" height="0" style="position:absolute" aria-hidden="true">${escudoSimbolo}${simbolos}</svg>
${encabezado(p.nav)}
<main id="contenido">
${p.cuerpo}
</main>
${pie()}
${contacto.whatsapp ? `<a class="wa-flotante" href="https://wa.me/${contacto.whatsapp.numero}?text=${encodeURIComponent(contacto.whatsapp.mensaje)}" target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp">${icono('whatsapp')}</a>` : ''}
<script>window.DATOS_PARTIDOS=${JSON.stringify(sitio.datosPartidos)};</script>
<script src="/js/sitio.js?v=${version}" defer></script>
</body>
</html>
`;
}

// ---------- armado ----------
const version = Date.now().toString(36);

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(src, dist, { recursive: true });

const lista = paginas({ sitio, contacto, redes, accesos, federaciones, sponsors, novedades });
const urls = [];
for (const p of lista) {
  const destino = p.archivo || (p.ruta === '/' ? 'index.html' : `${p.ruta.slice(1)}.html`);
  const archivo = join(dist, destino);
  mkdirSync(dirname(archivo), { recursive: true });
  writeFileSync(archivo, documento(p));
  if (!p.noindex) urls.push({ url: sitio.url + p.ruta, prioridad: p.prioridad ?? 0.7, mod: p.modificado });
}

const hoy = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.url}</loc><lastmod>${u.mod || hoy}</lastmod><priority>${u.prioridad}</priority></url>`).join('\n')}
</urlset>
`
);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${sitio.url}/sitemap.xml\n`);

console.log(`Listo: ${lista.length} páginas en dist/`);
