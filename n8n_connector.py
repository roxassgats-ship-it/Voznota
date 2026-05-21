"""Level 3 – n8n bidirectional connector: send events out + receive triggers in."""
import json
import requests
import threading
from datetime import datetime
from flask import Flask, request, jsonify
from config import N8N_WEBHOOK_URL, N8N_INCOMING_PORT, API_SECRET_TOKEN


def send_event(event_type: str, payload: dict, log_fn=None):
    """Send an event to n8n webhook."""
    if not N8N_WEBHOOK_URL:
        return

    body = {
        "event": event_type,
        "timestamp": datetime.now().isoformat(),
        "source": "voznota",
        "data": payload,
    }

    try:
        r = requests.post(N8N_WEBHOOK_URL, json=body, timeout=10)
        if log_fn:
            log_fn(f"n8n [{event_type}]: {r.status_code}")
    except Exception as e:
        if log_fn:
            log_fn(f"n8n error: {e}", "WARN")


def send_video_done(video_record: dict, classification: dict, log_fn=None):
    send_event("video_processed", {
        "id": video_record.get("id"),
        "title": video_record.get("title"),
        "author": video_record.get("author"),
        "summary": video_record.get("summary"),
        "category": classification.get("primary_category"),
        "viral_potential": classification.get("viral_potential"),
        "zip_path": video_record.get("zip_path"),
        "tags": classification.get("obsidian_tags", []),
    }, log_fn=log_fn)


def send_pipeline_status(video_id: int, status: str, detail: str = "", log_fn=None):
    send_event("pipeline_status", {
        "video_id": video_id,
        "status": status,
        "detail": detail,
    }, log_fn=log_fn)


# ── Incoming triggers from n8n ─────────────────────────────────────────────

_trigger_app = Flask("n8n_trigger")
_trigger_callbacks = {}


def register_trigger(event_type: str, callback):
    """Register a callback for incoming n8n trigger events."""
    _trigger_callbacks[event_type] = callback


def _check_auth():
    if not API_SECRET_TOKEN:
        return True
    token = request.headers.get("X-Voznota-Token", "")
    return token == API_SECRET_TOKEN


@_trigger_app.route("/trigger", methods=["POST"])
def incoming_trigger():
    if not _check_auth():
        return jsonify({"error": "unauthorized"}), 401

    data = request.json or {}
    event = data.get("event", "")
    payload = data.get("data", {})

    cb = _trigger_callbacks.get(event)
    if cb:
        threading.Thread(target=cb, args=(payload,), daemon=True).start()
        return jsonify({"ok": True, "event": event})

    return jsonify({"ok": False, "error": f"no handler for '{event}'"}), 404


@_trigger_app.route("/health")
def health():
    return jsonify({"status": "ok", "service": "voznota-n8n-bridge"})


def start_trigger_server(log_fn=None):
    """Start n8n trigger listener on N8N_INCOMING_PORT."""
    if log_fn:
        log_fn(f"n8n trigger server en puerto {N8N_INCOMING_PORT}")
    _trigger_app.run(host="0.0.0.0", port=N8N_INCOMING_PORT, debug=False, threaded=True)
