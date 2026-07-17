# 13 · Biblioteca externa: repositorios de GitHub con skills e ingenieros listos

Lo que pediste buscar: colecciones públicas de skills y agentes que podés importar
al colegio en vez de escribir todo de cero. Verificadas por búsqueda el 2026-07-16.

## Colecciones grandes (importar de a puñados, no enteras)

| Repositorio | Qué tiene | Para qué facultad nuestra |
|---|---|---|
| [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | 1000+ skills de equipos oficiales y comunidad; compatible con Claude Code, Codex, Gemini CLI, Cursor | todas — el catálogo más grande |
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | 100+ subagentes especializados de desarrollo | Facultad 1 (software) — ingenieros ya escritos |
| [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | 135 agentes, 35 skills, 42 comandos, plugins, hooks, plantillas | Facultades 1-2 + operación del colegio |
| [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | índice curado del ecosistema completo de Claude Code | biblioteca de consulta general |
| [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | lista curada de skills; explica bien skill vs subagente | Materia 4 (para enseñar la diferencia) |
| [GetBindu/awesome-claude-code-and-skills](https://github.com/GetBindu/awesome-claude-code-and-skills) | skills de producción: código, seguridad, marketing, dominios especializados | Facultades 1, 5 |
| [supatest-ai/awesome-claude-code-sub-agents](https://github.com/supatest-ai/awesome-claude-code-sub-agents) | agentes especializados de desarrollo | Facultad 1 |

También: los temas [claude-code-skills](https://github.com/topics/claude-code-skills) y
[subagents](https://github.com/topics/subagents) en GitHub listan repos nuevos a medida
que aparecen.

## Protocolo de inmigración (cómo entra una skill externa al colegio)

Una skill importada NO entra con honores: entra por la puerta de Grado 0, como todas.

1. **Cuarentena:** se copia a `corpus/borradores/importadas/<origen>/` SIN activarla.
2. **Aduana de seguridad (ingeniero-seguridad):** leer el SKILL.md completo antes
   de activar. Rechazar si: pide ejecutar comandos que descargan/instalan cosas,
   toca archivos fuera de su carpeta, contiene URLs a las que manda datos, o trae
   instrucciones raras escondidas. Una skill es un prompt con permisos — se revisa
   como se revisaría a un empleado nuevo con llaves de la casa.
3. **Adaptación:** traducir/ajustar al formato de la casa (plantilla oficial,
   límites, freno diario). Quitarle todo lo que no aplica a nuestro sistema.
4. **Examen de Grado 1:** sus 10 casos de prueba, como cualquier alumna.
5. **Registro civil:** fila en el archivo 08 (o en el catálogo 09 si abre campo
   nuevo), libreta propia, y a trabajar según su institución (archivo 10).

Regla: **importar ahorra escritura, no ahorra examen.** El nivel del colegio lo
sostienen los exámenes, vengan las skills de donde vengan.

## Qué conviene importar primero (recomendación)

1. Ingenieros de software de VoltAgent (revisor de código, escritor de tests) —
   maduros y de bajo riesgo.
2. Skills de documentación/redacción — refuerzan la fábrica de lecciones.
3. Hooks y comandos del toolkit de rohitg00 — para la operación (Materia 9).

Dejá para después las que piden herramientas externas (MCP, APIs): cada una agrega
superficie de riesgo y hay que pasarlas una por una por la aduana.
