"""
Voznota Pipeline – 5-level PAM (Plan de Automatización Multinivel)
Level 1: Download → Extract → Transcribe → Package → Notify
Level 2: + Classify → Obsidian sync
Level 3: + n8n events → Profile recording
Level 4: + Multi-agent orchestration (claude-opus-4-7)
Level 5: + Brain learning → Behavioral prediction
"""
import traceback
from datetime import datetime
from database import upsert_video, set_status, add_log, get_video
from downloader import download_tiktok
from extractor import extract_audio
from transcriber import transcribe_and_analyze
from packager import create_zip
from notifier import notify_discord, notify_email

# Level 2
from classifier import classify_content
from obsidian_sync import sync_to_obsidian

# Level 3
from n8n_connector import send_video_done, send_pipeline_status
from profiles import record_classification

# Level 4
from orchestrator import orchestrate_deep_analysis

# Level 5
from brain import learn_from_video


def process_url(
    url: str,
    send_email: bool = True,
    send_discord: bool = True,
    level: int = 5,
) -> dict:
    """
    Full PAM pipeline for a single TikTok URL.
    level: 1-5, controls how deep the processing goes.
    """
    video_id = upsert_video(url, status="pending")

    def log(msg: str, lvl: str = "INFO"):
        add_log(video_id, lvl, msg)
        print(f"[{datetime.now().strftime('%H:%M:%S')}] [{lvl}] {msg}")

    classification = {}
    orchestration = {}

    try:
        # ── LEVEL 1: Core pipeline ─────────────────────────────────────────
        set_status(video_id, "downloading")
        send_pipeline_status(video_id, "downloading", url)
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

        set_status(video_id, "extracting")
        audio_path = extract_audio(meta["file_path"], video_id, log_fn=log)
        upsert_video(url, audio_path=audio_path)

        set_status(video_id, "analyzing")
        send_pipeline_status(video_id, "analyzing")
        analysis = transcribe_and_analyze(audio_path, meta, log_fn=log)
        upsert_video(
            url,
            transcript=analysis["transcript"],
            summary=analysis["summary"],
            key_points=analysis["key_points"],
            tags=analysis["hashtags"],
        )

        set_status(video_id, "packaging")
        zip_path = create_zip(video_id, meta, analysis, log_fn=log)
        upsert_video(url, zip_path=zip_path)

        # ── LEVEL 2: Classification + Obsidian ────────────────────────────
        if level >= 2:
            log("── Nivel 2: Clasificación y Obsidian ──")
            classification = classify_content(
                analysis.get("full_analysis", ""), log_fn=log
            )
            upsert_video(
                url,
                tags=", ".join(classification.get("obsidian_tags", [])),
            )
            obsidian_path = sync_to_obsidian(meta, analysis, classification, log_fn=log)
            if obsidian_path:
                upsert_video(url, key_points=analysis["key_points"])

        # ── LEVEL 3: n8n + Profiles ───────────────────────────────────────
        if level >= 3 and classification:
            log("── Nivel 3: n8n y perfiles ──")
            record_classification(video_id, classification)

        # ── LEVEL 4: Multi-agent orchestration ────────────────────────────
        if level >= 4 and classification:
            log("── Nivel 4: Orquestación multi-agente ──")
            set_status(video_id, "orchestrating")
            orchestration = orchestrate_deep_analysis(
                audio_path, meta, analysis, classification, log_fn=log
            )
            # Append orchestration synthesis to ZIP
            if orchestration.get("synthesis"):
                zip_path = create_zip(
                    video_id, meta,
                    {**analysis, "full_analysis": analysis["full_analysis"] + "\n\n---\n## Análisis Multi-Agente\n" + orchestration["synthesis"]},
                    log_fn=log,
                )
                upsert_video(url, zip_path=zip_path)

        # ── LEVEL 5: Brain learning ────────────────────────────────────────
        if level >= 5:
            log("── Nivel 5: Aprendizaje cerebral ──")
            video_record = get_video(video_id)
            learn_from_video(video_record, classification, orchestration)

        # ── Notifications ──────────────────────────────────────────────────
        set_status(video_id, "notifying")
        final_record = get_video(video_id)

        if send_discord:
            try:
                notify_discord(meta, analysis, zip_path, log_fn=log)
                send_video_done(final_record, classification, log_fn=log)
            except Exception as e:
                log(f"Discord error (no crítico): {e}", "WARN")

        if send_email:
            try:
                notify_email(meta, analysis, zip_path, log_fn=log)
            except Exception as e:
                log(f"Email error (no crítico): {e}", "WARN")

        set_status(video_id, "done")
        log(f"Proceso Nivel {level} completado.")

    except Exception as e:
        tb = traceback.format_exc()
        log(f"Error: {e}\n{tb}", "ERROR")
        set_status(video_id, "error", error=str(e))
        send_pipeline_status(video_id, "error", str(e)[:200])

    return get_video(video_id)
