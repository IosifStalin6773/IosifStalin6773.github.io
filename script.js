/* ============================================================
   SUPER PORTFOLIO BROS — OSCAR DE LA CRUZ DIEZ
   ============================================================ */

const DATOS = {
  nombre: 'OSCAR DE LA CRUZ',
  rol: 'DEV · SMR · CIBERSEGURIDAD',
  copyright: '© 2025 OSCAR DE LA CRUZ DIEZ',

  niveles: [
    /* ---------- 1-1 SOBRE MÍ ---------- */
    {
      codigo: '1-1',
      nombre: 'SOBRE MÍ',
      tipo: 'texto',
      lineas: [
        '> CARGANDO PERFIL DEL JUGADOR...',
        '',
        '¡Hola! Soy Oscar de la Cruz Diez, programador autodidacta con más de 8 años de experiencia creando scripts y soluciones para servidores de juegos y proyectos particulares.',
        '',
        'Actualmente soy estudiante de SMR (Sistemas Microinformáticos y Redes) de 2º año, con el objetivo de cursar un Grado Superior en ASIR y especializarme en Seguridad Informática.',
        '',
        'Manejo Java, Lua, SQF, HTML, CSS, JavaScript y Python (básico). Tengo más de 30 repositorios en GitHub y certificaciones Cisco Netacad.',
        '',
        'Me apasiona resolver problemas, aprender constantemente y buscar conocimiento hasta debajo de las piedras. Inglés medio (B1) y actualmente aprendiendo ruso.',
        '',
        'Vivo en Santander, España. Disponibilidad para teletrabajo.',
        '',
        'OBJETIVO ACTUAL: encontrar un hueco en la industria tecnológica y escalar en ella.'
      ]
    },

    /* ---------- 1-2 HABILIDADES ---------- */
    {
      codigo: '1-2',
      nombre: 'HABILIDADES',
      tipo: 'stats',
      stats: [
        { nombre: 'LUA (AVANZADO)',        valor: 92 },
        { nombre: 'SQF (AVANZADO)',        valor: 90 },
        { nombre: 'JAVA (INTERMEDIO)',     valor: 72 },
        { nombre: 'HTML (INTERMEDIO)',     valor: 75 },
        { nombre: 'CSS (INTERMEDIO)',      valor: 75 },
        { nombre: 'JAVASCRIPT (INTERM.)',  valor: 72 },
        { nombre: 'PYTHON (BÁSICO)',       valor: 45 },
        { nombre: 'GIT / GITHUB',          valor: 70 },
        { nombre: 'GIMP (MEDIO-ALTO)',     valor: 82 },
        { nombre: 'OFFICE (AVANZADO)',     valor: 88 },
        { nombre: 'GNS3 (BÁSICO)',         valor: 40 },
        { nombre: 'DOCKER (BÁSICO/MEDIO)', valor: 55 },
        { nombre: 'CAFÉ → CÓDIGO',         valor: 99 }
      ]
    },

    /* ---------- 1-3 EXPERIENCIA ---------- */
    {
      codigo: '1-3',
      nombre: 'EXPERIENCIA',
      tipo: 'timeline',
      items: [
        {
          fecha: '2015 / 2016 — ACTUALIDAD',
          titulo: 'PROGRAMADOR FREELANCE',
          org: 'Particular · Telemático · Santander, España',
          logros: [
            'Desarrollo y actualización constante de servidores con contenido nuevo y scripts personalizados.',
            'Creación de scripts en Lua y SQF para servidores de juegos.',
            'Mantenimiento de servidores web y gestión de tickets.',
            'Resolución de problemas técnicos y adaptación a las necesidades del cliente.',
            'Más de 30 repositorios en GitHub con proyectos creados y guardados.',
            '+8 años de experiencia programando de forma autodidacta.'
          ]
        },
        {
          fecha: '2020 — 2022',
          titulo: 'DESARROLLADOR JUNIOR',
          org: 'Particular · Backend · Telemático',
          logros: [
            'Desarrollo backend para servidores de juegos.',
            'Encargado de actualizar scripts existentes.',
            'Gestión y resolución de tickets de soporte.',
            'Mantenimiento de servidores web.'
          ]
        }
      ]
    },

    /* ---------- 2-1 PROYECTOS ---------- */
    {
      codigo: '2-1',
      nombre: 'PROYECTOS',
      tipo: 'proyectos',
      items: [
        {
          nombre: '+30 REPOSITORIOS EN GITHUB',
          desc: 'Colección de más de 30 proyectos creados y guardados: scripts, servidores de juegos, desarrollo web y experimentos personales.',
          tech: ['Java', 'Lua', 'SQF', 'HTML', 'CSS', 'JavaScript', 'Python', 'Git'],
          url: 'https://github.com/IosifStalin6773'
        },
        {
          nombre: 'SERVIDORES DE JUEGOS',
          desc: 'Actualización constante de servidores con contenido nuevo y scripts personalizados. Mantenimiento continuo para que permanezcan activos y actualizados.',
          tech: ['Lua', 'SQF', 'HTML', 'CSS', 'JavaScript'],
          url: '#'
        },
        {
          nombre: 'GESTIÓN DE TICKETS',
          desc: 'Gestión y resolución de tickets de soporte para servidores y proyectos propios. Atención al cliente y resolución de incidencias técnicas.',
          tech: ['Soporte', 'Backend', 'Servidores web'],
          url: '#'
        },
        {
          nombre: 'MANTENIMIENTO DE SERVIDORES WEB',
          desc: 'Administración y mantenimiento continuo de servidores web: actualizaciones, backups y resolución de incidencias.',
          tech: ['HTML', 'CSS', 'JavaScript', 'FileZilla', 'Termix'],
          url: '#'
        }
      ]
    },

    /* ---------- 2-2 EDUCACIÓN ---------- */
    {
      codigo: '2-2',
      nombre: 'EDUCACIÓN',
      tipo: 'timeline',
      items: [
        {
          fecha: 'EN CURSO',
          titulo: 'SMR · Sistemas Microinformáticos y Redes (2º año)',
          org: 'IDEA · Santander, España',
          logros: [
            'Formación en sistemas, redes e informática.',
            'Objetivo: Grado Superior en ASIR + Especialización en Seguridad Informática.'
          ]
        },
        {
          fecha: 'FINALIZADO',
          titulo: 'ESO · Educación Secundaria Obligatoria',
          org: 'España',
          logros: [
            'Residencia en Alemania de los 11-12 a los 15-16 años (intercambio cultural y lingüístico).'
          ]
        }
      ]
    },

    /* ---------- 2-3 CERTIFICACIONES (BADGES) ---------- */
    {
      codigo: '2-3',
      nombre: 'CERTIFICACIONES',
      tipo: 'badges',
      items: [
        {
          id: 'linux-essentials',
          nombre: 'LINUX ESSENTIALS',
          emisor: 'CISCO',
          fecha: '15 ABR 2026',
          badge: 'badges/linux-essentials.png',
          verificacion: 'https://www.credly.com/users/oscar-de-la-cruz-diez',
          resumen: 'Certificación oficial de Cisco Networking Academy que cubre los fundamentos del sistema operativo Linux: línea de comandos, estructura del sistema de archivos, gestión de usuarios y permisos, procesos, scripting básico en shell y administración esencial del sistema. Base imprescindible para cualquier perfil orientado a sistemas, redes o ciberseguridad.'
        },
        {
          id: 'python-essentials-2',
          nombre: 'PYTHON ESSENTIALS 2',
          emisor: 'CISCO',
          fecha: '15 ABR 2026',
          badge: 'badges/python-essentials-2.png',
          verificacion: 'https://www.credly.com/users/oscar-de-la-cruz-diez',
          resumen: 'Segunda parte del itinerario de Python de Cisco. Cubre programación orientada a objetos, módulos y paquetes, manejo de excepciones, lectura y escritura de ficheros, expresiones regulares, generadores, decoradores y trabajo con librerías estándar. Nivel intermedio de Python aplicable a scripting, automatización y desarrollo backend.'
        },
        {
          id: 'python-essentials-1',
          nombre: 'PYTHON ESSENTIALS 1',
          emisor: 'CISCO',
          fecha: '13 ABR 2026',
          badge: 'badges/python-essentials-1.png',
          verificacion: 'https://www.credly.com/users/oscar-de-la-cruz-diez',
          resumen: 'Introducción al lenguaje Python: sintaxis, variables, tipos de datos, operadores, estructuras de control, funciones, listas, tuplas, diccionarios y manejo básico de errores. Certificación que acredita las bases sólidas del lenguaje más demandado para automatización, scripting y ciencia de datos.'
        },
        {
          id: 'intro-cybersecurity',
          nombre: 'INTRO TO CYBERSECURITY',
          emisor: 'CISCO',
          fecha: '12 ABR 2026',
          badge: 'badges/intro-cybersecurity.png',
          verificacion: 'https://www.credly.com/users/oscar-de-la-cruz-diez',
          resumen: 'Introducción a la ciberseguridad: panorama actual de amenazas, tipos de malware, ingeniería social, vulnerabilidades comunes, criptografía básica, seguridad en redes, protección de datos y buenas prácticas. Primer paso hacia la especialización en Seguridad Informática que el perfil tiene como objetivo.'
        },
        {
          id: 'networking-basics',
          nombre: 'NETWORKING BASICS',
          emisor: 'CISCO',
          fecha: '12 ABR 2026',
          badge: 'badges/networking-basics.png',
          verificacion: 'https://www.credly.com/users/oscar-de-la-cruz-diez',
          resumen: 'Fundamentos de redes: modelo OSI y TCP/IP, direccionamiento IPv4/IPv6, protocolos (HTTP, DNS, DHCP, etc.), dispositivos de red (switches, routers), cableado, topologías y troubleshooting básico. Base técnica para el Grado Superior en ASIR y la especialización en ciberseguridad.'
        }
      ]
    },

    /* ---------- 3-1 CONTACTO ---------- */
    {
      codigo: '3-1',
      nombre: 'CONTACTO',
      tipo: 'contacto',
      items: [
        { label: 'EMAIL: oscarcrudi@gmail.com',           href: 'mailto:oscarcrudi@gmail.com' },
        { label: 'TELÉFONO: 652 630 745',                  href: 'tel:+34652630745' },
        { label: 'GITHUB: /IosifStalin6773',               href: 'https://github.com/IosifStalin6773' },
        { label: 'LINKEDIN: /in/oscar-de-la-cruz',         href: 'https://www.linkedin.com/in/oscar-de-la-cruz-5402b7406' },
        { label: 'CREDLY: /users/oscar-de-la-cruz-diez',   href: 'https://www.credly.com/users/oscar-de-la-cruz-diez' },
        { label: 'UBICACIÓN: Santander, España',           href: 'https://maps.google.com/?q=Santander,España' }
      ]
    }
  ]
};

