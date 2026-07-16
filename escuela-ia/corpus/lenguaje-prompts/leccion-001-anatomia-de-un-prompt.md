# Lección 001 · Anatomía de un prompt que no falla

- Materia / capa / subcapa: Lenguaje y Prompts / 1.1 / anatomía del prompt
- Grado al que apunta: 0-1
- Autor: profesor-fundador (Claude Fable 5), 2026-07-16
- Origen: lección inaugural del corpus (demuestra el formato oficial)

## Qué vas a saber hacer al terminar
Vas a poder mirar cualquier prompt y decir cuál de sus 5 partes le falta, y
completarla.

## La idea
Un prompt confiable tiene 5 partes. Si falla, casi siempre es porque falta una:

1. **Rol** — quién sos al responder ("sos un corrector de exámenes").
2. **Contexto** — qué hay que saber antes ("el alumno es un modelo chico").
3. **Tarea** — el verbo concreto ("puntuá cada caso de 0 a 1").
4. **Formato** — la forma exacta de la salida ("tabla con columnas X, Y").
5. **Límites** — qué no hacer ("no inventes casos; ante duda, puntuá 0 y anotá").

Los prompts caseros suelen tener solo la Tarea. Por eso funcionan "a veces":
el modelo adivina el resto y cada día adivina distinto. Fijar las otras 4 partes
es lo que vuelve el resultado repetible — y lo repetible es lo único que puede
convertirse en skill.

## Ejemplo resuelto
Prompt casero: *"resumime esta nota"*.
- Rol: falta → "Sos la secretaria del proyecto."
- Contexto: falta → "La nota es una transcripción de voz, puede tener errores."
- Tarea: está → "Resumila."
- Formato: falta → "Título (≤5 palabras), resumen (3 líneas), lista de tareas."
- Límites: falta → "No inventes tareas que no estén; si está cortada, avisá."

Resultado: el mismo pedido pasa de acertar 6/10 veces a 9/10, sin cambiar de
modelo. Solo se le dejó de pedir que adivine.

## Errores típicos
- Poner dos tareas en un prompt ("resumí y además traducí") → partir en dos.
- Formato descrito vago ("prolijo", "bien organizado") → dar encabezados exactos.
- Límites ausentes → el modelo rellena huecos con inventos.

## Autoexamen
1. ¿Cuáles son las 5 partes?
2. Al prompt "arreglá este código" ¿qué 4 partes le faltan?
3. ¿Por qué lo repetible es requisito para ser skill?

Respuestas: (1) rol, contexto, tarea, formato, límites. (2) rol, contexto,
formato, límites. (3) porque el examen de Grado 0→1 exige el mismo buen
resultado 3 veces seguidas: sin repetibilidad no hay promoción.
