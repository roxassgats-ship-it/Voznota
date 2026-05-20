import base64
import anthropic
from pathlib import Path
from config import ANTHROPIC_API_KEY, CLAUDE_MODEL, ANALYSIS_LANGUAGE


def transcribe_and_analyze(audio_path: str, metadata: dict, log_fn=None) -> dict:
    """Send audio to Claude for transcription and full content analysis."""
    if log_fn:
        log_fn("Enviando audio a Claude para transcripción y análisis...")

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    audio_data = Path(audio_path).read_bytes()
    audio_b64 = base64.standard_b64encode(audio_data).decode("utf-8")

    lang_instruction = (
        "Responde completamente en Español." if ANALYSIS_LANGUAGE == "es"
        else "Respond completely in English."
    )

    title = metadata.get("title", "")
    author = metadata.get("author", "")
    description = metadata.get("description", "")
    duration = metadata.get("duration", 0)

    system_prompt = f"""Eres Voznota, un asistente especializado en analizar videos de TikTok.
Tu objetivo es extraer máximo valor de cada video para ayudar al usuario a crecer orgánicamente,
documentar conocimiento y conectar ideas de forma automática.
{lang_instruction}"""

    user_prompt = f"""Analiza este video de TikTok con los siguientes metadatos:
- Título: {title}
- Autor: @{author}
- Duración: {duration} segundos
- Descripción: {description}

El audio del video está adjunto. Por favor realiza:

1. **TRANSCRIPCIÓN COMPLETA**: Transcribe palabra por palabra todo el audio.

2. **RESUMEN EJECUTIVO**: Resume el contenido en 3-5 oraciones claras y directas.

3. **PUNTOS CLAVE**: Lista los 5-10 puntos más importantes del video.

4. **HASHTAGS SUGERIDOS**: Genera 15-20 hashtags relevantes para maximizar alcance.

5. **IDEAS DE CONTENIDO**: Basado en este video, sugiere 5 ideas de contenido relacionado que podrían crecer orgánicamente.

6. **CONEXIONES TEMÁTICAS**: Identifica temas, conceptos o tendencias que conectan este video con tendencias actuales.

7. **CALIFICACIÓN DE VALOR**: Del 1-10, ¿qué tanto valor aporta este contenido? Explica brevemente.

8. **ACCIONES RECOMENDADAS**: ¿Qué acciones específicas recomiendas tomar basado en este contenido?

Estructura tu respuesta con encabezados claros usando ## para cada sección."""

    response = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=4096,
        system=system_prompt,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "document",
                        "source": {
                            "type": "base64",
                            "media_type": "audio/mpeg",
                            "data": audio_b64,
                        },
                    },
                    {
                        "type": "text",
                        "text": user_prompt,
                    },
                ],
            }
        ],
    )

    full_analysis = response.content[0].text

    transcript = _extract_section(full_analysis, "TRANSCRIPCIÓN")
    summary = _extract_section(full_analysis, "RESUMEN")
    key_points = _extract_section(full_analysis, "PUNTOS CLAVE")
    hashtags = _extract_section(full_analysis, "HASHTAGS")

    if log_fn:
        log_fn("Análisis completado por Claude.")

    return {
        "full_analysis": full_analysis,
        "transcript": transcript,
        "summary": summary,
        "key_points": key_points,
        "hashtags": hashtags,
        "tokens_used": response.usage.input_tokens + response.usage.output_tokens,
    }


def _extract_section(text: str, keyword: str) -> str:
    lines = text.split("\n")
    in_section = False
    result = []
    for line in lines:
        if keyword.lower() in line.lower() and line.startswith("#"):
            in_section = True
            continue
        if in_section:
            if line.startswith("#") and keyword.lower() not in line.lower():
                break
            result.append(line)
    return "\n".join(result).strip() if result else ""
