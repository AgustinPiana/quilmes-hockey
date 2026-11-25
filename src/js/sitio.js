(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // ---------- Menú móvil ----------
  const boton = $('[data-menu]');
  const menu = $('#menu');
  if (boton && menu) {
    const cerrar = () => {
      boton.setAttribute('aria-expanded', 'false');
      menu.classList.remove('abierto');
      document.body.classList.remove('menu-abierto');
    };
    boton.addEventListener('click', () => {
      const abrir = boton.getAttribute('aria-expanded') !== 'true';
      boton.setAttribute('aria-expanded', String(abrir));
      menu.classList.toggle('abierto', abrir);
      document.body.classList.toggle('menu-abierto', abrir);
    });
    $$('a', menu).forEach((a) => a.addEventListener('click', cerrar));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && cerrar());
    matchMedia('(min-width: 981px)').addEventListener('change', cerrar);
  }

  // ---------- Sombra de la cabecera ----------
  const cab = $('[data-cabecera]');
  if (cab) {
    const sombra = () => cab.classList.toggle('con-sombra', scrollY > 40);
    addEventListener('scroll', sombra, { passive: true });
    sombra();
  }

  // ---------- Pestañas (partidos y aranceles) ----------
  function activarPestanas(lista, alCambiar) {
    const tabs = $$('[role="tab"]', lista);
    const elegir = (tab, foco) => {
      tabs.forEach((t) => {
        const sel = t === tab;
        t.setAttribute('aria-selected', String(sel));
        t.tabIndex = sel ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !sel;
      });
      if (foco) tab.focus();
      alCambiar && alCambiar(tab);
    };
    tabs.forEach((t, i) => {
      t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1;
      t.addEventListener('click', () => elegir(t));
      t.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) elegir(tabs[(i + d + tabs.length) % tabs.length], true);
      });
    });
    return (id) => {
      const t = tabs.find((x) => x.getAttribute('aria-controls') === id);
      if (t) elegir(t);
    };
  }
  const pestanasPartidos = $$('.pestanas').map((l) =>
    activarPestanas(l, (tab) => {
      if (l.closest('.sec') && tab.dataset.tab.startsWith('hockey')) history.replaceState(null, '', '#' + tab.dataset.tab);
    })
  );
  if (location.hash.startsWith('#hockey') && pestanasPartidos[0]) pestanasPartidos[0](location.hash.slice(1));

  // ---------- Partidos en vivo (AHBA) ----------
  const necesitaDatos = $('[data-proximo], [data-resultados], [data-equipos], [data-panel]');
  const nombres = {
    'hockey-damas': 'Damas A',
    'hockey-caballeros': 'Caballeros A',
    'hockey-damas-b': 'Damas B',
    'hockey-caballeros-b': 'Caballeros B',
  };
  const orden = Object.keys(nombres);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const titulo = (s) => esc(String(s).toLowerCase().replace(/(^|[\s.(])([a-záéíóúñ])/g, (m, a, b) => a + b.toUpperCase()));
  const fmtDia = new Intl.DateTimeFormat('es-AR', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'America/Argentina/Buenos_Aires' });
  const fmtDiaLargo = new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'America/Argentina/Buenos_Aires' });
  const fmtHora = new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: 'America/Argentina/Buenos_Aires' });

  const resultado = (p) => {
    if (!p.jugado) return null;
    const nuestro = p.esLocal ? p.gl : p.gv;
    const rival = p.esLocal ? p.gv : p.gl;
    return nuestro > rival ? 'g' : nuestro < rival ? 'p' : 'e';
  };
  const escudoImg = (url) => (url ? `<img src="${esc(url)}" alt="" loading="lazy" width="54" height="54">` : '');
  const esQac = (n) => /quilmes/i.test(n);

  function filaPartido(p) {
    const r = resultado(p);
    const f = new Date(p.fecha);
    const marcador = p.jugado ? `${p.gl} – ${p.gv}` : fmtHora.format(f);
    return `<div class="partido">
      <div class="partido-fecha"><strong>${fmtDia.format(f)}</strong>${esc(p.ronda || '')}</div>
      <div class="partido-eq local${esQac(p.local) ? ' es-qac' : ''}"><span>${titulo(p.local)}</span>${escudoImg(p.escudoLocal)}</div>
      <div class="partido-res ${r ? 'r-' + r : 'r-prog'}">${marcador}</div>
      <div class="partido-eq${esQac(p.visitante) ? ' es-qac' : ''}">${escudoImg(p.escudoVisitante)}<span>${titulo(p.visitante)}</span></div>
    </div>`;
  }

  function panelEquipo(s) {
    const jugados = s.partidos.filter((p) => p.jugado).sort((a, b) => b.fecha.localeCompare(a.fecha));
    const proximos = s.partidos.filter((p) => !p.jugado).sort((a, b) => a.fecha.localeCompare(b.fecha));
    const q = (s.tabla?.filas || []).find((f) => f.esQuilmes);
    const cols = s.tabla?.columnas || [];
    const etiquetas = { pts: 'Pts', pj: 'PJ', pg: 'G', pe: 'E', pp: 'P', gf: 'GF', gc: 'GC', dif: 'Dif' };
    const lista = (arr, n) =>
      arr.length
        ? `<div class="partidos-lista">${arr.slice(0, n).map(filaPartido).join('')}</div>${arr.length > n ? `<button type="button" class="ver-mas-partidos" data-ver-mas>Ver los ${arr.length} partidos</button><div class="partidos-lista" hidden>${arr.slice(n).map(filaPartido).join('')}</div>` : ''}`
        : '<p class="cargando">No hay partidos para mostrar.</p>';
    return `
      <div class="pe-cab">
        <div>
          <p class="kicker">${esc(s.competencia)}</p>
          <h2>${esc(nombres[s.id])}</h2>
          ${s.descripcion ? `<p>${esc(s.descripcion)}</p>` : ''}
        </div>
        ${q ? `<div class="pe-pos"><div><strong>${q.pos}°</strong><span>Posición</span></div><div><strong>${q.pts}</strong><span>Puntos</span></div><div><strong>${q.pj}</strong><span>Jugados</span></div></div>` : ''}
      </div>
      <div class="pe-grilla">
        <div>
          ${proximos.length ? `<h3>Próximos partidos</h3>${lista(proximos, 4)}<div style="height:32px"></div>` : ''}
          <h3>Resultados</h3>
          ${lista(jugados, 8)}
        </div>
        <div>
          <h3>Posiciones · ${esc(s.competencia)}</h3>
          <div class="tabla-scroll"><table class="tabla">
            <thead><tr><th class="t-pos" scope="col">#</th><th class="t-eq" scope="col">Equipo</th>${cols.map((c) => `<th scope="col">${etiquetas[c] || c}</th>`).join('')}</tr></thead>
            <tbody>${(s.tabla?.filas || [])
              .map(
                (f) =>
                  `<tr${f.esQuilmes ? ' class="es-qac"' : ''}><td class="t-pos">${f.pos}</td><td class="t-eq">${titulo(f.equipo)}</td>${cols
                    .map((c) => `<td${c === 'pts' ? ' class="t-pts"' : ''}>${c === 'dif' && f[c] > 0 ? '+' : ''}${f[c]}</td>`)
                    .join('')}</tr>`
              )
              .join('')}</tbody>
          </table></div>
        </div>
      </div>`;
  }

  function pintar(datos) {
    const secciones = (datos.secciones || []).filter((s) => nombres[s.id]).sort((a, b) => orden.indexOf(a.id) - orden.indexOf(b.id));
    const ahora = Date.now();

    // Próximo partido (portada)
    const prox = $('[data-proximo]');
    if (prox) {
      const todos = secciones
        .flatMap((s) => s.partidos.filter((p) => !p.jugado && new Date(p.fecha).getTime() > ahora - 3 * 3600e3).map((p) => ({ ...p, equipo: s.id })))
        .sort((a, b) => a.fecha.localeCompare(b.fecha));
      const p = todos[0];
      if (p) {
        const f = new Date(p.fecha);
        prox.innerHTML = `<p class="kicker">Próximo partido</p>
          <p class="hp-equipo">${esc(nombres[p.equipo])} · ${esc(p.ronda || '')}</p>
          <div class="hp-cruce">
            <div class="hp-club">${escudoImg(p.escudoLocal)}<span>${titulo(p.local)}</span></div>
            <span class="hp-vs">vs</span>
            <div class="hp-club">${escudoImg(p.escudoVisitante)}<span>${titulo(p.visitante)}</span></div>
          </div>
          <p class="hp-fecha"><strong>${fmtDiaLargo.format(f)}</strong><span>${fmtHora.format(f)} h · ${p.esLocal ? 'Local' : 'Visitante'}</span></p>
          <a class="hp-mas" href="/partidos#${p.equipo}">Fixture completo</a>`;
      } else {
        prox.innerHTML = `<p class="kicker">Temporada 2026</p><p class="hp-vacio">No hay partidos programados por ahora. Mirá cómo terminaron los torneos.</p><a class="hp-mas" href="/partidos">Ver posiciones</a>`;
      }
    }

    // Últimos resultados (banda)
    const res = $('[data-resultados] .res-lista');
    if (res) {
      const items = secciones
        .map((s) => {
          const p = s.partidos.filter((x) => x.jugado).sort((a, b) => b.fecha.localeCompare(a.fecha))[0];
          if (!p) return '';
          const r = resultado(p);
          const rival = p.esLocal ? p.visitante : p.local;
          const nuestro = p.esLocal ? p.gl : p.gv;
          const suyo = p.esLocal ? p.gv : p.gl;
          return `<a class="res-item res-${r}" href="/partidos#${s.id}" style="text-decoration:none">
            <small>${esc(nombres[s.id])} · ${fmtDia.format(new Date(p.fecha))}</small>
            <p>Quilmes <b>${nuestro}–${suyo}</b> <span>${titulo(rival)}</span></p>
          </a>`;
        })
        .join('');
      res.innerHTML = items || '<p class="res-vacio">Sin resultados por ahora.</p>';
    }

    // Tarjetas de equipos (portada)
    $$('[data-equipo]').forEach((el) => {
      const s = secciones.find((x) => x.id === el.dataset.equipo);
      if (!s) return;
      const q = (s.tabla?.filas || []).find((f) => f.esQuilmes);
      $('.equipo-torneo', el).textContent = s.competencia;
      if (q) $('.equipo-pos strong', el).textContent = q.pos + '°';
      const ult = s.partidos.filter((p) => p.jugado).sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 5).reverse();
      $('.equipo-forma', el).innerHTML = ult.map((p) => {
        const r = resultado(p);
        return `<span class="forma forma-${r}" title="${esc(p.local)} ${p.gl}–${p.gv} ${esc(p.visitante)}">${r.toUpperCase()}</span>`;
      }).join('');
    });

    // Página de partidos
    $$('[data-panel]').forEach((el) => {
      const s = secciones.find((x) => x.id === el.dataset.panel);
      el.innerHTML = s ? panelEquipo(s) : '<p class="cargando">No hay datos para este equipo.</p>';
    });
    const act = $('[data-actualizado]');
    if (act && datos.generado) {
      const g = new Date(datos.generado);
      act.textContent = `Última actualización: ${fmtDiaLargo.format(g)}, ${fmtHora.format(g)} h.`;
    }
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-ver-mas]');
    if (!b) return;
    b.nextElementSibling.hidden = false;
    b.remove();
  });

  function falla() {
    const prox = $('[data-proximo]');
    if (prox) prox.innerHTML = `<p class="kicker">Fixture</p><p class="hp-vacio">No pudimos cargar los partidos. Consultalos en Buenos Aires Hockey.</p><a class="hp-mas" href="https://buenosaireshockey.ar/" target="_blank" rel="noopener">Ir a la AHBA</a>`;
    const res = $('[data-resultados] .res-lista');
    if (res) res.innerHTML = '<p class="res-vacio">Resultados no disponibles por el momento.</p>';
    $$('[data-panel]').forEach((el) => (el.innerHTML = '<p class="cargando">No pudimos cargar los partidos. Probá de nuevo en unos minutos o consultá <a href="https://buenosaireshockey.ar/" target="_blank" rel="noopener">buenosaireshockey.ar</a>.</p>'));
  }

  if (necesitaDatos && window.DATOS_PARTIDOS) {
    fetch(window.DATOS_PARTIDOS, { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(pintar)
      .catch(falla);
  }

  // ---------- Galería ----------
  const galeria = $('[data-galeria]');
  if (galeria) {
    const items = $$('li', galeria);
    const filtros = $$('[data-filtro]');
    const filtrar = (id) => {
      filtros.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtro === id)));
      items.forEach((li) => (li.hidden = id !== 'todas' && li.dataset.album !== id));
    };
    filtros.forEach((b) =>
      b.addEventListener('click', () => {
        filtrar(b.dataset.filtro);
        history.replaceState(null, '', b.dataset.filtro === 'todas' ? location.pathname : '#' + b.dataset.filtro);
      })
    );
    const hash = location.hash.slice(1);
    if (filtros.some((b) => b.dataset.filtro === hash)) filtrar(hash);

    const visor = $('[data-visor]');
    const vImg = $('img', visor);
    const vTxt = $('figcaption', visor);
    let actual = 0;
    const visibles = () => items.filter((li) => !li.hidden).map((li) => $('a', li));
    const mostrar = (a) => {
      vImg.src = a.getAttribute('href');
      vImg.alt = a.dataset.texto;
      vTxt.textContent = a.dataset.texto;
    };
    galeria.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-foto]');
      if (!a || !visor.showModal) return;
      e.preventDefault();
      const lista = visibles();
      actual = lista.indexOf(a);
      mostrar(a);
      visor.showModal();
    });
    const mover = (d) => {
      const lista = visibles();
      actual = (actual + d + lista.length) % lista.length;
      mostrar(lista[actual]);
    };
    $('[data-ant]', visor).addEventListener('click', () => mover(-1));
    $('[data-sig]', visor).addEventListener('click', () => mover(1));
    $('[data-cerrar]', visor).addEventListener('click', () => visor.close());
    visor.addEventListener('click', (e) => e.target === visor && visor.close());
    visor.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') mover(1);
      if (e.key === 'ArrowLeft') mover(-1);
    });
    let x0 = null;
    visor.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true });
    visor.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
      x0 = null;
    });
  }

  // ---------- Copiar enlace ----------
  $$('[data-copiar]').forEach((b) =>
    b.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(b.dataset.copiar);
        const t = $('.copiado', b);
        t.hidden = false;
        setTimeout(() => (t.hidden = true), 1600);
      } catch {}
    })
  );

  // ---------- Formulario de sponsors (abre el correo) ----------
  const form = $('[data-form-sponsor]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      const asunto = `Quiero ser sponsor del hockey - ${d.empresa}`;
      const cuerpo = [
        `Nombre: ${d.nombre}`,
        `Empresa: ${d.empresa}`,
        `Email: ${d.email}`,
        d.telefono ? `Teléfono: ${d.telefono}` : '',
        '',
        d.mensaje || '',
      ].filter((l, i) => l || i === 4).join('\n');
      location.href = `mailto:${form.dataset.destino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    });
  }

  // ---------- Aparición al hacer scroll ----------
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (ent) => ent.forEach((x) => x.isIntersecting && (x.target.classList.add('visible'), obs.unobserve(x.target))),
      { rootMargin: '0px 0px -8% 0px' }
    );
    $$('.sec-titulo, .nota, .equipo, .figura, .hito, .sede, .acceso, .mosaico-item').forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight) {
        el.classList.add('aparece');
        obs.observe(el);
      }
    });
  }
})();
