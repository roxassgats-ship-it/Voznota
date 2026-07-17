---
name: auditar-y-parchar
description: Audita el colegio y el repo buscando fallos, brechas, huecos y problemas técnicos; parcha lo barato de inmediato y registra todo. Usar cuando el dueño pida buscar fallos/auditar/revisar, o de forma autónoma al detectar un problema técnico durante otra tarea.
---

# Auditar y parchar

Cacería sistemática de deuda. Siempre con evidencia ejecutada, nunca a ojo.

## Pasos
1. **Cazar** (comandos, no impresiones). Lista mínima de chequeos:
   - Archivos referenciados en .md que no existen (regla E2).
   - CLAUDE.md presente y coherente con las reglas vigentes.
   - Skills instaladas: ¿registradas en el archivo 08? ¿con casos/ o marca
     "examen adeudado" con fecha? (regla E1).
   - Agentes: ¿todos con libreta? ¿grados provisorios vencidos? (regla E4).
   - Tablero: ¿razón exámenes/lecciones ≥ 1? (regla E3).
   - README: ¿el mapa lista todo lo que existe y nada que no exista?
   - Reglas nuevas del registro de errores: ¿se están cumpliendo?
2. **Clasificar** cada hallazgo: impacto NULO/BAJO/MEDIO/ALTO + costo del parche.
3. **Parchar YA** lo de impacto ≤ MEDIO y parche barato (protocolo del CLAUDE.md
   §2). Lo caro va como ítem de cola al acta del día con dueño asignado.
4. **Registrar** cada hallazgo como E# en corpus/actas/registro-de-errores.md:
   qué falló, impacto, parche, y LA REGLA NUEVA que lo previene.
5. **Actualizar** tablero.md y, si cambió el estado general, DONDE-ESTAMOS.md.
6. **Cerrar** con el resumen: N hallazgos, N parchados, N en cola, reglas nuevas.

## Reglas
- Toda afirmación de la auditoría sale de un comando ejecutado (prueba de vida).
- Un hallazgo sin regla nueva es un hallazgo a medias: la regla es el parche
  del FUTURO, el arreglo es solo el parche del presente.
- Prohibido parchar saltando llaves rojas: borrar/sobrescribir ajeno, gastar
  sobre tope, contradicciones → preguntar.
- La auditoría también busca PEORES prácticas activas
  (corpus/peores-practicas.md) y verifica que sus protocolos de erradicación
  se estén aplicando.
