import json

import requests

url = "http://localhost:5001/query/stream"
message = "Describe sliding window"
data = {"query": message}

headers = {"Content-type": "application/json",
           "accept": "application/json"}

with requests.post(url, data=json.dumps(data), headers=headers, stream=True) as r:
    for chunk in r.iter_content(256):
        print(chunk)
