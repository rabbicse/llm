import os

import streamlit as st

import main

# st.title("Echo Bot")
#
# # Initialize chat history
# if "messages" not in st.session_state:
#     st.session_state.messages = []
#
# # Display chat messages from history on app rerun
# for message in st.session_state.messages:
#     with st.chat_message(message["role"]):
#         st.markdown(message["content"])
#
# # React to user input
# if prompt := st.chat_input("What is up?"):
#     # Display user message in chat message container
#     st.chat_message("user").markdown(prompt)
#     # Add user message to chat history
#     st.session_state.messages.append({"role": "user", "content": prompt})
#
#     response = f"Echo: {prompt}"
#     # Display assistant response in chat message container
#     with st.chat_message("assistant"):
#         st.markdown(response)
#     # Add assistant response to chat history
#     st.session_state.messages.append({"role": "assistant", "content": response})



st.title("Chat with PDFs with Deepseek")

uploaded_file = st.file_uploader("Upload PDF", type="pdf", accept_multiple_files=False)

if uploaded_file is not None:
    # Save uploaded file
    pdfs_directory = "uploads"  # Define a storage directory
    os.makedirs(pdfs_directory, exist_ok=True)  # Ensure the directory exists
    file_path = os.path.join(pdfs_directory, uploaded_file.name)

    with open(file_path, "wb") as f:
        f.write(uploaded_file.getbuffer())  # Save the uploaded file

    st.write(f"✅ Uploaded: {uploaded_file.name}")  # Debugging message

    # Process PDF
    main.upload_pdf(uploaded_file)  # Pass actual file path
    db = main.create_vector_store(file_path)

    # Chat input
    question = st.chat_input()

    if question:
        st.chat_message("user").write(question)
        related_documents = main.retrieve_docs(db, question)
        answer = main.question_pdf(question, related_documents)
        st.chat_message("assistant").write(answer)