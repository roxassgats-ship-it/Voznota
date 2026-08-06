# Voznota

Notas con voz. Repertorio del campo 🎙️ **Voz y notas habladas** del sistema de Yiyo.

## Estado honesto (2026-08-06)

🌫️ **Niebla.** Hoy este repo tiene este archivo y nada más. Está declarado así a
propósito: el mapa no miente (regla de oro 3 de `Raphael.0.1.v`).

Lo medido: el Cerebro Global leyó los tres repertorios de Yiyo y contó **52 papeles**.
De esos, **1 es de Voznota** — este. En el mapa de relaciones figura como *isla*.

Antecedente registrado: en `Raphael.0.1.v/docs/07-REGLAS-AUTOMATIZACION.md` consta que
este proyecto tuvo una **"fábrica nocturna de datasets del colegio"** corriendo todas
las noches a las 02:00. Está **pausada, no borrada**, desde el 2026-07-18. Para
reactivarla hace falta que Yiyo dé fecha, hora y rango. Ninguna AI la enciende sola.

## Para qué está reservado

Que lo hablado entre al cerebro: dictar una idea y que quede como nota etiquetada,
igual que hace el carrusel de ideas con el texto. Es el hermano hablado del
"vómito verbal" (`Raphael.0.1.v/docs/08-VOMITO-VERBAL.md`).

## Cómo se conecta al cerebro de Yiyo

```bat
python cerebro-global\unificador.py unificar --fuentes "%USERPROFILE%\Raphael.0.1.v,%USERPROFILE%\RPG1,%USERPROFILE%\Voznota" --salida "%USERPROFILE%\RaphaelVault\revision-ai\cerebro-global"
```

Todo lo que se escriba acá entra al RAG local y la AI de Yiyo puede recordarlo.
Motor y doctrina: [`Raphael.0.1.v/cerebro-global/`](https://github.com/roxassgats-ship-it/Raphael.0.1.v)
y `docs/11-MODO-CEO.md`.

## La decisión pendiente (le toca a Yiyo)

O se construye el motor de voz, o se archiva sin culpa. Hasta entonces, 🌫️.
