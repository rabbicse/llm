from fastapi import FastAPI
from pydantic import BaseModel
from starlette.responses import StreamingResponse

from ollama_service import OllamaService


class ChatRequest(BaseModel):
    query: str


version = "v1"
app = FastAPI(version=version,
              title='REST API with Ollama and Deepseek')

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ai_service = OllamaService()


@app.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    async def event_generator():
        async for chunk in ai_service.get_chat_stream(request.query):
            yield chunk  # Already in SSE format

<<<<<<< HEAD
    return StreamingResponse(event_generator(),
                             media_type="text/event-stream")
=======
    return StreamingResponse(ai_service.get_chat_stream(request.query), media_type="text/event-stream")
>>>>>>> 8a50403f63cc41462a5db85141fcff5fbe933cbe
