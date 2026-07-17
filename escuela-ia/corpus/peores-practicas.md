# ☠️ Peores prácticas (y su protocolo de erradicación)

El espejo oscuro de mejores-practicas.md. Cada peor práctica lista: cómo
reconocerla, el daño, y el protocolo que la erradica. La skill auditar-y-parchar
las caza en cada auditoría. Una peor práctica entra acá cuando se la observó de
verdad (en este colegio o en la sesión) — no es una lista teórica.

| # | Peor práctica | Cómo se reconoce | Protocolo de erradicación |
|---|---|---|---|
| 1 | **Ejecutar sin comprender** | el agente arranca a tocar archivos con el mensaje crudo del dueño | comprender-primero SIEMPRE ante ráfaga (CLAUDE.md §1); espejo antes de orden |
| 2 | **Papel sin práctica** | crecen los .md de diseño, el tablero de trabajo real sigue en 0 | Decreto 1 (regla 80/20); la auditoría compara commits de diseño vs de trabajo |
| 3 | **Nombrar lo que no existe** | un .md cita rutas/archivos inexistentes (pasó: E2, E7) | regla E2: se crea la semilla en el mismo commit; chequeo 1 de la auditoría |
| 4 | **Grado regalado** | nivel asignado sin examen (pasó: E4, skills E1) | marca "adeudado" con vencimiento; el ranking lo penaliza hasta saldarse |
| 5 | **Autoevaluación** | el mismo agente que hizo el trabajo le pone la nota | corrector distinto u objetivo (motor, test); anula el examen (regla de oro 1) |
| 6 | **Lección antes que examen** | corpus crece con razón exámenes/lecciones < 1 (pasó: E3, E10) | freno del tablero: solo se producen exámenes hasta emparejar |
| 7 | **Loop sin freno** | rutina sin tope de cantidad/gasto definido | ninguna rutina se crea sin freno escrito en su prompt (archivo 05) |
| 8 | **Trabajo sin prueba de vida** | "está listo" sin nada ejecutado que lo demuestre | Decreto 3: no entregado; el examen SQL (E6) mostró por qué: el primer intento FALLABA |
| 9 | **Sobre-alimentación de contexto** | el agente lee 20 documentos para una tarea simple | Decreto 5: máximo 3 lecturas; el exceso se corta en la definición del agente |
| 10 | **Nota perfecta sin auditar** | 100/100 o 0 en un ranking | regla del ranking: los números redondos se auditan siempre |

## Protocolo para MEJORES prácticas (la otra mitad del pedido)
1. **Detección:** práctica que funcionó 5+ veces seguidas (contador 🏆 de libretas).
2. **Promoción:** entra a mejores-practicas.md de su materia con su evidencia.
3. **Aplicación forzosa:** las mejores prácticas de una materia son lectura
   obligatoria del "antes de trabajar" de sus agentes — no son sugerencias.
4. **Revalidación:** cada 3 meses, la auditoría verifica que sigan funcionando;
   la que deja de servir baja a este archivo con su autopsia.

## El ciclo completo
peor práctica detectada → protocolo de erradicación → regla nueva en el registro
de errores → si el reemplazo funciona 5+ veces → mejor práctica promovida.
Las dos listas son el mismo músculo visto de frente y de espalda.
