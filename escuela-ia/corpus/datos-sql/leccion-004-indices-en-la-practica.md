# Lección 004 · Índices: la mejora se mide, no se supone

- Materia / capa / subcapa: Datos / SQL / rendimiento
- Grado al que apunta: universidad (75%)
- Autor: ingeniero-datos-sql (enseñanza inversa — trabajo 5 de su examen), 2026-07-16
- Origen: benchmark real del examen de universidad (acta en examen-universidad-sql.md)

## Qué vas a saber hacer al terminar
Decidir CON NÚMEROS si una columna merece índice, y demostrarlo.

## La idea
Un índice es el índice alfabético del libro: sin él, la base lee TODAS las filas
(en nuestro benchmark real: 100.000 tareas → 4,2 ms por consulta); con él, salta
directo (0,002 ms → 1.820 veces más rápido, medido). El método:
1. Elegí la consulta que más se repite (la maestra).
2. Medila SIN índice (correla 200 veces, promediá).
3. Creá el índice sobre las columnas del WHERE: `CREATE INDEX idx ON tareas(hecha, nota_id);`
4. Medila CON índice. Si no mejora 10x o más en tablas grandes, el índice
   probablemente sobra (y encarece cada escritura).

## Errores típicos
- Indexar "por las dudas" columnas que nadie busca: escrituras más lentas gratis.
- Suponer la mejora en vez de medirla (peor práctica nº 8: sin prueba de vida).

## Autoexamen
1. ¿Qué se mide antes de crear un índice? 2. ¿Por qué no indexar todo?
Respuestas: (1) la consulta maestra sin índice, promediada. (2) cada índice
hace más lentas las escrituras; se paga solo si una búsqueda frecuente lo usa.
