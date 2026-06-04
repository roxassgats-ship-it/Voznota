const { AUDIO_FORMATS, VIDEO_FORMATS, QUALITY_FORMATS } = require('../config');

const ALLOWED_HOSTS = ['youtube.com', 'www.youtube.com', 'youtu.be', 'm.youtube.com', 'music.youtube.com'];

function validateYouTubeUrl(url) {
  try {
    const parsed = new URL(url);
    if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
      return { valid: false, error: `Host not allowed: ${parsed.hostname}` };
    }
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL' };
  }
}

function validateQuality(quality) {
  if (!quality || !QUALITY_FORMATS[quality]) {
    return { valid: false, error: `Quality must be one of: ${Object.keys(QUALITY_FORMATS).join(', ')}` };
  }
  return { valid: true };
}

function validateFormat(format, mediaType) {
  const allowed = mediaType === 'audio' ? AUDIO_FORMATS : VIDEO_FORMATS;
  if (!format || !allowed.includes(format)) {
    return { valid: false, error: `Format must be one of: ${allowed.join(', ')}` };
  }
  return { valid: true };
}

function validateMediaType(type) {
  if (!['video', 'audio'].includes(type)) {
    return { valid: false, error: 'mediaType must be "video" or "audio"' };
  }
  return { valid: true };
}

function sanitizeFilename(name) {
  return name.replace(/[^\w\s\-_.()]/g, '').replace(/\s+/g, '_').slice(0, 200);
}

module.exports = { validateYouTubeUrl, validateQuality, validateFormat, validateMediaType, sanitizeFilename };
