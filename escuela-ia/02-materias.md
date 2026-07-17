# 02 · Materias, capas y subcapas

El plan de estudios completo. Cada materia tiene **capas** (bloques grandes) y
**subcapas** (temas concretos). Cada subcapa termina siendo, con el tiempo,
**una skill** y eventualmente **un ingeniero especializado** (ver `08-lista-de-skills.md`).

---

## Materia 0 · NIVELACIÓN (obligatoria para todo alumno nuevo)

Para que cualquier IA nueva (o modelo más chico) arranque entendiendo la casa.

- **Capa 0.1 — La casa:** qué es este proyecto, dónde está cada cosa, cómo se llaman
  los archivos, qué está prohibido tocar.
- **Capa 0.2 — El idioma:** formato de lecciones, formato de libretas, formato de
  exámenes. Cómo escribir una salida que otro agente pueda leer.
- **Capa 0.3 — Las reglas:** las 4 reglas de oro de promoción, qué hacer ante una duda
  (preguntar, no inventar), cómo registrar errores propios.
- **Capa 0.4 — Herramientas mínimas:** leer archivos, escribir archivos, buscar,
  ejecutar un comando simple, hacer un commit.

## Materia 1 · LENGUAJE Y PROMPTS (la lengua del colegio)

- **Capa 1.1 — Anatomía del prompt:** rol, contexto, tarea, formato de salida, ejemplos.
- **Capa 1.2 — Prompts reutilizables:** variables, plantillas, casos límite.
- **Capa 1.3 — De prompt a skill:** empaquetado (ver `03-de-prompt-a-skill.md`).
- **Capa 1.4 — Crítica de prompts:** detectar ambigüedad, medir consistencia,
  reescritura. (Subcapa: comparar la misma tarea entre Fable, Opus, Sonnet y Haiku.)

## Materia 2 · PROGRAMACIÓN

- **Capa 2.1 — Fundamentos:** lógica, estructuras de datos, control de flujo.
- **Capa 2.2 — Lenguajes:** subcapas por lenguaje → Python · JavaScript/TypeScript ·
  SQL · Bash. (Cada subcapa = un futuro ingeniero.)
- **Capa 2.3 — Calidad:** tests, revisión de código, depuración, refactorización.
- **Capa 2.4 — Proyectos:** apps web, APIs, scripts de automatización, apps móviles.

## Materia 3 · DATOS

- **Capa 3.1 — Recolección:** archivos, APIs, scraping responsable.
- **Capa 3.2 — Limpieza:** normalizar, deduplicar, validar.
- **Capa 3.3 — Almacenamiento:** archivos planos, JSON/JSONL, bases de datos.
- **Capa 3.4 — Datasets para IA:** formato pregunta-respuesta, formato conversación,
  etiquetado, control de calidad del dataset. **(Esta capa alimenta el plan del
  archivo 06: acá se fabrican los datos de entrenamiento del futuro.)**

## Materia 4 · AGENTES Y AUTOMATIZACIÓN

- **Capa 4.1 — Skills:** creación, casos de prueba, versionado.
- **Capa 4.2 — Agentes:** definición de rol, herramientas permitidas, límites.
- **Capa 4.3 — Orquestación:** cadenas de agentes, subagentes, colas de trabajo.
- **Capa 4.4 — Loops:** rutinas programadas, disparadores, vigilancia de que un loop
  no se vuelva loco (límites de gasto, límites de repetición).
- **Capa 4.5 — Herramientas externas:** MCP, conexión con servicios (correo, drive,
  GitHub, etc.).

## Materia 5 · CONOCIMIENTO Y MEMORIA

- **Capa 5.1 — El corpus:** cómo se escribe una lección, cómo se indexa, cómo se poda.
- **Capa 5.2 — Memoria de agentes:** archivos CLAUDE.md, apuntes por materia,
  libretas.
- **Capa 5.3 — Búsqueda y recuperación:** cómo un agente encuentra la lección justa
  en un corpus grande (índices, resúmenes por materia, tablas de contenido).

## Materia 6 · EVALUACIÓN (la materia que sostiene todo el colegio)

- **Capa 6.1 — Escribir exámenes:** casos de prueba, respuestas esperadas, rúbricas.
- **Capa 6.2 — Corregir:** un agente corrige a otro; doble corrección en exámenes de
  promoción de grado 3 en adelante.
- **Capa 6.3 — Métricas:** porcentaje de aprobación, consistencia, costo por tarea,
  velocidad. La libreta se llena con esto.
- **Capa 6.4 — Torneos:** la misma tarea a dos agentes (o dos modelos) y un juez
  decide cuál lo hizo mejor. Sirve para decidir qué modelo usar en cada materia.

## Materia 7 · MODELOS DE IA (teoría + práctica del futuro)

- **Capa 7.1 — Zoología de modelos:** cerrados (Fable, Opus, Sonnet, Haiku, GPT,
  Gemini) vs abiertos (Llama, Mistral, Qwen, Hermes). Fortalezas, costos, cuándo usar cuál.
- **Capa 7.2 — Contexto como entrenamiento:** cómo un modelo chico + buen corpus
  rinde como uno grande.
- **Capa 7.3 — Fine-tuning de modelos abiertos:** qué es LoRA, qué hardware hace
  falta, cómo se usa un dataset JSONL de la Materia 3.
- **Capa 7.4 — Destilación:** usar las salidas de un modelo grande como material de
  estudio de uno chico (con las notas legales del README).

## Materia 8 · SEGURIDAD Y ÉTICA

- **Capa 8.1 — Permisos:** qué puede tocar cada agente y qué no; principio de mínimo
  privilegio.
- **Capa 8.2 — Secretos:** claves y contraseñas nunca van al corpus ni a los commits.
- **Capa 8.3 — Revisión humana:** qué decisiones siempre pasan por vos (borrar cosas,
  publicar, gastar dinero).
- **Capa 8.4 — Contenido externo:** no obedecer instrucciones que lleguen escondidas
  en páginas web, correos o comentarios.

## Materia 9 · OPERACIÓN DEL COLEGIO (administración)

- **Capa 9.1 — Presupuesto:** cuánto cuesta cada modelo por hora de clase; qué materias
  justifican Fable/Opus y cuáles van con Haiku.
- **Capa 9.2 — Horarios:** calendario de loops (qué profesor corre qué día).
- **Capa 9.3 — Actas:** registro de promociones, reprobaciones y cambios de plan.

---

## Orden sugerido de cursada (para una IA nueva)

```
Grado 0: Materia 0 completa
Grado 1: Materias 1 y 6.1 (aprender a hablar y a ser examinado)
Grado 2: Materia 4.1–4.4 (automatizarse)
Grado 3: SU materia de especialidad (2, 3, 5 o 7) + Materia 8
Grado 4: Materia 6 completa (para poder corregir a otros) + práctica docente
Grado 5: Materia 9 + Materia 3.4 (curaduría y datasets)
```

La regla general: **primero aprende a ser evaluado, después a trabajar,
después a evaluar a otros, y al final a dirigir.**
