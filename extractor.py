import subprocess
from pathlib import Path
from config import DOWNLOAD_DIR


def extract_audio(video_path: str, video_id: int, log_fn=None) -> str:
    """Extract audio from video as MP3, return audio file path."""
    if log_fn:
        log_fn("Extrayendo audio del video...")

    audio_path = DOWNLOAD_DIR / f"{video_id}_audio.mp3"

    cmd = [
        "ffmpeg", "-y",
        "-i", video_path,
        "-vn",
        "-acodec", "libmp3lame",
        "-ar", "16000",
        "-ac", "1",
        "-b:a", "64k",
        str(audio_path),
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        raise RuntimeError(f"ffmpeg error: {result.stderr[-500:]}")

    if log_fn:
        log_fn(f"Audio extraido: {audio_path.name} ({audio_path.stat().st_size // 1024} KB)")

    return str(audio_path)
