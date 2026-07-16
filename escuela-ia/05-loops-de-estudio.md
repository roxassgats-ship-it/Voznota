# 05 · Loops de estudio: poner a Fable 5 a generar pensamientos

Tu pregunta exacta: *"¿cómo hago que Fable empiece a trabajar en loops y genere
pensamientos de estudio para que las IAs del futuro se entrenen con eso?"*

Un "pensamiento de estudio" en esta escuela es simplemente **una lección escrita al
corpus con la plantilla oficial**. Un loop es algo que despierta al modelo cada
cierto tiempo para que produzca una. Acá están las 4 formas de armar el loop, de la
más simple a la más completa.

---

## Forma 1 — El loop de sesión (`/loop`): el más simple

En una sesión de Claude Code le decís:

```
/loop 30m Leé escuela-ia/corpus/programacion-python/INDICE.md, elegí la subcapa
con menos lecciones, y escribí UNA lección nueva con la plantilla
escuela-ia/plantillas/leccion.md. Guardala en el corpus, actualizá el índice
y hacé commit.
```

Cada 30 minutos produce una lección. Lo frenas cuando quieras. Ideal para una tarde
de "clases intensivas" mientras hacés otra cosa.

**Freno obligatorio:** decile también "si ya hay 10 lecciones nuevas hoy, no
escribas más y avisame". Un loop sin freno llena el corpus de relleno.

## Forma 2 — La rutina programada (Routine/cron): el horario escolar

Para que las clases pasen todos los días aunque no estés, se crea una rutina
programada (en Claude Code remoto se llama Routine; en tu máquina, un cron).
Ejemplo de horario escolar semanal:

| Día y hora | Rutina | Qué hace |
|---|---|---|
| Lun 08:00 | clase-python | profesor-python escribe 1 lección sobre la debilidad más repetida en libretas |
| Mar 08:00 | clase-datos | profesor-datos escribe 1 lección + 2 casos de examen nuevos |
| Mié 08:00 | examenes | se toman los exámenes pendientes; los profesores corrigen |
| Jue 08:00 | clase-agentes | profesor-agentes revisa skills en Grado 1 y propone cuáles automatizar |
| Vie 08:00 | sala-profesores | reunión: actas de debilidades y plan de la semana próxima |
| Sáb 09:00 | limpieza | el director poda lecciones duplicadas o viejas del corpus |

Cada rutina es un prompt fijo que arranca una sesión nueva, hace su trabajo,
committea y termina. El colegio funciona solo; vos leés las actas.

## Forma 3 — El loop generador de dataset: pensar en pares pregunta-respuesta

Este es el loop clave para el **futuro** (archivo 06). En vez de lecciones en prosa,
Fable genera **pares de pregunta-respuesta** de su materia, que es el formato con el
que después se entrenan modelos abiertos:

```
/loop 20m Abrí escuela-ia/corpus/programacion-python/ y elegí una lección al azar.
Generá 5 pares pregunta-respuesta basados en esa lección: la pregunta como la haría
un alumno principiante, la respuesta como la daría el mejor profesor (correcta,
completa, con un ejemplo). Guardalos agregándolos a
escuela-ia/corpus/datasets/python.jsonl con el formato de una línea JSON por par.
Después verificá tus propias 5 respuestas contra la lección: si alguna contradice
la lección, borrala. Commit al final.
```

Con esto, cada hora de Fable deja ~15 pares verificados. En un mes tenés miles:
eso ES el material de entrenamiento del futuro, generado por el modelo grande
mientras todavía lo tenés.

## Forma 4 — El loop de auto-mejora (el más avanzado)

Un loop que no genera contenido nuevo sino que **mejora el existente**:

```
Rutina nocturna (Dom 22:00):
1. Elegí las 3 lecciones más viejas del corpus.
2. Rendí vos mismo el examen asociado a cada una, usando SOLO la lección como apoyo.
3. Si sacaste menos de 8/10 en alguna, la lección es mala aunque parezca linda:
   reescribila hasta que el examen se pueda aprobar solo con leerla.
4. Registrá en el acta qué reescribiste y por qué.
```

Este loop es el control de calidad: garantiza que el corpus que heredarán los
modelos chicos de verdad enseña, y no acumula texto muerto.

---

## Las 5 reglas de seguridad de todo loop

1. **Freno de cantidad:** máximo de lecciones/pares por día. Siempre.
2. **Freno de gasto:** las materias caras (razonamiento profundo) van con Fable/Opus;
   las repetitivas (formatear, indexar, deduplicar) van con Haiku. Definilo en la rutina.
3. **Todo commit, nada suelto:** cada iteración termina en un commit con mensaje
   claro. Si un loop enloquece, se revierte con git y no pasó nada.
4. **Salida separada:** los loops escriben SOLO dentro de `corpus/`. Jamás tocan
   código del proyecto ni definiciones de agentes (eso lo hacen tareas supervisadas).
5. **Revisión por muestreo:** vos leés 1 de cada 10 lecciones. Si la muestra viene
   floja, se pausa el loop y se ajusta el prompt de la rutina.

## ¿Y cómo "aprenden" las IAs del futuro con estos pensamientos?

Tres vías, de hoy a mañana:

1. **Hoy — contexto:** el agente nuevo lee las lecciones al arrancar (sus
   instrucciones lo obligan; ver archivo 04). Aprende "en el momento", cada sesión.
2. **Mediano plazo — memoria fija:** las lecciones más importantes se destilan a los
   CLAUDE.md y a las definiciones de agentes: eso se carga SIEMPRE, sin pedirlo.
3. **Largo plazo — entrenamiento real:** los `datasets/*.jsonl` de la Forma 3 se usan
   para fine-tunear un modelo abierto propio (archivo 06). Ahí los pensamientos de
   Fable pasan literalmente al cerebro del modelo nuevo.
