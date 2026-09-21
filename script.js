/* ============================================================
   SUPER PORTFOLIO BROS — OSCAR DE LA CRUZ DIEZ
   ============================================================ */

const DATOS = {
  nombre: 'OSCAR DE LA CRUZ',
  rol: 'DEV · SMR · CIBERSEGURIDAD',
  copyright: '© 2025 OSCAR DE LA CRUZ DIEZ',

  niveles: [
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
          badge: 'https://images.credly.com/size/220x220/images/e8fe3d67-2967-43d0-bc4a-7a268a37f47b/image.png',
          verificacion: 'https://www.credly.com/users/oscar-de-la-cruz-diez',
          resumen: 'Certificación oficial de Cisco Networking Academy que cubre los fundamentos del sistema operativo Linux: línea de comandos, estructura del sistema de archivos, gestión de usuarios y permisos, procesos, scripting básico en shell y administración esencial del sistema. Base imprescindible para cualquier perfil orientado a sistemas, redes o ciberseguridad.'
        },
        {
          id: 'python-essentials-2',
          nombre: 'PYTHON ESSENTIALS 2',
          emisor: 'CISCO',
          fecha: '15 ABR 2026',
          badge: 'https://images.credly.com/images/3f802526-7274-4230-91ab-f6d1a35340e6/image.png',
          verificacion: 'https://www.credly.com/users/oscar-de-la-cruz-diez',
          resumen: 'Segunda parte del itinerario de Python de Cisco. Cubre programación orientada a objetos, módulos y paquetes, manejo de excepciones, lectura y escritura de ficheros, expresiones regulares, generadores, decoradores y trabajo con librerías estándar. Nivel intermedio de Python aplicable a scripting, automatización y desarrollo backend.'
        },
        {
          id: 'python-essentials-1',
          nombre: 'PYTHON ESSENTIALS 1',
          emisor: 'CISCO',
          fecha: '13 ABR 2026',
          badge: 'https://images.credly.com/images/68c0b94d-f6ac-40b1-a0e0-921439eb092e/image.png',
          verificacion: 'https://www.credly.com/users/oscar-de-la-cruz-diez',
          resumen: 'Introducción al lenguaje Python: sintaxis, variables, tipos de datos, operadores, estructuras de control, funciones, listas, tuplas, diccionarios y manejo básico de errores. Certificación que acredita las bases sólidas del lenguaje más demandado para automatización, scripting y ciencia de datos.'
        },
        {
          id: 'intro-cybersecurity',
          nombre: 'INTRO TO CYBERSECURITY',
          emisor: 'CISCO',
          fecha: '12 ABR 2026',
          badge: 'https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png',
          verificacion: 'https://www.credly.com/users/oscar-de-la-cruz-diez',
          resumen: 'Introducción a la ciberseguridad: panorama actual de amenazas, tipos de malware, ingeniería social, vulnerabilidades comunes, criptografía básica, seguridad en redes, protección de datos y buenas prácticas. Primer paso hacia la especialización en Seguridad Informática que el perfil tiene como objetivo.'
        },
        {
          id: 'networking-basics',
          nombre: 'NETWORKING BASICS',
          emisor: 'CISCO',
          fecha: '12 ABR 2026',
          badge: 'https://images.credly.com/images/5bdd6a39-3e03-4444-9510-ecff80c9ce79/image.png',
          verificacion: 'https://www.credly.com/users/oscar-de-la-cruz-diez',
          resumen: 'Fundamentos de redes: modelo OSI y TCP/IP, direccionamiento IPv4/IPv6, protocolos (HTTP, DNS, DHCP, etc.), dispositivos de red (switches, routers), cableado, topologías y troubleshooting básico. Base técnica para el Grado Superior en ASIR y la especialización en ciberseguridad.'
        }
      ]
    },
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
let coinsVisible = true;
let coinsReady = false;
let dogShown = false;
let coinsVisited = new Set();
let activeCoinId = null;

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
    ),
  wall: () => {
    for (let i = 0; i < 14; i++) {
      setTimeout(() => {
        tone(120 + Math.random() * 80, 0.04, 'square', 0.04);
      }, i * 45);
    }
    setTimeout(() => {
      sweep(220, 660, 0.25, 0.06);
    }, 14 * 45 + 30);
  },
  dogLaugh: () => {
    const notes = [392, 523, 659, 784, 659, 523, 392, 523, 659, 784, 880, 784, 659, 523, 392];
    notes.forEach((f, i) => {
      setTimeout(() => {
        tone(f, 0.07, 'square', 0.05);
      }, i * 70);
    });
  },
  birdHit: () => {
    sweep(1400, 200, 0.18, 0.07);
    setTimeout(() => tone(80, 0.18, 'square', 0.06), 40);
    setTimeout(() => tone(60, 0.22, 'square', 0.05), 100);
  }
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
  'OS-CAR v1.87   (C) 2003 NOENTIENDO',
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
function goTitle() { show('title'); sfx.start(); setBrickwall(false); }
function goMenu() {
  show('menu');
  sfx.powerup();
  buildMenu();
  setBrickwall(false);

  if (!coinsReady) {
    coinsReady = true;
    createCoins();
    coinsLayer.classList.remove('is-hidden');
  }
}

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

  if (nivel.tipo === 'contacto') {
    setBrickwall(true);
  } else {
    setBrickwall(false);
  }

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
  setBrickwall(false);

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

  cont.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.animationDelay = i * 0.1 + 's';
  });

  show('cert');
}

