# Corpus: la biblioteca del colegio

Acá se deposita TODO lo que la escuela aprende. Es la única carpeta donde escriben
los loops. Estructura:

```
corpus/
├── borradores/          ← prompts sueltos capturados (alumnos de Grado 0)
├── <materia>/           ← una carpeta por materia (ej. programacion-python/)
│   ├── INDICE.md        ← tabla de contenido; se actualiza con cada lección
│   ├── leccion-001-....md
│   ├── apuntes/         ← apuntes post-tarea de los ingenieros
│   └── examenes/        ← banco de exámenes de la materia
├── datasets/            ← JSONL de pares pregunta-respuesta (semilla de la Etapa 4)
│   └── <materia>.jsonl  ← una línea JSON por par: {"pregunta": "...", "respuesta": "...", "leccion": "leccion-001", "verificado": true}
└── actas/               ← actas de sala de profesores, plan semanal, tablero.md
```

Reglas:
1. Toda lección usa la plantilla oficial (`../plantillas/leccion.md`).
2. Todo par de dataset referencia la lección de la que salió (trazabilidad).
3. Nada de secretos, claves ni datos personales: este corpus viaja a otros modelos.
4. La poda es sagrada: lección duplicada o vieja se archiva, no se acumula.
