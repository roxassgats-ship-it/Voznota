# Lección 002 · Cruzar y resumir: JOIN y GROUP BY

- Materia / capa / subcapa: Datos / SQL / consultas
- Grado al que apunta: media (30%)
- Autor: profesor-fundador (Fable 5), 2026-07-16
- Origen: continuación del plan de la orden 2026-07-16-04

## Qué vas a saber hacer al terminar
Cruzar dos tablas relacionadas y responder preguntas de resumen (cuántos, cuánto suman, promedio).

## La idea
- **JOIN** pega dos tablas por una columna en común:
  `SELECT n.titulo, t.texto FROM notas n JOIN tareas t ON t.nota_id = n.id`
- **GROUP BY** arma grupos y les aplica cuentas:
  `SELECT nota_id, COUNT(*) FROM tareas GROUP BY nota_id`
- Para filtrar GRUPOS (no filas) se usa HAVING: `HAVING COUNT(*) > 2`.
Regla de oro: WHERE filtra antes de agrupar; HAVING filtra después.

## Ejemplo resuelto
"¿Qué notas tienen más de una tarea pendiente?":
`SELECT n.titulo, COUNT(*) AS pendientes FROM notas n JOIN tareas t ON t.nota_id = n.id WHERE t.hecha = 0 GROUP BY n.id HAVING COUNT(*) > 1;`
Por qué: primero WHERE saca las hechas, después se agrupa por nota, y HAVING
descarta los grupos chicos.

## Errores típicos
- Contar filas duplicadas por un JOIN mal hecho (siempre revisar la condición ON).
- Poner en el SELECT columnas que no están en el GROUP BY ni agregadas.

## Autoexamen
1. ¿HAVING o WHERE para "clientes con más de 3 compras"?
2. ¿Qué pasa si el ON del JOIN está mal?
Respuestas: (1) HAVING (filtra grupos). (2) filas cruzadas de más o de menos: resultados inflados o vacíos.
