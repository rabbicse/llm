import json

import requests

url = "http://localhost:8000/chat/stream"
query = "Why is the sky blue?"
payload = {'query': query}

with requests.post(url, data=json.dumps(payload), stream=True) as req:
    for chunk in req.iter_content(256):
        print(chunk.decode('utf-8'), end='')