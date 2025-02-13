import os
import uvicorn
from fastapi import FastAPI
from typing import AsyncGenerator
from fastapi.responses import StreamingResponse

from api.models import QueryRequest

version = "v1"
app = FastAPI(title="RAG API with Deepseek (Streaming)",
              version=version)

# 🔹 Streaming Generator
async def generate_streaming_response(query: str) -> AsyncGenerator[str, None]:
    response = qa_chain.run(query)

    # Simulate streaming (breaking text into chunks)
    for word in response.split():
        yield word + " "


# 🔹 Streaming Endpoint
@app.post("/query/stream")
async def query_rag_stream(request: QueryRequest):
    return StreamingResponse(generate_streaming_response(request.query), media_type="text/plain")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("SERVER_PORT", 5000)))
