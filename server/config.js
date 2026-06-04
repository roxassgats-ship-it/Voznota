const path = require('path');

const FFMPEG_PATH = process.env.FFMPEG_PATH ||
  '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2';

const YTDLP_PATH = process.env.YTDLP_PATH || '/usr/local/bin/yt-dlp';

const DOWNLOAD_DIR = path.resolve(__dirname, '../downloads');

const PORT = parseInt(process.env.PORT || '3000', 10);

const MAX_CONCURRENT = parseInt(process.env.MAX_CONCURRENT || '3', 10);

// TTL: 2 hours in ms
const CLEANUP_TTL = parseInt(process.env.CLEANUP_TTL || String(2 * 60 * 60 * 1000), 10);

const QUALITY_FORMATS = {
  best:  'bv*+ba/b',
  '1080p': 'bv*[height<=1080]+ba/b[height<=1080]',
  '720p':  'bv*[height<=720]+ba/b[height<=720]',
  '480p':  'bv*[height<=480]+ba/b[height<=480]',
  '360p':  'bv*[height<=360]+ba/b[height<=360]',
};

const AUDIO_FORMATS = ['mp3', 'aac', 'ogg', 'wav', 'flac', 'm4a'];
const VIDEO_FORMATS = ['mp4', 'webm', 'mkv', 'avi'];

module.exports = {
  FFMPEG_PATH,
  YTDLP_PATH,
  DOWNLOAD_DIR,
  PORT,
  MAX_CONCURRENT,
  CLEANUP_TTL,
  QUALITY_FORMATS,
  AUDIO_FORMATS,
  VIDEO_FORMATS,
};
