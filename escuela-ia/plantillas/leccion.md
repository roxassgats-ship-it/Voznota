# Plantilla de lección (formato oficial del corpus)

Copiá esto para toda lección nueva. Nombre de archivo: `leccion-NNN-tema-corto.md`.

---

```markdown
# Lección NNN · (Título en una línea)

- Materia / capa / subcapa: (ej. Programación / Python / depuración)
- Grado al que apunta: (0 a 5)
- Autor: (qué profesor/modelo la escribió y cuándo)
- Origen: (qué debilidad de qué libreta motivó esta lección — trazabilidad)

## Qué vas a saber hacer al terminar
(1 a 3 frases concretas, verificables.)

## La idea
(Explicación breve. Máximo media página. Si necesita más, son dos lecciones.)

## Ejemplo resuelto
(Un caso completo, de entrada a salida, con el porqué de cada paso.)

## Errores típicos
- (Los errores reales que aparecieron en libretas, con la corrección.)

## Autoexamen
(2 o 3 preguntas con respuesta al pie. Si el alumno no las saca, relee y
NO avanza. Estas preguntas alimentan también al generador de datasets.)
```

---

Reglas de calidad:
- Una lección enseña UNA cosa. Si el título necesita "y", partila en dos.
- Toda lección debe permitir aprobar su autoexamen SOLO leyéndola (el loop de
  auto-mejora del archivo 05 verifica exactamente eso).
- Al guardarla, actualizá el `INDICE.md` de la materia.
