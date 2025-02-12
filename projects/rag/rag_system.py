from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

## https://www.datacamp.com/tutorial/llama-3-1-rag?utm_source=google&utm_medium=paid_search&utm_campaignid=19589720824&utm_adgroupid=157098106775&utm_device=c&utm_keyword=&utm_matchtype=&utm_network=g&utm_adpostion=&utm_creative=684592141082&utm_targetid=aud-2191467490030:dsa-2264919291989&utm_loc_interest_ms=&utm_loc_physical_ms=1001441&utm_content=&utm_campaign=230119_1-sea~dsa~tofu_2-b2c_3-apac_4-prc_5-na_6-na_7-le_8-pdsh-go_9-nb-e_10-na_11-na&gad_source=1&gclid=CjwKCAiAh6y9BhBREiwApBLHC-AMrqADnAFRuwfEoY-n6vDDv-Qtb_MZfr_YP9zHvKJmv1qC7abXURoCjGQQAvD_BwE
# List of URLs to load documents from
urls = [
    "https://lilianweng.github.io/posts/2023-06-23-agent/",
    "https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/",
    "https://lilianweng.github.io/posts/2023-10-25-adv-attack-llm/",
]
# Load documents from the URLs
docs = [WebBaseLoader(url).load() for url in urls]
docs_list = [item for sublist in docs for item in sublist]

# Initialize a text splitter with specified chunk size and overlap
text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
    chunk_size=250, chunk_overlap=0
)
# Split the documents into chunks
doc_splits = text_splitter.split_documents(docs_list)

from langchain_community.vectorstores import SKLearnVectorStore
from langchain.embeddings import OllamaEmbeddings

embedding_model = OllamaEmbeddings(model="deepseek-r1:1.5b")  # Use any local Ollama model

vectorstore = SKLearnVectorStore.from_documents(
    documents=doc_splits,
    embedding=embedding_model,
)

retriever = vectorstore.as_retriever(k=4)


from langchain_ollama import ChatOllama
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
# Define the prompt template for the LLM
prompt = PromptTemplate(
    template="""You are an assistant for question-answering tasks.
    Use the following documents to answer the question.
    If you don't know the answer, just say that you don't know.
    Use three sentences maximum and keep the answer concise:
    Question: {question}
    Documents: {documents}
    Answer:
    """,
    input_variables=["question", "documents"],
)

