import os
import uvicorn
from fastapi import FastAPI
from typing import AsyncGenerator
from fastapi.responses import StreamingResponse

from api.models import QueryRequest
from data_ingestion.ollama_service import OllamaService

version = "v1"
app = FastAPI(title="RAG API with Deepseek (Streaming)",
              version=version)

ollama_service = OllamaService()
ollama_service.create_vector_store(file_path='../rag_datasets/the_holy_quran.pdf')


# Streaming Generator
async def generate_streaming_response(query: str) -> AsyncGenerator[str, None]:
    # Stream ollama responses
    for chunk in ollama_service.ask(question=query):
        yield chunk


# Streaming Endpoint
@app.post("/query/stream")
async def query_rag_stream(request: QueryRequest):
    return StreamingResponse(generate_streaming_response(request.query), media_type="text/event-stream")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("SERVER_PORT", 5001)))
