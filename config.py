import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).parent
DOWNLOAD_DIR = Path(os.getenv("DOWNLOAD_DIR", BASE_DIR / "downloads"))
OUTPUT_DIR = Path(os.getenv("OUTPUT_DIR", BASE_DIR / "outputs"))
LOG_DIR = BASE_DIR / "logs"
DB_PATH = BASE_DIR / "voznota.db"

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL", "")
EMAIL_SENDER = os.getenv("EMAIL_SENDER", "")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "")
EMAIL_RECIPIENT = os.getenv("EMAIL_RECIPIENT", "")
DASHBOARD_PORT = int(os.getenv("DASHBOARD_PORT", 5000))
ANALYSIS_LANGUAGE = os.getenv("ANALYSIS_LANGUAGE", "es")

# Fast model for transcription
CLAUDE_MODEL = "claude-sonnet-4-6"
# Heavy model for deep analysis, orchestration, pattern learning
CLAUDE_OPUS_MODEL = "claude-opus-4-7"

# Obsidian vault path (set in .env)
OBSIDIAN_VAULT = os.getenv("OBSIDIAN_VAULT_PATH", "")

# n8n webhook endpoints
N8N_WEBHOOK_URL = os.getenv("N8N_WEBHOOK_URL", "")
N8N_INCOMING_PORT = int(os.getenv("N8N_INCOMING_PORT", 5001))

# API auth token for isolated API access
API_SECRET_TOKEN = os.getenv("API_SECRET_TOKEN", "")

for d in [DOWNLOAD_DIR, OUTPUT_DIR, LOG_DIR]:
    d.mkdir(parents=True, exist_ok=True)
