import json

from ollama import Client

from config import settings


# Function to convert Ollama response to JSON serializable format
def convert_to_serializable(response):
    # Safely extract values using get(), provide default values if key doesn't exist
    serializable_response = {
        'model': response.get('model', ''),  # Default to empty string if 'model' doesn't exist
        'created_at': response.get('created_at', ''),
        'done': response.get('done', False),
        'done_reason': response.get('done_reason', None),
        'total_duration': response.get('total_duration', None),
        'load_duration': response.get('load_duration', None),
        'prompt_eval_count': response.get('prompt_eval_count', None),
        'prompt_eval_duration': response.get('prompt_eval_duration', None),
        'eval_count': response.get('eval_count', None),
        'eval_duration': response.get('eval_duration', None),
        'message': {
            'role': response.get('message', {}).get('role', ''),  # Nested get for 'message' and 'role'
            'content': response.get('message', {}).get('content', ''),
            'images': response.get('message', {}).get('images', None),
            'tool_calls': response.get('message', {}).get('tool_calls', None)
        }
    }

    return serializable_response


class OllamaService:
    def __init__(self,
                 address: str = f'{settings.OLLAMA_HOST}:{settings.OLLAMA_PORT}',
                 model: str = settings.OLLAMA_MODEL):
        self._address = address
        self._model = model

    def get_chat_stream(self, query: str):
        client = Client(host=self._address)
        chat_messages: list[dict[str, str]] = [{'role': 'user', 'content': query}]

        stream = client.chat(model=self._model, messages=chat_messages, stream=True)

        for chunk in stream:
            if 'message' in chunk and 'content' in chunk['message']:
                content = {'content': chunk['message']['content']}
                yield f"data: {json.dumps(content)}\n\n"
