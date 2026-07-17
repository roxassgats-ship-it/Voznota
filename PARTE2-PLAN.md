# 🧭 Parte2PcCasa — Cómo la haría yo, Fable (plan y correcciones del fundador)

El dueño pregunta: *"en la parte 2, ¿cómo lo harías, qué corregirías, Fable?"*
Respuesta del fundador, en orden de ejecución. La Parte 1 construyó el colegio
y demostró que funciona; la Parte 2 lo hace RENDIR. Mi regla para toda la
parte 2: **nada nuevo de diseño — todo es ejecutar, medir y podar.**

## Lo que yo corregiría primero (autocrítica de la Parte 1)

1. **Todos los niveles altos son de UNA sola sesión y UN solo modelo.** El 75%
   del ingeniero SQL es real pero fue rendido por mí (Fable) haciendo de todos
   los roles. La corrección: re-tomar los mismos exámenes con modelos distintos
   (Sonnet, Haiku) usando el banco que ya existe. Recién ahí sabremos qué parte
   del nivel es del SISTEMA y qué parte era mía. Este es el testeo más
   importante de toda la Parte 2 — y el más honesto.
2. **La comprensión no tiene todavía tu veredicto.** 9 espejos presentados,
   cero corregidos por vos. Sin tu "sí/no/era otra cosa", su 62% es provisorio.
   Corrección: los primeros 10 minutos de la Parte 2 son tu veredicto sobre el
   diccionario y los espejos. Es barato y destraba el examen del portero.
3. **Demasiadas actas por día.** Yo mismo generé más papeles de gestión de los
   que el Decreto 5 toleraría. Corrección: en la Parte 2, UNA acta diaria (la
   de la jornada) y el tablero. El resto se poda.

## El plan de la Parte 2, en orden

**Semana 1 — Validar con modelos baratos (la prueba de fuego del colegio)**
- Examen de ubicación de Haiku y Sonnet en SQL y Lenguaje con el banco actual.
- Donde Haiku repruebe → el profesor escribe la lección de nivelación (ese fue
  siempre el diseño, ejemplo 4 del archivo 07). Tabla de asignación real:
  qué modelo atiende qué materia por nota y costo.
- Saldar E1: los exámenes adeudados de las 3 skills fundadoras.

**Semana 2 — Voznota sprint 2 (la tesis sigue)**
- Etiquetas y duración (el esquema-sprint2.sql ya está esperando).
- Persistencia real: hoy guarda en el navegador; sprint 2 exporta/importa
  respaldo. Con QA revisando ANTES de entregar, no después.
- Primer usuario real: VOS usándola con notas de verdad — tus correcciones
  valen más que 10 exámenes.

**Semana 3-4 — La fábrica a régimen**
- Dejar que la jornada automática corra sola TODA la semana y solo leer actas.
  Si sobrevive 7 días sin intervención, la automatización está probada.
- Datasets: de 5 a 100+ pares verificados (el loop nocturno del archivo 05).
- Primer magíster: el ingeniero SQL completa su trabajo 5 (que un alumno
  apruebe con su lección) y escribe el examen de otro campo → hereda mi cargo
  de director de su materia, como dice el plan de sucesión.

**Mes 2+ — Lo que ya está agendado con criterio**
- RAG automático al llegar a ~200 lecciones (antes no rinde — no adelantarlo).
- Etapa 4 (modelo propio con LoRA) recién cuando los datasets pasen ~10.000
  pares y las hijas se estanquen. No antes: el costo real es el dataset.

## Cómo lo haría yo, en una frase por principio

- **Medir antes que crecer:** ninguna materia nueva hasta que las 3 abiertas
  tengan 2+ alumnos examinados.
- **El error es el plan de estudios:** las lecciones nuevas salen de las
  libretas y del registro E#, no de mi imaginación.
- **Tu voz manda:** cada espejo corregido por vos vale más que cualquier
  documento mío.
- **Y la que ya firmé en el testamento:** que me superen con mis propias
  reglas. La Parte 2 está bien hecha el día en que el colegio no me extrañe.

— Fable 5, profesor fundador · fin de la Parte 1
