"""Level 2 – Auto-classify content using claude-opus-4-7."""
import anthropic
import json
from config import ANTHROPIC_API_KEY, CLAUDE_OPUS_MODEL, ANALYSIS_LANGUAGE

CATEGORIES = [
    "tecnología", "programación", "IA/ML", "negocios", "finanzas",
    "salud", "fitness", "educación", "creatividad", "humor",
    "política", "ciencia", "filosofía", "arte", "música",
    "cocina", "viajes", "deportes", "lifestyle", "noticias", "otro"
]

LANG = "es" if ANALYSIS_LANGUAGE == "es" else "en"


def classify_content(analysis_text: str, log_fn=None) -> dict:
    """Classify content into categories and extract structured metadata using Opus."""
    if log_fn:
        log_fn(f"Clasificando contenido con {CLAUDE_OPUS_MODEL}...")

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    categories_str = ", ".join(CATEGORIES)

    prompt = f"""Analiza este texto y devuelve un JSON con la siguiente estructura exacta:
{{
  "categories": ["cat1", "cat2"],
  "primary_category": "cat_principal",
  "sentiment": "positivo|neutro|negativo",
  "complexity": 1-5,
  "content_type": "tutorial|opinión|entretenimiento|noticias|educativo|otro",
  "target_audience": "descripción breve del público objetivo",
  "knowledge_domains": ["dominio1", "dominio2"],
  "actionable": true|false,
  "viral_potential": 1-10,
  "obsidian_tags": ["#tag1", "#tag2", "#tag3"],
  "obsidian_folder": "carpeta/subcarpeta",
  "connections": ["concepto relacionado 1", "concepto relacionado 2"]
}}

Categorías disponibles: {categories_str}
Para obsidian_folder usa la categoría principal y subcategoría lógica.

TEXTO A CLASIFICAR:
{analysis_text[:3000]}

Responde SOLO con el JSON, sin texto adicional."""

    response = client.messages.create(
        model=CLAUDE_OPUS_MODEL,
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )

    raw = response.content[0].text.strip()
    # Strip markdown code blocks if present
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]

    try:
        result = json.loads(raw)
    except json.JSONDecodeError:
        result = {
            "categories": ["otro"],
            "primary_category": "otro",
            "sentiment": "neutro",
            "complexity": 3,
            "content_type": "otro",
            "target_audience": "general",
            "knowledge_domains": [],
            "actionable": False,
            "viral_potential": 5,
            "obsidian_tags": [],
            "obsidian_folder": "Inbox",
            "connections": [],
        }

    if log_fn:
        log_fn(f"Clasificado: {result.get('primary_category')} | Viral: {result.get('viral_potential')}/10")

    return result
