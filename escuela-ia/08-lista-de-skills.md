# 08 · Lista de skills → ingenieros por campo y subcampo

La lista que pediste: skills concretas que, al madurar (Grados 0→3), se transforman
en ingenieros IA de su campo. Agrupadas por materia. Cada fila es una skill a crear
con la plantilla de `plantillas/skill-plantilla/`.

Regla de conversión: **3 a 5 skills maduras del mismo subcampo = 1 ingeniero**.
El nombre del ingeniero resultante figura en la última columna.

---

## Campo: Programación

| Skill | Qué hace | Ingeniero resultante |
|---|---|---|
| revisar-codigo-python | Revisa código Python y lista problemas | ingeniero-python |
| escribir-tests-python | Escribe pruebas para código existente | ingeniero-python |
| depurar-error-python | Diagnostica un error a partir del mensaje | ingeniero-python |
| documentar-modulo | Escribe documentación de un módulo | ingeniero-python |
| revisar-codigo-js | Ídem Python pero JavaScript/TypeScript | ingeniero-frontend |
| construir-componente-ui | Crea componentes de interfaz | ingeniero-frontend |
| revisar-consulta-sql | Revisa y optimiza consultas SQL | ingeniero-datos-sql |
| disenar-esquema-bd | Diseña tablas y relaciones | ingeniero-datos-sql |
| escribir-script-bash | Automatiza tareas del sistema | ingeniero-automatizacion |

## Campo: Datos

| Skill | Qué hace | Ingeniero resultante |
|---|---|---|
| limpiar-dataset | Deduplica, normaliza, valida datos | ingeniero-datasets |
| generar-pares-qa | Genera pares pregunta-respuesta desde lecciones | ingeniero-datasets |
| validar-dataset-jsonl | Verifica formato y calidad de un JSONL | ingeniero-datasets |
| extraer-de-api | Trae datos de un servicio externo | ingeniero-recoleccion |
| indexar-corpus | Mantiene los índices del corpus al día | ingeniero-biblioteca |

## Campo: Lenguaje y contenido

| Skill | Qué hace | Ingeniero resultante |
|---|---|---|
| resumir-nota | Resume notas de voz transcriptas | ingeniero-redaccion |
| mejorar-prompt | Reescribe un prompt ambiguo en uno preciso | ingeniero-prompts |
| convertir-prompt-a-skill | Aplica la plantilla y genera los casos de prueba | ingeniero-prompts |
| traducir-tecnico | Traduce documentación manteniendo términos | ingeniero-redaccion |
| generar-leccion | Convierte conocimiento en lección con formato oficial | (skill docente: la reciben los Grado 4) |
| comprender-primero | Disecciona vómitos verbales del dueño antes de ejecutar (protocolo archivo 12) | ingeniero-comprension |
| auditar-y-parchar | Caza fallos/brechas/huecos, parcha lo barato, registra E# y reglas nuevas | ingeniero-operaciones |

## Campo: Escuela y evaluación

| Skill | Qué hace | Ingeniero resultante |
|---|---|---|
| escribir-examen | Crea casos de prueba con respuesta esperada | ingeniero-evaluacion |
| corregir-examen | Compara salida real vs esperada y puntúa | ingeniero-evaluacion |
| actualizar-libreta | Registra notas y observaciones tras cada tarea | ingeniero-secretaria |
| redactar-acta | Resume libretas en acta semanal de debilidades | ingeniero-secretaria |
| podar-corpus | Detecta lecciones duplicadas o desactualizadas | director-de-materia (Grado 5) |
| torneo-de-modelos | Misma tarea a 2 modelos y un juez decide | ingeniero-evaluacion |

## Campo: Agentes y operación

| Skill | Qué hace | Ingeniero resultante |
|---|---|---|
| crear-agente | Genera la definición de un agente nuevo desde skills maduras | ingeniero-agentes |
| programar-rutina | Crea/ajusta las rutinas del horario escolar | ingeniero-agentes |
| vigilar-loops | Controla frenos: cantidad, gasto, calidad por muestreo | ingeniero-operaciones |
| informe-de-costos | Calcula costo por materia y por modelo | ingeniero-operaciones |
| respaldar-escuela | Verifica commits, hace copia del corpus | ingeniero-operaciones |

## Campo: Seguridad

| Skill | Qué hace | Ingeniero resultante |
|---|---|---|
| revisar-permisos | Audita qué puede tocar cada agente | ingeniero-seguridad |
| buscar-secretos | Detecta claves o contraseñas antes de cada commit | ingeniero-seguridad |
| revisar-contenido-externo | Marca instrucciones sospechosas venidas de afuera | ingeniero-seguridad |

---

## Orden de construcción recomendado (los primeros 90 días)

1. **Semana 1-2:** `convertir-prompt-a-skill`, `escribir-examen`, `corregir-examen`,
   `actualizar-libreta` — sin estas cuatro no hay colegio, porque son las que
   fabrican y miden a todas las demás.
2. **Semana 3-4:** `generar-leccion`, `indexar-corpus`, `generar-pares-qa` — la
   fábrica de conocimiento (y arrancan los loops del archivo 05 con Fable).
3. **Mes 2:** las skills de tu trabajo real (las de Programación y Lenguaje que más
   uses) hasta juntar los 2 primeros ingenieros.
4. **Mes 3:** `redactar-acta`, `podar-corpus`, `vigilar-loops`, `informe-de-costos`
   — el colegio pasa a girar solo con tu firma semanal.

La lista no es cerrada: cada acta de la sala de profesores puede proponer skills
nuevas. Esta página es el registro civil: toda skill nueva se anota acá con su
campo y su ingeniero de destino.
