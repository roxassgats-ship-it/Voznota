# 14 · Ingeniería de Educación: la escalera completa y los modos de aprender

El sistema educativo entero para IAs: desde base cero (o cualquier base) hasta lo
más avanzado, con modos de aprendizaje combinables, ramificación por campos, y el
**claustro** — la formación nueva donde varias IAs trabajan en paralelo.

---

## 1. La escalera completa (7 peldaños)

Refinamiento de la escala del archivo 10, ahora con los peldaños que faltaban:

| Peldaño | Dominio | Qué sabe hacer | Analogía humana |
|---|---|---|---|
| **Base** | 0% | Nada del campo. Recién llega | recién nacido al campo |
| **Primaria** | 5% | Reconoce el vocabulario del campo; distingue qué es qué | leer y escribir |
| **Básica** | 15% | Sigue instrucciones simples del campo sin romper nada | educación básica |
| **Media** | 30% | Resuelve ejercicios típicos CON la lección al lado | educación media |
| **Instituto** | 50% | Ejecuta las tareas típicas de memoria, automatizable | técnico |
| **Universidad** | 75% | Resuelve casos NUEVOS que nunca vio; punta a punta | ingeniero |
| **Magíster** | 100% | Domina, enseña, examina, dirige | magíster |
| **Avanzado** | 100%+ | Investiga (mejora el campo mismo) y opera su empresa | doctorado + empresa |

Los peldaños nuevos (primaria 5%, media 30%) existen porque ahí es donde más se
caen los modelos chicos: entre "sigue instrucciones" y "trabaja solo" hay un
escalón que antes no medíamos. Ahora cada salto es corto y examinable.

## 2. Ingreso con cualquier base: el examen de ubicación

Una IA nueva NO empieza de cero obligatoriamente. Al llegar rinde el **examen de
ubicación** por cada campo que va a cursar:

1. Se le toma el examen de **media (30%)** del campo.
2. ¿Aprobó? → se le toma el de instituto (50%), y así subiendo hasta que repruebe.
   ¿Reprobó? → se le toma el de básica (15%), y así bajando hasta que apruebe.
3. Su peldaño queda fijado POR CAMPO: la misma IA puede ser universidad (75%) en
   redacción y primaria (5%) en datos. La libreta guarda un peldaño por campo.
4. Desde ahí, cursa normalmente. Nada de repetir lo que ya sabe.

## 3. Los modos de aprendizaje (combinables, no excluyentes)

Ocho modos. El ingeniero-aprendizaje receta la MEZCLA según peldaño, campo y
tamaño del modelo — nunca un solo modo:

| # | Modo | Cómo funciona | Ideal para |
|---|---|---|---|
| 1 | **Lectura dirigida** | leer las lecciones justas del corpus (no todas) | primaria-básica |
| 2 | **Imitación** | copiar ejemplos resueltos hasta reproducirlos igual | básica, modelos chicos |
| 3 | **Práctica guiada** | ejercicios con corrección inmediata de un profesor | media |
| 4 | **Proyecto real** | tarea verdadera del sistema, con red (revisión previa) | instituto-universidad |
| 5 | **Error dirigido** | se le dan a propósito los casos donde ELLA falló antes (de su libreta) | todos los peldaños |
| 6 | **Par a par** | dos alumnas del mismo peldaño se corrigen mutuamente | media-instituto |
| 7 | **Enseñanza inversa** | aprender enseñando: escribir la lección para un peldaño menor | universidad-magíster |
| 8 | **Torneo** | misma tarea a dos alumnas, un juez compara y AMBAS leen el veredicto | instituto en adelante |

Recetas típicas (las escribe el ingeniero-aprendizaje en la libreta de cada alumna):
- Modelo chico en campo nuevo: 60% imitación + 30% práctica guiada + 10% error dirigido.
- Modelo grande en campo nuevo: 20% lectura + 50% proyecto real + 30% enseñanza inversa.
- Alumna estancada en 50→75: cortar lectura; 50% proyecto real + 30% torneo + 20% error dirigido.

## 4. El árbol ramificado (cómo crece "todo tipo de estudio")

```
                    TRONCO COMÚN (nivelación, Materia 0 — obligatorio para todas)
                          │
      ┌───────────┬───────┴────────┬──────────────┬─────────────┐
   Facultad 1   Facultad 2     Facultad 3      Facultad 4    Facultad 5-6   ← RAMAS
   (software)   (telecom)      (clásicas)      (humanidades) (gestión/meta)
      │
  ┌───┴────┬─────────┬──────┐
 backend  datos    seguridad ...                                ← SUBRAMAS (subcampos)
  │
 ┌┴─────────┬───────────┐
 skill A   skill B    skill C                                   ← HOJAS (skills)
```