function backFromCert() {
  sfx.back();
  const idx = DATOS.niveles.findIndex((n) => n.tipo === 'badges');
  if (idx >= 0) openLevel(idx);
  else goMenu();
}

/* ---------------- HUD ---------------- */
function updateCoins() {
  $('#hud-coins').textContent = String(coins).padStart(2, '0');

  if (coins >= 30 && !dogShown) {
    showDuckHuntDog();
  }
}

/* ---------------- MUTE ---------------- */
function toggleMute() {
  muted = !muted;
  $('#sound-btn').textContent = muted ? '♪ OFF' : '♪ ON';
  if (!muted) sfx.coin();
}

/* ============================================================
   PERRO DE DUCK HUNT
   ============================================================ */
function showDuckHuntDog() {
  if (dogShown) return;
  dogShown = true;

  const dog = document.getElementById('duck-hunt-dog');
  if (!dog) return;

  sfx.dogLaugh();
  setTimeout(() => {
    dog.classList.add('show');
    sfx.powerup();
  }, 200);

  dog.addEventListener('click', (e) => {
    e.stopPropagation();
    sfx.dogLaugh();
    coinModalTitle.textContent = '★ ¡JAJAJAJAJA!';
    coinModalText.textContent = '¡Has llegado a 30 monedas y el perro de Duck Hunt ha venido a reírse de ti! Pero tranquilo, esto es una señal de que eres un auténtico jugador retro.';
    coinModal.classList.add('active');
  });
}

/* ============================================================
   MONEDAS COLECCIONABLES — DATOS PERSONALES
   ============================================================ */
const COINS_DATA = [
  {
    id: 'birth',
    title: '★ FECHA DE NACIMIENTO',
    text: 'Nací el 17 de abril de 2003. Empecé a programar con 12-13 años y desde entonces no he parado: eso son más de 8 años de código a mis espaldas.'
  },
  {
    id: 'germany',
    title: '★ ESTANCIA EN ALEMANIA',
    text: 'Viví en Alemania de los 11-12 hasta los 15-16 años. Esa experiencia me dio una base cultural y lingüística que todavía llevo conmigo.'
  },
  {
    id: 'languages',
    title: '★ IDIOMAS',
    text: 'Español (nativo), Inglés (B1 — lectura técnica y documentación) y actualmente aprendiendo Ruso (A1-A2). El alemán también se me quedó pegado de la infancia.'
  },
  {
    id: 'goal',
    title: '★ OBJETIVO PROFESIONAL',
    text: 'Ahora mismo estoy en 2º de SMR en IDEA (Santander). Mi meta es cursar un Grado Superior en ASIR y luego una Especialización en Seguridad Informática.'
  },
  {
    id: 'github',
    title: '★ GITHUB',
    text: 'Tengo más de 30 repositorios públicos y privados: scripts, servidores de juegos, desarrollo web y experimentos personales. Puedes verlos todos en github.com/IosifStalin6773'
  },
  {
    id: 'cert',
    title: '★ CERTIFICACIONES',
    text: 'Cuento con varias certificaciones Cisco Netacad (Linux Essentials, Python Essentials 1 y 2, Intro to Cybersecurity y Networking Basics). Verificables en mi Credly.'
  },
  {
    id: 'tools',
    title: '★ HERRAMIENTAS FAVORITAS',
    text: 'Lua y SQF para scripting de servidores, JavaScript para web, Docker para contenedores, VSCode como editor principal, FileZilla para FTP y DBeaver para bases de datos.'
  },
  {
    id: 'curious',
    title: '★ DATO CURIOSO',
    text: 'Mi lema es "nunca estar satisfecho con el conocimiento: buscarlo debajo de las piedras". Soy un autodidacta empedernido al que le encanta desmontar cosas para entender cómo funcionan.'
  }
];

