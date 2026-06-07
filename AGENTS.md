---
instructions: |
  ## Design System
  El design system del proyecto está documentado en DESIGN.md. Antes de modificar estilos o componentes, revisa ese archivo para mantener consistencia visual.

  ## Terminal — rtk
  Antes de cada comando shell, anteponer `rtk` para filtrar y comprimir output:
  - `rtk ls` — listar directorios
  - `rtk tree` — árbol de directorios
  - `rtk read <file>` — leer archivos (filtra líneas irrelevantes)
  - `rtk grep <pattern>` — grep compacto
  - `rtk git <cmd>` — git compacto
  - `rtk err -- <cmd>` — solo errores
  - `rtk summary -- <cmd>` — resumen en 2 líneas
  - `rtk diff` — diff ultra-condensado
  - `rtk find <args>` — find con tree compacto
  - `rtk deps` — resumen de dependencias
  - `rtk log` — filtrar logs

  ## Cursor Pointer
  Todos los botones (`<button>`) y enlaces (`<a>`) deben incluir la clase `cursor-pointer`. Revisa que todos los elementos interactivos la tengan.

  ## Token Saving
  - Usa `/caveman` para respuestas ultra-comprimidas (~75% menos tokens)
  - Prefiere `session_store_sql` sobre leer archivos históricos
  - Usa `memory` para guardar hechos recurrentes en `/memories/repo/`
---
