# Ollama + Deepseek integration with Python + Fastapi

## Getting started

- Go to https://ollama.com
- Install Ollama on system
- Pull deepseek-r1 models
- Serve it as server on port: `11434`
- Go to `https://github.com/ollama/ollama?tab=readme-ov-file`
- and `https://github.com/ollama/ollama-python`

## Installation
Open your terminal and create virtual environment with the following command.
```shell
python3 -m venv ./.venv
source ./.venv/bin/activate
```

Then, install the following packages one by one for fastapi.
```shell
pip install fastapi
pip install pydantic
pip install uvicorn
```

Then install the following package to interact with `ollama`.
```shell
pip install ollama
```