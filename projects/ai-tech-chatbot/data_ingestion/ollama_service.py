from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.llms.ollama import Ollama
from langchain_core.prompts import ChatPromptTemplate

from data_ingestion import llm_config


class OllamaService:
    def __init__(self,
                 model: str = "deepseek-r1:1.5b",
                 base_url: str = "http://127.0.0.1:11434"):
        self.llm = Ollama(model=model, base_url=base_url)
        self.embed_model = OllamaEmbeddings(model=model, base_url=base_url)

    def ask(self, question: str, documents):
        context = "\n\n".join([doc.page_content for doc in documents])
        prompt = ChatPromptTemplate.from_template(llm_config.TEMPLATE)
        chain = prompt | self.embed_model

        return chain.invoke({"question": question, "context": context})