/* ============================================================
   GENERADOR DE POSICIONES ALEATORIAS (en píxeles)
   ============================================================ */
const MAX_ATTEMPTS = 800;
const COIN_MARGIN  = 12;
const MIN_DIST_PX  = 70;

function getCoinSize() {
  return window.innerWidth <= 640 ? 34 : 42;
}

function rand(min, max) { return Math.random() * (max - min) + min; }
function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

function generateCoinPositions(count) {
  const positions = [];
  const W = window.innerWidth;
  const H = window.innerHeight;
  const coin = getCoinSize();

  const safeMinX = COIN_MARGIN;
  const safeMaxX = W - COIN_MARGIN - coin;
  const safeMinY = H * 0.12;
  const safeMaxY = H * 0.88 - coin;

  const zones = [
    { xMin: safeMinX,        xMax: W * 0.10, yMin: safeMinY, yMax: safeMaxY },
    { xMin: W * 0.90 - coin, xMax: safeMaxX, yMin: safeMinY, yMax: safeMaxY }
  ];

  let attempts = 0;
  while (positions.length < count && attempts < MAX_ATTEMPTS) {
    attempts++;
    const zone = zones[Math.floor(Math.random() * zones.length)];
    const x = rand(zone.xMin, zone.xMax);
    const y = rand(zone.yMin, zone.yMax);

    const tooClose = positions.some(p => dist(p, { x, y }) < MIN_DIST_PX);
    if (tooClose) continue;

    positions.push({ x, y });
  }

  while (positions.length < count) {
    positions.push({
      x: safeMinX,
      y: safeMinY + Math.random() * (safeMaxY - safeMinY)
    });
  }

  return positions;
}

/* ============================================================
   CREAR / MOSTRAR / OCULTAR MONEDAS
   ============================================================ */
const coinsLayer = document.getElementById('coins-layer');
const coinModal = document.getElementById('coin-modal');
const coinModalTitle = document.getElementById('coin-modal-title');
const coinModalText = document.getElementById('coin-modal-text');
const coinModalClose = document.getElementById('coin-modal-close');
const coinBtn = document.getElementById('coin-btn');

function createCoins() {
  coinsLayer.innerHTML = '';

  const remaining = COINS_DATA.filter((c) => !coinsVisited.has(c.id));

  if (remaining.length === 0) {
    coinBtn.textContent = '🪙 0';
    return;
  }

  const positions = generateCoinPositions(remaining.length);

  remaining.forEach((c, i) => {
    const pos = positions[i];

    const el = document.createElement('div');
    el.className = 'coin';
    el.style.left = pos.x + 'px';
    el.style.top  = pos.y + 'px';

    const rot = (Math.random() * 14 - 7).toFixed(1);
    el.style.transform = `rotate(${rot}deg)`;

    el.dataset.coin = c.id;
    el.innerHTML = '<div class="coin-inner"></div>';
    el.title = c.title.replace('★ ', '');

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      openCoinModal(c);
    });

    coinsLayer.appendChild(el);
  });

  coinBtn.textContent = coinsVisible ? '🪙 ON' : '🪙 OFF';
}

