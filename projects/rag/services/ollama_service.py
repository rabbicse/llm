from pyexpat.errors import messages

from ollama import Client


class OllamaService:
    def __init__(self,
                 address: str = "http://localhost:11434",
                 model: str = 'deepseek-r1:1.5b'):
        self.address = address
        self.model = model

    def get_chat_stream(self, query: str):
        client = Client(host=self.address)

        chat_messages: list[dict[str, str]] = [{'role': 'user',
                                                'content': query}]
        stream = client.chat(model=self.model, messages=chat_messages, stream=True)

        for chunk in stream:
            yield chunk['message']['content']
