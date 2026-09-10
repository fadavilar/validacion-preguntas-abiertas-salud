# Validación de Preguntas Abiertas con Voluntarios Sanos

Explorador interactivo de una revisión de alcance (marco PICO) sobre el uso de voluntarios sanos o muestras de población general para validar preguntas abiertas de instrumentos de medición en salud (cuestionarios, escalas, PROM), antes de su aplicación en pacientes. Búsqueda multibase (PubMed/MEDLINE, LILACS/BVS, Google Scholar, Embase, 2021–2026) con flujo de selección PRISMA.

**Vista en vivo:** se publica con GitHub Pages desde la rama `main` (carpeta raíz). Actívalo en *Settings → Pages* si aún no está activo.

## Contenido de la app

1. **Resumen ejecutivo** — cifras clave (201 registros → 179 cribados → 7 estudios incluidos).
2. **Estrategia de búsqueda** — las 4 bases consultadas, ecuación ejecutada y estado (automatizada vs. manual).
3. **Estudios incluidos** — tabla filtrable por calificación de calidad, con referencia APA 7 y gráfico del tamaño de muestra de voluntarios/población general por estudio.
4. **Evaluación de la calidad** — COSMIN (validez de contenido de PROM) y COREQ (estudio cualitativo comparativo).
5. **Síntesis y discusión** — un marco de tres fases, la síntesis temática de los 7 estudios y consideraciones éticas complementarias.
6. **Lagunas de evidencia**.
7. **Limitaciones y transparencia** — límites del informe y anexo de la ejecución manual (LILACS/BVS, Google Scholar, Embase).
8. **Metodología en breve** — PICO, diagrama de flujo PRISMA, bases consultadas y herramientas de calidad.

## Nota sobre el alcance de esta app

Esta aplicación es una síntesis infográfica de la revisión de alcance, no el informe completo (`.docx`), que permanece en el entorno local del autor junto con las exportaciones crudas de las búsquedas (CSV de PubMed/LILACS/Scholar/Embase).

## Stack técnico

HTML/CSS/JS sin build step (fácil de servir con GitHub Pages) y [Chart.js](https://www.chartjs.org/) vía CDN para el gráfico de tamaño de muestra.

- `index.html` — estructura y metadatos.
- `css/style.css` — sistema de diseño (tokens de color claro/oscuro, acordeones, responsive).
- `js/data.js` — todo el contenido editorial (estadísticas, PICO, estrategia de búsqueda, estudios, calidad, discusión, lagunas, limitaciones, metodología).
- `js/app.js` — renderizado, tema claro/oscuro persistente, acordeones, diagrama PRISMA en SVG y el gráfico de tamaño de muestra.

Para editar contenido, generalmente basta con modificar `js/data.js`; el resto se renderiza automáticamente.

## Autor

Fabian Dávila Ramírez, MD, MBA, PhD — Universidad de Navarra · Universidad de Bogotá Jorge Tadeo Lozano (Doctorado en Gestión y Modelado de Políticas Públicas)

## Licencia

Contenido bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
