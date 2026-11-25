# Quilmes Hockey

Sitio del hockey del Quilmes Atlético Club. Es estático y no tiene dependencias: un script de Node arma todas las páginas en `dist/`.

```
node scripts/build.mjs        # genera dist/
npm run dev                   # genera y sirve en http://localhost:4321
```

## Dónde se edita cada cosa

| Qué | Archivo |
| --- | --- |
| Links, trámites del pie, redes, contacto, sedes, sponsors, federaciones, comisión, aranceles | `content/sitio.mjs` |
| Novedades (la primera de la lista es la destacada) | `content/novedades.mjs` |
| Línea de tiempo, olímpicos y seleccionados | `content/historia.mjs` |
| Galería de fotos | `content/fotos.mjs` (fotos en `src/img/`) |
| Textos y estructura de cada página | `scripts/paginas.mjs` |
| Estilos | `src/css/estilos.css` |
| Partidos en vivo, menú, galería | `src/js/sitio.js` |

Cada novedad genera su propia página en `/novedades/<slug>`, con miniatura para redes y datos para Google.

## Partidos

Fixture, resultados y posiciones se cargan en el navegador desde el JSON que genera el sitio Agenda del Cervecero, que los saca de la AHBA (`sitio.datosPartidos` en `content/sitio.mjs`). No hace falta cargarlos a mano.

## Publicación (Vercel)

`vercel.json` ya define el build (`node scripts/build.mjs`), la carpeta `dist` y las URLs sin `.html`. También redirige las direcciones del sitio anterior (`/historia.html`, `/institucional.html`, los PDF, etc.) para no perder posicionamiento en Google.

El dominio que se usa en canonical, sitemap y miniaturas está en `sitio.url` (`content/sitio.mjs`).

## Publicación (Hostinger)

1. Correr `node scripts/build.mjs`.
2. Subir **el contenido** de `dist/` (no la carpeta) a `public_html`, incluido el archivo oculto `.htaccess`.

El `.htaccess` hace lo mismo que `vercel.json`: direcciones sin `.html`, redirecciones del sitio anterior, HTTPS con `www`, página 404 y caché de imágenes.
