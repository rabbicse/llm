from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter


class DocumentParser:
    def __init__(self, file_path: str):
        self.loader = PyPDFLoader(file_path=file_path)

    def __enter__(self):
        """
        Returns:

        """
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        del self.loader

    def create_pdf_document_chunks(self):

        documents = self.loader.load()

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            add_start_index=True
        )

        return text_splitter.split_documents(documents)
