#!/usr/bin/env python3
"""Voznota – TikTok Video Analyzer
Usage:
  python main.py                        # Launch web dashboard
  python main.py <tiktok_url>           # Process single URL (CLI mode)
  python main.py --batch urls.txt       # Process list of URLs from file
"""
import sys
import argparse
from database import init_db


def main():
    init_db()

    parser = argparse.ArgumentParser(
        description="Voznota – Analizador automático de videos TikTok"
    )
    parser.add_argument("url", nargs="?", help="URL de TikTok a procesar")
    parser.add_argument("--batch", "-b", metavar="FILE", help="Archivo con URLs (una por línea)")
    parser.add_argument("--no-email", action="store_true", help="No enviar email")
    parser.add_argument("--no-discord", action="store_true", help="No enviar a Discord")
    parser.add_argument("--port", type=int, default=None, help="Puerto del dashboard")
    args = parser.parse_args()

    send_email = not args.no_email
    send_discord = not args.no_discord

    if args.batch:
        from pipeline import process_url
        with open(args.batch) as f:
            urls = [line.strip() for line in f if line.strip() and not line.startswith("#")]
        print(f"Procesando {len(urls)} URLs en batch...")
        for i, url in enumerate(urls, 1):
            print(f"\n[{i}/{len(urls)}] {url}")
            result = process_url(url, send_email=send_email, send_discord=send_discord)
            print(f"  → Estado: {result['status']}")

    elif args.url:
        from pipeline import process_url
        result = process_url(args.url, send_email=send_email, send_discord=send_discord)
        if result["status"] == "done":
            print(f"\n✅ Completado: {result['title']}")
            print(f"   ZIP: {result.get('zip_path', 'N/A')}")
        else:
            print(f"\n❌ Error: {result.get('error', 'desconocido')}")

    else:
        # Default: launch web dashboard
        if args.port:
            import config
            config.DASHBOARD_PORT = args.port
        from dashboard import run_dashboard
        run_dashboard()


if __name__ == "__main__":
    main()
