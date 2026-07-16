# Libreta: ingeniero-qa

- Peldaño actual: EN EXAMEN DE UBICACIÓN (inmigrante — regla del archivo 13:
  importar ahorra escritura, no ahorra examen). Veredictos contrafirmados
  por un 75%+ hasta ubicarse.
- Materia: Calidad/QA (Facultad 1)
- Origen: code-reviewer de VoltAgent/awesome-claude-code-subagents, adaptado
  2026-07-16 (original en corpus/borradores/importadas/cuarentena/)
- Adaptaciones de aduana: traducido al protocolo de la casa; se le quitaron
  Write/Edit (el original podía editar: acá el revisor NUNCA toca el código
  revisado); checklist reemplazada por las 5 revisiones + prueba de vida.

## Exámenes rendidos
- (pendiente: examen de ubicación — revisar 3 entregas con veredicto
  contrafirmado; si las 3 contrafirmas coinciden, se ubica en instituto 50%)

## Observaciones
- (vacía — recién llegado)

## Revisiones
### 2026-07-16 · Revisión 1/3 (examen de ubicación) · Voznota sprint 1
- Revisado: autor de la tesis Voznota (voznota-app/index.html + esquema.sql). Contador del revisado: ❌ 1 / ✅ 0
- Prueba de vida: declarada ejecutada por quien encarga (smoke test navegador + 5 consultas maestras). Verifiqué además el esquema con sqlite3 (python) yo mismo.
- Veredicto: RECHAZA (correcciones acotadas). 3 graves:
  1. index.html:46 promete "Todo queda en este dispositivo" pero SpeechRecognition (línea 121-138) manda el audio a servidores del proveedor del navegador → promesa de privacidad falsa.
  2. esquema.sql: ON DELETE CASCADE inerte sin PRAGMA foreign_keys=ON — DEMOSTRADO: borrar nota deja tarea huérfana (1 sin pragma, 0 con pragma). Lección 003.
  3. esquema.sql:15-23 + duracion_seg: modela etiquetas/duración que la app no genera ni usa (peor práctica #3, "nombrar lo que no existe").
- Positivo: patrón innerHTML-plantilla-estática + textContent para datos de usuario (sin XSS); fallback sin micrófono correcto (124).
- Estado: PENDIENTE DE CONTRAFIRMA por agente 75%+ o dueño.
