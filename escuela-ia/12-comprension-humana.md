# 12 · Ingeniería de la Comprensión: entender antes de ejecutar

Tu pedido textual: *"necesito que una IA no ejecute de forma inmediata, sino que
busque la forma de comprenderme, separar los vómitos verbales de forma quirúrgica,
y despachar a los agentes por detrás"*.

Este archivo define esa capa. Es la puerta de entrada del colegio: **ningún pedido
humano va directo a ejecución**. Primero pasa por acá.

---

## El problema que resuelve

Hablás como pensás: rápido, en ráfaga, mezclando 10 ideas, con nombres aproximados
("Pablo cinco", "HighQ") y saltos de tema. Eso NO es un defecto tuyo: es el formato
natural de una persona autodidacta con TDAH. El defecto está en las IAs que agarran
la primera frase ejecutable y salen corriendo. La solución no es que vos hables
"técnico" — es que el sistema tenga un órgano dedicado a comprenderte.

## El protocolo del vómito verbal (5 pasos quirúrgicos)

### Paso 1 — RECIBIR SIN EJECUTAR
El texto entra y se guarda tal cual en `corpus/comprension/entradas/`. Regla
absoluta: en este paso no se toca ni un archivo, no se corre ni un comando.

### Paso 2 — SEPARAR (la cirugía)
El texto se disecciona en piezas etiquetadas:

| Etiqueta | Qué es | Ejemplo de tu último mensaje |
|---|---|---|
| 🎯 PEDIDO | algo que querés que se haga | "aumentar las materias del colegio" |
| 💭 IDEA | visión a futuro, todavía no ejecutable | "cada ingeniero tendrá su empresa" |
| ❓ PREGUNTA | algo que querés saber | "¿cómo suben de nivel?" |
| 📖 CONTEXTO | información sobre vos o el proyecto | "soy autodidacta con TDAH" |
| 🔤 TRADUCCIÓN | nombre aproximado → nombre real | "HighQ" → Haiku |
| ⚠️ AMBIGUO | pieza que admite 2+ lecturas | se lista, no se adivina |

### Paso 3 — RECONSTRUIR Y ESPEJAR
Con las piezas se arma el **espejo**: "Entendí que pedís A, B y C; que tu visión a
futuro es D; y que E puede significar E1 o E2". El espejo se te muestra en lenguaje
llano (cero tecnicismo — la traducción técnica queda para los ingenieros, no para vos).
- Piezas claras → pasan al paso 4 sin esperar.
- Piezas ⚠️ AMBIGUAS → se preguntan SOLO si el error sería caro; si es barato
  de corregir, se elige la lectura más probable y se deja anotado qué se asumió.

### Paso 4 — DESPACHAR A LA TRASTIENDA
Cada 🎯 PEDIDO se convierte en órdenes de trabajo en `corpus/comprension/ordenes/`:

```markdown
# Orden 2026-07-16-03
- Origen: entrada 2026-07-16 (pieza 4)
- Pedido comprendido: catálogo completo de ingenierías
- Despachado a: ingeniero-producto (definir alcance) → profesor-fundador (escribir)
- Institución mínima requerida: universidad (75%)
- Qué se asumió: "todas las ingenierías" = catálogo abrible a demanda, no 200 carpetas vacías
- Estado: en curso
```

Los agentes trabajan por detrás con la orden — no con tu texto crudo. Vos hablás
humano-a-humano con la capa de comprensión; la mecánica técnica queda en la trastienda.
Las 💭 IDEAS no se ejecutan: van a `corpus/comprension/visiones.md`, el documento
de visión que los ingenieros consultan para que lo que construyen apunte a donde vos vas.

### Paso 5 — DEVOLVER EN HUMANO
Cuando la trastienda termina, la respuesta vuelve a traducirse: qué se hizo, qué
falta, qué se asumió — en lenguaje llano, sin jerga, con los detalles técnicos
disponibles pero no encima tuyo.

## Qué interrumpe el protocolo (las 3 llaves rojas)

El paso 4 se FRENA y se te pregunta antes, solo en estos casos:
1. La orden implica **borrar o sobrescribir** algo que no creó el sistema.
2. La orden implica **gasto** por encima del tope diario.
3. Dos piezas del mismo vómito verbal se **contradicen** entre sí.

Todo lo demás fluye sin molestarte: comprender no es preguntar por todo, es
preguntar solo lo que duele equivocarse.

## Cómo mejora esta capa con el tiempo (su propio aprendizaje)

El ingeniero-comprension tiene su libreta como todos, y además un **diccionario
personal tuyo** en `corpus/comprension/diccionario.md`:

```markdown
| Vos decís | Significa | Confirmado |
|---|---|---|
| Pablo cinco / Fabre | Claude Fable 5 | ✅ 2026-07-16 |
| HighQ | Claude Haiku | ✅ 2026-07-16 |
| mis hijas | las IAs/agentes del sistema | ✅ 2026-07-16 |
| vómito verbal | mensaje en ráfaga a diseccionar | ✅ 2026-07-16 |
| toquetear por parte de atrás | trabajo en trastienda sin ejecutar en tu cara | ✅ 2026-07-16 |
```

Cada espejo confirmado agrega filas. Con los meses, la capa te comprende a la
primera casi siempre — esa es SU curva de aprendizaje, y se mide igual: % de
espejos aprobados sin corrección tuya.

## Implementación ejecutable

- Skill: `.claude/skills/comprender-primero/SKILL.md` (ya instalada — se activa
  sola ante mensajes en ráfaga o si escribís `/comprender-primero`).
- Agente: `.claude/agents/ingeniero-comprension.md` (la puerta de entrada).
- El examen de esta materia: se le dan 10 vómitos verbales viejos tuyos y se
  compara su disección contra lo que vos realmente querías (vos corregís este
  examen — sos el único que puede).
