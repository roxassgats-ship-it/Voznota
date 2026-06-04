const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Runs faster-whisper via Python subprocess to avoid Node/Python bridge complexity
function transcribeFile(filePath, { language = 'auto', modelSize = 'base' } = {}) {
  return new Promise((resolve, reject) => {
    const script = path.join(__dirname, '../../bin/transcribe.py');
    const args = [
      script,
      '--file', filePath,
      '--model', modelSize,
    ];
    if (language && language !== 'auto') {
      args.push('--language', language);
    }

    let stdout = '';
    let stderr = '';
    const proc = spawn('python3', args, { env: { ...process.env, PYTHONUNBUFFERED: '1' } });

    proc.stdout.on('data', d => { stdout += d.toString(); });
    proc.stderr.on('data', d => { stderr += d.toString(); });

    proc.on('close', code => {
      if (code !== 0) {
        return reject(new Error(stderr.slice(-500) || 'Transcription failed'));
      }
      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch {
        reject(new Error('Failed to parse transcription output'));
      }
    });

    proc.on('error', err => reject(new Error(`Transcription process error: ${err.message}`)));
  });
}

module.exports = { transcribeFile };
