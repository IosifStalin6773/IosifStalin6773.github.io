# Portfolio Profesional

Un portfolio web moderno y responsive para mostrar tu trayectoria profesional, proyectos y habilidades.

## Características

- **Diseño Moderno**: Interfaz limpia y profesional con animaciones suaves
- **Totalmente Responsive**: Se adapta perfectamente a todos los dispositivos
- **Secciones Completas**:
  - Hero/Presentación personal
  - Línea de tiempo de experiencia laboral
  - Galería de proyectos destacados
  - Habilidades técnicas con barras de progreso
  - Formulario de contacto funcional
- **Optimizado para SEO**: Metadatos y estructura semántica
- **Animaciones**: Efectos de scroll y transiciones suaves
- **Navegación Intuitiva**: Menú responsive con scroll suave

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño moderno con Grid, Flexbox y animaciones
- **JavaScript Vanilla**: Interactividad sin dependencias externas
- **Font Awesome**: Iconos profesionales

## Personalización

### Información Personal
Edita los siguientes campos en `index.html`:

- `[Tu Nombre]`: Tu nombre completo
- `[Puesto Actual]`: Tu puesto actual
- `[Empresa Actual]`: Nombre de tu empresa actual
- `[tu.email@ejemplo.com]`: Tu email de contacto
- Enlaces de redes sociales

### Experiencia Laboral
Modifica la sección `.timeline-item` para agregar tu experiencia:

```html
<div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <div class="timeline-header">
            <h3>[Tu Puesto]</h3>
            <span class="timeline-date">[Año] - [Año]</span>
        </div>
        <h4>[Nombre de la Empresa]</h4>
        <p class="timeline-description">
            [Describe tus responsabilidades y logros]
        </p>
        <div class="timeline-skills">
            <span class="skill-tag">[Tecnología 1]</span>
            <span class="skill-tag">[Tecnología 2]</span>
        </div>
    </div>
</div>
```

### Proyectos
Actualiza las `.project-card` con tus proyectos:

```html
<div class="project-card">
    <div class="project-image">
        <!-- Agrega tu imagen o mantén el placeholder -->
    </div>
    <div class="project-content">
        <h3>[Nombre del Proyecto]</h3>
        <p class="project-description">
            [Descripción del proyecto]
        </p>
        <div class="project-tech">
            <span class="tech-tag">[Tecnología]</span>
        </div>
        <div class="project-links">
            <a href="[URL de GitHub]" class="project-link">
                <i class="fab fa-github"></i> GitHub
            </a>
            <a href="[URL de Demo]" class="project-link">
                <i class="fas fa-external-link-alt"></i> Demo
            </a>
        </div>
    </div>
</div>
```

### Habilidades
Ajusta las barras de progreso en `styles.css`:

```css
.skill-item:nth-child(1) .skill-progress {
    width: 90%; /* Ajusta según tu nivel */
}
```

## Despliegue Automático

Este portfolio está configurado para desplegarse automáticamente en GitHub Pages cuando haces push a la rama `master`.

El workflow `.github/workflows/pages.yml` se encarga de:
- Detectar cambios en la rama master
- Construir y optimizar los archivos
- Desplegar automáticamente en GitHub Pages

## Estructura de Archivos

```
IosifStalin6773.github.io/
|
|-- index.html          # Página principal
|-- styles.css          # Estilos CSS
|-- script.js           # Interactividad JavaScript
|-- .github/
|   |-- workflows/
|   |   |-- pages.yml   # Workflow para GitHub Pages
|   |   |-- merge.yml   # Verificación de PRs
|   |   |-- release.yml # Gestión de releases
|
```

## Personalización Avanzada

### Colores y Tema
Modifica las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #2563eb;    /* Color primario */
    --secondary-color: #1e40af;  /* Color secundario */
    --accent-color: #3b82f6;     /* Color de acento */
    /* ... otras variables */
}
```

### Fuentes
Cambia las fuentes en `styles.css`:

```css
body {
    font-family: 'TuFuente', sans-serif;
}
```

### Animaciones
Personaliza las animaciones modificando las clases `.fade-in-up` y las transiciones en `script.js`.

## Contacto

El formulario de contacto incluye validación frontend. Para funcionalidad completa, integra con:
- Formspree
- Netlify Forms
- EmailJS
- Tu propio backend

## Licencia

Este proyecto es de uso libre. Siéntete libre de modificarlo y adaptarlo a tus necesidades.

---

**Nota**: Reemplaza todos los campos entre corchetes `[]` con tu información personal antes de desplegar.
