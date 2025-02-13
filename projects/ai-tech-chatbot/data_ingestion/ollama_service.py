from langchain.chains import RetrievalQA
from langchain.vectorstores import FAISS
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.llms.ollama import Ollama
from data_ingestion.document_parser import DocumentParser


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

    def retrieve_docs(self, db, query, k=4):
        print(db.similarity_search(query))
        return db.similarity_search(query, k)

    def ask(self, question: str):
        persisted_vectorstore = FAISS.load_local("faiss_index_",
                                                 self.embed_model,
                                                 allow_dangerous_deserialization=True)

        # Create a retriever
        retriever = persisted_vectorstore.as_retriever()

        # Create RetrievalQA
        qa = RetrievalQA.from_chain_type(llm=self.llm,
                                         chain_type="stuff",
                                         retriever=retriever)

        response = qa.invoke({"query": question})

        for chunk in response["result"]:
            yield chunk

        # context = "\n\n".join([doc.page_content for doc in documents])
        # prompt = ChatPromptTemplate.from_template(llm_config.TEMPLATE)
        # chain = prompt | self.embed_model
        #
        # return chain.invoke({"question": question, "context": context})

    def prompt(self, question: str):
        # Test with a sample prompt
        response = self.llm.stream(question)
        for chunk in response:
            yield chunk


if __name__ == '__main__':
    service = OllamaService()
    # service.create_vector_store()
    service.prompt()
