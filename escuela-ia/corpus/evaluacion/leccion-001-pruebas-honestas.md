# Lección 001 · Pruebas honestas: la educación correctiva de E11 y E12

- Materia / capa / subcapa: Evaluación / 6.1 / integridad de la prueba
- Grado al que apunta: todos (lectura obligatoria de correctores)
- Autor: profesor-fundador, 2026-07-16 (LECCIÓN CORRECTIVA: nace de dos errores reales)
- Origen: E11 (la prueba ayudó al artefacto) y E12 (contadores de memoria)

## Qué vas a saber hacer al terminar
Reconocer las 2 formas en que una prueba miente sin que nadie mienta a propósito.

## La idea
Una prueba puede dar verde y ser falsa por dos vías, ambas ocurridas AQUÍ:
1. **La prueba ayuda al artefacto (E11):** el tester activó a mano una protección
   que el archivo entregado no traía. El examen daba verde; el producto estaba
   roto. Regla: la prueba corre el artefacto TAL CUAL se entrega, en un entorno
   limpio, sin preparación del que testea.
2. **El número sale de la memoria (E12):** el tablero decía 5 skills y 7 agentes;
   los comandos daban 4 y 6. Nadie mintió: alguien "recordó". Regla: todo número
   reportado sale de un comando ejecutado en el momento.

## Ejemplo resuelto
Mal: "probé el esquema (con mi pragma activado) → verde".
Bien: "conexión nueva y limpia → ejecuté SOLO el archivo entregado → borré una
nota → conté huérfanas con un comando → 0 → verde". La diferencia: en la
segunda, el verde sobrevive sin el tester presente.

## Errores típicos
- Reusar la sesión/conexión de desarrollo para la prueba final (arrastra estado).
- Copiar el número del reporte anterior "porque no cambió".

## Autoexamen
1. ¿Cuáles son las 2 formas en que una prueba verde miente?
2. ¿Qué le falta a "lo probé en mi máquina y anda"?
Respuestas: (1) prueba que ayuda al artefacto; número de memoria. (2) entorno
limpio + artefacto tal cual + evidencia por comando: el verde debe sobrevivir
sin el tester.