function toggleCoins() {
  coinsVisible = !coinsVisible;
  if (coinsVisible) {
    createCoins();
    coinsLayer.classList.remove('is-hidden');
    coinBtn.textContent = '🪙 ON';
  } else {
    coinsLayer.classList.add('is-hidden');
    coinBtn.textContent = '🪙 OFF';
  }
  sfx.move();
}

/* ============================================================
   MODAL
   ============================================================ */
function openCoinModal(c) {
  ensureAudio();
  sfx.coin();
  coins += 10;
  updateCoins();

  activeCoinId = c.id;

  coinModalTitle.textContent = c.title;
  coinModalText.textContent  = c.text;
  coinModal.classList.add('active');
}

function closeCoinModal() {
  if (!coinModal.classList.contains('active')) return;
  coinModal.classList.remove('active');
  sfx.back();

  if (activeCoinId) {
    coinsVisited.add(activeCoinId);

    const el = coinsLayer.querySelector(`[data-coin="${activeCoinId}"]`);
    if (el) {
      el.classList.add('coin-gone');
      setTimeout(() => el.remove(), 400);
    }

    activeCoinId = null;

    const left = COINS_DATA.length - coinsVisited.size;
    coinBtn.textContent = coinsVisible ? `🪙 ${left}` : '🪙 OFF';
  }
}

coinModalClose.addEventListener('click', (e) => {
  e.stopPropagation();
  closeCoinModal();
});

coinModal.addEventListener('click', (e) => {
  if (e.target === coinModal) closeCoinModal();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && coinModal.classList.contains('active')) {
    e.preventDefault();
    e.stopPropagation();
    closeCoinModal();
  }
}, true);

/* ============================================================
   MURO DE LADRILLOS — VOXELES
   ============================================================ */
const BRICKWALL_IMG = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F2158410698%2Fvector%2Fdark-spooky-brick-wall-pixel-art-background-seamless-stone-tile-halloween-pattern-8-bit.jpg%3Fs%3D170667a%26w%3D0%26k%3D20%26c%3DmMwHsmvbi_val2ynmwHdY2qI4ZfAsYJz_EWaAJ0h9zk%3D&f=1&nofb=1&ipt=90a2f9724b5aa9b11a57e77cc345dbbed91b7d08ff455c3b022c4dbc8471ea5b';
const VOXEL_SIZE = 48;

function buildBrickwall() {
  const wall = document.getElementById('brickwall');
  if (!wall) return;

  wall.innerHTML = '';

  const W = window.innerWidth;
  const H = window.innerHeight;
  const COLS = Math.ceil(W / VOXEL_SIZE);
  const ROWS = Math.ceil(H / VOXEL_SIZE);

  const cellW = Math.ceil(W / COLS);
  const cellH = Math.ceil(H / ROWS);

  const frag = document.createDocumentFragment();

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const v = document.createElement('div');
      v.className = 'voxel';

      const x = c * cellW;
      const y = r * cellH;

      v.style.left   = x + 'px';
      v.style.top    = y + 'px';
      v.style.width  = (cellW + 1) + 'px';
      v.style.height = (cellH + 1) + 'px';

      v.style.backgroundImage    = `url('${BRICKWALL_IMG}')`;
      v.style.backgroundSize     = `${W}px ${H}px`;
      v.style.backgroundPosition = `-${x}px -${y}px`;

      const delay = (ROWS - 1 - r) * 45 + c * 8;
      v.style.setProperty('--d', delay + 'ms');

      frag.appendChild(v);
    }
  }

  wall.appendChild(frag);
}

function setBrickwall(on) {
  const wall = document.getElementById('brickwall');
  if (!wall) return;

  if (on) {
    buildBrickwall();
    const wasActive = wall.classList.contains('active');
    if (!wasActive) sfx.wall();
    wall.classList.remove('active');
    void wall.offsetWidth;
    wall.classList.add('active');
  } else {
    wall.classList.remove('active');
  }
}

window.addEventListener('resize', () => {
  const wall = document.getElementById('brickwall');
  if (!wall) return;
  if (wall.classList.contains('active')) {
    buildBrickwall();
  }
});

/* ============================================================
   PÁJAROS QUE CRUZAN EL CIELO
   ============================================================ */
