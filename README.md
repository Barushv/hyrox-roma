# Hyrox Roma 2025 — PWA de Entrenamiento

PWA para seguimiento del plan de entrenamiento Hyrox Roma 2025 (Dobles Mixtos · Cat 30–39 · 26 Septiembre).

## Stack

- React 18 + Vite 4
- Tailwind CSS 3
- PWA: manifest.json + Service Worker manual
- Deploy: GitHub Pages

## Instalación local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173/hyrox-roma/`

## Build y deploy

```bash
# Solo build
npm run build

# Build + deploy a GitHub Pages
npm run deploy
```

El deploy automático también corre via GitHub Actions en cada push a `main`.

## Configuración de GitHub Pages

1. Crear el repositorio en GitHub como `hyrox-roma`
2. En **Settings → Pages**, seleccionar rama `gh-pages` y carpeta `/ (root)`
3. La app queda disponible en `https://<usuario>.github.io/hyrox-roma/`

## Funcionalidades

- **Selección de perfil**: 2 perfiles con nombres editables, guardados en localStorage
- **Home**: detección automática de semana según fecha actual (inicio: 2025-06-03)
- **Semana**: 7 días con estado (completado / hoy / pendiente / descanso)
- **Día**: ejercicios con checkbox, agrupados por bloque, fondo amarillo para ejercicios clave
- **Mini-calendario**: navegación entre las 16 semanas
- **Tests**: tabla editable con indicador de mejora entre sesiones
- **PWA**: funciona offline después de la primera carga

## Colores por fase

| Fase | Semanas | Color |
|------|---------|-------|
| Fase 1 | S1–S4 | `#185FA5` Azul |
| Fase 2 | S5–S8 | `#3B6D11` Verde |
| Fase 3 | S9–S12 | `#993C1D` Naranja |
| Fase 4 | S13–S16 | `#534AB7` Morado |
