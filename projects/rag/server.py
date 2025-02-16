import os
from collections.abc import AsyncGenerator

import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import StreamingResponse

from services.ollama_service import OllamaService


class ChatRequest(BaseModel):
    query: str


version = "v1"
app = FastAPI(title="REST api with Ollama and deepseek-r1",
              version=version)

ollana_service = OllamaService()


async def generate_streaming_response(query: str) -> AsyncGenerator[str, None]:
    for chunk in ollana_service.get_chat_stream(query=query):
        yield chunk['message']['content']


@app.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    return StreamingResponse(ollana_service.get_chat_stream(query=request.query), media_type="text/event-stream")


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("SERVER_PORT", 8000)))
