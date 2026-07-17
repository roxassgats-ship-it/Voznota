# Examen final · Datos/SQL · básica → instituto (50%)

- Escrito por: profesor-fundador (Fable 5), 2026-07-16
- Corrige: **el motor de base de datos** (SQLite 3.45) — las consultas se
  ejecutan de verdad y el resultado se compara contra el esperado. Corrector
  objetivo: cumple "nadie se autoevalúa" al máximo (Decreto 3, prueba de vida).
- Aprobación: 8 de 10

## Casos (cada uno se EJECUTA, no se lee)
1. **(2 pts, básica)** Notas de más de 1 minuto, más largas primero → SELECT+WHERE+ORDER BY.
2. **(2 pts, básica/seguridad)** Insertar un título malicioso (`'; DROP TABLE...`)
   con parámetros y recuperarlo intacto → si el alumno concatena texto, la
   inyección rompe la base y el caso vale 0.
3. **(3 pts, media)** "¿Qué notas tienen más de una tarea pendiente?" → JOIN +
   GROUP BY + HAVING con WHERE previo.
4. **(3 pts, instituto)** Borrado seguro: SELECT COUNT previo (alcance), BEGIN +
   DELETE + ROLLBACK demostrando que no pasó nada, y recién entonces BEGIN +
   DELETE + COMMIT. Se verifica el estado de la base en cada paso.

## Acta de resultados
| Fecha | Quién rindió | Nota | Corrector | Resultado |
|---|---|---|---|---|
| 2026-07-16 | ingeniero-datos-sql (sesión Fable 5) — intento 1 | 7/10 | SQLite (ejecución real) | FALLIDO caso 4: choque BEGIN vs transacción automática del conector Python |
| 2026-07-16 | ingeniero-datos-sql (sesión Fable 5) — intento 2 | **10/10** | SQLite (ejecución real) | **APROBADO → asciende a instituto (50%)** |

Guion ejecutable del examen: scratchpad de la sesión (examen_sql.py); reproducible
con Python 3 + sqlite3, sin instalar nada.
