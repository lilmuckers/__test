#!/usr/bin/env python3
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SUBPATH = "/__test"

class PagesSubpathHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        clean_path = path.split('?', 1)[0].split('#', 1)[0]

        if clean_path in {'/', ''}:
            clean_path = f'{SUBPATH}/'

        if clean_path == SUBPATH or clean_path == f'{SUBPATH}/':
            target = REPO_ROOT / 'index.html'
        elif clean_path.startswith(f'{SUBPATH}/'):
            relative = clean_path[len(SUBPATH) + 1:]
            target = REPO_ROOT / relative
        else:
            target = REPO_ROOT / clean_path.lstrip('/')

        return str(target)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', 4173), PagesSubpathHandler)
    print('Serving repository root at http://127.0.0.1:4173/__test/')
    server.serve_forever()