const BIRD_IMG = 'https://img.itch.zone/aW1nLzIzNDU3NTA2LmdpZg==/original/m7mb3e.gif';
const birdsLayer = document.getElementById('birds-layer');

let birdSpawnTimer = null;

function spawnBird() {
  if (!birdsLayer) return;
  if (currentScreen === 'boot' || currentScreen === 'title') return;

  const bird = document.createElement('div');
  bird.className = 'bird';

  const toLeft = Math.random() < 0.5;
  bird.classList.add(toLeft ? 'fly-left' : 'fly-right');

  const topPercent = 8 + Math.random() * 37;
  bird.style.top = topPercent + '%';

  // Vuelo lento: 16-24 s por travesía
  const duration = 16 + Math.random() * 8;
  bird.style.animationDuration = duration + 's';

  const sprite = document.createElement('img');
  sprite.className = 'sprite';
  sprite.src = BIRD_IMG;
  sprite.alt = '';
  sprite.onerror = () => { bird.remove(); };
  bird.appendChild(sprite);

  // ---------- CLIC: ¡BOOM! ----------
  bird.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bird.classList.contains('bird-hit')) return;

    // Centro actual del pájaro para colocar la explosión
    const rect = bird.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;

    // El pájaro desaparece AL INSTANTE
    bird.remove();

    // Explosión + anillo + plumas
    sfx.birdHit();
    spawnBoom(cx, cy);
    spawnFeathers(cx, cy);
  });

  birdsLayer.appendChild(bird);

  bird.addEventListener('animationend', () => bird.remove());
  setTimeout(() => bird.remove(), (duration + 2) * 1000);
}

/* Explosión blanca central (núcleo + anillo) */
function spawnBoom(x, y) {
  const core = document.createElement('div');
  core.className = 'bird-boom';
  core.style.left = (x - 10) + 'px';
  core.style.top  = (y - 10) + 'px';
  document.body.appendChild(core);
  setTimeout(() => core.remove(), 500);

  const ring = document.createElement('div');
  ring.className = 'bird-boom-ring';
  ring.style.left = (x - 15) + 'px';
  ring.style.top  = (y - 15) + 'px';
  document.body.appendChild(ring);
  setTimeout(() => ring.remove(), 600);
}

/* Plumas saliendo en círculo */
function spawnFeathers(x, y) {
  const COUNT = 10;

  for (let i = 0; i < COUNT; i++) {
    const f = document.createElement('div');
    f.className = 'feather';

    f.style.left = (x - 8) + 'px';
    f.style.top  = (y - 8) + 'px';

    // Ángulo repartido uniformemente + un poco de aleatoriedad
    const angle = (i / COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
    const distance = 80 + Math.random() * 100;

    const dx  = Math.cos(angle) * distance;
    const dy  = Math.sin(angle) * distance;
    const rot = (Math.random() * 720) - 360;

    f.style.setProperty('--dx',  dx + 'px');
    f.style.setProperty('--dy',  dy + 'px');
    f.style.setProperty('--rot', rot + 'deg');

    const dur   = 0.7 + Math.random() * 0.5;
    const delay = Math.random() * 0.08;
    f.style.animation = `featherBurst ${dur}s ${delay}s ease-out forwards`;

    document.body.appendChild(f);
    setTimeout(() => f.remove(), (dur + delay + 0.3) * 1000);
  }
}

function scheduleBirds() {
  if (birdSpawnTimer) clearTimeout(birdSpawnTimer);

  const wait = 6000 + Math.random() * 12000;

  birdSpawnTimer = setTimeout(() => {
    if (Math.random() < 0.5) {
      spawnBird();
    }
    scheduleBirds();
  }, wait);
}

/* ============================================================
   CONTROLES
   ============================================================ */
window.addEventListener('keydown', (e) => {
  const k = e.key;
  ensureAudio();

  if (k === 'm' || k === 'M') { toggleMute(); return; }

  if (k === 'c' || k === 'C') {
    if (!coinModal.classList.contains('active') && coinsReady) {
      toggleCoins();
    }
    return;
  }

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
coinBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  ensureAudio();
  toggleCoins();
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
  scheduleBirds();
}

init();