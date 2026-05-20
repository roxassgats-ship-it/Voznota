import zipfile
import json
from pathlib import Path
from datetime import datetime
from config import OUTPUT_DIR


def create_zip(video_id: int, metadata: dict, analysis: dict, log_fn=None) -> str:
    """Package all outputs into a ZIP file and return its path."""
    if log_fn:
        log_fn("Empaquetando resultados en ZIP...")

    safe_title = "".join(c if c.isalnum() or c in " -_" else "_" for c in metadata.get("title", "video"))[:50]
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    zip_name = f"voznota_{video_id}_{safe_title}_{timestamp}.zip"
    zip_path = OUTPUT_DIR / zip_name

    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        # Full analysis markdown
        analysis_md = _build_markdown(metadata, analysis)
        zf.writestr("analisis_completo.md", analysis_md)

        # Transcript only
        zf.writestr("transcripcion.txt", analysis.get("transcript", analysis.get("full_analysis", "")))

        # Summary only
        zf.writestr("resumen.txt", analysis.get("summary", ""))

        # Key points
        zf.writestr("puntos_clave.txt", analysis.get("key_points", ""))

        # Hashtags
        zf.writestr("hashtags.txt", analysis.get("hashtags", ""))

        # JSON metadata
        json_data = {
            "video_id": video_id,
            "metadata": metadata,
            "summary": analysis.get("summary", ""),
            "key_points": analysis.get("key_points", ""),
            "hashtags": analysis.get("hashtags", ""),
            "tokens_used": analysis.get("tokens_used", 0),
            "processed_at": datetime.now().isoformat(),
        }
        zf.writestr("metadata.json", json.dumps(json_data, ensure_ascii=False, indent=2))

    if log_fn:
        log_fn(f"ZIP creado: {zip_name} ({zip_path.stat().st_size // 1024} KB)")

    return str(zip_path)


def _build_markdown(metadata: dict, analysis: dict) -> str:
    lines = [
        f"# {metadata.get('title', 'Video de TikTok')}",
        f"",
        f"**Autor:** @{metadata.get('author', 'Desconocido')}  ",
        f"**Duración:** {metadata.get('duration', 0)} segundos  ",
        f"**Vistas:** {metadata.get('view_count', 0):,}  ",
        f"**Likes:** {metadata.get('like_count', 0):,}  ",
        f"**Procesado:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        f"",
        f"---",
        f"",
        analysis.get("full_analysis", ""),
    ]
    return "\n".join(lines)