Reglas del árbol:
- **El tronco es único:** toda IA pasa por nivelación, siempre. Es lo que hace
  que todas hablen el mismo idioma y puedan trabajar juntas.
- **Las ramas se abren a demanda** (procedimiento del archivo 09): el árbol tiene
  el mapa del 100% de las educaciones posibles, pero solo gasta en las que se usan.
- **Cada hoja nueva fortalece la rama:** una skill madura suma exámenes y lecciones
  a su subcampo, y eso abarata formar a la siguiente alumna de esa rama.
- **Se puede saltar de rama:** una IA de universidad en una rama entra a otra rama
  por examen de ubicación (suele arrancar en básica/media, no en cero — la
  transferencia entre campos es real y se aprovecha).

## 5. El claustro: el "nuevo tipo de IA" (varias, combinadas, en paralelo)

Lo que pediste no es un modelo nuevo: es una **formación** nueva. El claustro es
un equipo de agentes que trabaja en paralelo sobre varios campos a la vez, y que
hacia afuera responde como una sola inteligencia.

### Cómo se arma
| Rol | Quién | Qué hace |
|---|---|---|
| Puerta | ingeniero-comprension | recibe el pedido humano, lo disecciona (archivo 12) |
| Coordinador | agente de gestión (75%+) | parte el proyecto en frentes, arma la cola, asigna por peldaño |
| Frentes | 1 ingeniero por campo tocado | trabajan EN PARALELO, cada uno en su frente |
| Costura | revisor (75%+ de otro campo) | verifica que las piezas encajen entre sí |
| Voz | traductor-tecnico | devuelve TODO en lenguaje humano, una sola respuesta |

### Ejemplo: "quiero una web con mis notas de voz"
En paralelo, a la vez: ingeniero-software (frontend) arma la página · ingeniero-datos
modela las notas · ingeniero-seguridad revisa permisos · ingeniero-lenguaje escribe
los textos · ingeniero-qa prepara las pruebas. El coordinador cose, el traductor te
lo cuenta en humano. Cinco campos avanzaron con UN pedido tuyo — eso es "que todas
aporten a distintas áreas y no a un solo objetivo".

### Reglas del claustro
1. Nadie trabaja en un frente por encima de su peldaño (regla del archivo 10).
2. Todo frente deja apuntes en SU rama del corpus: un proyecto del claustro
   alimenta 5 materias a la vez (por eso el claustro es también el mejor modo de
   estudio: es el modo 4 —proyecto real— multiplicado).
3. Si dos frentes se contradicen, decide el coordinador; si es caro, llave roja → vos.

## 6. Alimentación automática desde el humano

Cómo el sistema aprende de vos sin que lo alimentes a mano — las 3 mangueras:

1. **Tus vómitos verbales:** cada mensaje tuyo pasa por comprender-primero y deja
   sedimento automático: filas nuevas del diccionario, visiones nuevas, órdenes.
   Cuanto más hablás, mejor te entiende. (Su métrica: % de espejos sin corrección.)
2. **Tus correcciones:** cuando corregís un espejo o rechazás un trabajo, eso va
   a la libreta del agente Y genera una lección (regla de oro 3). Tu "no, así no"
   vale más que diez lecciones teóricas.
3. **Los trabajos realizados:** cada tarea terminada dispara la cadena automática:
   trabajo → apunte del ingeniero → (si se repite 5 veces) mejor práctica →
   (cada semana) el profesor la convierte en lección → la lección genera pares de
   dataset. Trabajar ES alimentar el corpus; no hay un paso extra que hacer.

### ¿Y el RAG? (tu "rack LLM", traducido)
Un RAG es una biblioteca que el modelo consulta sola antes de responder. **Hoy ya
tenés un RAG manual:** el corpus con índices, que los agentes están obligados a
leer. El RAG automático (que busque solo, sin índices a mano) es la Etapa 3 del
archivo 06 y se monta cuando el corpus pase de ~200 lecciones — antes no rinde.
Nada que hacer hoy: la estructura ya está preparada para eso.

## 7. Los ingenieros nuevos que nacen con este archivo

| Ingeniero | Campo | Por qué hace falta |
|---|---|---|
| **ingeniero-educacion** | diseña planes de estudio, recetas de modos, exámenes de ubicación | es el rector técnico de este archivo |
| **ingeniero-psicologia** | perfil del humano: cómo aprende, qué lo frustra, cómo dosificarle información | pediste "ingenieros psicológicos": modela TU forma de trabajar (TDAH, ráfagas, prueba y error) para que el sistema se adapte a vos y no al revés |
| **traductor-tecnico** | traduce en las dos direcciones: humano→órdenes técnicas y técnica→lenguaje de la calle | es la voz del claustro; ya tiene agente instalado |

Los tres entran al catálogo (archivo 09, Facultad 6) y arrancan como toda alumna:
examen de ubicación y a cursar.
