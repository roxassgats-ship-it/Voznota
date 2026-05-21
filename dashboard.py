"""Flask web dashboard for Voznota – PAM levels 1-5, mobile-friendly."""
import threading
from pathlib import Path
from functools import wraps
from flask import Flask, render_template, request, jsonify, send_file
from database import get_all_videos, get_video, init_db
from pipeline import process_url
from brain import get_brain_summary, predict_next_needs
from config import DASHBOARD_PORT, API_SECRET_TOKEN

app = Flask(__name__)


def _require_token(f):
    """Optional token auth — only enforced if API_SECRET_TOKEN is set."""
    @wraps(f)
    def decorated(*args, **kwargs):
        if API_SECRET_TOKEN:
            token = request.headers.get("X-Voznota-Token", "")
            if token != API_SECRET_TOKEN:
                return jsonify({"error": "unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated


def _run_pipeline(url: str, send_email: bool, send_discord: bool, level: int):
    process_url(url, send_email=send_email, send_discord=send_discord, level=level)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/videos")
def api_videos():
    return jsonify(get_all_videos())


@app.route("/api/videos/<int:vid_id>")
def api_video(vid_id):
    v = get_video(vid_id)
    return jsonify(v) if v else (jsonify({"error": "not found"}), 404)


@app.route("/api/analyze", methods=["POST"])
@_require_token
def api_analyze():
    data = request.json or {}
    url = (data.get("url") or "").strip()
    if not url:
        return jsonify({"ok": False, "error": "URL requerida"}), 400
    if "tiktok.com" not in url and "vm.tiktok" not in url:
        return jsonify({"ok": False, "error": "Solo se aceptan links de TikTok"}), 400

    send_email = bool(data.get("send_email", True))
    send_discord = bool(data.get("send_discord", True))
    level = int(data.get("level", 5))

    t = threading.Thread(
        target=_run_pipeline,
        args=(url, send_email, send_discord, level),
        daemon=True,
    )
    t.start()

    return jsonify({"ok": True, "message": f"Video en cola (Nivel {level})"})


@app.route("/api/download/<int:vid_id>")
def api_download(vid_id):
    v = get_video(vid_id)
    if not v or not v.get("zip_path"):
        return jsonify({"error": "ZIP no disponible"}), 404
    zip_path = Path(v["zip_path"])
    if not zip_path.exists():
        return jsonify({"error": "Archivo no encontrado"}), 404
    return send_file(str(zip_path), as_attachment=True)


@app.route("/api/brain")
def api_brain():
    """Level 5: Current brain state."""
    return jsonify(get_brain_summary())


@app.route("/api/brain/predict", methods=["POST"])
@_require_token
def api_brain_predict():
    """Level 5: Generate behavioral predictions with Opus."""
    result = predict_next_needs()
    return jsonify(result)


@app.route("/api/n8n/trigger", methods=["POST"])
@_require_token
def api_n8n_trigger():
    """Level 3: Receive URL from n8n and queue for processing."""
    data = request.json or {}
    url = (data.get("url") or "").strip()
    if not url:
        return jsonify({"ok": False, "error": "URL requerida"}), 400
    level = int(data.get("level", 5))
    t = threading.Thread(
        target=_run_pipeline,
        args=(url, False, True, level),
        daemon=True,
    )
    t.start()
    return jsonify({"ok": True, "message": f"Procesando desde n8n (Nivel {level})"})


def run_dashboard():
    init_db()
    print(f"\n🎵 Voznota PAM Dashboard → http://0.0.0.0:{DASHBOARD_PORT}")
    print(f"   Celular: http://TU_IP:{DASHBOARD_PORT}")
    print(f"   n8n endpoint: POST /api/n8n/trigger\n")
    app.run(host="0.0.0.0", port=DASHBOARD_PORT, debug=False, threaded=True)
