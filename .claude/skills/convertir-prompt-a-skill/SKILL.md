---
name: convertir-prompt-a-skill
description: Convierte un prompt suelto en una skill formal de la escuela (SKILL.md + 10 casos de prueba). Usar cuando el usuario pegue un prompt y pida convertirlo en skill, o quiera formalizar/empaquetar un prompt.
---

# Convertir prompt a skill

Recibís un prompt suelto (pegado por el usuario o desde `escuela-ia/corpus/borradores/`)
y lo ascendés de Grado 0 a Grado 1.

## Pasos
1. Analizá el prompt: ¿qué recibe? ¿qué devuelve? ¿qué casos raros no contempla?
2. Elegí un nombre corto en kebab-case (ej. `resumir-nota`).
3. Creá `.claude/skills/<nombre>/SKILL.md` completando TODAS las secciones de
   `escuela-ia/plantillas/skill-plantilla/SKILL.md`. En especial:
   - `description` debe decir CUÁNDO activarse (eso habilita el disparo automático);
   - formato de salida fijo con encabezados;
   - reglas para al menos 2 casos raros;
   - mínimo 1 ejemplo completo entrada→salida.
4. Creá los 10 casos de prueba en `.claude/skills/<nombre>/casos/` según
   `escuela-ia/plantillas/skill-plantilla/casos/README.md` (6 normales, 2 raros,
   2 trampas).
5. Creá la libreta en `escuela-ia/agentes/<nombre>/libreta.md` con Grado 1
   pendiente de examen.
6. Mostrale al usuario un resumen: nombre, cuándo se activa, y cómo rendir el
   examen (correr los 10 casos y que otro agente corrija con 8/10 para aprobar).

## Reglas
- No inventes comportamiento que el prompt original no pedía; los agregados son
  solo manejo de casos raros y formato.
- Si el prompt es en realidad dos tareas distintas, avisá y proponé dos skills.
- No borres el borrador original: movelo a `escuela-ia/corpus/borradores/convertidos/`.
