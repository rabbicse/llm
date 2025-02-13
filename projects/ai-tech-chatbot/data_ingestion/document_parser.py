from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter


class DocumentParser:
    def __init__(self):
        pass

    def create_document_chunks(self, file_path: str):
        loader = PyMuPDFLoader(file_path=file_path)
        documents = loader.load()

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=100,
            add_start_index=True
        )

        return text_splitter.split_documents(documents)
