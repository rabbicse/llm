import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MessageProps {
  content: string;
}

const CustomMarkdown: React.FC<MessageProps> = ({ content }) => {
  // Replace <think>...</think> with a styled version
  const processedContent = content.replace(
    /<think>(.*?)<\/think>/gs,
    `<span style="color: gray; font-style: italic;">🤔 $1</span>`
  );

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{processedContent}</ReactMarkdown>
  );
};

export default CustomMarkdown;
