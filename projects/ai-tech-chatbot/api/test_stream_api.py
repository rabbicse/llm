import json

import requests

url = "http://localhost:5001/query/stream"
message = "Describe libaration war in bangladesh?"
data = {"query": message}

headers = {"Content-type": "application/json",
           "accept": "application/json"}

with requests.post(url, data=json.dumps(data), headers=headers, stream=True) as r:
    for chunk in r.iter_content(256):
        print(chunk.decode("utf-8") if isinstance(chunk, bytes) else chunk, end='')
