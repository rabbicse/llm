from ollama import Client


class OllamaService:
    def __init__(self,
                 address: str = "http://192.168.97.67:11434",
                 model: str = "deepseek-r1:1.5b"):
        self._address = address
        self._model = model

    def get_chat_stream(self, query: str):
        client = Client(host=self._address)
        chat_messages: list[dict[str, str]] = [{'role': 'user', 'content': query}]

        stream = client.chat(model=self._model, messages=chat_messages, stream=True)

        for chunk in stream:
            yield chunk['message']['content']