/* ============================================================
   MOTOR DEL JUEGO
   ============================================================ */
const $ = (s) => document.querySelector(s);
let currentScreen = 'boot';
let menuIndex = 0;
let bootTimer = null;
let coins = 0;
let visited = new Set();

/* ---------------- AUDIO 8-BIT ---------------- */
let audioCtx = null;
let muted = false;

function ensureAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}

function tone(freq, dur = 0.08, type = 'square', vol = 0.05) {
  if (!audioCtx || muted) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(vol, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
  o.connect(g);
  g.connect(audioCtx.destination);
  o.start();
  o.stop(audioCtx.currentTime + dur);
}

function sweep(f1, f2, dur = 0.18, vol = 0.05) {
  if (!audioCtx || muted) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = 'square';
  o.frequency.setValueAtTime(f1, audioCtx.currentTime);
  o.frequency.exponentialRampToValueAtTime(f2, audioCtx.currentTime + dur);
  g.gain.setValueAtTime(vol, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
  o.connect(g);
  g.connect(audioCtx.destination);
  o.start();
  o.stop(audioCtx.currentTime + dur);
}

const sfx = {
  coin: () => {
    tone(988, 0.08, 'square', 0.06);
    setTimeout(() => tone(1319, 0.28, 'square', 0.06), 80);
  },
  jump: () => sweep(240, 900, 0.16, 0.05),
  bump: () => {
    tone(180, 0.04, 'square', 0.06);
    setTimeout(() => tone(120, 0.06, 'square', 0.05), 40);
  },
  powerup: () =>
    [523, 659, 784, 1047, 1319].forEach((f, i) =>
      setTimeout(() => tone(f, 0.07, 'square', 0.05), i * 55)
    ),
  oneup: () =>
    [659, 784, 1319, 1047, 1175, 1568].forEach((f, i) =>
      setTimeout(() => tone(f, 0.08, 'square', 0.05), i * 70)
    ),
  move: () => tone(660, 0.035, 'square', 0.035),
  back: () => sweep(500, 240, 0.12, 0.045),
  tick: () => tone(1100 + Math.random() * 300, 0.018, 'square', 0.02),
  start: () =>
    [523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => tone(f, 0.1, 'square', 0.055), i * 90)
    )
};

/* ---------------- NAVEGACIÓN ---------------- */
function show(name) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  const el = document.getElementById('screen-' + name);
  if (el) el.classList.add('active');
  document.body.dataset.screen = name;
  currentScreen = name;
}

