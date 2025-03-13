from langchain.chains import RetrievalQA
from langchain.prompts import ChatPromptTemplate
from langchain_community.vectorstores import FAISS
from langchain_ollama import OllamaLLM, OllamaEmbeddings

from config.settings import settings
from data_ingestion import llm_config
from data_ingestion.document_parser import DocumentParser


class OllamaService:
    def __init__(self,
                 address: str = f'{settings.OLLAMA_HOST}:{settings.OLLAMA_PORT}',
                 model: str = settings.OLLAMA_MODEL):
        print(address)
        self.llm = OllamaLLM(model=model,
                             base_url=address,
                             temperature=0)
        self.embed_model = OllamaEmbeddings(model=model,
                                            base_url=address)

    def create_vector_store(self, file_path: str = '../documents/top_10_codeing_pattern.pdf'):
        print(f'creating vector store...')
        with DocumentParser(file_path=file_path) as document_parser:
            print(f'parsing documents {file_path}')
            docs = document_parser.create_pdf_document_chunks()
            print(docs)
            print(f"Total document chunks: {len(docs)}")
            vector_store = FAISS.from_documents(documents=docs,
                                                embedding=self.embed_model)
            print(vector_store)

            batch_size = 1  # Adjust as needed
            vector_store = FAISS.from_texts(texts=[],embedding=self.embed_model)
            print('vector store instance created...')

            for i in range(0, len(docs), batch_size):
                batch = docs[i:i + batch_size]
                vector_store.add_documents(batch)
                print(f"Added batch {i // batch_size + 1}")

            # vector_store = FAISS(embedding_function=self.embed_model)
            # vector_store.add_documents(docs)
            # Save and reload the vector store
            vector_store.save_local("faiss_index_")
            print('Save done!')

    def retrieve_docs(self, query: str, k: int = 4):
        persisted_vectorstore = FAISS.load_local("faiss_index_",
                                                 self.embed_model,
                                                 allow_dangerous_deserialization=True)
        return persisted_vectorstore.similarity_search_with_score(query, k)

    def ask(self, question: str):
        """
        Args:
            question ():

        Returns:

        """
        # Retrieve relevant documents
        documents = [(doc, score) for doc, score in self.retrieve_docs(question) if score >= 0.6]
        for doc in documents:
            print(doc)

        # If no documents are found, return "I don't know"
        if not documents:
            return "I don't know."

        context = "\n\n".join([doc.page_content for doc, score in documents])

        # Properly format the prompt with context and question
        prompt_text = llm_config.TEMPLATE.format(question=question, context=context)

        prompt = ChatPromptTemplate.from_template(template=prompt_text)

        chain = prompt | self.llm

        print(context)

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
    service = OllamaService()
    # service.create_vector_store()
    service.prompt()
