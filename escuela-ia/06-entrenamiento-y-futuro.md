# 06 · El plan de entrenamiento: de Fable 5 a un modelo propio

Tu plan declarado: *"Fable 5 ya no lo voy a usar más a futuro; necesito usarlo AHORA
para entrenar a mis hijas (mis IAs) y que después mejoren solas con modelos más
económicos, hasta generar nuestra propia IA."*

Ese plan es viable si se entiende qué se puede entrenar en cada etapa. Son 4 etapas.

---

## Etapa 1 (HOY) — Fable 5 como profesor fundador

**Qué se hace:** correr los loops del archivo 05 con Fable 5 mientras lo tenés.
Prioridad de qué generar, en orden de valor:

1. **Exámenes** (casos de prueba con respuesta esperada) — son lo más valioso porque
   miden a cualquier modelo futuro. Sin exámenes no sabés si las hijas mejoran.
2. **Lecciones** del corpus por materia — el libro de texto de la escuela.
3. **Datasets JSONL** (pares pregunta-respuesta verificados) — la semilla del
   entrenamiento literal de la Etapa 4.
4. **Definiciones de agentes y skills pulidas** — la estructura que heredan todos.

**Regla de la etapa:** todo lo que Fable sepa hacer bien y vos quieras conservar,
tiene que quedar ESCRITO (lección + examen). Lo que no se escribió, se pierde
cuando dejes de usarlo.

## Etapa 2 — Las hijas: Opus, Sonnet y Haiku heredan la escuela

**Qué se hace:** se crean los mismos agentes pero corriendo con modelos más
económicos, y se les toma los exámenes que dejó Fable.

- El examen dice objetivamente cuánto rinde cada modelo por materia. Típicamente:
  Sonnet aprueba casi todo con el corpus como apoyo; Haiku necesita lecciones "de
  nivelación" (más ejemplos, pasos más cortos — las escribe el profesor cuando ve
  los errores de Haiku, como dice el archivo 04).
- **Tabla de asignación** (la mantiene el director en Materia 9): qué modelo atiende
  qué materia según nota y costo. Ejemplo meta: Haiku para tareas repetitivas,
  Sonnet para trabajo diario, Opus solo para exámenes difíciles y curaduría.

**Cómo "mejoran solas":** el ciclo libreta → debilidad → lección nueva → re-examen
sigue girando igual que antes, solo que ahora los profesores son las hijas. El
colegio no depende de ningún modelo en particular.

## Etapa 3 — Memoria fija: destilar el corpus

Cuando el corpus crece, leerlo entero cada vez se vuelve caro. Se destila:

1. El director de cada materia resume las 50 lecciones en un **manual de materia**
   de 2-3 páginas (lo esencial, verificado contra los exámenes).
2. Ese manual entra al CLAUDE.md / definición del agente: se carga siempre,
   automáticamente, sin gastar en releer todo.
3. El corpus completo queda como biblioteca de consulta (se busca solo cuando hace
   falta el detalle).

Resultado: un modelo chico con manual destilado rinde cerca de uno grande sin
manual. Esta etapa es puro trabajo de la escuela, cero entrenamiento técnico.

## Etapa 4 (FUTURO) — La IA propia: fine-tuning de un modelo abierto

Acá está el único entrenamiento "de verdad" (que cambia el cerebro del modelo):

1. **Elegir un modelo abierto** (Llama, Mistral, Qwen, Hermes — Materia 7.1 enseña
   a elegir). Son gratuitos de descargar y legales de modificar.
2. **Preparar el dataset:** los `corpus/datasets/*.jsonl` de la Forma 3 del archivo
   05, limpiados por la Materia 3.4 (deduplicar, validar, balancear materias).
3. **Fine-tuning con LoRA:** una técnica que ajusta el modelo con hardware modesto
   (una GPU alquilada por horas alcanza para modelos chicos). El modelo abierto
   "estudia" los miles de pares pregunta-respuesta y los incorpora a su cerebro.
4. **Tomarle los exámenes de la escuela.** El mismo banco de exámenes de la Etapa 1
   dice si tu modelo propio ya alcanza a las hijas comerciales en tus materias.
5. **Iterar:** donde repruebe, se generan más pares de esa materia y se re-entrena.

**Notas honestas de esta etapa:**
- Un modelo propio fine-tuneado será excelente en TUS materias y TUS formatos, pero
  no va a superar a los modelos comerciales grandes en conocimiento general. Para tu
  colegio eso está bien: lo querés especialista, no enciclopedia.
- Revisá los términos de uso del proveedor cuyo modelo generó el dataset: usar
  salidas de modelos comerciales para entrenar modelos que compitan con ellos suele
  estar restringido. Para un modelo interno de uso propio y educativo el riesgo es
  bajo, pero leelo antes de la Etapa 4.
- El costo real de esta etapa no es la GPU: es la calidad del dataset. Por eso las
  Etapas 1-3 son el 90% del trabajo, y por eso conviene hacerlas AHORA con Fable.

---

## El tablero de control (cómo sabés que el plan avanza)

Métricas que el director registra cada mes en `corpus/actas/tablero.md`:

| Métrica | Qué mide |
|---|---|
| Lecciones en corpus | Tamaño del libro de texto |
| Exámenes en banco | Capacidad de medir modelos futuros |
| Pares en datasets | Semilla de la IA propia |
| Nota media por modelo y materia | Quién rinde cuánto |
| Costo por materia | Si la tabla de asignación ahorra de verdad |
| Lecciones podadas | Que el corpus no acumule grasa |

Cuando "pares en datasets" pase los ~10.000 verificados y la nota media de las
hijas se estanque, es la señal de que la Etapa 4 vale la pena.
