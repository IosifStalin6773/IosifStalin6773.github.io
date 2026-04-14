# Portafolio Web Personal

Un portafolio web moderno, responsive y profesional construido con Eleventy (Static Site Generator) y diseñado para showcase de proyectos y habilidades de desarrollo.

## Características

- **Arquitectura Modular**: Sistema basado en componentes con plantillas reutilizables
- **Static Site Generator**: Eleventy para generación estática optimizada
- **Blog con Markdown**: Sistema de blog basado en archivos Markdown
- **Diseño Moderno**: Interfaz limpia y profesional con gradientes y animaciones suaves
- **Totalmente Responsive**: Se adapta perfectamente a dispositivos móviles, tablets y desktop
- **Optimizado para SEO**: Meta tags optimizados y estructura semántica HTML5
- **Alto Rendimiento**: Lazy loading, animaciones optimizadas y código limpio
- **Interactivo**: Menú navegación móvil, scroll animations y formulario de contacto funcional
- **Accesible**: Cumple con estándares de accesibilidad web

## Estructura del Proyecto

```
IosifStalin6773.github.io/
  src/                          # Source files
    js/                         # JavaScript files
    css/                        # CSS stylesheets
    components/                 # Reusable components
      header.njk               # Header component
      footer.njk               # Footer component
      base-layout.njk          # Base layout template
      blog-layout.njk          # Blog post template
    blog/                       # Blog posts in Markdown
      css-grid-flexbox.md      # Example blog post
      index.njk                # Blog listing page
    _data/                      # Site configuration data
      site.json                # Site metadata
      blog.json                # Blog configuration
    index.njk                   # Homepage template
  public/                       # Built files (generated)
    assets/                     # Static assets
    blog/                       # Generated HTML blog posts
  config.json                   # Global configuration
  .eleventy.js                  # Eleventy configuration
  package.json                  # Node.js dependencies
```

## Tecnologías Utilizadas

- **Eleventy**: Static Site Generator para generación de sitios estáticos
- **Nunjucks**: Template engine para plantillas HTML
- **Markdown**: Sistema de escritura para blog posts
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Flexbox, Grid, animaciones y diseño responsive
- **JavaScript Vanilla**: Interactividad sin dependencias externas
- **Font Awesome**: Iconos profesionales

## Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/IosifStalin6773/IosifStalin6773.github.io.git
   cd IosifStalin6773.github.io
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Construir para producción:
   ```bash
   npm run build
   ```

### Scripts Disponibles

- `npm run dev`: Inicia servidor de desarrollo con path prefix para GitHub Pages
- `npm run dev:local`: Servidor de desarrollo local (sin path prefix)
- `npm run build`: Genera el sitio estático para GitHub Pages
- `npm run build:local`: Genera el sitio estático para desarrollo local
- `npm run clean`: Limpia la carpeta de construcción
- `npm run debug`: Ejecuta Eleventy en modo debug

### GitHub Pages

Este proyecto está configurado para despliegue automático en GitHub Pages:

1. **URL del sitio**: https://iosifstalin6773.github.io/IosifStalin6773.github.io/
2. **Despliegue automático**: Al hacer push a la rama `main`
3. **Workflow**: GitHub Actions construye y despliega el sitio

Para más detalles, consulta [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)

## Personalización

### Configuración del Sitio

Edita los siguientes archivos de configuración:

1. **src/_data/site.json**: Información básica del sitio
   ```json
   {
     "title": "Tu Nombre - Desarrollador Web",
     "description": "Descripción del sitio",
     "author": {
       "name": "Tu Nombre",
       "github": "tu-username"
     }
   }
   ```

2. **config.json**: Configuración global del proyecto

### Añadir Nuevos Posts al Blog

1. Crea un nuevo archivo en `src/blog/` con extensión `.md`
2. Añade el front matter con metadatos:
   ```markdown
   ---
   title: "Título del Artículo"
   description: "Descripción breve"
   date: 2026-02-15
   category: "JavaScript"
   tags: ["JavaScript", "Tutorial"]
   ---
   
   Contenido del artículo en formato Markdown...
   ```

