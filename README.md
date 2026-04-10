# Portafolio Web Personal

Un portafolio web moderno, responsive y profesional diseñado para showcase de proyectos y habilidades de desarrollo.

## Características

- **Diseño Moderno**: Interfaz limpia y profesional con gradientes y animaciones suaves
- **Totalmente Responsive**: Se adapta perfectamente a dispositivos móviles, tablets y desktop
- **Optimizado para SEO**: Meta tags optimizados y estructura semántica HTML5
- **Alto Rendimiento**: Lazy loading, animaciones optimizadas y código limpio
- **Interactivo**: Menú navegación móvil, scroll animations y formulario de contacto funcional
- **Accesible**: Cumple con estándares de accesibilidad web

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Flexbox, Grid, animaciones y diseño responsive
- **JavaScript Vanilla**: Interactividad sin dependencias externas
- **Font Awesome**: Iconos profesionales

## Estructura del Proyecto

```
IosifStalin6773.github.io/
    index.html          # Página principal del portafolio
    styles.css          # Estilos CSS con diseño responsive
    script.js           # Funcionalidad JavaScript
    README.md           # Documentación del proyecto
```

## Secciones del Portafolio

1. **Hero Section**: Presentación personal con llamada a la acción
2. **About Me**: Información personal y profesional
3. **Projects**: Showcase de proyectos destacados
4. **Skills**: Habilidades técnicas organizadas por categorías
5. **Contact**: Formulario de contacto e información de contacto

## Personalización

### Cambiar Información Personal

Edita los siguientes archivos:

1. **index.html**:
   - Cambia "Tu Nombre" en el logo y título
   - Actualiza la información en la sección "About"
   - Modifica los proyectos y habilidades
   - Actualiza la información de contacto

2. **styles.css**:
   - Personaliza colores en las variables CSS:
     ```css
     :root {
         --primary-color: #667eea;
         --secondary-color: #764ba2;
     }
     ```

### Añadir Nuevos Proyectos

Copia una de las tarjetas de proyecto existente en `index.html`:

```html
<div class="project-card">
    <div class="project-image">
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
