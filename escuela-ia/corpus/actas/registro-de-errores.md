# 🩹 Registro de errores y parches (para no repetirlos)

Todo error detectado se anota acá con: qué falló, impacto, cómo se arregló, y la
regla nueva que evita repetirlo. Auditoría inicial: 2026-07-16 (prueba de vida
corrida sobre todo el sistema).

---

## E1 · Las 3 skills instaladas nunca rindieron su examen de Grado 1
- **Qué falló:** comprender-primero, generar-leccion y convertir-prompt-a-skill
  se instalaron y usan SIN carpeta `casos/` — violan la propia regla del colegio
  (toda skill rinde 10 casos antes de promocionar).
- **Impacto:** MEDIO. Funcionan (2 espejos reales presentados), pero su calidad
  no está medida — exactamente el "trabajo sin prueba de vida" del Decreto 3.
- **Parche:** las 3 quedan marcadas "Grado 1 provisorio, examen adeudado". Los
  casos de comprender-primero ya tienen material real: las entradas 01-03 son
  sus primeros 3 casos (el veredicto del dueño sobre cada espejo es la corrección).
- **Regla nueva:** instalar una skill sin `casos/` requiere marcar "examen
  adeudado" en libreta con fecha límite. Adeudado ≠ olvidado.

## E2 · Cuatro archivos referenciados que no existían (enlaces rotos)
- **Qué falló:** los docs citaban mejores-practicas.md, tablero.md,
  presupuesto.md y gasto-del-dia.md — ninguno existía. Un agente que los
  buscara fallaría.
- **Impacto:** BAJO hoy (ningún loop corre aún), ALTO si arrancaba la jornada.
- **Parche:** ✅ los 4 creados hoy con contenido semilla real.
- **Regla nueva:** todo documento que cite una ruta debe crearla como semilla en
  el mismo commit ("no se nombra lo que no existe").

## E3 · CERO exámenes en el banco (la falla más grave)
- **Qué falló:** la regla de oro 2 dice "el examen se escribe ANTES que la
  lección" y la Etapa 1 pone los exámenes como prioridad nº1... y el banco tenía
  0 exámenes contra 1 lección. El fundador violó su propia regla de oro.
- **Impacto:** ALTO. Sin exámenes no hay porcentajes, ni ubicación, ni forma de
  medir a las hijas. Todo el sistema de métricas era papel.
- **Parche:** ✅ primer examen real creado hoy
  (corpus/lenguaje-prompts/examenes/examen-basica-lenguaje.md).
- **Regla nueva:** el tablero muestra SIEMPRE la razón exámenes/lecciones; si
  baja de 1, la jornada escolar solo produce exámenes hasta emparejar.

## E4 · Libretas con grados asignados sin examen rendido
- **Qué falló:** profesor-fundador figura Grado 4, comprensión y traductor
  Grado 3 — todos "por cargo", ninguno por examen.
- **Impacto:** BAJO-MEDIO. Aceptable para fundadores (alguien tiene que arrancar),
  pero rompe el principio si se vuelve costumbre.
- **Parche:** las 3 libretas ya dicen "provisorio hasta examen". Se agrega fecha
  límite: rinden dentro de las 2 primeras semanas de jornada activa.
- **Regla nueva:** "grado por cargo" solo existe para fundadores y expira.

## E5 · El Decreto 1 chocó con una orden del dueño (conflicto de reglas)
- **Qué falló:** el director congeló "archivos de diseño nuevos" y el dueño
  pidió más catálogo al día siguiente. El decreto no preveía jerarquía.
- **Impacto:** BAJO (se resolvió en el momento: dueño > director).
- **Parche:** ✅ resuelto extendiendo el archivo 09 existente; jerarquía anotada.
- **Regla nueva:** toda regla del colegio lleva implícito "salvo orden del dueño";
  si una orden del dueño rompe una regla, se cumple la orden Y se anota acá el
  choque, para que el dueño vea el costo de la excepción.

## E6 · El examen SQL falló en el primer intento (choque de transacciones)
- **Qué falló:** en el caso 4 del examen final de SQL, el `BEGIN` explícito
  chocó con la transacción que el conector de Python abre automáticamente
  (`cannot start a transaction within a transaction`). Nota: 7/10, FALLIDO.
- **Impacto:** NULO hacia afuera (era un examen en base de prueba en memoria);
  POSITIVO hacia adentro: es el primer error técnico real cazado por una
  prueba de vida, exactamente como promete el Decreto 3.
- **Parche:** ✅ conectar con `isolation_level=None` (autocommit) cuando se
  manejan transacciones a mano. Re-rendido: 10/10.
- **Regla nueva:** anotada en la libreta del ingeniero-datos-sql (Observaciones)
  y candidata a lección "trampas del conector" cuando se repita en otro motor.

---

## Contención (¿los errores afectan mucho? — evaluación pedida por el dueño)

Veredicto del director: **ninguno de los 5 errores tocó al usuario ni perdió
información** — todos eran deuda interna (cosas prometidas no creadas, exámenes
no rendidos). El sistema de detección funcionó al primer texteo pedido, que es
exactamente lo que el diseño promete: errores que se detectan, se contienen, se
parchan y dejan regla. El riesgo real empieza cuando arranque la jornada
automática: por eso E2 y E3 se parcharon HOY, antes de prender nada.
