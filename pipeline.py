"""Core processing pipeline: download → extract → transcribe → package → notify."""
import traceback
from datetime import datetime
from database import upsert_video, set_status, add_log, get_video
from downloader import download_tiktok
from extractor import extract_audio
from transcriber import transcribe_and_analyze
from packager import create_zip
from notifier import notify_discord, notify_email


def process_url(url: str, send_email: bool = True, send_discord: bool = True) -> dict:
    """Full pipeline for a single TikTok URL. Returns final video record."""

    video_id = upsert_video(url, status="pending")

    def log(msg: str, level: str = "INFO"):
        add_log(video_id, level, msg)
        print(f"[{datetime.now().strftime('%H:%M:%S')}] [{level}] {msg}")

    try:
        # 1. Download
        set_status(video_id, "downloading")
        log("Iniciando descarga...")
        meta = download_tiktok(url, video_id, log_fn=log)
        upsert_video(
            url,
            title=meta["title"],
            author=meta["author"],
            duration=meta["duration"],
            file_path=meta["file_path"],
            status="downloaded",
        )

        # 2. Extract audio
        set_status(video_id, "extracting")
        audio_path = extract_audio(meta["file_path"], video_id, log_fn=log)
        upsert_video(url, audio_path=audio_path)

        # 3. Transcribe & analyze
        set_status(video_id, "analyzing")
        analysis = transcribe_and_analyze(audio_path, meta, log_fn=log)
        upsert_video(
            url,
            transcript=analysis["transcript"],
            summary=analysis["summary"],
            key_points=analysis["key_points"],
            tags=analysis["hashtags"],
        )

        # 4. Package
        set_status(video_id, "packaging")
        zip_path = create_zip(video_id, meta, analysis, log_fn=log)
        upsert_video(url, zip_path=zip_path)

        # 5. Notify
        set_status(video_id, "notifying")
        if send_discord:
            try:
                notify_discord(meta, analysis, zip_path, log_fn=log)
            except Exception as e:
                log(f"Discord error (no crítico): {e}", "WARN")

        if send_email:
            try:
                notify_email(meta, analysis, zip_path, log_fn=log)
            except Exception as e:
                log(f"Email error (no crítico): {e}", "WARN")

        set_status(video_id, "done")
        log("Proceso completado exitosamente.")

    except Exception as e:
        tb = traceback.format_exc()
        log(f"Error: {e}\n{tb}", "ERROR")
        set_status(video_id, "error", error=str(e))

    return get_video(video_id)
