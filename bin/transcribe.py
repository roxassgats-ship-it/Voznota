#!/usr/bin/env python3
"""Transcribe an audio/video file using faster-whisper. Outputs JSON."""
import sys
import argparse
import json
import os

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--file', required=True)
    parser.add_argument('--model', default='base', choices=['tiny', 'base', 'small', 'medium'])
    parser.add_argument('--language', default=None)
    args = parser.parse_args()

    if not os.path.exists(args.file):
        print(json.dumps({'error': f'File not found: {args.file}'}))
        sys.exit(1)

    try:
        from faster_whisper import WhisperModel
    except ImportError:
        print(json.dumps({'error': 'faster-whisper not installed. Run: pip3 install faster-whisper'}))
        sys.exit(1)

    # Suppress noisy logs
    import logging
    logging.getLogger('faster_whisper').setLevel(logging.ERROR)

    # Use int8 quantization for speed on CPU
    model = WhisperModel(args.model, device='cpu', compute_type='int8')

    language = args.language if args.language else None
    segments_iter, info = model.transcribe(
        args.file,
        language=language,
        beam_size=5,
        vad_filter=True,
        vad_parameters=dict(min_silence_duration_ms=500),
    )

    segments = []
    full_text_parts = []
    for seg in segments_iter:
        segments.append({
            'start': round(seg.start, 2),
            'end': round(seg.end, 2),
            'text': seg.text.strip(),
        })
        full_text_parts.append(seg.text.strip())

    result = {
        'text': ' '.join(full_text_parts),
        'language': info.language,
        'language_probability': round(info.language_probability, 3),
        'duration': round(info.duration, 2) if info.duration else None,
        'segments': segments,
    }

    print(json.dumps(result, ensure_ascii=False))

if __name__ == '__main__':
    main()
