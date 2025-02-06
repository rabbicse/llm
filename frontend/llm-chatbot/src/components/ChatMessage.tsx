import userIcon from "@/assets/images/user.svg";
import errorIcon from "@/assets/images/error.svg";
import aiIcon from "@/assets/images/artificial-intelligence.svg";
import Spinner from "@/components/Spinner";
import Markdown from "react-markdown";
import useAutoScroll from "@/hooks/useAutoScroll";
import { Message } from "@/models/message";

interface ChatMessageProps {
  isLoading: boolean;
  messages: Message[];
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isLoading, messages }) => {
  const scrollContentRef = useAutoScroll(isLoading);

  return (
    <div className="relative grow flex flex-col gap-6 pt-6">
      {messages.length === 0 && (
        <div className="mt-3 font-urbanist text-primary-blue text-xl font-light space-y-2">
          <p>👋 Welcome!</p>
          <p>
          I am an AI chatbot powered by a Java Spring Boot and Spring AI backend. The AI is running with Ollama, using the Deepseek-R1 model. Ask me anything about the latest technology trends, and I'll do my best to assist you!
          </p>
          <p>Ask me anything about the latest technology trends.</p>
        </div>
      )}
      <div ref={scrollContentRef} className="grow space-y-4">
        {messages.map(({ id, role, content, loading, timestamp, error }) => (
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
        ))}
      </div>
    </div>
  );
};

export default ChatMessage;
