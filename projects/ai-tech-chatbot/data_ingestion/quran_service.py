import json

from langchain.chains import RetrievalQA
from langchain.prompts import ChatPromptTemplate
from langchain_ollama import OllamaLLM, OllamaEmbeddings
from langchain_qdrant import QdrantVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter
from qdrant_client import QdrantClient
from qdrant_client.http.models import VectorParams, Distance

from config.settings import settings
from data_ingestion import llm_config


class QuranService:
    def __init__(self,
                 address: str = f'{settings.OLLAMA_HOST}:{settings.OLLAMA_PORT}',
                 model: str = settings.OLLAMA_MODEL):
        print(address)
        self.llm = OllamaLLM(model=model,
                             base_url=address,
                             temperature=0)
        self.embed_model = OllamaEmbeddings(model=model,
                                            base_url=address)

        # Initialize Qdrant
        self.qdrant = QdrantClient(
            "192.168.97.67:6333")  # Use `host="localhost"` if running a persistent Qdrant instance

        if not self.qdrant.collection_exists("quran_analysis"):
            self.qdrant.create_collection(
                collection_name="quran_analysis",
                vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
            )

        # Initialize Qdrant retriever
        self.vector_store = QdrantVectorStore(client=self.qdrant,
                                              collection_name="quran_analysis",
                                              embedding=self.embed_model)

    def create_vector_store(self, file_path: str = '../rag_datasets/quran_data.json'):
        print(f'creating vector store...')

        # Load the Quranic text (assuming it's a JSON file with "surah", "ayah", and "text")
        with open(file_path, "r", encoding="utf-8") as f:
            quran = json.load(f)

        # Convert Quran data into a list of documents
        documents = []
        for surah in quran:
            documents.append(json.dumps(surah))

        # Chunking the text
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = text_splitter.split_text("\n".join(documents))
        print(f"Total Chunks: {len(chunks)}")

        # Index chunks
        for index, chunk in enumerate(chunks):
            print(f'inserting chunk {index}...')
            _ = self.vector_store.add_texts(texts=[chunk])

        print("Quranic text indexed successfully!")

    def retrieve_docs(self, query: str, k: int = 4):
        return self.vector_store.similarity_search_with_score(query=query, k=k)

    def ask(self, question: str):
        """
        Args:
            question ():

        Returns:

        """
        print(f"asking question...")
        # Retrieve relevant documents
        docs = self.retrieve_docs(question)
        documents = [(doc, score) for doc, score in docs]
        for doc in documents:
            print(doc)

        # If no documents are found, return "I don't know"
        if not documents:
            return "I don't know."

        context = "\n\n".join([doc.page_content.replace('{', '').replace('}', '') for doc, score in documents])

        # Properly format the prompt with context and question
        prompt_text = llm_config.TEMPLATE.format(question=question, context=context)

        prompt = ChatPromptTemplate.from_template(template=prompt_text)

        chain = prompt | self.llm

        # Stream the response using the LLM
        for chunk in chain.stream({"question": question, "context": context}):
            yield chunk

        print('done!')

    def prompt(self, question: str):
        # Test with a sample prompt
        response = self.llm.stream(question)
        for chunk in response:
            yield chunk


if __name__ == '__main__':
    service = QuranService()
    # service.create_vector_store()
    for chunk in service.ask("Al-fatihah ayahs count?"):
        print(chunk, end='')