/* ---------------- BOOT ---------------- */
const BOOT_LINES = [
  'RETRO-OS v1.87   (C) 1987 NINTENDO',
  '',
  '> INICIANDO SISTEMA ......... OK',
  '> MEMORIA DISPONIBLE ....... 640 KB',
  '> CARGANDO GRAFICOS ........ OK',
  '> MONTANDO CURRICULUM.DAT .. OK',
  '> CARGANDO PERFIL: OSCAR ... OK',
  '> COMPILANDO EXPERIENCIA ... OK',
  '> GENERANDO PIXELES ........ OK',
  '> CARGANDO BADGES CISCO .... OK',
  '> CARGANDO MUNDOS 1-1..3-1 . OK',
  '',
  'TODO LISTO.',
  '',
  '>> PULSA CUALQUIER TECLA <<'
];

function runBoot() {
  const log = $('#boot-log');
  log.innerHTML = '';
  let i = 0;
  const step = () => {
    if (i >= BOOT_LINES.length) return;
    const div = document.createElement('div');
    div.className = 'boot-line';
    div.textContent = BOOT_LINES[i];
    log.appendChild(div);
    if (BOOT_LINES[i].trim() !== '') sfx.tick();
    const delay = BOOT_LINES[i].trim() === '' ? 55 : 150;
    i++;
    bootTimer = setTimeout(step, delay);
  };
  step();
}

