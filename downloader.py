import yt_dlp
from pathlib import Path
from config import DOWNLOAD_DIR


def download_tiktok(url: str, video_id: int, log_fn=None) -> dict:
    """Download a TikTok video and return metadata + file path."""

    def _log(msg):
        if log_fn:
            log_fn(msg)

    output_template = str(DOWNLOAD_DIR / f"{video_id}_%(id)s.%(ext)s")

    ydl_opts = {
        "outtmpl": output_template,
        "format": "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
        "merge_output_format": "mp4",
        "quiet": True,
        "no_warnings": True,
        "extract_flat": False,
    }

    _log(f"Descargando: {url}")

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        filename = ydl.prepare_filename(info)
        # normalize extension after merge
        file_path = Path(filename)
        if not file_path.exists():
            mp4_path = file_path.with_suffix(".mp4")
            if mp4_path.exists():
                file_path = mp4_path

    _log(f"Video descargado: {file_path.name}")

    return {
        "title": info.get("title", "Sin título"),
        "author": info.get("uploader", info.get("creator", "Desconocido")),
        "duration": info.get("duration", 0),
        "description": info.get("description", ""),
        "like_count": info.get("like_count", 0),
        "view_count": info.get("view_count", 0),
        "tags": info.get("tags", []),
        "file_path": str(file_path),
    }
