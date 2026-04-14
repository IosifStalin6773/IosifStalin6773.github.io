# Configuración para GitHub Pages

## Pasos para Configurar el Despliegue Automático

### 1. Configurar GitHub Pages en el Repositorio

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings**
3. En el menú lateral, ve a **Pages**
4. En "Source", selecciona **GitHub Actions**

### 2. Activar GitHub Actions.

1. Ve a **Settings** > **Actions** > **General**
2. En "Workflow permissions", selecciona:
   - **Read and write permissions**
   - **Allow GitHub Actions to create and approve pull requests**
3. Haz clic en **Save**

### 3. Verificar el Workflow

El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente cuando:
- Hagas push a la rama `main`
- Crees un pull request a la rama `main`

### 4. URLs del Sitio

- **URL de GitHub Pages**: `https://iosifstalin6773.github.io/IosifStalin6773.github.io/`
- **URL del repositorio**: `https://github.com/IosifStalin6773/IosifStalin6773.github.io`

## Comandos de Desarrollo

### Para Desarrollo Local (sin path prefix)
```bash
npm run dev:local    # Servidor de desarrollo local
npm run build:local # Build para producción local
```

### Para GitHub Pages (con path prefix)
```bash
npm run dev    # Servidor con path prefix de GitHub Pages
npm run build # Build para GitHub Pages
```

## Estructura de Archivos para GitHub Pages

```
IosifStalin6773.github.io/
  .github/workflows/deploy.yml    # Workflow de despliegue
  .eleventy.js                     # Configuración de Eleventy
  src/                            # Archivos fuente
  public/                         # Archivos generados (deploy)
```

## Flujo de Trabajo

1. **Desarrollar**: Trabaja en la carpeta `src/`
2. **Probar Local**: Usa `npm run dev:local`
3. **Hacer Commit**: Git commit y push a main
4. **Despliegue Automático**: GitHub Actions construye y despliega
5. **Ver Resultado**: Visita la URL de GitHub Pages

## Solución de Problemas

### Si el sitio no carga correctamente:
1. Verifica que GitHub Pages esté activado en Settings > Pages
2. Revisa el log del workflow en Actions tab
3. Asegúrate de que las URLs en `src/_data/site.json` sean correctas

### Si los assets no cargan:
1. Verifica que el path prefix esté configurado correctamente
2. Revisa que los archivos estén en la carpeta `public/`
3. Confirma que las URLs usen el path prefix correcto

### Si el workflow falla:
1. Ve a la pestaña Actions en GitHub
2. Revisa el error en el log del workflow
3. Verifica que todas las dependencias estén en package.json

## Variables de Entorno

El workflow usa automáticamente:
- `ELEVENTY_PATH_PREFIX=/IosifStalin6773.github.io/` para GitHub Pages
- Node.js 18 para compatibilidad

## Actualizaciones Futuras

Cuando añadas nuevas páginas o posts:
1. Crea los archivos en `src/`
2. Haz commit y push
3. El despliegue será automático

No necesitas configurar nada adicional después de la configuración inicial.
