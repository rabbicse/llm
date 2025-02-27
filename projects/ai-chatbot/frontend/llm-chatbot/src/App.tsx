import { useState } from "react";
import { Message } from "@/models/message";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";

function formatChatGPTDateTime(): string {
  const now = new Date();

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short", // Mon, Tue, etc.
    month: "short", // Jan, Feb, etc.
    day: "numeric", // 1, 2, 3, etc.
    hour: "2-digit", // 08, 09, etc.
    minute: "2-digit", // 30, 45, etc.
    hour12: true, // AM/PM format
  }).format(now);
}

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      content: `# 👋 Welcome! 
I am an AI chatbot powered by a Java Spring Boot and Spring AI backend. The AI is running with Ollama, using the Deepseek-R1 model. Ask me anything about the latest technology trends, and I'll do my best to assist you!`,
      role: "ai",
      loading: false,
      timestamp: formatChatGPTDateTime(),
      error: "",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    setIsLoading(true);

    setMessages((draft) => [
      ...draft,
      {
        id: Date.now().toString(),
        content: newMessage,
        role: "user",
        loading: false,
        timestamp: formatChatGPTDateTime(),
        error: "",
      },
      {
        id: Date.now().toString(),
        content: "",
        role: "ai",
        loading: true,
        timestamp: formatChatGPTDateTime(),
        error: "",
      },
    ]);
    setNewMessage("");

    try {
      const response = await fetch(`${apiUrl}/${newMessage}`);

      if (response.ok && response.body != null) {
        const reader = response.body.getReader();
        let receivedText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          receivedText += new TextDecoder().decode(value);
          setMessages([
            ...messages,
            {
              id: Date.now().toString(),
              content: receivedText,
              role: "ai",
              loading: true,
              timestamp: formatChatGPTDateTime(),
              error: "",
            },
          ]);
        }
      }
    } catch (error) {
      console.log(error);
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          content: "",
          role: "ai",
          loading: false,
          timestamp: formatChatGPTDateTime(),
          error: `Error when process request. Details: ${error}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen max-h-screen w-full max-w-6xl mx-auto px-4">
        <header className="sticky top-0 shrink-0 z-20 bg-themecolor py-4 px-4 my-4">
          <h1 className="font-urbanist text-[1.65rem] font-semibold text-center">
            AI Chatbot
          </h1>
        </header>

        <ChatMessage messages={messages} />

        <ChatInput
          isLoading={isLoading}
          sendMessage={sendMessage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      </div>
    </>
  );
}

export default App;
