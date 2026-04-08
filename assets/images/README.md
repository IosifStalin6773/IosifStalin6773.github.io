# Sistema de Gestión de Imágenes

## Estructura de Carpetas

```
assets/images/
  profile/          # Fotos de perfil y personales
  projects/         # Imágenes de proyectos
  hero/            # Imágenes principales del hero section
  backgrounds/     # Imágenes de fondo
```

## Cómo Usar Imágenes Fácilmente

### 1. Para el Hero Section
- Coloca tu imagen en `assets/images/hero/`
- Nombra el archivo: `hero-image.jpg` (o .png, .webp)
- La imagen se cargará automáticamente

### 2. Para Perfil
- Coloca tu foto en `assets/images/profile/`
- Nombra el archivo: `profile.jpg` (o .png, .webp)
- Se usará en el hero section y footer

### 3. Para Proyectos
- Coloca imágenes en `assets/images/projects/`
- Nombra los archivos según el proyecto:
  - `all-in-one-bot.jpg`
  - `macos-ventura.jpg`
  - `eft-helix-framework.jpg`
  - `permaprops-fivem.jpg`

### 4. Para Fondos
- Coloca imágenes de fondo en `assets/images/backgrounds/`
- Puedes usar: `bg-pattern.jpg`, `bg-gradient.jpg`

## Formatos Soportados
- `.jpg` - Recomendado para fotos
- `.png` - Para transparencias
- `.webp` - Moderno, mejor compresión

## Optimización Automática
El sistema detecta automáticamente las imágenes y:
- Aplica lazy loading
- Optimiza el tamaño
- Añade placeholders
- Maneja errores de carga

## Ejemplo de Uso
Simplemente coloca las imágenes en las carpetas correctas con los nombres estándar y el sistema las detectará automáticamente.
