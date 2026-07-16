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

## E7 · No existía CLAUDE.md en la raíz (la brecha más grave de la retrospectiva)
- **Qué falló:** todas las reglas del colegio vivían en escuela-ia/, pero nada
  las cargaba automáticamente en una sesión nueva. La "autonomía" de los agentes
  dependía de que alguien se acordara de leer los documentos.
- **Impacto:** ALTO. Sin esto, el protocolo de reparación autónoma que pidió el
  dueño era imposible: cada sesión nueva arrancaba amnésica.
- **Parche:** ✅ CLAUDE.md creado en la raíz con: comprensión primero, protocolo
  de reparación autónoma, llaves rojas, reglas de trabajo y mapa mínimo.
- **Regla nueva:** toda regla "permanente" debe vivir en (o estar enlazada desde)
  CLAUDE.md; si solo está en un archivo numerado, no es permanente, es un deseo.

## E8 · comprender-primero no estaba en el registro civil de skills
- **Qué falló:** el archivo 08 dice "toda skill nueva se anota acá" y la skill
  más usada del colegio (4 usos reales) no figuraba.
- **Impacto:** BAJO. **Parche:** ✅ registrada junto con auditar-y-parchar.
- **Regla nueva:** crear una skill y registrarla en 08 es UN solo acto (mismo
  commit) — chequeo fijo de la auditoría.

## E9 · La carpeta workflows/ no figuraba en el mapa del README
- **Impacto:** BAJO (contenido invisible para quien navega por el mapa).
- **Parche:** ✅ fila agregada al mapa. Misma regla que E2/E8.

## E10 · Reincidencia de E3: la razón exámenes/lecciones volvió a bajar (0,5)
- **Qué falló:** al crear las 3 lecciones de SQL con 1 solo examen, se repitió
  el patrón del E3 UN DÍA después de escribir su regla. Primera reincidencia
  del colegio.
- **Impacto:** MEDIO — no por el número, sino por lo que revela: una regla
  escrita no se cumple sola; hay que chequearla en el momento de producir, no
  solo en la auditoría.
- **Parche:** ✅ 2 exámenes nuevos (básica y media SQL): razón 4/4 = 1,0. Y la
  regla pasó al CLAUDE.md vía skill auditar-y-parchar (chequeo fijo).
- **Regla nueva (anti-reincidencia):** cuando un E# reincide, su regla asciende
  de "regla del registro" a "chequeo automático de la auditoría" — las
  reincidencias son el criterio de qué se automatiza primero.

## E11 · La prueba de vida probó el esquema CON ayuda del tester
- **Qué falló:** el test del esquema activaba a mano la protección (pragma) que
  el archivo entregado no traía; el cascade parecía funcionar y no funcionaba.
  Lo cazó el ingeniero-qa en su primera revisión (rechazo correcto).
- **Impacto:** MEDIO (habría producido huérfanos en cualquier uso real).
- **Parche:** ✅ pragma dentro del archivo + re-verificación con el artefacto
  tal cual. **Regla nueva:** la prueba de vida corre el artefacto TAL CUAL se
  entrega, sin ayudas externas del que testea.

## E12 · Contadores del tablero inflados por memoria (5 skills / 7 agentes)
- **Qué falló:** el director actualizó contadores de memoria en vez de contarlos
  por comando: decía 5 skills y 7 agentes cuando el comando da los reales.
- **Impacto:** BAJO (números de gestión, no de trabajo). Es la peor práctica
  nº 10 en su versión suave.
- **Parche:** ✅ contadores recalculados por comando en el mismo commit.
- **Regla nueva:** los contadores del tablero salen SIEMPRE de comandos
  (glob/find/wc), nunca de memoria. Chequeo agregado a auditar-y-parchar.

---

## Contención (¿los errores afectan mucho? — evaluación pedida por el dueño)

Veredicto del director: **ninguno de los 5 errores tocó al usuario ni perdió
información** — todos eran deuda interna (cosas prometidas no creadas, exámenes
no rendidos). El sistema de detección funcionó al primer texteo pedido, que es
exactamente lo que el diseño promete: errores que se detectan, se contienen, se
parchan y dejan regla. El riesgo real empieza cuando arranque la jornada
automática: por eso E2 y E3 se parcharon HOY, antes de prender nada.
