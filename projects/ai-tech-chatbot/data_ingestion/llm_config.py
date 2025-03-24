TEMPLATE = """
You are a helpful assistant. Use the following context to answer the question.
If the context is not relevant or does not contain enough information, say "I don't know."

Context: {context}

Question: {question}

Answer:
"""


QURAN_TEMPLATE = """
You will be given a quran chapter with the verse and a question enclosed in double backticks(``). Using that quran verse, 
answer the following question in as much detail as possible. You should only use the information in the quran verse.
If the context is not relevant or does not contain enough information, say "I don't know."

Context: ```{context}```

Question: ```{question}```

Answer:
"""