"use client";

import { Message } from "ai";
import ReactMarkdown from "react-markdown";
import { UserMessage } from "./user-message";
import rehypeRaw from "rehype-raw"; // Import rehype-raw

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={dracula}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

interface CustomRenderMessageProps {
  message: Message;
  chatId?: string;
}

export function CustomRenderMessage({
  message,
  chatId,
}: CustomRenderMessageProps) {
  if (message.role === "user") {
    return <UserMessage message={message.content} />;
  }

  console.log(`${message.content}`);
  return (
    <div>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}
      components={components}>
        {message.content}
      </ReactMarkdown>
    </div>
  );
}
