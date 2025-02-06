import { useState } from "react";
import { Message } from "@/models/message";
import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMessage";

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const scrollContentRef = useAutoScroll(isLoading);

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
      const response = await fetch(
        `http://localhost:8080/api/v1/llm/stream/${newMessage}`
      );

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
              loading: false,
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
          error: "",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen w-full max-w-3xl mx-auto px-4">
        <header className="sticky top-0 shrink-0 z-20 bg-themecolor">
          <h1 className="font-urbanist text-[1.65rem] font-semibold text-center">
            AI Chatbot
          </h1>
        </header>

        <ChatMessage isLoading={isLoading} messages={messages} />

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
