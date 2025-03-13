from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    OLLAMA_HOST: str = 'http://127.0.0.1'
    OLLAMA_PORT: str = '11434'
    OLLAMA_MODEL: str = 'deepseek-r1:1.5b'

    class Config:
        env_file = "../.env"


# Load settings
settings = Settings()