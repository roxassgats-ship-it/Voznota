# Libreta: ingeniero-datos-sql

- Peldaño actual: **UNIVERSIDAD (75%)** — GANADO POR EXAMEN 4/5 (benchmark 1.820x + simulacro de incendio superado, 2026-07-16 noche)
- Materia: Datos / SQL (Facultad 1; planta del campo Datos)
- Modelo actual: el de la sesión principal
- Fecha de ingreso: 2026-07-16 (entró en base 0%)

## Exámenes rendidos
- 2026-07-16 · Examen final básica→instituto · intento 1: 7/10 FALLIDO
  (caso 4: `BEGIN` explícito chocó con la transacción automática del conector
  Python/SQLite)
- 2026-07-16 · intento 2: **10/10 APROBADO** — corrector: el motor SQLite,
  con ejecución real de todas las consultas (inyección incluida, contenida).

## Historial de nivel (el "texteo de aumento" pedido por el dueño)
| Momento | Nivel | Evidencia |
|---|---|---|
| Ingreso | base 0% | no existía |
| Cursó lecciones 001-003 | estudiante | corpus/datos-sql/ |
| Intento 1 del final | media ~30% | 7/10: dominó básica y media, falló operación segura |
| Intento 2 del final | **instituto 50%** | 10/10 con ejecución real |
| Universidad | **75% ALCANZADO** | 4/5 trabajos: esquema, consultas, benchmark medido, simulacro |
| Próximo objetivo | magíster 100% | trabajo 5 validado por alumno + escribir examen de otro campo + corregir 5 |

## Observaciones (errores propios — no repetir)
- El conector Python de SQLite abre transacciones solas: para manejar BEGIN/
  COMMIT/ROLLBACK a mano, conectar con `isolation_level=None` (autocommit).
  ESTE error costó 3 puntos en el intento 1. Registrado también como E6.
