# 11 · Las meta-ingenierías: pensamiento, exámenes, aprendizaje

Las 4 ingenierías que diseñan el colegio mismo (Facultad 6 del catálogo). Acá está
el "aumentar el pensamiento, aumentar cómo aprenderá" que pediste.

---

## 1. Ingeniería del Pensamiento

Diseña CÓMO razona un agente antes de tocar nada. El estándar de la casa es el
**protocolo de 4 tiempos**, que se pega en toda definición de agente:

```
ANTES DE ACTUAR, SIEMPRE:
1. COMPRENDER — ¿Qué me pidieron de verdad? (si vino de un humano, pasó
   primero por la capa de comprensión del archivo 12)
2. PLANEAR — ¿Qué pasos? ¿Qué puede salir mal? ¿Está esto en mis lecciones
   o en mejores-practicas.md? ¿Me alcanza mi institución (archivo 10) o
   debo derivar a alguien de dominio mayor?
3. ACTUAR — ejecutar el plan, un paso por vez, verificando cada paso.
4. REVISAR — ¿el resultado cumple lo comprendido en el paso 1? ¿Qué
   registro dejo (libreta, apunte, métrica)?
```

Subcampos que desarrolla el ingeniero-pensamiento:
- **Plantillas de razonamiento por tipo de tarea** (diagnóstico ≠ creación ≠ corrección).
- **Presupuesto de pensamiento:** cuánto pensar según el riesgo. Regla: tareas
  reversibles → pensar poco y probar; tareas irreversibles → pensar mucho y preguntar.
- **Pensamiento en desacuerdo:** para decisiones grandes, dos agentes argumentan
  posiciones opuestas y un tercero resume; el resumen va al acta.

## 2. Ingeniería de Exámenes y Corpus

Diseña cómo se MIDE y se GUARDA el conocimiento. Es la ingeniería más poderosa del
colegio porque los porcentajes del archivo 10 salen de acá.

- **Arquitectura del banco:** por cada campo, exámenes de colegio (15%), instituto
  (50%), universidad (75%) y magíster (100%). Los de magíster incluyen "escribir un
  examen de instituto que otro apruebe" — examinar es la prueba final de dominio.
- **Calidad del examen:** un examen es bueno si (a) un agente sin las lecciones lo
  reprueba, (b) uno con las lecciones lo aprueba, y (c) dos correctores le ponen
  nota parecida. Los tres puntos se verifican antes de entrar al banco.
- **Higiene del corpus:** índices al día, lecciones de una sola cosa, poda
  periódica, y trazabilidad total (toda lección cita la libreta que la motivó;
  todo par de dataset cita su lección).
- **Anti-trampa:** los exámenes de promoción se toman con casos que NO están en el
  corpus (variaciones frescas generadas el día del examen a partir de la rúbrica).
  Así se mide comprensión, no memoria.

## 3. Ingeniería del Aprendizaje (curvas y alimentación)

Diseña cómo aprende cada IA según su tamaño y su historia. Sus herramientas:

### La curva de aprendizaje (se grafica por agente, con datos de la libreta)

```
dominio %
100 ┤                                    ____ magíster
 75 ┤                          ____-----      ← acá se estanca la mayoría:
 50 ┤                ____-----                  de ejecutar bien (50) a resolver
 15 ┤      ____-----                            lo nunca visto (75) es el salto duro
  0 ┼-----┬--------┬----------┬-----------┬--→ exámenes rendidos
```

Lecturas de la curva (las hace el ingeniero-aprendizaje cada mes):
- **Curva plana** en 50-75: faltan tareas nuevas, no más lecciones → se le asigna
  trabajo de otro subcampo vecino (transferencia).
- **Curva que baja** en revalidación: corpus desactualizado → alerta al director.
- **Curva que sube rápido y falla en real:** exámenes demasiado parecidos a las
  lecciones → alerta anti-trampa al ingeniero-examenes.

### La dieta (cómo se alimenta cada IA, por tamaño)

| Modelo | Dieta que funciona |
|---|---|
| Grande (Fable/Opus) | pocas instrucciones, problemas abiertos, pedirle que ESCRIBA lecciones (aprende enseñando) |
| Medio (Sonnet) | manual destilado + lecciones de su tarea del día |
| Chico (Haiku) | muchos ejemplos concretos, pasos cortos, formatos rígidos, lecciones de nivelación |

Regla de oro de la alimentación: **a un modelo no se le da más corpus, se le da el
corpus justo.** Sobre-alimentar (pegarle 50 lecciones) rinde peor que darle las 3
correctas — por eso los índices y manuales destilados importan tanto.

### Los 5 puntos esenciales del aprendizaje (resumen operativo)

1. Se aprende de tareas reales, no solo de lecciones (las lecciones consolidan).
2. El error registrado vale más que el acierto sin registro.
3. Repetir sin examen no es aprender, es gastar tokens.
4. Cada institución tiene su dieta; cambiar de modelo = cambiar de dieta.
5. Lo aprendido que no se escribe, no existe para la siguiente generación.

## 4. Ingeniería de la Comprensión

Tiene archivo propio porque es tu pedido más importante: **archivo 12**.
