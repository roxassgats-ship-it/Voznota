# 🎵 Voznota – TikTok Video Analyzer

Aplicación automatizada que descarga videos de TikTok, transcribe el audio con Claude y genera análisis completo de contenido. Envía resultados por ZIP, email y Discord. Incluye dashboard web para monitorear desde el celular.

## Funciones

- **Descarga automática** de videos TikTok (sin marca de agua con yt-dlp)
- **Extracción de audio** con ffmpeg
- **Transcripción y análisis** con Claude (Anthropic)
  - Transcripción completa
  - Resumen ejecutivo
  - Puntos clave
  - Hashtags sugeridos
  - Ideas de contenido
  - Conexiones temáticas
  - Calificación de valor
  - Acciones recomendadas
- **Empaquetado en ZIP** con todos los archivos
- **Notificaciones automáticas** por email y Discord
- **Dashboard web** accesible desde celular con actualización en tiempo real
- **Historial** de todos los videos procesados en SQLite
- **Modo batch** para procesar múltiples URLs a la vez

## Setup

```bash
# 1. Instalar dependencias
pip install -r requirements.txt
apt install ffmpeg  # Linux

# 2. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus API keys

# 3. Ejecutar
python main.py              # Dashboard web en http://localhost:5000
python main.py <url>        # Procesar un video directamente
python main.py --batch urls.txt  # Procesar lista de URLs
```

## Variables de entorno (.env)

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `ANTHROPIC_API_KEY` | API key de Claude | ✅ Sí |
| `DISCORD_WEBHOOK_URL` | Webhook de Discord | ❌ Opcional |
| `EMAIL_SENDER` | Tu correo Gmail | ❌ Opcional |
| `EMAIL_PASSWORD` | App Password de Gmail | ❌ Opcional |
| `EMAIL_RECIPIENT` | Correo destino | ❌ Opcional |

## Uso desde celular

1. Ejecuta `python main.py` en tu computadora
2. Obtén la IP local (`ip addr` o `ifconfig`)
3. Abre en el celular: `http://TU_IP:5000`
4. Pega links de TikTok y monitorea el progreso en tiempo real

## Modo batch

Crea un archivo `urls.txt` con un link por línea:
```
https://www.tiktok.com/@usuario/video/123456789
https://www.tiktok.com/@otro/video/987654321
```

Ejecuta: `python main.py --batch urls.txt`
