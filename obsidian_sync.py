"""Level 2 – Sync analysis results to Obsidian vault as structured notes."""
import re
from datetime import datetime
from pathlib import Path
from config import OBSIDIAN_VAULT


def sync_to_obsidian(
    metadata: dict,
    analysis: dict,
    classification: dict,
    log_fn=None,
) -> str | None:
    """Write a structured Obsidian note and return the note path."""
    if not OBSIDIAN_VAULT:
        return None

    vault = Path(OBSIDIAN_VAULT)
    if not vault.exists():
        if log_fn:
            log_fn(f"Obsidian vault no encontrado: {OBSIDIAN_VAULT}", "WARN")
        return None

    if log_fn:
        log_fn("Sincronizando con Obsidian...")

    folder_path = vault / "Voznota" / classification.get("obsidian_folder", "Inbox")
    folder_path.mkdir(parents=True, exist_ok=True)

    safe_title = _safe_filename(metadata.get("title", "video"))
    timestamp = datetime.now().strftime("%Y%m%d_%H%M")
    note_name = f"{timestamp}_{safe_title}.md"
    note_path = folder_path / note_name

    content = _build_note(metadata, analysis, classification)
    note_path.write_text(content, encoding="utf-8")

    # Update _BRAIN.md index
    _update_brain_index(vault, metadata, classification, note_path)

    if log_fn:
        log_fn(f"Nota creada: Voznota/{classification.get('obsidian_folder')}/{note_name}")

    return str(note_path)


def _build_note(metadata: dict, analysis: dict, classification: dict) -> str:
    now = datetime.now()
    tags = " ".join(classification.get("obsidian_tags", []))
    connections = "\n".join(f"- [[{c}]]" for c in classification.get("connections", []))
    domains = ", ".join(classification.get("knowledge_domains", []))

    return f"""---
title: "{metadata.get('title', 'Sin título')}"
author: "@{metadata.get('author', 'Desconocido')}"
source: tiktok
duration: {metadata.get('duration', 0)}s
views: {metadata.get('view_count', 0)}
likes: {metadata.get('like_count', 0)}
category: {classification.get('primary_category', 'otro')}
content_type: {classification.get('content_type', 'otro')}
sentiment: {classification.get('sentiment', 'neutro')}
complexity: {classification.get('complexity', 3)}/5
viral_potential: {classification.get('viral_potential', 5)}/10
actionable: {classification.get('actionable', False)}
created: {now.strftime('%Y-%m-%d %H:%M')}
tags: [voznota, tiktok, {", ".join(classification.get("categories", []))}]
---

# {metadata.get('title', 'Sin título')}

> **@{metadata.get('author', '?')}** · {metadata.get('duration', 0)}s · {metadata.get('view_count', 0):,} vistas

{tags}

## Resumen
{analysis.get('summary', '')}

## Puntos Clave
{analysis.get('key_points', '')}

## Transcripción
{analysis.get('transcript', '')}

## Hashtags
{analysis.get('hashtags', '')}

## Conexiones Temáticas
{connections if connections else '_Sin conexiones identificadas_'}

## Dominios de Conocimiento
{domains if domains else '_Sin clasificar_'}

## Análisis Completo
{analysis.get('full_analysis', '')}

---
*Generado automáticamente por Voznota · {now.strftime('%Y-%m-%d %H:%M:%S')}*
"""


def _update_brain_index(vault: Path, metadata: dict, classification: dict, note_path: Path):
    """Append entry to _BRAIN.md master index."""
    brain_path = vault / "Voznota" / "_BRAIN.md"

    if not brain_path.exists():
        brain_path.write_text(
            "# 🧠 Voznota Brain\nÍndice automático de todo el conocimiento capturado.\n\n## Entradas\n",
            encoding="utf-8",
        )

    relative = note_path.relative_to(vault)
    entry = (
        f"- [{metadata.get('title', 'Sin título')}]({relative}) "
        f"· `{classification.get('primary_category')}` "
        f"· viral:{classification.get('viral_potential')}/10 "
        f"· {datetime.now().strftime('%Y-%m-%d %H:%M')}\n"
    )

    with open(brain_path, "a", encoding="utf-8") as f:
        f.write(entry)


def _safe_filename(name: str) -> str:
    safe = re.sub(r'[^\w\s-]', '', name)
    return safe.strip().replace(' ', '_')[:60]