function skipBoot() { clearTimeout(bootTimer); goTitle(); }
function goTitle() { show('title'); sfx.start(); }
function goMenu() { show('menu'); sfx.powerup(); buildMenu(); }

/* ---------------- MENÚ ---------------- */
function buildMenu() {
  const ul = $('#menu-list');
  ul.innerHTML = '';
  DATOS.niveles.forEach((n, i) => {
    const li = document.createElement('li');
    li.innerHTML =
      `<span class="cursor">▶</span>` +
      `<span class="mundo">WORLD ${n.codigo}</span>` +
      `<span class="nombre">${n.nombre}</span>`;
    li.addEventListener('click', () => { menuIndex = i; updateMenu(); openLevel(i); });
    li.addEventListener('mouseenter', () => {
      if (menuIndex !== i) { menuIndex = i; updateMenu(); sfx.move(); }
    });
    ul.appendChild(li);
  });
  updateMenu();
}

function updateMenu() {
  document.querySelectorAll('#menu-list li').forEach((li, i) =>
    li.classList.toggle('sel', i === menuIndex)
  );
  const n = DATOS.niveles[menuIndex];
  if (n && currentScreen === 'menu') $('#hud-world').textContent = n.codigo;
}

/* ---------------- ABRIR NIVEL ---------------- */
function openLevel(index) {
  const nivel = DATOS.niveles[index];
  if (!nivel) return;

  if (!visited.has(index)) {
    visited.add(index);
    coins += 10;
    updateCoins();
  }

  sfx.coin();

  $('#level-code').textContent = 'WORLD ' + nivel.codigo;
  $('#level-name').textContent = nivel.nombre;
  $('#hud-world').textContent = nivel.codigo;

  const cont = $('#level-content');
  cont.innerHTML = '';
  cont.scrollTop = 0;

  let html = '';
  switch (nivel.tipo) {
    case 'texto':
      html = nivel.lineas.map((l) =>
        l === '' ? '<div class="spacer"></div>' : `<p class="para reveal">${l}</p>`
      ).join('');
      break;

    case 'stats':
      html = nivel.stats.map((s) => `
        <div class="stat reveal">
          <div class="stat-head"><span>${s.nombre}</span><span class="val">${s.valor}</span></div>
          <div class="bar"><span class="bar-fill" data-val="${s.valor}"></span></div>
        </div>`).join('');
      break;

    case 'timeline':
      html = nivel.items.map((it) => `
        <div class="tl-item reveal">
          <div class="tl-date">${it.fecha}</div>
          <div class="tl-title">${it.titulo}</div>
          <div class="tl-org">${it.org}</div>
          ${it.logros ? `<ul>${it.logros.map((l) => `<li>▸ ${l}</li>`).join('')}</ul>` : ''}
        </div>`).join('');
      break;

    case 'proyectos':
      html = nivel.items.map((p) => `
        <div class="card reveal">
          <h3>▸ ${p.nombre}</h3>
          <p>${p.desc}</p>
          <div class="tags">${p.tech.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
          ${p.url ? `<a class="card-link" href="${p.url}" target="_blank" rel="noopener">VER MÁS →</a>` : ''}
        </div>`).join('');
      break;

    /* ---------- NUEVO: badges en grid ---------- */
    case 'badges':
      html = `<p class="para reveal">> PULSA SOBRE UN BADGE PARA VER LOS DETALLES:</p>
              <div class="badge-grid">` +
        nivel.items.map((b, i) => `
          <div class="badge-card reveal" data-cert="${i}">
            <img src="${b.badge}" alt="${b.nombre}" onerror="this.style.opacity='.35'" />
            <h4>${b.nombre}</h4>
            <span class="badge-emisor">${b.emisor}</span>
            <span class="badge-fecha">${b.fecha}</span>
            <span class="badge-btn">VER MÁS →</span>
          </div>`).join('') +
        `</div>`;
      break;

    case 'contacto':
      html = `<p class="para reveal">> ¡GRACIAS POR JUGAR! CONTACTA CONMIGO:</p>` +
        nivel.items.map((c) =>
          `<a class="contact-link reveal" href="${c.href}" target="_blank" rel="noopener">▸ ${c.label}</a>`
        ).join('') +
        `<p class="para reveal" style="margin-top:24px">★ THANKS FOR PLAYING ★</p>`;
      break;
  }

  cont.innerHTML = html;

  /* Enlazar clicks de badges */
  if (nivel.tipo === 'badges') {
    cont.querySelectorAll('.badge-card').forEach((el) => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.cert, 10);
        openCertDetail(nivel.items[idx]);
      });
    });
  }

  const reveals = cont.querySelectorAll('.reveal');
  reveals.forEach((el, i) => {
    el.style.animationDelay = i * 0.06 + 's';
    if (i % 3 === 0) setTimeout(() => sfx.tick(), i * 60);
  });

  cont.querySelectorAll('.bar-fill').forEach((el, i) => {
    const val = el.dataset.val;
    setTimeout(() => { el.style.width = val + '%'; sfx.coin(); }, 300 + i * 140);
  });

  show('level');
}

