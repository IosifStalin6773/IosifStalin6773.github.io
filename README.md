# PORTFOLIO

> Portfolio personal interactivo con estética arcade de los 80's, inspirado en Super Mario Bros y Duck Hunt.
> Desarrollado en HTML, CSS y JavaScript puro, sin frameworks, sin build y sin dependencias.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## Descripción

Este proyecto es un portfolio web personal con temática retro. Convierte un currículum tradicional en una experiencia interactiva tipo arcade, donde el visitante navega por "mundos" (niveles), recoge monedas con información personal, interactúa con elementos del juego y descubre las distintas secciones del CV de forma lúdica.

Cada sección del currículum corresponde a un nivel con su propio estilo visual, animaciones y sonidos generados en tiempo real.

---

## Características

### Interfaz estilo arcade
- Pantalla de arranque con secuencia tipo MS-DOS.
- Pantalla de título con animación synthwave.
- Menú de mundos con navegación por teclado.
- HUD superior con nombre, contador de monedas, mundo actual y tiempo.
- Efectos de sonido 8-bit generados con Web Audio API, sin archivos externos.
- Efectos CRT (scanlines, viñeta, parpadeo).

### Contenido del CV en forma de niveles
| Mundo | Sección |
|-------|---------|
| 1-1 | Sobre mí |
| 1-2 | Habilidades |
| 1-3 | Experiencia |
| 2-1 | Proyectos |
| 2-2 | Educación |
| 2-3 | Certificaciones |
| 3-1 | Contacto |

### Monedas coleccionables
- Ocho monedas distribuidas aleatoriamente por los laterales de la pantalla.
- Aparecen tras pulsar START.
- Cada moneda revela un dato personal en un modal retro.
- Se desvanecen tras leerlas, solo se pueden consultar una vez.
- Contador dinámico en el botón de monedas.

### Muro de ladrillos
- Al entrar al nivel de Contacto, el fondo se transforma en un muro pixelado.
- Animación tipo voxel de abajo hacia arriba con sonido procedural.

### Pájaros voladores
- Cruzan el cielo de forma aleatoria.
- Al hacer clic sobre uno, se genera una explosión blanca con plumas y un sonido 8-bit.

### Easter egg: perro de Duck Hunt
- Aparece sobre un arbusto al alcanzar 30 monedas.
- Sube desde dentro del arbusto con sonido clásico.
- Al hacerle clic, muestra un mensaje secreto.

### Estética visual
- Pixel art creado con SVG inline (nubes, arbustos, monedas, plumas).
- Tipografías retro: Press Start 2P y VT323.
- Paleta de colores clásica de NES.

---

## Instalación

### Opción 1: clonar y abrir
```bash
git clone https://github.com/IosifStalin6773/super-portfolio-bros.git
cd super-portfolio-bros
