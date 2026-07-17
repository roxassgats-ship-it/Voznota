---
name: generar-leccion
description: Genera una lección nueva para el corpus de la escuela de IA con la plantilla oficial. Usar cuando se pida escribir una lección, dar clase, o cuando un loop de estudio esté activo.
---

# Generar lección

Escribís UNA lección nueva para el corpus de la escuela.

## Pasos
1. Leé `escuela-ia/corpus/` y elegí la materia indicada (si no se indicó, la
   subcapa con menos lecciones según los INDICE.md).
2. Revisá las libretas en `escuela-ia/agentes/*/libreta.md`: si hay una debilidad
   repetida en "Observaciones" de esa materia, la lección trata ESO.
3. Escribí la lección siguiendo EXACTAMENTE `escuela-ia/plantillas/leccion.md`,
   numerándola a continuación de la última del índice.
4. Verificá tu propia lección: respondé su autoexamen usando solo la lección.
   Si no se puede aprobar solo leyéndola, reescribila antes de guardar.
5. Guardala en `escuela-ia/corpus/<materia>/` y actualizá el `INDICE.md`.
6. **OBLIGATORIO (regla E13):** verificá la razón exámenes/lecciones con un
   comando. Si tu lección la deja bajo 1, escribí el examen que la cubre EN EL
   MISMO COMMIT. Una lección sin examen no se entrega — es el patrón E3/E10/E13,
   el error más reincidente del colegio.
7. Hacé commit con mensaje: `corpus(<materia>): leccion NNN - <tema>` (+ examen si aplica).

## Reglas
- Una lección enseña UNA sola cosa.
- Máximo media página de "La idea"; el resto es ejemplo y autoexamen.
- Freno: si hoy ya se crearon 10 lecciones (mirá el log de git del día), no
  escribas más; avisá que se alcanzó el límite diario.
- Solo escribís dentro de `escuela-ia/corpus/`.
