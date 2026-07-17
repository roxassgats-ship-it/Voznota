# 🔌 Enchufe de Qwen3 (y de cualquier modelo local por Ollama)

Todo listo para cuando termine tu descarga. El colegio recibe a Qwen3 como
ALUMNO EXTERNO nº1: entra por la puerta de siempre (examen de ubicación),
sin privilegios y sin humo.

## Cuando termine la descarga (3 comandos en tu PC)
```
ollama pull qwen3            # (el que ya estás bajando)
cd <carpeta-del-colegio>     # donde clonaste/extrajiste el repo
python scripts/examinar_alumno_ollama.py qwen3
```
Eso es todo: el script le toma el examen de ubicación de SQL, lo corrige EL
MOTOR (las consultas se ejecutan de verdad, no se evalúan a ojo), imprime la
nota y te da la fila lista para pegar en el acta.

## Qué pasa según el resultado
- **≥8/10** → Qwen3 se ubica en básica de SQL (15%) y sigue la escalera:
  media → instituto, con los exámenes que ya existen en el banco.
- **<8/10** → el profesor le receta la dieta de modelo chico (archivo 11):
  lecciones 001-003 con más ejemplos y pasos cortos, y re-rinde. Reprobar
  no es fallar: es la primera medición de la curva de Qwen3.
- En AMBOS casos: anotá la fila del acta en corpus/datos-sql/examenes/ y su
  libreta (ya creada: agentes/alumno-qwen3/libreta.md).

## Por qué este examen es EL dato que buscabas
Es la validación que la Parte 2 exige (mi corrección nº1 del plan): hasta hoy
todos los niveles los rindió Fable en distintos roles. Qwen3 es el primer
cerebro DISTINTO midiendo si el colegio enseña de verdad. Su nota contra el
mismo banco = la comparación objetiva Fable vs hijas locales.

## Los que vienen después (misma puerta, mismo script)
hermes, códigos abiertos, etc.: `python scripts/examinar_alumno_ollama.py <modelo>`
— cada uno con su libreta y su fila de acta. La tabla de asignación (archivo 10)
se llena con estas notas: qué modelo local sirve para qué materia.
Nota de la casa: "claude, codex, chatgpt" no corren por Ollama (son servicios
cerrados); esos se comparan rindiendo el mismo banco desde sus propias apps.

## Reglas del enchufe (frenos de siempre)
1. Modelo nuevo NUNCA toca el corpus directo: primero examen, después tareas
   de su peldaño con revisión (archivo 10).
2. Sus salidas van a su libreta y actas — la fábrica de datasets solo acepta
   pares VERIFICADOS contra lección, venga de Fable o de Qwen3.
3. El gasto local es tuyo (tu GPU), pero el registro es del colegio igual.
