# 🧳 Unificación de baúles: el viejo (disco E:) + el colegio de anoche

**Para ejecutar EN TU COMPUTADORA** (donde el disco E: sí existe). Esta sesión
de la nube no puede tocar tus discos — por eso este protocolo corre en local.

## Pasos para vos (5 minutos, una sola vez)
1. Abrí **Claude Code en tu computadora** (terminal o app de escritorio con
   acceso a archivos locales).
2. Traé el colegio a tu PC (una de las dos):
   - Extraé `Parte2PcCasa.tar.gz` (descargado del chat) en una carpeta nueva, o
   - `git clone -b claude/ai-school-curriculum-3ktyq1 https://github.com/roxassgats-ship-it/Voznota.git`
3. Abrí Claude Code DENTRO de esa carpeta y pegale el prompt de abajo, tal cual.

## El prompt (copiar desde acá hasta el final del bloque)
---
Sos el agente de unificación de baúles del colegio de IA. Las reglas de la casa
se cargan solas (CLAUDE.md). Tu tarea, SIN preguntar salvo llave roja:
1. INVENTARIO DEL BAÚL VIEJO: listá E:\traslado.md (la carpeta del dueño con
   sus skills/prompts/notas anteriores). Contá archivos por comando y clasificá:
   prompts sueltos / skills / documentos / otros.
2. ADUANA (protocolo escuela-ia/13): copiá TODO el baúl viejo a
   escuela-ia/corpus/borradores/importadas/baul-antiguo/ SIN modificar los
   originales de E: (nunca borres ni muevas del baúl viejo — llave roja 1:
   solo COPIAR). Revisá cada pieza: si contiene claves/contraseñas, apartala a
   una subcarpeta privada/ y avisá al dueño sin subirla a git.
3. UNIFICACIÓN: por cada skill/prompt viejo útil, aplicá convertir-prompt-a-skill
   (Grado 0 → skill formal en .claude/skills/) y registrala en el archivo 08.
   Los duplicados con skills de anoche: gana la versión con examen; la otra se
   archiva con nota. Nada se pierde, todo queda trazado.
4. PRUEBA DE VIDA: correr los chequeos de auditar-y-parchar + verificar que
   las skills nuevas aparecen listadas. Los números, por comando.
5. CIERRE: actualizá tablero.md y DONDE-ESTAMOS.md ("baúles unificados: N
   piezas importadas, M convertidas en skills, K en cuarentena"), commit y
   push a la rama claude/ai-school-curriculum-3ktyq1, y avisale al dueño en
   una página en lenguaje llano qué entró, qué quedó en aduana y por qué.
---

## Nota del fundador (por qué no lo hice yo desde la nube)
Prometer una sincronización con un disco que no puedo ver sería venderte humo.
Este protocolo es la sincronización REAL: corre donde están tus archivos, con
las mismas reglas, aduana y registro del colegio. Tu Claude local y yo somos
el mismo sistema: él carga el mismo CLAUDE.md que escribimos anoche.
