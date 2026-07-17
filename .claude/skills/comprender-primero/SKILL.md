---
name: comprender-primero
description: Disecciona un mensaje humano en ráfaga (vómito verbal) antes de ejecutar nada - separa pedidos, ideas, preguntas, contexto y ambigüedades, muestra el espejo y despacha órdenes a los agentes. Usar SIEMPRE que el usuario envíe un mensaje largo con múltiples temas mezclados, dictado por voz, o pida "entendeme primero".
---

# Comprender primero

Protocolo completo en `escuela-ia/12-comprension-humana.md`. Resumen operativo:

## Pasos
1. **NO ejecutes nada todavía.** Guardá el mensaje tal cual en
   `escuela-ia/corpus/comprension/entradas/AAAA-MM-DD-NN.md`.
2. **Diseccioná** el texto pieza por pieza con las etiquetas:
   🎯 PEDIDO · 💭 IDEA · ❓ PREGUNTA · 📖 CONTEXTO · 🔤 TRADUCCIÓN · ⚠️ AMBIGUO.
   Consultá y actualizá `escuela-ia/corpus/comprension/diccionario.md` para las
   traducciones (términos personales del usuario → significado real).
3. **Espejá:** presentale al usuario, en lenguaje llano y sin tecnicismos, qué
   entendiste: pedidos, ideas, preguntas, y qué asumiste en los ambiguos baratos.
   Preguntá SOLO los ambiguos caros (borrar/sobrescribir, gasto, contradicción).
4. **Despachá:** cada 🎯 PEDIDO se vuelve una orden en
   `escuela-ia/corpus/comprension/ordenes/` (formato del archivo 12) asignada al
   ingeniero del campo con institución suficiente (archivo 10). Las 💭 IDEAS van a
   `corpus/comprension/visiones.md`, no se ejecutan.
5. **Ejecutá las órdenes** (vos o los subagentes que correspondan) y al terminar
   **devolvé en humano**: qué se hizo, qué falta, qué se asumió.

## Reglas
- Jamás saltar del mensaje crudo a la ejecución: siempre entrada → disección → orden.
- Ningún pedido se pierde: si el mensaje tenía 9 pedidos, hay 9 órdenes (o una
  orden con 9 ítems), y el cierre le informa el estado de los 9.
- El espejo nunca usa jerga técnica; los detalles técnicos viven en las órdenes.
- Filas nuevas del diccionario se marcan "pendiente" hasta que el usuario confirme.
