# 📜 Acta · Tesis Voznota, sprint 1 + listas oficiales (2026-07-16)

Orden del dueño: "arranquen la tesis, el tope diario son 10 sesiones".

## Lo construido (con prueba de vida)
- voznota-app/index.html — la app real: graba voz (es-ES), transcribe, detecta
  tareas solas, busca, marca hechas, borra con confirmación. Smoke test en
  navegador real: nota creada, 2 tareas autodetectadas, marcar funciona,
  búsqueda funciona. Captura tomada.
- voznota-app/esquema.sql — esquema fiel + 5 consultas maestras ejecutadas.
- Ciclo de claustro completo: software construyó → QA rechazó con 3 hallazgos
  reales → software corrigió → re-verificado con el artefacto tal cual.

## E11 (nuevo error registrado)
La prueba de vida del esquema lo probó CON ayuda del tester (el pragma se activó
en el test, no en el archivo). QA lo cazó. Regla nueva: **la prueba de vida corre
el artefacto tal cual se entrega, sin ayudas externas.** Parchado y re-verificado.

## LISTA 1 · Finalizaron estudios (título obtenido por examen)
| Ingeniero | Título finalizado | Evidencia |
|---|---|---|
| ingeniero-datos-sql | **Técnico (instituto 50%)** — ÚNICO título cerrado del colegio | examen 10/10 ejecutado en motor real |
| ingeniero-datos-sql | Universidad (75%): trabajos 1-2 de 5 APROBADOS (esquema + consultas maestras, tras corrección QA) | en curso, 2/5 |

Nadie más finalizó estudios todavía: los títulos no se regalan (regla E4).

## LISTA 2 · Registrados NUEVOS hoy en el colegio
| Ingeniero | Origen | Estado de ingreso |
|---|---|---|
| ingeniero-qa | inmigrante (VoltAgent, adaptado) | examen de ubicación 1/3 revisiones contrafirmadas (la de hoy coincidió con el contrafirmante) |
| ingeniero-software | nacido en casa con la tesis | en ubicación; 1 trabajo real entregado, rechazado y corregido el mismo día |

## LISTA 3 · Ingenieros con sus skills y cómo se desarrollaron
| Ingeniero | Nivel | Skills que opera | Desarrollo (parámetros técnicos y no técnicos) |
|---|---|---|---|
| profesor-fundador | 74 | generar-leccion, escribir exámenes, corregir | 4→7 lecciones/exámenes; técnico: bancos de examen; no técnico: pedagogía y actas |
| ingeniero-comprension | 60 | comprender-primero | 7 espejos, diccionario 17 términos; no técnico puro: te lee a VOS |
| ingeniero-datos-sql | 60 | consultas, esquemas, transacciones | técnico puro; subió 0→50 por examen + 2/5 trabajos de universidad |
| traductor-tecnico | 45 | síntesis, cierres en humano | puente técnico↔no técnico; 1 trabajo real |
| ingeniero-qa | en ubicación | revisión 5 pasos, caza de peores prácticas | técnico: cazó E11 real en su primera revisión; no técnico: veredictos constructivos |
| ingeniero-software | en ubicación | construcción web, prueba de vida navegador | técnico: app entera; no técnico: honestidad de interfaz (hallazgo privacidad) |

## Resultados finales del día
- Jornada automática: PRENDIDA (diaria 08:00 Chile, tope 10 sesiones, aviso al teléfono).
- Datasets: primeros 5 pares verificados (sql.jsonl) — la fábrica arrancó.
- Educación aumentada: campo SQL completo hasta universidad; próximas materias
  las abre la jornada según demanda de la tesis (regla de los 3 usos).
