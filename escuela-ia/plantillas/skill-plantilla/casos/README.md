# Casos de prueba (el examen de Grado 1 de esta skill)

10 casos, cada uno con dos archivos:

```
caso-01-entrada.txt    ← lo que recibe la skill
caso-01-esperado.txt   ← lo que debería devolver (o los puntos que DEBE contener)
```

Reglas para armarlos:
- Casos 1-6: uso normal, variado.
- Casos 7-8: casos raros (entrada vacía, muy larga, con errores).
- Casos 9-10: trampas (entradas que invitan a inventar datos o romper el formato).
- El "esperado" puede ser una salida exacta o una lista de verificaciones
  ("debe contener las 3 tareas; no debe inventar ninguna").

Aprobación: 8 de 10. Corrige SIEMPRE otro agente (skill `corregir-examen`), nunca
la propia skill.
