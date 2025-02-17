from fastapi import FastAPI
from pydantic import BaseModel
from starlette.responses import StreamingResponse

from ollama_service import OllamaService


class ChatRequest(BaseModel):
    query: str


version = "v1"
app = FastAPI(version=version,
              title='REST API with Ollama and Deepseek')

ai_service = OllamaService()


@app.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    return StreamingResponse(ai_service.get_chat_stream(request.query), media_type="text/event-stream")
