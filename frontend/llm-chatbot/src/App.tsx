import { useState } from "react";
import Markdown from "react-markdown";
import sendIcon from "@/assets/images/send.svg";
import errorIcon from "@/assets/images/error.svg";
import userIcon from "@/assets/images/user.svg";
import aiIcon from "@/assets/images/ai.svg";
import { Message } from "@/models/message";
import useAutoSize from "@/hooks/useAutoSize";
import useAutoScroll from "./hooks/useAutoScroll";
import Spinner from "./components/Spinner";
import ChatInput from "./components/ChatInput";

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

  const scrollContentRef = useAutoScroll(isLoading);

  // function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  //   if (e.key === "Enter" && !e.shiftKey && !isLoading) {
  //     e.preventDefault();
  //     sendMessage();
  //   }
  // }

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
      <div className="flex flex-col min-h-full w-full max-w-3xl mx-auto px-4">
        <header className="sticky top-0 shrink-0 z-20 bg-themecolor">
          <h1 className="font-urbanist text-[1.65rem] font-semibold">
            AI Chatbot
          </h1>
        </header>

        <div className="relative grow flex flex-col gap-6 pt-6">
          {messages.length === 0 && (
            <div className="mt-3 font-urbanist text-primary-blue text-xl font-light space-y-2">
              <p>👋 Welcome!</p>
              <p>
                I am powered by the latest technology reports from leading
                institutions like the World Bank, the World Economic Forum,
                McKinsey, Deloitte and the OECD.
              </p>
              <p>Ask me anything about the latest technology trends.</p>
            </div>
          )}
          <div ref={scrollContentRef} className="grow space-y-4">
            {messages.map(
              ({ id, role, content, loading, timestamp, error }) => (
                <div
                  key={id}
                  className={`flex items-start gap-4 py-4 px-3 rounded-xl ${
                    role === "user" ? "bg-primary-blue/10" : ""
                  }`}
                >
                  {role === "user" ? (
                    <img
                      className="h-[26px] w-[26px] shrink-0"
                      src={userIcon}
                      alt="user"
                    />
                  ) : (
                    <img
                      className="h-[26px] w-[26px] shrink-0"
                      src={aiIcon}
                      alt="ai"
                    />
                  )}
                  <div>
                    <div className="markdown-container">
                      {loading && !content ? (
                        <Spinner />
                      ) : role === "ai" ? (
                        <Markdown>{content}</Markdown>
                      ) : (
                        <div className="whitespace-pre-line">{content}</div>
                      )}
                    </div>
                    <div className="text-gray-500 text-sm">{timestamp}</div>
                    {error && (
                      <div
                        className={`flex items-center gap-1 text-sm text-error-red ${
                          content && "mt-2"
                        }`}
                      >
                        <img className="h-5 w-5" src={errorIcon} alt="error" />
                        <span>Error generating the response</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          <ChatInput
            isLoading={isLoading}
            sendMessage={sendMessage}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
          {/* <div className="sticky bottom-0 bg-themecolor py-4">
            <div className="p-1.5 bg-primary-blue/35 rounded-3xl z-50 font-mono origin-bottom animate-chat duration-400">
              <div className="pr-0.5 bg-black relative shrink-0 rounded-3xl overflow-hidden ring-primary-blue ring-1 focus-within:ring-2 transition-all">
                <textarea
                  placeholder="Ask anything"
                  className="block w-full max-h-[140px] py-2 px-4 pr-11 bg-black rounded-3xl resize-none placeholder:text-primary-blue placeholder:leading-4 placeholder:-translate-y-1 sm:placeholder:leading-normal sm:placeholder:translate-y-0 focus:outline-none"
                  ref={textareaRef}
                  rows={1}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="absolute top-1/2 -translate-y-1/2 right-3 p-1 rounded-md hover:bg-primary-blue/20"
                  onClick={sendMessage}
                >
                  <img src={sendIcon} alt="send" />
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default App;
