import smtplib
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from pathlib import Path
from discord_webhook import DiscordWebhook, DiscordEmbed
from config import (
    DISCORD_WEBHOOK_URL, EMAIL_SENDER, EMAIL_PASSWORD, EMAIL_RECIPIENT
)


def notify_discord(metadata: dict, analysis: dict, zip_path: str = None, log_fn=None):
    """Post summary to Discord webhook."""
    if not DISCORD_WEBHOOK_URL:
        return

    if log_fn:
        log_fn("Enviando notificación a Discord...")

    webhook = DiscordWebhook(url=DISCORD_WEBHOOK_URL)

    embed = DiscordEmbed(
        title=f"🎵 {metadata.get('title', 'Video TikTok')[:256]}",
        description=analysis.get("summary", "")[:2048],
        color="03b2f8",
    )
    embed.add_embed_field(name="👤 Autor", value=f"@{metadata.get('author', '?')}", inline=True)
    embed.add_embed_field(name="⏱ Duración", value=f"{metadata.get('duration', 0)}s", inline=True)
    embed.add_embed_field(name="👁 Vistas", value=f"{metadata.get('view_count', 0):,}", inline=True)

    key_points = analysis.get("key_points", "")
    if key_points:
        embed.add_embed_field(name="🔑 Puntos Clave", value=key_points[:1024], inline=False)

    hashtags = analysis.get("hashtags", "")
    if hashtags:
        embed.add_embed_field(name="🏷 Hashtags", value=hashtags[:1024], inline=False)

    embed.set_footer(text="Voznota • Analizador de TikTok")
    embed.set_timestamp()
    webhook.add_embed(embed)

    if zip_path and Path(zip_path).exists():
        with open(zip_path, "rb") as f:
            webhook.add_file(file=f.read(), filename=Path(zip_path).name)

    response = webhook.execute()

    if log_fn:
        log_fn(f"Discord: enviado (status {response.status_code if hasattr(response, 'status_code') else 'ok'})")


def notify_email(metadata: dict, analysis: dict, zip_path: str = None, log_fn=None):
    """Send email with analysis and optional ZIP attachment."""
    if not all([EMAIL_SENDER, EMAIL_PASSWORD, EMAIL_RECIPIENT]):
        return

    if log_fn:
        log_fn(f"Enviando email a {EMAIL_RECIPIENT}...")

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"[Voznota] {metadata.get('title', 'Video TikTok')[:80]}"
    msg["From"] = EMAIL_SENDER
    msg["To"] = EMAIL_RECIPIENT

    html = _build_html_email(metadata, analysis)
    msg.attach(MIMEText(html, "html"))

    if zip_path and Path(zip_path).exists():
        msg = MIMEMultipart()
        msg["Subject"] = f"[Voznota] {metadata.get('title', 'Video TikTok')[:80]}"
        msg["From"] = EMAIL_SENDER
        msg["To"] = EMAIL_RECIPIENT
        msg.attach(MIMEText(html, "html"))

        with open(zip_path, "rb") as f:
            part = MIMEBase("application", "zip")
            part.set_payload(f.read())
            encoders.encode_base64(part)
            part.add_header(
                "Content-Disposition",
                f"attachment; filename={Path(zip_path).name}"
            )
            msg.attach(part)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_SENDER, EMAIL_PASSWORD)
        server.send_message(msg)

    if log_fn:
        log_fn("Email enviado correctamente.")


def _build_html_email(metadata: dict, analysis: dict) -> str:
    title = metadata.get("title", "Video TikTok")
    author = metadata.get("author", "Desconocido")
    summary = analysis.get("summary", "").replace("\n", "<br>")
    key_points = analysis.get("key_points", "").replace("\n", "<br>")
    hashtags = analysis.get("hashtags", "")

    return f"""
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;">
<div style="background:#1a1a2e;color:white;padding:20px;border-radius:12px;margin-bottom:20px;">
<h1 style="margin:0;font-size:24px;">🎵 Voznota</h1>
<p style="margin:5px 0 0;opacity:0.7;">Analizador automático de TikTok</p>
</div>
<h2 style="color:#1a1a2e;">{title}</h2>
<p><strong>@{author}</strong> &nbsp;|&nbsp; {metadata.get('duration',0)}s &nbsp;|&nbsp; {metadata.get('view_count',0):,} vistas</p>
<hr>
<h3>📝 Resumen</h3><p>{summary}</p>
<h3>🔑 Puntos Clave</h3><p>{key_points}</p>
<h3>🏷 Hashtags</h3><p style="color:#03b2f8;">{hashtags}</p>
<hr>
<p style="font-size:12px;color:#666;">Generado por Voznota con Claude claude-sonnet-4-6</p>
</body></html>"""
