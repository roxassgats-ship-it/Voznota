"""Flask web dashboard for Voznota – mobile-friendly real-time monitoring."""
import threading
from pathlib import Path
from flask import Flask, render_template, request, jsonify, send_file
from database import get_all_videos, get_video, init_db
from pipeline import process_url
from config import DASHBOARD_PORT

app = Flask(__name__)
_processing_threads = {}


def _run_pipeline(url: str, send_email: bool, send_discord: bool):
    process_url(url, send_email=send_email, send_discord=send_discord)


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
def api_analyze():
    data = request.json or {}
    url = (data.get("url") or "").strip()
    if not url:
        return jsonify({"ok": False, "error": "URL requerida"}), 400
    if "tiktok.com" not in url and "vm.tiktok" not in url:
        return jsonify({"ok": False, "error": "Solo se aceptan links de TikTok"}), 400

    send_email = bool(data.get("send_email", True))
    send_discord = bool(data.get("send_discord", True))

    t = threading.Thread(
        target=_run_pipeline,
        args=(url, send_email, send_discord),
        daemon=True,
    )
    t.start()

    return jsonify({"ok": True, "message": "Video en cola"})


@app.route("/api/download/<int:vid_id>")
def api_download(vid_id):
    v = get_video(vid_id)
    if not v or not v.get("zip_path"):
        return jsonify({"error": "ZIP no disponible"}), 404
    zip_path = Path(v["zip_path"])
    if not zip_path.exists():
        return jsonify({"error": "Archivo no encontrado"}), 404
    return send_file(str(zip_path), as_attachment=True)


def run_dashboard():
    init_db()
    print(f"\n🎵 Voznota Dashboard corriendo en http://0.0.0.0:{DASHBOARD_PORT}")
    print("   Abre desde tu celular con la IP de tu máquina\n")
    app.run(host="0.0.0.0", port=DASHBOARD_PORT, debug=False, threaded=True)
