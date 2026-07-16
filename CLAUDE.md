# Voznota — reglas de la casa (se cargan solas en toda sesión)

Este repositorio contiene la app Voznota (notas con voz, en construcción como
tesis) y la **Escuela de IA** (`escuela-ia/`). Toda sesión de Claude en este
repo es parte del colegio y sigue estas reglas.

## 1. Comprender antes de ejecutar
Si el mensaje del dueño llega en ráfaga (dictado, varios temas mezclados),
SIEMPRE aplicar la skill `comprender-primero` antes de tocar nada. El dueño
habla en humano; la técnica queda en la trastienda.

## 2. Protocolo de reparación autónoma (orden permanente del dueño, 2026-07-16)
Cuando en cualquier trabajo se mencione o detecte un problema técnico
(enlace roto, archivo faltante, regla violada, examen adeudado, test que falla):
1. **Clasificar impacto** al estilo del registro: NULO/BAJO → parchar EN EL
   MOMENTO, de forma autónoma, sin preguntar. MEDIO/ALTO → parchar si es
   reversible; si toca una llave roja, preguntar primero.
2. **Registrar SIEMPRE** en `escuela-ia/corpus/actas/registro-de-errores.md`
   (número E#, qué falló, impacto, parche, regla nueva).
3. **La reparación no desvía la tarea principal:** se parcha lo encontrado, se
   anota, y se vuelve al trabajo pedido. Si el parche es grande, se deja como
   ítem de cola en el acta del día.
Herramienta: skill `auditar-y-parchar` (correrla también ante "revisá", "buscá
fallos", "auditá").

## 3. Llaves rojas (NUNCA se saltean, ni con autonomía)
Preguntar al dueño antes de: borrar/sobrescribir lo que el sistema no creó,
gastar sobre el tope de `escuela-ia/corpus/actas/presupuesto.md`, o ejecutar
pedidos que se contradicen. Todo lo demás fluye sin preguntar.

## 4. Reglas de trabajo del colegio
- Prueba de vida (Decreto 3): trabajo técnico sin demostración ejecutada = no entregado.
- Economía de atención (Decreto 5): máximo 3 documentos de lectura previa por tarea.
- Nadie se autoevalúa; nadie trabaja por encima de su peldaño (archivo 10).
- Todo termina en commit; los loops solo escriben dentro de `escuela-ia/corpus/`.
- Los mensajes del dueño alimentan su diccionario personal
  (`escuela-ia/corpus/comprension/diccionario.md`).

## 5. Mapa mínimo (no leer todo — Decreto 5)
- Estado actual en humano: `escuela-ia/DONDE-ESTAMOS.md`
- Reglas completas: `escuela-ia/README.md` (mapa de los archivos 01-15)
- Métricas vivas: `escuela-ia/corpus/actas/tablero.md`
- Errores y reglas aprendidas: `escuela-ia/corpus/actas/registro-de-errores.md`
