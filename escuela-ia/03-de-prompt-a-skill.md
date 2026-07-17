# 03 · De prompt a skill: convertir, automatizar, ejecutar

Esta es la línea de montaje del colegio. Un prompt suelto entra por un lado y sale
una skill automatizada por el otro. Son 4 pasos.

---

## Paso 1 — Capturar el prompt (Grado 0)

Todo empieza con un prompt que ya te funcionó. Ejemplo real:

> "Tomá esta nota de voz transcripta y devolveme: un título de 5 palabras,
> un resumen de 3 líneas y una lista de tareas pendientes que se mencionen."

Guardalo tal cual en `corpus/borradores/` con una nota de cuándo funcionó bien y
cuándo falló. Ese archivo es el alumno de Grado 0.

## Paso 2 — Empaquetarlo como skill (Grado 0 → 1)

Una **skill** es una carpeta con un archivo `SKILL.md` adentro. El formato exacto
(copiá la plantilla de `plantillas/skill-plantilla/`):

```
.claude/skills/resumir-nota/
├── SKILL.md          ← el prompt convertido en instrucciones
└── casos/            ← 10 casos de prueba para su examen
    ├── caso-01-entrada.txt
    ├── caso-01-esperado.txt
    └── ...
```

Y el `SKILL.md`:

```markdown
---
name: resumir-nota
description: Resume una nota de voz transcripta en título, resumen y tareas. Usar cuando el usuario pegue una transcripción o pida resumir una nota.
---

# Resumir nota

Recibís el texto de una nota de voz transcripta. Devolvé SIEMPRE este formato:

## Título
(máximo 5 palabras)

## Resumen
(exactamente 3 líneas)

## Tareas pendientes
- (una por línea; si no hay ninguna, escribí "Sin tareas")

Reglas:
- No inventes tareas que no estén en el texto.
- Si el texto está cortado o ilegible, decilo en el resumen.
```

**Qué cambió respecto del prompt suelto:** ahora tiene nombre, una descripción que
dice CUÁNDO usarla (eso es lo que permite que se active sola), formato de salida
fijo y reglas para los casos raros. Eso es "convertir un prompt en skill".

## Paso 3 — Permitir que se ejecute (activación)

Hay tres formas de que una skill se ejecute, de más manual a más automática:

1. **Por nombre:** escribís `/resumir-nota` en Claude Code y corre.
2. **Por contexto (semi-automática):** como la skill vive en `.claude/skills/` y su
   `description` dice cuándo usarla, Claude la activa solo cuando la conversación
   coincide ("che, resumime esta nota" → se dispara sin que la nombres).
3. **Por lote (script):** un script recorre archivos y llama a la skill por cada uno:

```bash
# procesar-notas.sh — corre la skill sobre cada nota nueva
for nota in notas-nuevas/*.txt; do
  claude -p "/resumir-nota $(cat "$nota")" > "resumenes/$(basename "$nota")"
done
```

## Paso 4 — Automatizarla del todo (Grado 1 → 2)

Para que corra **sin que nadie la llame**, se le pone un disparador:

- **Por horario (cron/rutina):** "todos los días a las 8, procesá las notas nuevas".
  En Claude Code se hace con una rutina programada (Routine/cron) que manda el
  prompt a la sesión a la hora fijada. En una computadora propia, con `cron` de
  Linux llamando al script del Paso 3.
- **Por evento (hook):** "cuando aparezca un archivo nuevo en `notas-nuevas/`,
  procesalo". Se configura un hook o un watcher de carpeta que dispara el script.
- **Encadenada:** otra skill la llama al terminar. Ejemplo: la skill
  `transcribir-audio` termina y su último paso es invocar `resumir-nota`.
  Las cadenas se escriben en el propio SKILL.md ("al terminar, ejecutá X").

**Regla de seguridad del colegio:** toda skill automatizada tiene un **freno**:
un máximo de ejecuciones por día y una carpeta de salida separada, para que si
un día produce basura, la basura quede contenida y sea fácil de borrar.

---

## El ciclo completo, en un dibujo

```
prompt suelto ──(plantilla)──▶ SKILL.md ──(10 casos de prueba)──▶ skill Grado 1
                                                                      │
                             skill Grado 2 ◀──(cron / hook / cadena)──┘
                                   │
                                   ▼
                     corre sola, escribe salidas,
                     su libreta registra aciertos y errores
                                   │
                                   ▼
              con 5 skills de la misma materia maduras,
              nace el AGENTE INGENIERO (ver archivo 04)
```

## Preguntas frecuentes

**¿Cuántos prompts hacen falta para una skill?** Uno bueno alcanza. La plantilla te
obliga a agregarle lo que le falta (casos raros, formato fijo).

**¿Cómo sé si la skill está lista para automatizarse?** Cuando aprueba su examen de
Grado 1 (8 de 10 casos) y sus salidas no necesitan retoque manual.

**¿Las skills sirven en otros modelos?** Sí — son texto. La misma SKILL.md la puede
ejecutar Fable, Opus, Sonnet, Haiku o un modelo abierto. Por eso el colegio invierte
en skills y no en trucos de un solo modelo. (Con modelos más chicos, agregale más
ejemplos dentro del SKILL.md: los chicos necesitan más ejemplos y menos abstracción.)
