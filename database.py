import sqlite3
import json
from datetime import datetime
from config import DB_PATH


def get_conn():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_conn() as conn:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS videos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                url TEXT UNIQUE NOT NULL,
                title TEXT,
                author TEXT,
                duration INTEGER,
                status TEXT DEFAULT 'pending',
                file_path TEXT,
                audio_path TEXT,
                transcript TEXT,
                summary TEXT,
                tags TEXT,
                key_points TEXT,
                zip_path TEXT,
                error TEXT,
                created_at TEXT DEFAULT (datetime('now')),
                updated_at TEXT DEFAULT (datetime('now'))
            );
            CREATE TABLE IF NOT EXISTS logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                video_id INTEGER,
                level TEXT,
                message TEXT,
                created_at TEXT DEFAULT (datetime('now'))
            );
        """)


def upsert_video(url: str, **kwargs) -> int:
    with get_conn() as conn:
        existing = conn.execute("SELECT id FROM videos WHERE url=?", (url,)).fetchone()
        if existing:
            vid = existing["id"]
            if kwargs:
                kwargs["updated_at"] = datetime.now().isoformat()
                sets = ", ".join(f"{k}=?" for k in kwargs)
                conn.execute(f"UPDATE videos SET {sets} WHERE id=?", (*kwargs.values(), vid))
            return vid
        else:
            kwargs["url"] = url
            kwargs["created_at"] = datetime.now().isoformat()
            kwargs["updated_at"] = datetime.now().isoformat()
            cols = ", ".join(kwargs.keys())
            placeholders = ", ".join("?" * len(kwargs))
            cur = conn.execute(f"INSERT INTO videos ({cols}) VALUES ({placeholders})", list(kwargs.values()))
            return cur.lastrowid


def set_status(video_id: int, status: str, error: str = None):
    with get_conn() as conn:
        if error:
            conn.execute(
                "UPDATE videos SET status=?, error=?, updated_at=? WHERE id=?",
                (status, error, datetime.now().isoformat(), video_id)
            )
        else:
            conn.execute(
                "UPDATE videos SET status=?, updated_at=? WHERE id=?",
                (status, datetime.now().isoformat(), video_id)
            )


def add_log(video_id: int, level: str, message: str):
    with get_conn() as conn:
        conn.execute(
            "INSERT INTO logs (video_id, level, message) VALUES (?, ?, ?)",
            (video_id, level, message)
        )


def get_all_videos():
    with get_conn() as conn:
        return [dict(r) for r in conn.execute("SELECT * FROM videos ORDER BY created_at DESC").fetchall()]


def get_video(video_id: int):
    with get_conn() as conn:
        row = conn.execute("SELECT * FROM videos WHERE id=?", (video_id,)).fetchone()
        return dict(row) if row else None


def get_logs(video_id: int):
    with get_conn() as conn:
        return [dict(r) for r in conn.execute(
            "SELECT * FROM logs WHERE video_id=? ORDER BY created_at ASC", (video_id,)
        ).fetchall()]
