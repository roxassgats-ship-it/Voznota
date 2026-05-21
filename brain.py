"""
Level 5 – Voznota Brain: continuous learning, pattern storage, behavioral prediction.
Learns from every interaction to predict what the user needs before they ask.
"""
import json
import anthropic
from datetime import datetime
from database import get_conn
from config import ANTHROPIC_API_KEY, CLAUDE_OPUS_MODEL
from profiles import get_profile, get_profile_context


def _ensure_tables():
    with get_conn() as conn:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS brain_patterns (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pattern_type TEXT,
                pattern_data TEXT,
                confidence REAL DEFAULT 0.5,
                observed_count INTEGER DEFAULT 1,
                last_seen TEXT DEFAULT (datetime('now'))
            );
            CREATE TABLE IF NOT EXISTS session_memory (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT,
                input_type TEXT,
                input_summary TEXT,
                output_summary TEXT,
                user_feedback TEXT,
                created_at TEXT DEFAULT (datetime('now'))
            );
            CREATE TABLE IF NOT EXISTS predictions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                prediction_type TEXT,
                prediction_text TEXT,
                confidence REAL,
                triggered_by TEXT,
                was_correct INTEGER,
                created_at TEXT DEFAULT (datetime('now'))
            );
        """)


def learn_from_video(video_record: dict, classification: dict, orchestration: dict):
    """Store patterns learned from processing a video."""
    _ensure_tables()

    patterns = [
        ("category_preference", classification.get("primary_category", "otro")),
        ("content_type_preference", classification.get("content_type", "otro")),
        ("viral_threshold", str(classification.get("viral_potential", 5))),
        ("sentiment_preference", classification.get("sentiment", "neutro")),
    ]

    for p_type, p_data in patterns:
        _upsert_pattern(p_type, p_data)

    with get_conn() as conn:
        conn.execute(
            """INSERT INTO session_memory (session_id, input_type, input_summary, output_summary)
               VALUES (?, ?, ?, ?)""",
            (
                datetime.now().strftime("%Y%m%d"),
                "tiktok_video",
                f"{video_record.get('title', '')} | @{video_record.get('author', '')}",
                orchestration.get("synthesis", "")[:500] if orchestration else "",
            ),
        )


def _upsert_pattern(pattern_type: str, pattern_data: str):
    with get_conn() as conn:
        existing = conn.execute(
            "SELECT id, observed_count FROM brain_patterns WHERE pattern_type=? AND pattern_data=?",
            (pattern_type, pattern_data),
        ).fetchone()
        if existing:
            new_count = existing["observed_count"] + 1
            confidence = min(0.95, 0.3 + (new_count * 0.05))
            conn.execute(
                """UPDATE brain_patterns
                   SET observed_count=?, confidence=?, last_seen=?
                   WHERE id=?""",
                (new_count, confidence, datetime.now().isoformat(), existing["id"]),
            )
        else:
            conn.execute(
                "INSERT INTO brain_patterns (pattern_type, pattern_data) VALUES (?, ?)",
                (pattern_type, pattern_data),
            )


def predict_next_needs(log_fn=None) -> dict:
    """Use Opus to predict what the user will likely want next."""
    _ensure_tables()

    if log_fn:
        log_fn(f"Generando predicciones con {CLAUDE_OPUS_MODEL}...")

    with get_conn() as conn:
        patterns = [
            dict(r) for r in conn.execute(
                "SELECT * FROM brain_patterns ORDER BY confidence DESC, observed_count DESC LIMIT 20"
            ).fetchall()
        ]
        recent_sessions = [
            dict(r) for r in conn.execute(
                "SELECT * FROM session_memory ORDER BY created_at DESC LIMIT 10"
            ).fetchall()
        ]

    if not patterns:
        return {"predictions": [], "readiness": "Sin datos suficientes aún."}

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    profile_context = get_profile_context()

    patterns_text = "\n".join(
        f"- {p['pattern_type']}: '{p['pattern_data']}' (visto {p['observed_count']}x, confianza {p['confidence']:.0%})"
        for p in patterns
    )
    sessions_text = "\n".join(
        f"- {s['created_at'][:10]}: {s['input_summary'][:100]}"
        for s in recent_sessions
    )

    prompt = f"""Eres el cerebro predictivo de Voznota. Analiza los patrones de comportamiento del usuario.

{profile_context}

PATRONES APRENDIDOS:
{patterns_text}

SESIONES RECIENTES:
{sessions_text}

Basado en esto, genera:
1. Las 3 predicciones más confiables de lo que el usuario querrá procesar hoy
2. Tipo de contenido que debería buscar activamente
3. Una recomendación de workflow para esta sesión
4. Alerta temprana: ¿hay algún patrón preocupante o brecha de conocimiento?
5. Preparación sugerida: ¿qué tener listo antes de que el usuario lo pida?

Sé específico y personal. El usuario piensa rápido y necesita respuestas directas."""

    response = client.messages.create(
        model=CLAUDE_OPUS_MODEL,
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )

    prediction_text = response.content[0].text

    with get_conn() as conn:
        conn.execute(
            "INSERT INTO predictions (prediction_type, prediction_text, confidence, triggered_by) VALUES (?, ?, ?, ?)",
            ("session_prediction", prediction_text, 0.7, "pattern_analysis"),
        )

    if log_fn:
        log_fn("Predicciones generadas.")

    return {
        "predictions": prediction_text,
        "pattern_count": len(patterns),
        "session_count": len(recent_sessions),
        "generated_at": datetime.now().isoformat(),
    }


def get_brain_summary() -> dict:
    """Return current brain state for dashboard display."""
    _ensure_tables()

    with get_conn() as conn:
        pattern_count = conn.execute("SELECT COUNT(*) as c FROM brain_patterns").fetchone()["c"]
        session_count = conn.execute("SELECT COUNT(*) as c FROM session_memory").fetchone()["c"]
        top_patterns = [
            dict(r) for r in conn.execute(
                "SELECT * FROM brain_patterns ORDER BY confidence DESC LIMIT 5"
            ).fetchall()
        ]
        last_prediction = conn.execute(
            "SELECT prediction_text, created_at FROM predictions ORDER BY created_at DESC LIMIT 1"
        ).fetchone()

    return {
        "pattern_count": pattern_count,
        "session_count": session_count,
        "top_patterns": top_patterns,
        "last_prediction": dict(last_prediction) if last_prediction else None,
        "profile": get_profile(),
    }
