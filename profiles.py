"""Level 3 – Dynamic user profiles: track what the user processes and build interest model."""
import json
from collections import Counter
from datetime import datetime
from database import get_conn, init_db


def _ensure_table():
    with get_conn() as conn:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS user_profile (
                key TEXT PRIMARY KEY,
                value TEXT,
                updated_at TEXT
            );
            CREATE TABLE IF NOT EXISTS content_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                video_id INTEGER,
                category TEXT,
                domains TEXT,
                sentiment TEXT,
                viral_potential INTEGER,
                processed_at TEXT DEFAULT (datetime('now'))
            );
        """)


def record_classification(video_id: int, classification: dict):
    _ensure_table()
    with get_conn() as conn:
        conn.execute(
            """INSERT INTO content_history (video_id, category, domains, sentiment, viral_potential)
               VALUES (?, ?, ?, ?, ?)""",
            (
                video_id,
                classification.get("primary_category", "otro"),
                json.dumps(classification.get("knowledge_domains", [])),
                classification.get("sentiment", "neutro"),
                classification.get("viral_potential", 5),
            ),
        )
    _rebuild_profile()


def _rebuild_profile():
    _ensure_table()
    with get_conn() as conn:
        rows = conn.execute("SELECT * FROM content_history ORDER BY processed_at DESC LIMIT 200").fetchall()

    if not rows:
        return

    categories = Counter(r["category"] for r in rows)
    sentiments = Counter(r["sentiment"] for r in rows)
    all_domains = []
    for r in rows:
        try:
            all_domains.extend(json.loads(r["domains"]))
        except Exception:
            pass
    domain_counts = Counter(all_domains)

    avg_viral = sum(r["viral_potential"] for r in rows) / len(rows)

    profile = {
        "top_categories": dict(categories.most_common(5)),
        "top_domains": dict(domain_counts.most_common(10)),
        "sentiment_distribution": dict(sentiments),
        "avg_viral_potential": round(avg_viral, 2),
        "total_processed": len(rows),
        "last_updated": datetime.now().isoformat(),
    }

    _set_profile_key("summary", json.dumps(profile))


def _set_profile_key(key: str, value: str):
    _ensure_table()
    with get_conn() as conn:
        conn.execute(
            "INSERT OR REPLACE INTO user_profile (key, value, updated_at) VALUES (?, ?, ?)",
            (key, value, datetime.now().isoformat()),
        )


def get_profile() -> dict:
    _ensure_table()
    with get_conn() as conn:
        row = conn.execute("SELECT value FROM user_profile WHERE key='summary'").fetchone()
    if not row:
        return {}
    try:
        return json.loads(row["value"])
    except Exception:
        return {}


def get_profile_context() -> str:
    """Return profile as readable context string for Claude prompts."""
    p = get_profile()
    if not p:
        return "Perfil de usuario: sin datos suficientes aún."

    top_cats = ", ".join(f"{k}({v})" for k, v in p.get("top_categories", {}).items())
    top_domains = ", ".join(list(p.get("top_domains", {}).keys())[:5])

    return (
        f"Perfil del usuario: ha procesado {p.get('total_processed', 0)} videos. "
        f"Categorías preferidas: {top_cats}. "
        f"Dominios de interés: {top_domains}. "
        f"Potencial viral promedio buscado: {p.get('avg_viral_potential', 5)}/10."
    )