/* ---------------- DETALLE DE CERTIFICACIÓN ---------------- */
function openCertDetail(cert) {
  if (!cert) return;
  sfx.powerup();

  $('#cert-code').textContent = cert.emisor + ' · ' + cert.fecha;
  $('#cert-issuer').textContent = cert.nombre;

  const cont = $('#cert-content');
  cont.innerHTML = `
    <div class="cert-detail">
      <img class="cert-badge-large reveal"
           src="${cert.badge}"
           alt="${cert.nombre}"
           onerror="this.style.opacity='.35'" />

      <div class="cert-info reveal">
        <h2>${cert.nombre}</h2>

        <div class="cert-meta">
          EMISOR: <b>${cert.emisor}</b><br>
          FECHA: <b>${cert.fecha}</b>
        </div>

        <p class="desc">${cert.resumen}</p>

        <a class="cert-verify" href="${cert.verificacion}" target="_blank" rel="noopener">
          ▸ VERIFICAR EN CREDLY
        </a>
      </div>
    </div>
  `;

  /* Animación de entrada */
  cont.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.animationDelay = i * 0.1 + 's';
  });

  show('cert');
}

function backFromCert() {
  sfx.back();
  /* Volver a la sección de certificaciones */
  const idx = DATOS.niveles.findIndex((n) => n.tipo === 'badges');
  if (idx >= 0) openLevel(idx);
  else goMenu();
}

