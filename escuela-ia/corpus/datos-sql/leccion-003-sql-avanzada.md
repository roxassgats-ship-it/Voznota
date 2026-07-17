# Lección 003 · No romper nada: transacciones, índices y consultas seguras

- Materia / capa / subcapa: Datos / SQL / operación segura
- Grado al que apunta: instituto (50%)
- Autor: profesor-fundador (Fable 5), 2026-07-16
- Origen: cierre del tramo básico→instituto de la orden 2026-07-16-04

## Qué vas a saber hacer al terminar
Modificar datos sin riesgo: todo-o-nada, rápido, y sin abrir la puerta a inyecciones.

## La idea
1. **Transacciones (todo-o-nada):** `BEGIN; ...cambios...; COMMIT;` — si algo
   falla en el medio, `ROLLBACK;` y la base queda como estaba. Regla de la casa:
   todo UPDATE/DELETE va dentro de una transacción, y ANTES se corre el mismo
   WHERE en un SELECT para ver cuántas filas va a tocar.
2. **Índices (velocidad):** `CREATE INDEX idx_tareas_nota ON tareas(nota_id);`
   — acelera búsquedas por esa columna. Se indexa lo que se busca seguido; cada
   índice de más hace más lentas las escrituras.
3. **Consultas seguras (inyección):** JAMÁS pegar texto del usuario dentro del
   SQL. Siempre parámetros: `cursor.execute("SELECT * FROM notas WHERE titulo = ?", (titulo,))`
   — el `?` garantiza que el texto sea dato, nunca comando.

## Ejemplo resuelto
Borrar las tareas hechas de una nota, con red:
`SELECT COUNT(*) FROM tareas WHERE nota_id = 3 AND hecha = 1;`  → dice "2"
`BEGIN; DELETE FROM tareas WHERE nota_id = 3 AND hecha = 1; COMMIT;`
Por qué: el SELECT previo confirma el alcance (2 filas, no 2000) antes del DELETE.

## Errores típicos
- DELETE/UPDATE sin WHERE (borra todo). El SELECT previo lo hace imposible de no ver.
- Armar SQL concatenando texto del usuario (inyección: el clásico `'; DROP TABLE...`).

## Autoexamen
1. ¿Qué hacés SIEMPRE antes de un DELETE?
2. ¿Por qué el `?` y no pegar el texto directo?
Respuestas: (1) el mismo WHERE en un SELECT COUNT(*), y correr el DELETE en transacción. (2) el parámetro viaja como dato puro: no puede convertirse en comando.
