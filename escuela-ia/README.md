# 🏫 Escuela de Inteligencia Artificial

Bienvenido al colegio. Este directorio contiene **todo el sistema**: materias, niveles,
skills, agentes-profesores, loops de estudio y el plan de entrenamiento a futuro.

Tu parte es la **teórica/humana** (dirección, criterio, decisiones).
Esta documentación cubre la parte **técnica al 100%**.

---

## La idea en una frase

> Los prompts se convierten en **skills**, las skills maduran hasta ser **agentes ingenieros**,
> los ingenieros que aprueban exámenes se convierten en **profesores**, y los profesores
> generan lecciones y corpus que educan a la siguiente generación de agentes.
> Todo queda guardado en archivos, así que **funciona con cualquier modelo**
> (Fable 5 hoy; Opus, Sonnet, Haiku u otros mañana).

## Una verdad importante antes de empezar

Los modelos comerciales (Fable 5, Opus, Sonnet, Haiku, GPT, Gemini) **no se pueden
re-entrenar por dentro**: su cerebro es fijo. Lo que SÍ se puede — y es lo que hace
esta escuela — es entrenar **el sistema alrededor del modelo**:

| Qué se entrena | Cómo | Resultado |
|---|---|---|
| La **memoria** | Archivos CLAUDE.md, corpus, apuntes | El agente "recuerda" lo aprendido |
| Las **habilidades** | Skills (instrucciones empaquetadas) | El agente sabe hacer tareas nuevas |
| Los **roles** | Definiciones de agentes | Ingenieros especializados por materia |
| La **calidad** | Exámenes (evals) y retroalimentación | Cada generación es mejor que la anterior |
| Modelos **abiertos** (Llama, Mistral, Qwen) | Fine-tuning real con datasets JSONL | Aquí SÍ hay entrenamiento literal del cerebro |

Por eso el plan funciona: hoy usás Fable 5 como profesor fundador que genera el corpus;
mañana cualquier modelo más económico hereda ese corpus y rinde mejor, y a largo plazo
ese corpus sirve de material para entrenar modelos abiertos propios.
(Nota legal: revisá los términos de uso de cada proveedor antes de usar salidas de un
modelo comercial para entrenar otro modelo; para uso interno y educativo el corpus como
*material de estudio y contexto* no tiene problema.)

## Glosario de nombres (para que hablemos el mismo idioma)

| Como lo dijiste | Nombre real | Qué es |
|---|---|---|
| Pablo cinco / Fabre | **Claude Fable 5** | Modelo tope de Anthropic (profesor fundador) |
| Opus | **Claude Opus** | Modelo potente de Anthropic |
| Sonnet | **Claude Sonnet** | Modelo equilibrado |
| HighQ / High Q | **Claude Haiku** | Modelo rápido y económico |
| Cursor | **Cursor** | Editor de código con IA |
| Antigravity | **Google Antigravity** | Entorno de agentes de Google |
| Visual Estudio | **VS Code** | Editor donde corre Claude Code |
| Hermes / OpenCot / OpenCloud | Modelos **abiertos** (Hermes, OpenChat, etc.) | Modelos que SÍ se pueden fine-tunear |

## Mapa del colegio (los archivos)

| Archivo | Qué contiene |
|---|---|
| [01-niveles-y-grados.md](01-niveles-y-grados.md) | Los 6 grados, cómo se sube de nivel, exámenes de promoción |
| [02-materias.md](02-materias.md) | Todas las materias, sus capas y subcapas, nivelación |
| [03-de-prompt-a-skill.md](03-de-prompt-a-skill.md) | Cómo un prompt se convierte en skill, se automatiza y se ejecuta solo |
| [04-agentes-ingenieros-profesores.md](04-agentes-ingenieros-profesores.md) | Cómo una skill se vuelve ingeniero y un ingeniero se vuelve profesor |
| [05-loops-de-estudio.md](05-loops-de-estudio.md) | Cómo poner a Fable 5 a trabajar en bucles generando pensamientos de estudio |
| [06-entrenamiento-y-futuro.md](06-entrenamiento-y-futuro.md) | El plan de entrenamiento: corpus → contexto → datasets → modelo propio |
| [07-ejemplos.md](07-ejemplos.md) | 5 ejemplos completos, paso a paso, sin tecnicismos |
| [08-lista-de-skills.md](08-lista-de-skills.md) | Lista de skills que se transforman en ingenieros por campo y subcampo |
| [09-catalogo-de-ingenierias.md](09-catalogo-de-ingenierias.md) | TODAS las facultades e ingenierías: software, telecom, clásicas, humanidades, gestión |
| [10-instituciones-y-metricas.md](10-instituciones-y-metricas.md) | Base 0% → colegio 15% → instituto 50% → universidad 75% → magíster 100% → empresa propia |
| [11-ingenieria-del-pensamiento-y-aprendizaje.md](11-ingenieria-del-pensamiento-y-aprendizaje.md) | Meta-ingenierías: pensamiento, exámenes/corpus, aprendizaje, curvas |
| [12-comprension-humana.md](12-comprension-humana.md) | La puerta de entrada: comprender al humano ANTES de ejecutar (protocolo del vómito verbal) |
| [13-biblioteca-externa.md](13-biblioteca-externa.md) | Repositorios de GitHub con skills/agentes importables + protocolo de inmigración |
| [14-ingenieria-de-educacion.md](14-ingenieria-de-educacion.md) | La escalera completa (primaria→avanzado), examen de ubicación, 8 modos de aprendizaje, el claustro |
| [15-decretos-del-director.md](15-decretos-del-director.md) | Los 7 decretos del director, el perfil del egresado imparable y la tesis: construir Voznota |
| [PLAN-DE-SUCESION.md](PLAN-DE-SUCESION.md) | El testamento del fundador: herencia de los 6 sucesores, examen del fundador y protocolo del retiro |
| [GUIA-USUARIO-CERO.md](GUIA-USUARIO-CERO.md) | Cómo usa todo esto una persona sin NINGÚN conocimiento técnico (3 pasos) |
| [DONDE-ESTAMOS.md](DONDE-ESTAMOS.md) | Estado del colegio en lenguaje de la calle; se actualiza cada sesión |
| [plantillas/](plantillas/) | Plantillas listas para copiar: skill, agente-profesor, lección, examen |
| [workflows/](workflows/) | Workflows operativos: mejora continua, RAG-consulta, jornada escolar |
| [corpus/](corpus/) | Acá se depositan los "pensamientos de estudio" que generan los loops |

## Cómo se usa el colegio, resumido en 5 pasos

1. **Elegís una materia** de `02-materias.md` (ej.: Python).
2. **Creás la skill** con la plantilla de `plantillas/skill-plantilla/` (ver `03-de-prompt-a-skill.md`).
3. **Ascendés la skill a agente ingeniero** cuando aprueba su examen (ver `04-...md`).
4. **El ingeniero da clases**: corre en loop generando lecciones al `corpus/` (ver `05-...md`).
5. **Las nuevas IAs estudian el corpus** al arrancar (se les carga como contexto) y rinden
   el examen del grado siguiente. Aprobaron → suben de grado. Repetir.
