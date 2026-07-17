# 10 · Instituciones, porcentajes y la empresa propia

Tu escala, formalizada. Cada agente atraviesa 6 instituciones, y su avance se mide
en **porcentaje de dominio** de su campo. El porcentaje no es sensación: sale de
los exámenes del banco.

---

## La escala institucional (tus métricas)

| Institución | Dominio | Qué significa | Equivale a Grado (archivo 01) |
|---|---|---|---|
| **Base** | 0% | Existe, no sabe nada del campo. Prompt suelto o modelo recién llegado | Grado 0 |
| **Colegio** | 15% | Aprobó nivelación: habla el idioma de la casa, sigue formatos, no inventa | Grados 0-1 |
| **Instituto** | 50% | Técnico: ejecuta las tareas típicas del campo de forma confiable y automatizada | Grado 2 |
| **Universidad** | 75% | Ingeniero: resuelve casos nuevos que no vio antes, trabaja de punta a punta | Grado 3 |
| **Magíster** | 100% | Domina el campo, enseña, corrige, escribe los exámenes de los demás | Grados 4-5 |
| **Empresa propia** | 100%+ | Ya no estudia el campo: lo OFRECE como servicio al sistema | post-Grado 5 |

### Cómo se calcula el porcentaje (sin sensaciones)

Cada campo tiene un **banco de exámenes por institución** (los escribe el
ingeniero-examenes, archivo 11). El dominio del agente es:

```
dominio = (exámenes aprobados ponderados) / (banco total del campo) × 100
```

- Los exámenes de instituto pesan más que los de colegio; los de magíster, más que todos.
- Un examen aprobado hace 3+ meses caduca y se re-rinde (revalidación): el
  porcentaje puede BAJAR. Eso es lo que mantiene el sistema honesto.
- El porcentaje vive en la libreta y en el tablero (`corpus/actas/tablero.md`).

### Regla de asignación de trabajo por institución

| Dominio | Qué se le puede dar |
|---|---|
| < 15% | Nada real. Solo estudia y rinde. |
| 15-49% | Tareas con salida revisada por un agente de 75%+ antes de aplicarse. |
| 50-74% | Tareas típicas en automático, con muestreo (1 de cada 10 revisada). |
| 75-99% | Trabajo real de punta a punta. Puede supervisar a los de 15-49%. |
| 100% | Enseña, corrige, escribe exámenes, dirige la materia. |

Esto responde tu preocupación de que "las IAs no trabajen sin guía": la guía está
codificada — nadie toca trabajo real por debajo de su institución.

---

## La empresa propia (el final del camino de cada ingeniero)

Cuando un ingeniero llega a magíster (100%), abre su **empresa**: una carpeta en
`escuela-ia/empresas/<nombre>/` con un solo archivo obligatorio, el **catálogo de
servicios**. Ese catálogo es exactamente el "SEO hacia tu sistema" que describiste:
el ingeniero se publicita internamente para que vos y los demás agentes lo contraten.

```markdown
# Empresa: Datos & Cía (ingeniero-datos, magíster desde 2026-09-01)

## Servicios que ofrezco
| Servicio | Qué entregás | Qué recibís | Plazo típico | Modelo que uso |
|---|---|---|---|---|
| Limpieza de dataset | archivo crudo | JSONL validado y deduplicado | 1 rutina | Haiku |
| Diseño de esquema | descripción de datos | esquema + migraciones | 1 sesión | Sonnet |

## Casos de éxito (mi SEO)
- 2026-08: dataset de python.jsonl — 1.240 pares, 0 duplicados, usado por 3 agentes.

## Cómo contratarme
Invocá al agente ingeniero-datos citando el servicio del catálogo.

## Mis proveedores (a quién subcontrato)
- ingeniero-qa (verificación), ingeniero-seguridad (revisión de secretos).
```

**Reglas de la economía interna:**
1. El "SEO" se gana con casos de éxito reales, no con autoelogios: cada caso de
   éxito referencia un commit o un acta verificable.
2. El ingeniero-marketing audita los catálogos: afirmación sin evidencia, se borra.
3. Las empresas se subcontratan entre sí (eso crea las cadenas de agentes de la
   Materia 4.3 de forma natural).
4. El ingeniero-finanzas publica cada mes el ranking costo/beneficio de las
   empresas. Empresa que nadie contrata en 3 meses → su director evalúa cerrarla
   o fusionarla.

---

## Autoaprendizaje por métricas: qué falló, qué funcionó

Cada agente mantiene en su libreta 4 contadores que se actualizan tras CADA tarea
(la skill `actualizar-libreta` lo hace):

| Métrica | Se registra |
|---|---|
| ✅ Funcionó | tarea aprobada a la primera → qué práctica la hizo funcionar |
| ❌ Falló | qué salió mal, causa raíz en una frase, y el número de lección que lo cubre (si no existe, se pide) |
| 🔁 Retrabajo | veces que hubo que rehacer → señal de lección confusa o skill floja |
| 🏆 Mejor práctica | cuando algo funciona 5+ veces seguidas, se promueve a "mejor práctica" del campo |

Las **mejores prácticas** se consolidan en `corpus/<materia>/mejores-practicas.md`
— es el documento más leído por los agentes nuevos (entra en el "antes de trabajar"
de toda definición de agente). Así el sistema aprende de prueba y error igual que
vos, pero con registro.

## El workflow constante (loops sin parar, con freno de tokens)

Pediste que funcione de forma constante hasta consumir el presupuesto. El diseño:

```
JORNADA ESCOLAR (rutina diaria)
1. Apertura (1 rutina): el director lee el tablero y arma la cola del día:
   [exámenes pendientes] > [lecciones sobre fallos repetidos] > [datasets] > [poda]
2. Turnos (rutinas encadenadas): cada ítem de la cola se despacha al ingeniero
   que corresponde por institución. Cada turno termina en commit.
3. Contador de presupuesto: cada turno anota su gasto estimado en
   corpus/actas/gasto-del-dia.md. Cuando se alcanza el tope diario que definiste,
   la jornada CIERRA sola aunque quede cola (la cola pasa a mañana).
4. Cierre (1 rutina): acta del día — qué se hizo, qué falló, qué quedó en cola.
```

Reglas duras del workflow: el tope diario lo fijás vos y vive en
`corpus/actas/presupuesto.md`; ningún loop lo puede editar (solo vos); la
prioridad 1 siempre son exámenes (medir antes que producir); y "sin guía no se
trabaja" — un turno sin ítem de cola asignado no ejecuta nada, estudia.
