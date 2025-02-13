from itertools import chain

from langchain.chains import RetrievalQA
from langchain.vectorstores import FAISS
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.llms.ollama import Ollama

from data_ingestion import llm_config
from data_ingestion.document_parser import DocumentParser
from langchain.prompts import ChatPromptTemplate


class OllamaService:
    def __init__(self,
                 model: str = "deepseek-r1:1.5b",
                 base_url: str = "http://127.0.0.1:11434"):
        self.llm = Ollama(model=model,
                          base_url=base_url)
        self.embed_model = OllamaEmbeddings(model=model,
                                            base_url=base_url)
        self.pdf_parser = DocumentParser()

    def create_vector_store(self):
        docs = self.pdf_parser.create_document_chunks(file_path='../documents/top_10_codeing_pattern.pdf')
        vector_store = FAISS.from_documents(documents=docs,
                                            embedding=self.embed_model)
        # Save and reload the vector store
        vector_store.save_local("faiss_index_")

    def retrieve_docs(self, query: str, k: int = 4):
        persisted_vectorstore = FAISS.load_local("faiss_index_",
                                                 self.embed_model,
                                                 allow_dangerous_deserialization=True)
        return persisted_vectorstore.similarity_search(query, k)

    def ask(self, question: str):
        # Retrieve relevant documents
        documents = self.retrieve_docs(question)

        # If no documents are found, return "I don't know"
        if not documents:
            yield "I don't know."
            return

        context = "\n\n".join([doc.page_content for doc in documents])

        # Create a prompt template
        template = """
        You are a helpful assistant. Use the following context to answer the question.
        If the context is not relevant or does not contain enough information, say "I don't know."

        Context: {context}

        Question: {question}

        Answer:
        """
        prompt = ChatPromptTemplate.from_template(template=template)

        # Stream the response using the LLM
        response = self.llm.stream(prompt.format(context=context, question=question))

        # Yield chunks in real-time
        for chunk in response:
            yield chunk

    def prompt(self, question: str):
        # Test with a sample prompt
        response = self.llm.stream(question)
        for chunk in response:
            yield chunk


if __name__ == '__main__':
    service = OllamaService()
    # service.create_vector_store()
    service.prompt()
