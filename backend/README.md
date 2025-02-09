# Backend
## Create REST api with Spring Boot and Spring AI
This project demonstrates how to build an AI chatbot using Spring Boot, Spring AI, and Ollama as the LLM backend. The chatbot interacts with the Ollama LLM server through a REST API.

## 📌 Features
✅ REST API for AI chatbot interaction
✅ Integration with Ollama for LLM processing
✅ Simple and scalable Spring Boot setup

## 🛠️ Getting Started  

### 1️⃣ **Generate Spring Boot Project**  
- Visit [Spring Initializr](https://start.spring.io)  
- Configure:  
  - **Language:** Java  
  - **Build Tool:** Maven  
  - **Spring Boot Version:** (Latest stable)  
- **Add Dependencies:**  
  - `Spring Web`  
  - `Ollama`  
- Click **Generate** and download the project.

## 🚀 Running the Spring Boot API
1️⃣ Update application.properties
Add the Ollama API URL (if running locally, it’s default), set server port and set swagger settings:
```properties
spring.application.name=llm
server.port=8080

spring.ai.ollama.chat.options.model=deepseek-r1:1.5b
spring.ai.ollama.base-url=http://localhost:11434

springdoc.api-docs.enabled=true
springdoc.swagger-ui.enabled=true
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.api-docs.path=/v3/api-docs
```

2️⃣ Build, Run and Test API Using cURL or Postman
Build and test the Spring Boot application:
```bash
mvn clean
mvn compile
mvn package
mvn verify
```

Then run the application:
```bash
mvn spring-boot:run
```

3️⃣ Test API Using cURL or Postman
Test the synchronous api.
```bash
curl -X 'GET' \
  'http://localhost:8080/api/llm/hi' \
  -H 'accept: */*'
```

Now test the streaming api
```bash
curl -X 'GET' \
  'http://localhost:8080/api/llm/stream/hi' \
  -H 'accept: */*'
```

## 🔥 Next Steps
- Implement streaming responses for real-time chats.
- Integrate Spring AI for advanced processing.
- Deploy the API using Docker & Kubernetes.

## 📌 Resources
- Ollama Docs: [https://ollama.ai](https://ollama.ai)
- Spring Boot: [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)
- Source Code: [github.com/rabbicse/llm](github.com/rabbicse/llm)
