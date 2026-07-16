# Workflow · Jornada escolar diaria (APAGADO: espera el tope del dueño)

La rutina automática del archivo 10, lista para prender cuando exista tope en
corpus/actas/presupuesto.md:

1. APERTURA — leer tablero.md; armar cola del día con prioridad:
   exámenes pendientes > lecciones sobre errores repetidos > datasets > poda.
2. TURNOS — despachar cada ítem al agente del peldaño correcto (regla del
   archivo 10: nadie trabaja sobre su peldaño). Cada turno usa el workflow
   RAG-consulta y termina en commit + anotación en gasto-del-dia.md.
3. CIERRE POR TOPE — acumulado ≥ tope → la jornada cierra sola; cola a mañana.
4. ACTA — qué se hizo, qué falló, qué quedó. El ranking se recalcula si hubo
   exámenes.

Cómo se prende: el dueño fija el tope y dice "prendé la jornada" → se crean
las rutinas programadas (una de apertura y una de cierre) tal cual archivo 05.
