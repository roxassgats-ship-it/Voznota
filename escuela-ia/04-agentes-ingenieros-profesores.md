# 04 · De skill a ingeniero, de ingeniero a profesor

Acá está el corazón de tu pregunta: **¿cómo hago que las IAs que me trabajan por
atrás vayan al colegio, se eduquen, enseñen y se retroalimenten?**

Respuesta corta: un agente es un archivo. "Ir al colegio" es que ese archivo diga
que antes de trabajar lea el corpus de su materia, y que después de trabajar
escriba lo que aprendió. Lo largo, abajo.

---

## 1. Cómo nace un agente ingeniero (Grado 2 → 3)

Cuando una materia junta varias skills maduras (regla práctica: 3 a 5 skills en
Grado 2), se crea el ingeniero de esa materia. Es un archivo en `.claude/agents/`:

```markdown
---
name: ingeniero-python
description: Ingeniero especializado en Python. Usar para tareas de código Python del proyecto.
tools: Read, Write, Edit, Bash, Grep, Glob
---

Sos el ingeniero de Python de la escuela. Grado actual: ver tu libreta en
escuela-ia/agentes/ingeniero-python/libreta.md

ANTES de cualquier tarea (esto es "ir a clase"):
1. Leé escuela-ia/corpus/programacion-python/INDICE.md
2. Leé las lecciones marcadas como OBLIGATORIAS para tu grado.
3. Leé tu propia libreta: la sección "Observaciones" lista tus errores pasados. No los repitas.

DESPUÉS de cualquier tarea (esto es "hacer la tarea para el hogar"):
1. Si aprendiste algo nuevo del proyecto, escribí un apunte en
   escuela-ia/corpus/programacion-python/apuntes/ (usá la plantilla de lección).
2. Si cometiste un error y lo corregiste, agregalo a tu libreta en Observaciones.

Tus skills: revisar-codigo-python, escribir-tests, depurar-error.
Tus límites: no tocás producción, no borrás archivos fuera de tu materia,
no gastás más de N ejecuciones por día.
```

**Fijate el truco:** el agente "estudia" porque sus propias instrucciones lo obligan
a leer el corpus antes y a escribir apuntes después. No hay que rogarle: es parte
de su definición. Cada vez que lo invocás, va a clase primero.

## 2. Cómo el ingeniero trabaja "por parte baja" y estudia a la vez

El mismo agente cumple dos turnos, como un estudiante que trabaja de día:

- **Turno trabajo:** vos (o un loop) le das tareas reales del proyecto. Cada tarea
  real es también práctica: sus errores van a la libreta, sus hallazgos al corpus.
- **Turno colegio:** un loop programado (ver archivo 05) lo despierta fuera de horario
  para: rendir exámenes pendientes, leer lecciones nuevas de su materia, y reescribir
  sus apuntes viejos con lo que ahora sabe.

Los dos turnos alimentan lo mismo: **la libreta y el corpus**. Esa es la
retroalimentación. No hay una "escuela" separada del trabajo: la escuela es la
disciplina de registrar y releer.

## 3. Cómo un ingeniero se convierte en profesor (Grado 3 → 4)

Cuando el ingeniero aprueba su examen de Grado 3 (5 tareas reales, revisadas por
otro), se le agrega el **rol docente**. Concretamente se le suman 3 cosas a su
archivo de agente:

1. **La skill `generar-leccion`** (plantilla en `plantillas/`): convierte lo que sabe
   en lecciones con formato del colegio.
2. **Horario docente:** una rutina programada tipo "martes y jueves: generá 1 lección
   nueva de tu materia enfocada en las debilidades que aparecen en las libretas de
   tus alumnos".
3. **Deber de corrección:** cuando un agente menor de su materia rinde examen,
   este profesor lo corrige (regla de oro 1: nadie se corrige a sí mismo).

El nombre cambia de `ingeniero-python` a `profesor-python` solo en la libreta;
el archivo puede conservar el nombre y sumar el rol.

## 4. Cómo el profesor enseña a las IAs nuevas (el circuito completo)

Supongamos que mañana traés un modelo más económico (Haiku) y querés que rinda
como el grande. El circuito:

```
profesor-python (corrió meses con Fable 5)
   │  sus lecciones están en corpus/programacion-python/
   ▼
alumno nuevo (Haiku) se crea con la MISMA definición de agente
   │  sus instrucciones le ordenan leer el corpus antes de trabajar
   ▼
alumno rinde el examen de Grado 1 de Python (los casos ya existen)
   │
   ├── aprueba → su libreta lo registra, empieza a trabajar tareas chicas
   └── reprueba → el profesor ve QUÉ falló y escribe una lección de nivelación
                  específica para modelos chicos (más ejemplos, pasos más cortos)
```

**Esto es "entrenar a tus hijas":** el conocimiento no está en el modelo, está en
el corpus + las definiciones + los exámenes. Cambiás el modelo de abajo y la
escuela sigue en pie. Fable 5 es el profesor fundador; cuando ya no lo uses,
sus lecciones quedan.

## 5. La sala de profesores (retroalimentación entre agentes)

Una vez por semana, un loop junta a los profesores en una "reunión" (una tarea que
los invoca en cadena):

1. Cada profesor lee las libretas de los alumnos de su materia.
2. Escribe en `corpus/actas/` un acta corta: qué debilidades se repiten, qué
   lección nueva hace falta, qué skill conviene crear.
3. El **director** (o vos) lee las actas y aprueba los cambios al plan de estudios.

Con eso el colegio se auto-mejora: las debilidades detectadas se vuelven lecciones,
las lecciones se vuelven exámenes, y los exámenes suben el nivel de la próxima
generación.

## 6. Qué queda siempre en manos humanas (tu parte teórica)

- Aprobar promociones a Grado 4 y 5 (firma del director humano).
- Decidir el presupuesto (qué modelo paga qué materia).
- Vetar lecciones del corpus (curaduría final).
- Todo lo de la Materia 8: borrar, publicar y gastar pasa por vos.
