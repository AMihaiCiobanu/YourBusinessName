"""Static server for testing the demo: gzip for text files (like GitHub Pages) and either
no-store (dev) or max-age=600 (prod-like, GitHub Pages' default) caching.
Usage: python3 devserver.py <port> <root> [dev|prod]"""
import gzip
import http.server
import io
import os
import sys

PORT = int(sys.argv[1])
ROOT = os.path.abspath(sys.argv[2])
MODE = sys.argv[3] if len(sys.argv) > 3 else 'dev'
TEXT = ('.html', '.js', '.css', '.svg', '.json', '.md', '.txt', '.xml', '.mjs')


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store' if MODE == 'dev' else 'max-age=600')
        super().end_headers()

    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            index = os.path.join(path, 'index.html')
            if not self.path.split('?')[0].endswith('/'):
                return super().send_head()
            path = index
        accepts = 'gzip' in self.headers.get('Accept-Encoding', '')
        if not (accepts and path.endswith(TEXT) and os.path.isfile(path)):
            return super().send_head()
        with open(path, 'rb') as f:
            body = gzip.compress(f.read(), 6)
        self.send_response(200)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Content-Encoding', 'gzip')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Vary', 'Accept-Encoding')
        self.end_headers()
        return io.BytesIO(body)

    def log_message(self, *args):
        pass


class Server(http.server.ThreadingHTTPServer):
    request_queue_size = 256
    daemon_threads = True


Server(('127.0.0.1', PORT), Handler).serve_forever()
