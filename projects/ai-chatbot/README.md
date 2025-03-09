# Large Language Models (LLM)

## 🚀 LLM-Powered App with Next.js, React 19, FastAPI, and Event Streaming  

This repository contains a **LLM-powered application** built with **Next.js (React 19) for the frontend** and **FastAPI with Python** for the backend. It integrates **Ollama** and **DeepSeek-R1** to provide seamless AI-driven functionality. The project is designed for efficient, scalable, and high-performance AI interactions, incorporating event streaming for real-time updates.

---

![ai-chatbot](screenshots/modern-ai-chatbot.webp)

## 🛠️ Tech Stack  
- **Frontend:** Next.js + React 19 ⚡  
- **Backend:** FastAPI + Python 🐍  
- **LLM:** DeepSeek-R1 via Ollama 🤖  
- **Event Streaming:** Real-time communication  

## ✨ Features  
- Seamless AI model integration with **FastAPI**  
- Fast and responsive UI built with **Next.js & React 19**  
- Local or cloud-based **LLM inference** using **DeepSeek-R1** and **Ollama**  
- Scalable and modular **FastAPI backend**  
- Event streaming for real-time updates  

## 🚀 Getting Started  

### Prerequisites  
Ensure you have the following installed:  
- Ollama installed and running  
- DeepSeek-R1 model available  
- Python 3.10+  
- Node.js & npm  

### Install and serve Ollama
Go to `https://ollama.com` and click the download button. It will redirect to the download page `https://ollama.com/download`. Download based on your operating system and install it on your system.

Then go to the `models` section. We can get all available models for the Ollama platform at `https://ollama.com/search`. Click on the `deepseek-r1` section for an example. From the dropdown, select your desired tag, e.g., `1.5`. Then copy the run command, for example, `ollama run deepseek-r1:1.5b`, replace **run** with **pull**, and run it on your terminal.

```
ollama pull deepseek-r1:1.5b
```

Then run the following command to serve it with the default port.
```
ollama serve
```
It should run on the default port: `11434`

Note: For more configurations like serving as a remote server, I will show the steps later. Stay tuned!!!

### REST API Backend
I have created a separate README for backend development with FastAPI. You can choose any other language or framework, but the basic mechanisms are similar.  
[Backend Development](https://github.com/rabbicse/llm/tree/master/projects/chatbot/backend)

### Create Next.js project for frontend
I have created a separate README for frontend development with `Next.js` and `React 19`. You can choose any other framework, but the basic mechanisms are similar.  
[Frontend Development](https://github.com/rabbicse/llm/tree/master/projects/chatbot/frontend/ai-chatbot)

## References
- [Ollama](https://ollama.com)  
- [FastAPI](https://fastapi.tiangolo.com/)  
- [React](https://react.dev)  
- [Next.js](https://nextjs.org/)  
- [Frontend Github Project](https://github.com/ruizguille/tech-trends-chatbot/tree/master/frontend)  

