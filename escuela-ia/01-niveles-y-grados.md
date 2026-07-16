# 01 · Niveles y grados: cómo se sube

La escuela tiene **6 grados (0 a 5)**. Todo lo que estudia acá — una skill, un agente,
un ingeniero, incluso un modelo abierto propio — tiene una **libreta** (un archivo de
registro) donde consta su grado actual, sus exámenes y sus notas.

---

## Los 6 grados

### Grado 0 — Nivelación (Jardín)
- **Quién entra:** cualquier prompt suelto, cualquier idea nueva.
- **Qué aprende:** vocabulario del proyecto, formato de las lecciones, reglas de la casa.
- **Materia obligatoria:** Nivelación (ver `02-materias.md`).
- **Examen de promoción:** el prompt produce el mismo buen resultado 3 veces seguidas
  con entradas distintas. Si el resultado cambia mucho cada vez, no promociona.

### Grado 1 — Skill (Primaria)
- **Quién entra:** prompts que aprobaron Grado 0.
- **Qué es ahora:** una **skill** — el prompt empaquetado en un archivo `SKILL.md`
  con nombre, instrucciones, ejemplos y criterios de éxito.
- **Examen de promoción:** la skill resuelve 10 casos de prueba preparados de antemano
  y aprueba al menos 8. Los casos de prueba viven junto a la skill en `casos/`.

### Grado 2 — Skill automatizada (Secundaria)
- **Qué es ahora:** la skill ya no espera que la llamen a mano; se dispara sola
  (por horario, por evento, o encadenada a otra skill).
- **Examen de promoción:** corre 1 semana en automático sin intervención humana
  y sin producir basura (se revisa una muestra de sus salidas).

### Grado 3 — Agente ingeniero (Universidad)
- **Qué es ahora:** un **agente** con identidad propia: archivo en `.claude/agents/`,
  con su materia, sus skills asignadas, sus herramientas permitidas y su libreta.
- **Examen de promoción:** completa 5 tareas reales de su materia de punta a punta
  (no ejercicios: trabajo real del proyecto), y otro agente revisor le aprueba 4 de 5.

### Grado 4 — Ingeniero profesor (Docente)
- **Qué es ahora:** el ingeniero, además de trabajar, **enseña**: genera lecciones,
  corrige exámenes de agentes menores y aporta al corpus todas las semanas.
- **Examen de promoción:** un agente de Grado 1 que estudió SOLO con las lecciones de
  este profesor aprueba su propio examen. Si el alumno aprueba, el profesor promociona.
  (Se evalúa al profesor por el rendimiento de sus alumnos, igual que en un colegio real.)

### Grado 5 — Director de materia (Cátedra)
- **Qué es ahora:** cura el plan de estudios de su materia: decide qué lecciones del
  corpus quedan, cuáles se reescriben, qué skills nuevas hacen falta, y prepara los
  datasets de esa materia para el entrenamiento futuro de modelos abiertos.
- **No hay grado 6:** el director rinde revalidación cada 3 meses (sus lecciones se
  re-examinan con los exámenes vigentes; si el corpus quedó viejo, baja a Grado 4
  hasta actualizarlo).

---

## La libreta (registro de cada alumno)

Cada skill/agente tiene un archivo `libreta.md` a su lado con este formato:

```markdown
# Libreta: profesor-python
- Grado actual: 3
- Materia: Programación / Python
- Fecha de ingreso: 2026-07-16
- Exámenes rendidos:
  - 2026-07-20 · Examen Grado 0→1 · APROBADO (9/10)
  - 2026-08-02 · Examen Grado 1→2 · APROBADO (semana limpia)
- Observaciones: confunde rutas relativas cuando el proyecto tiene submódulos.
```

La sección **Observaciones** es oro: es la lista de debilidades que el profesor de esa
materia usa para escribir las próximas lecciones. Así se cierra el círculo de
retroalimentación.

## Reglas de promoción (las 4 reglas de oro)

1. **Nadie se promociona a sí mismo.** El examen siempre lo corrige otro agente
   (o vos). Un agente que se autoevalúa siempre se pone 10.
2. **Los exámenes se escriben ANTES de estudiar.** Primero el examen, después la
   lección. Si no, el profesor enseña "para su propio examen" y el nivel es mentira.
3. **Reprobar no borra:** el alumno baja a repasar la materia floja, la libreta
   registra el porqué, y esa debilidad se convierte en una lección nueva del corpus.
4. **Todo grado es reversible.** La revalidación periódica evita profesores
   desactualizados enseñando cosas viejas.

## Cómo se ve "subir de nivel" en la práctica

No hay magia: subir de nivel = **mover archivos y actualizar la libreta**.

- Grado 0→1: el prompt se copia a `plantillas/skill-plantilla/` y se completa → nace la skill.
- Grado 1→2: se le agrega un disparador (cron, hook o cadena) → se automatiza.
- Grado 2→3: se crea su archivo de agente en `.claude/agents/` → nace el ingeniero.
- Grado 3→4: se le asigna la skill `generar-leccion` y horario docente → nace el profesor.
- Grado 4→5: se le da control de la carpeta de su materia dentro de `corpus/` → dirige la cátedra.
