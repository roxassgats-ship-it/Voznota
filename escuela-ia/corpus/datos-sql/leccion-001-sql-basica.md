# Lección 001 · Guardar y encontrar: tablas, INSERT y SELECT

- Materia / capa / subcapa: Datos / SQL / fundamentos
- Grado al que apunta: básica (15%)
- Autor: profesor-fundador (Fable 5), 2026-07-16
- Origen: apertura del campo SQL por orden del dueño (orden 2026-07-16-04)

## Qué vas a saber hacer al terminar
Crear una tabla, guardar filas y recuperar exactamente las filas que te pidan.

## La idea
Una base de datos es un archivador de tablas. Cada tabla tiene columnas con
nombre y tipo. Tres verbos hacen el 80% del trabajo:
- `CREATE TABLE notas (id INTEGER PRIMARY KEY, titulo TEXT, duracion_seg INTEGER)`
- `INSERT INTO notas (titulo, duracion_seg) VALUES ('Compras', 42)`
- `SELECT titulo FROM notas WHERE duracion_seg > 30 ORDER BY duracion_seg DESC`
Regla de lectura: SELECT dice QUÉ columnas, FROM dice DE DÓNDE, WHERE dice
CUÁLES filas, ORDER BY dice EN QUÉ ORDEN.

## Ejemplo resuelto
"Dame los títulos de las notas de más de 1 minuto, las más largas primero":
`SELECT titulo FROM notas WHERE duracion_seg > 60 ORDER BY duracion_seg DESC;`
Por qué: filtrás con WHERE ANTES de ordenar; el orden va siempre al final.

## Errores típicos
- Olvidar el WHERE y traer la tabla entera (caro y peligroso).
- Comparar texto con número (duracion_seg > '60' funciona de casualidad; no confiar).

## Autoexamen
1. ¿Qué cláusula elige filas y cuál elige columnas?
2. Escribí la consulta: notas con "compra" en el título.
Respuestas: (1) WHERE filas, SELECT columnas. (2) SELECT * FROM notas WHERE titulo LIKE '%compra%';
