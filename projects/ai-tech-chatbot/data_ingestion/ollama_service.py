from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.llms.ollama import Ollama


class OllamaService:
    def __init__(self,
                 model: str = "deepseek-r1:1.5b",
                 base_url: str = "http://127.0.0.1:11434"):
        self.llm = Ollama(model=model, base_url=base_url)
        self.embed_model = OllamaEmbeddings(model=model, base_url=base_url)
