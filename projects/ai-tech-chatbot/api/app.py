from fastapi import FastAPI
from pydantic import BaseModel
from langchain.chains import RetrievalQA
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Qdrant
from langchain.llms import Ollama
from qdrant_client import QdrantClient
from typing import AsyncGenerator
from fastapi.responses import StreamingResponse

app = FastAPI(title="RAG API with Qdrant & Deepseek (Streaming)")

# 🔹 Remote Ollama Server
ollama_host = "http://REMOTE_IP:11434"  # Change to your remote IP
embeddings = OllamaEmbeddings(model="deepseek-r1:1.5b", base_url=ollama_host)

# 🔹 Remote Qdrant Server
qdrant_client = QdrantClient("http://QDRANT_SERVER_IP:6333")  # Change this
COLLECTION_NAME = "my_rag_collection"

# 🔹 Load Qdrant Retriever
vectorstore = Qdrant(
    client=qdrant_client,
    collection_name=COLLECTION_NAME,
    embeddings=embeddings,
)
retriever = vectorstore.as_retriever()

# 🔹 Load Ollama LLM
llm = Ollama(model="deepseek-r1:1.5b", base_url=ollama_host)

# 🔹 Create RAG Chain
qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever, return_source_documents=True)


class QueryRequest(BaseModel):
    query: str


# 🔹 Streaming Generator
async def generate_streaming_response(query: str) -> AsyncGenerator[str, None]:
    response = qa_chain.run(query)

    # Simulate streaming (breaking text into chunks)
    for word in response.split():
        yield word + " "
        await asyncio.sleep(0.02)  # Simulate streaming delay


# 🔹 Streaming Endpoint
@app.post("/query/stream")
async def query_rag_stream(request: QueryRequest):
    return StreamingResponse(generate_streaming_response(request.query), media_type="text/plain")

# Run with: uvicorn filename:app --host 0.0.0.0 --port 8000 --reload
