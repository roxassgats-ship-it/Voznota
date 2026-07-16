# 07 · Cinco ejemplos completos, paso a paso, sin tecnicismos

Cada ejemplo cuenta una historia entera del colegio: de dónde sale, cómo sube de
grado y en qué termina. Son los que pediste, con detalle y en lenguaje llano.

---

## Ejemplo 1 — De un prompt de notas de voz a una secretaria automática

**Punto de partida:** cada tanto le pegás a la IA una nota de voz transcripta y le
pedís "resumime esto y decime qué quedé debiendo". Funciona, pero lo hacés a mano.

1. **Grado 0:** guardás ese pedido tal cual en un archivo de borradores.
2. **Grado 1:** lo pasás a la plantilla de skill: le ponés nombre (`resumir-nota`),
   formato fijo de salida (título, resumen, tareas) y reglas para casos raros
   ("si el audio está cortado, avisá"). Preparás 10 notas viejas como examen:
   la skill aprueba 9. Promociona.
3. **Grado 2:** le ponés horario: todas las mañanas a las 8, revisa la carpeta de
   notas nuevas y deja los resúmenes listos. Corre una semana sin que la toques.
4. **Resultado:** cuando te levantás, los resúmenes ya están. Y como cada resumen
   queda registrado, el profesor de la materia "Lenguaje" usa los errores (una vez
   inventó una tarea que no estaba) para escribir la lección "No inventar pendientes".

**Qué aprendés del ejemplo:** un prompt tuyo de todos los días ya es medio camino;
la escuela solo le agrega formato, examen y horario.

## Ejemplo 2 — Nace el ingeniero de Python y termina siendo profesor

**Punto de partida:** juntaste 4 skills de programación: revisar código, escribir
pruebas, arreglar errores, y documentar.

1. **Grado 3:** creás el agente `ingeniero-python`. Su ficha dice: antes de trabajar,
   leé las lecciones de tu materia y tu libreta de errores pasados; después de
   trabajar, anotá lo aprendido. Le das 5 tareas reales del proyecto; otro agente
   revisa: aprueba 4. Es ingeniero.
2. **Trabajo real:** durante un mes te arregla código "por parte de atrás". Cada
   error que comete queda en su libreta (ej.: "se pierde con carpetas anidadas").
3. **Grado 4:** le agregás la skill de generar lecciones y un horario docente de dos
   días por semana. Escribe lecciones justo sobre lo que a él mismo le costó.
4. **La prueba de fuego:** creás un alumno nuevo con un modelo económico (Haiku).
   El alumno estudia SOLO las lecciones de este profesor y rinde el examen de
   Grado 1 de Python... y aprueba. Eso confirma al profesor en su cargo.

**Qué aprendés del ejemplo:** al profesor no lo evaluás por lo lindo que escribe,
sino porque sus alumnos aprueban. Igual que un colegio de verdad.

## Ejemplo 3 — La fábrica nocturna de pensamientos de estudio (el loop de Fable)

**Punto de partida:** querés aprovechar Fable 5 ahora, antes de dejar de usarlo.

1. Dejás programada una rutina nocturna: "cada noche, elegí una lección del corpus,
   generá 5 preguntas como las haría un alumno principiante y respondelas como el
   mejor profesor; verificá tus respuestas contra la lección; guardá los pares
   buenos en el archivo de dataset; máximo 15 pares por noche".
2. Cada mañana revisás por arriba: leés 2 o 3 pares al azar. Si vienen flojos,
   pausás y ajustás la consigna.
3. En 60 noches: ~900 pares pregunta-respuesta verificados, más los que generen los
   loops de otras materias.
4. **Destino de esos pensamientos:** hoy, material de estudio que los agentes leen;
   mañana, el dataset con el que se entrena tu modelo abierto propio (Etapa 4).

**Qué aprendés del ejemplo:** el "pensamiento imperioso de Fable" no se guarda como
magia: se guarda como pregunta + respuesta verificada. Ese formato es el que sirve
tanto para enseñar hoy como para entrenar mañana.

## Ejemplo 4 — Cambio de modelo sin perder la escuela (llega la hija Haiku)

**Punto de partida:** decidís que la materia "resúmenes y formatos" es demasiado
cara para pagarla con un modelo grande.

1. Tomás la MISMA definición del agente y la MISMA skill, pero la corrés con Haiku.
2. Le tomás el examen que ya existía: aprueba 6 de 10. Insuficiente.
3. El profesor de la materia mira los 4 errores: Haiku se pierde cuando la nota es
   muy larga. Escribe una lección de nivelación: "para notas largas, primero partí
   el texto en bloques, resumí cada bloque, después uní".
4. Haiku re-rinde con esa lección cargada: 9 de 10. Aprobado. La tabla de asignación
   registra: "resúmenes → Haiku (con lección de nivelación N-12)". Ahorro directo.

**Qué aprendés del ejemplo:** el banco de exámenes es lo que te permite cambiar de
modelo con confianza. Sin examen, cambiar de modelo es fe; con examen, es un trámite.

## Ejemplo 5 — La sala de profesores que se retroalimenta sola

**Punto de partida:** ya tenés 4 profesores (Python, Datos, Lenguaje, Agentes)
y querés que el colegio mejore sin que estés encima.

1. Rutina de los viernes: cada profesor lee las libretas de los alumnos de su
   materia y escribe un acta corta: "esta semana se repitió 3 veces el error X;
   propongo la lección Y; sugiero crear la skill Z".
2. Rutina del sábado: el director junta las 4 actas, poda lecciones duplicadas
   y arma el plan de la semana: qué lecciones se escriben, qué exámenes se toman.
3. Vos el domingo leés UNA página (el plan del director), tachás lo que no te
   convence y firmás el resto. Esa es toda tu intervención semanal.
4. El lunes los loops arrancan con el plan firmado. El ciclo se repite.

**Qué aprendés del ejemplo:** la retroalimentación no es una charla mística entre
IAs: son archivos que unos escriben y otros están obligados a leer. Libretas →
actas → plan → lecciones → libretas. Vos firmás una página por semana y el colegio
gira solo.