/* ---------------- HUD ---------------- */
function updateCoins() {
  $('#hud-coins').textContent = String(coins).padStart(2, '0');
}

/* ---------------- MUTE ---------------- */
function toggleMute() {
  muted = !muted;
  $('#sound-btn').textContent = muted ? '♪ OFF' : '♪ ON';
  if (!muted) sfx.coin();
}

/* ============================================================
   CONTROLES
   ============================================================ */
window.addEventListener('keydown', (e) => {
  const k = e.key;
  ensureAudio();

  if (k === 'm' || k === 'M') { toggleMute(); return; }

  if (currentScreen === 'boot') { e.preventDefault(); skipBoot(); return; }

  if (currentScreen === 'title') {
    if (k === 'Enter' || k === ' ' || k === 'Spacebar' || k.length === 1) {
      e.preventDefault(); goMenu();
    }
    return;
  }

  if (currentScreen === 'menu') {
    const n = DATOS.niveles.length;
    if (k === 'ArrowUp' || k === 'w' || k === 'W') {
      e.preventDefault(); menuIndex = (menuIndex - 1 + n) % n; updateMenu(); sfx.move();
    } else if (k === 'ArrowDown' || k === 's' || k === 'S') {
      e.preventDefault(); menuIndex = (menuIndex + 1) % n; updateMenu(); sfx.move();
    } else if (k === 'Enter' || k === ' ') {
      e.preventDefault(); openLevel(menuIndex);
    }
    return;
  }

  if (currentScreen === 'level') {
    if (k === 'Escape' || k === 'Backspace') { e.preventDefault(); goMenu(); }
    return;
  }

  if (currentScreen === 'cert') {
    if (k === 'Escape' || k === 'Backspace') { e.preventDefault(); backFromCert(); }
  }
});

$('#screen-boot').addEventListener('click', () => { ensureAudio(); skipBoot(); });
$('#screen-title').addEventListener('click', () => { ensureAudio(); goMenu(); });
$('#back-btn').addEventListener('click', goMenu);
$('#cert-back-btn').addEventListener('click', backFromCert);
$('#sound-btn').addEventListener('click', (e) => {
  e.stopPropagation(); ensureAudio(); toggleMute();
});

/* ============================================================
   INICIALIZACIÓN
   ============================================================ */
function init() {
  $('#title-name').innerHTML = DATOS.nombre.replace(/\s+/g, '<br>');
  $('#title-role').textContent = DATOS.rol;
  $('#title-copy').textContent = DATOS.copyright;

  $('#hud-name').textContent = 'OSCAR';
  updateCoins();
  $('#hud-world').textContent = '1-1';

  runBoot();
}

init();