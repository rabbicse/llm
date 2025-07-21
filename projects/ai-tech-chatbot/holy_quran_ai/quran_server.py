import streamlit as st
from PyPDF2 import PdfReader
from dotenv import load_dotenv
from langchain.chains.question_answering import load_qa_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_ollama import OllamaLLM, OllamaEmbeddings

load_dotenv()
st.header("Talk with Quran!")

pdf = st.file_uploader("Upload your own pdf!")

if pdf is not None:
    st.write(pdf)
    pdf_object = PdfReader(pdf)
    text=""
    for page in pdf_object.pages[:50]:
        text += page.extract_text()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = 1000,
        chunk_overlap = 200,
        length_function = len
    )

    chunks = text_splitter.split_text(text=text)

    llm = OllamaLLM(model='deepseek-r1:1.5b',
                         base_url=f'http://192.168.97.67:11434',
                         temperature=0)
    embedding = OllamaEmbeddings(model='deepseek-r1:1.5b',
                                        base_url=f'http://192.168.97.67:11434')
    # embedding = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(chunks, embedding= embedding)

    query = st.text_input("Ask any question to Quran PDF!")

    if query:
        similar_chunks = vectorstore.similarity_search(query=query, k=2)
        # llm = OpenAI(model_name="gpt-3.5-turbo")
        chain = load_qa_chain(llm= llm, chain_type="stuff")

        response = chain.run(input_documents = similar_chunks, question=query)

        st.write(response)
        st.write("Reference Docs: ")
        st.write(similar_chunks[0])
        st.write(similar_chunks[1])