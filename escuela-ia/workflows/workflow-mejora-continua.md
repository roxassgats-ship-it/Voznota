# Workflow · Loop de mejora continua (el que pidió el dueño)

El ciclo de entrenamiento estándar del colegio. Hoy se corrió COMPLETO por
primera vez (campo SQL: ingreso 0% → instituto 50% en un ciclo). Pasos:

1. ABRIR: elegir el campo a mejorar (por orden del dueño o por debilidad del tablero).
2. MATERIA: escribir/actualizar las lecciones del tramo (básica → media → instituto),
   una cosa por lección, con autoexamen.
3. EXAMEN ANTES DE ASCENSO: examen del tramo con corrector objetivo si existe
   (motor SQL, tests, compilador) o agente de 75%+ si no.
4. RENDIR: el alumno rinde. Si falla un caso → el error va a su libreta Y al
   registro de errores con regla nueva. Se corrige y RE-RINDE (el intento
   fallido no se borra: es la mejor lección).
5. ASCENDER: nota ≥ 8/10 → sube el peldaño en libreta + ranking. Historial de
   nivel actualizado (el "texteo de aumento").
6. TRABAJO REAL: el recién ascendido recibe tareas de la tesis Voznota de su
   peldaño. Sus apuntes alimentan mejores-practicas.md.
7. VOLVER AL PASO 1 con el siguiente campo del tablero.

Freno: máximo 1 ascenso por agente por día (un examen aprobado se digiere
trabajando, no encadenando exámenes).