### Modificar Componentes

- **src/components/header.njk**: Header y navegación
- **src/components/footer.njk**: Footer y enlaces
- **src/components/base-layout.njk**: Layout base del sitio
- **src/components/blog-layout.njk**: Layout para posts del blog

### Personalizar Estilos

Edita los archivos CSS en `src/css/`:
- `styles.css`: Estilos principales del sitio
- `blog-styles.css`: Estilos específicos del blog

## Secciones del Portafolio

1. **Hero Section**: Presentación personal con llamada a la acción
2. **About Me**: Información personal y profesional
3. **Projects**: Showcase de proyectos destacados
4. **Skills**: Habilidades técnicas organizadas por categorías
5. **Blog**: Artículos técnicos y tutoriales
6. **Contact**: Formulario de contacto e información de contacto
        <div class="project-placeholder">
            <i class="fas fa-code"></i>
        </div>
    </div>
    <div class="project-content">
        <h3 class="project-title">Nombre del Proyecto</h3>
        <p class="project-description">Descripción del proyecto...</p>
        <div class="project-tech">
            <span class="tech-tag">Tecnología</span>
        </div>
        <div class="project-links">
            <a href="#" class="project-link">
                <i class="fab fa-github"></i> GitHub
            </a>
            <a href="#" class="project-link">
                <i class="fas fa-external-link-alt"></i> Demo
            </a>
        </div>
    </div>
</div>
```

## Funcionalidades JavaScript

- **Menú Navegación Móvil**: Toggle para dispositivos móviles
- **Smooth Scrolling**: Navegación suave entre secciones
- **Scroll Reveal**: Animaciones al hacer scroll
- **Formulario de Contacto**: Validación y simulación de envío
- **Notificaciones**: Sistema de notificaciones no intrusivo
- **Typewriter Effect**: Animación de escritura en el título
- **Parallax Effect**: Efecto parallax en hero section
- **Lazy Loading**: Optimización de carga de imágenes

## Optimización SEO

El portafolio incluye optimización SEO:

- Meta tags descriptivos
- Estructura semántica HTML5
- Open Graph tags para redes sociales
- URLs amigables
- Imágenes optimizadas
- Performance optimization

## Deploy en GitHub Pages

Este proyecto está configurado para GitHub Pages. Para deploy automático:

1. Haz push a la rama `main`
2. Ve a Settings > Pages en tu repositorio GitHub
3. Selecciona "Deploy from a branch"
4. Elige rama `main` y carpeta `/root`
5. Tu sitio estará disponible en `https://username.github.io/repository`

## Navegación

- **Inicio**: Hero section con presentación
- **Sobre Mí**: Información personal y profesional
- **Proyectos**: Portfolio de proyectos destacados
- **Habilidades**: Skills técnicas organizadas
- **Contacto**: Formulario y datos de contacto

## Diseño Responsive

El portafolio está optimizado para:

- **Desktop**: >1200px - Layout completo con todas las características
- **Tablet**: 768px-1200px - Layout adaptado con navegación simplificada
- **Móvil**: <768px - Diseño móvil con menú hamburguesa

## Accesibilidad

- Navegación por teclado
- Contraste de colores WCAG compliant
- Estructura semántica HTML5
- ARIA labels donde es necesario
- Lectores de pantalla compatibles

## Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de usarlo como base para tu propio portafolio.

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún bug o tienes sugerencias:

1. Fork el proyecto
2. Crea una feature branch
3. Commit tus cambios
4. Push a la branch
5. Abre un Pull Request

## Créditos

- Icons por [Font Awesome](https://fontawesome.com/)
- Diseño inspirado en mejores prácticas de portafolios web modernos
- Optimizado para rendimiento y experiencia de usuario

---

**Creado con HTML5, CSS3 y JavaScript Vanilla**
