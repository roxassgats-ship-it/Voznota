"""Level 4 – Multi-agent orchestration using claude-opus-4-7 as the master coordinator."""
import anthropic
import json
from config import ANTHROPIC_API_KEY, CLAUDE_OPUS_MODEL
from profiles import get_profile_context


def orchestrate_deep_analysis(
    audio_path: str,
    metadata: dict,
    initial_analysis: dict,
    classification: dict,
    log_fn=None,
) -> dict:
    """
    Opus 4.7 as master agent: receives all available context and produces
    an enriched, personalized analysis with multi-perspective synthesis.
    """
    if log_fn:
        log_fn(f"Orquestando análisis profundo con {CLAUDE_OPUS_MODEL}...")

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    profile_context = get_profile_context()

    # Agent 1: Content Strategist
    strategist_result = _run_agent(
        client,
        "Content Strategist",
        f"""Eres un estratega de contenido experto. {profile_context}

Analiza este contenido de TikTok y genera:
1. Estrategia de repropósito: cómo convertir este video en 5 formatos diferentes
2. Calendario de contenido: qué días/horas publicar y por qué
3. Colaboraciones sugeridas: perfiles similares con los que conectar
4. Métricas objetivo: qué KPIs medir
5. Riesgos y oportunidades

Categoría: {classification.get('primary_category')}
Potencial viral: {classification.get('viral_potential')}/10
Resumen: {initial_analysis.get('summary', '')[:1000]}""",
    )

    # Agent 2: Knowledge Connector
    connector_result = _run_agent(
        client,
        "Knowledge Connector",
        f"""Eres un experto en gestión del conocimiento y conexiones intelectuales.

Basado en este contenido, identifica:
1. Conceptos fundamentales que conectan con otras áreas
2. Prerequisitos de conocimiento para entender este tema
3. Dónde encaja en el mapa del conocimiento humano
4. Recursos complementarios (tipo de recursos, no URLs)
5. Preguntas que este contenido genera

Transcripción: {initial_analysis.get('transcript', '')[:2000]}
Dominios: {', '.join(classification.get('knowledge_domains', []))}""",
    )

    # Agent 3: Growth Predictor
    predictor_result = _run_agent(
        client,
        "Growth Predictor",
        f"""Eres un analista de tendencias y crecimiento orgánico.

Predice y planifica:
1. Tendencia de este tema: ¿está subiendo o bajando?
2. Ventana de oportunidad: ¿cuánto tiempo tiene este contenido?
3. Público potencial: segmentos específicos que conectarán
4. Efecto compuesto: cómo este contenido puede generar más contenido
5. Score de longevidad: ¿evergreen o trending?

Categoría: {classification.get('primary_category')}
Tipo: {classification.get('content_type')}
Sentimiento: {classification.get('sentiment')}
Resumen: {initial_analysis.get('summary', '')[:800]}""",
    )

    # Synthesis by Opus master
    if log_fn:
        log_fn("Sintetizando perspectivas con Opus...")

    synthesis_prompt = f"""Eres el coordinador master. Tienes tres análisis especializados de este contenido de TikTok.
{profile_context}

ANÁLISIS DEL ESTRATEGA:
{strategist_result}

ANÁLISIS DEL CONECTOR DE CONOCIMIENTO:
{connector_result}

ANÁLISIS DEL PREDICTOR DE CRECIMIENTO:
{predictor_result}

Sintetiza todo en un plan de acción ejecutivo con:
## Plan de Acción Personalizado
## Insight más Valioso
## Próximos 3 Pasos Concretos
## Conexión con tu Perfil (basado en el perfil del usuario)
## Puntuación Global de Oportunidad (1-100)"""

    synthesis = client.messages.create(
        model=CLAUDE_OPUS_MODEL,
        max_tokens=2048,
        messages=[{"role": "user", "content": synthesis_prompt}],
    )

    synthesis_text = synthesis.content[0].text

    if log_fn:
        log_fn("Orquestación completada.")

    return {
        "strategist": strategist_result,
        "knowledge_connector": connector_result,
        "growth_predictor": predictor_result,
        "synthesis": synthesis_text,
    }


def _run_agent(client: anthropic.Anthropic, agent_name: str, prompt: str) -> str:
    response = client.messages.create(
        model=CLAUDE_OPUS_MODEL,
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text
