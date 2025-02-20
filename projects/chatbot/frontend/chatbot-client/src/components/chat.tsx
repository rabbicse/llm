"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";

import { ChatHeader } from "@/components/chat-header";

// import { Artifact } from './artifact';
import { MultimodalInput } from "@/components/multimodal-input";
import { Messages } from "@/components/messages";
import { generateUUID } from "@/lib/utils";
import { Message, useChat } from '@ai-sdk/react';
import type {
  Attachment,
  ChatRequestOptions,
  CreateMessage,
} from "ai";

export function Chat({
  id,
  initialMessages,
  selectedChatModel,
  //   selectedVisibilityType,
  isReadonly,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedChatModel: string;
  //   selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/chat/stream";
  
  const { mutate } = useSWRConfig();
  const [textInput, setTextInput] = useState<string>("");
  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Append function to append LLM responses
  const append = async (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ): Promise<string | null | undefined> => {
    // Ensure the message has an ID
    const newMessage: Message = {
      id: generateUUID(),
      content: message.content,
      role: message.role,
      createdAt: message.createdAt ?? new Date(), // Ensure valid Date
    };

    setMessages((draft) => [...draft, newMessage]); // Append safely
    return newMessage.id;
  };

  // Function to handle form submit operation
  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (!textInput.trim() && attachments.length === 0) return;

    setIsLoading(true);    

    const newMessage: Message = {
      id: generateUUID(),
      content: textInput,
      role: "user",
    };

    const newAiMessage: Message = {
      id: generateUUID(),
      content: textInput,
      role: "assistant",
    };

    // Set messages before request to AI
    setMessages((draft) => {
      console.log(draft);
      return [...draft, newMessage];
    });

    setMessages((draft) => {
      console.log(draft);
      return [...draft, newAiMessage];
    });

    setTextInput("");
    setAttachments([]);

    try {
      const response = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: textInput.trim() }),
      });

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
              id: generateUUID(),
              content: receivedText,
              role: "assistant",
            },
          ]);
        }
      }
    } catch (error) {
      console.log(error);
      setMessages([
        ...messages,
        {
          id: generateUUID(),
          content: "",
          role: "assistant",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Define reload function
  const reload = async (
    chatRequestOptions?: ChatRequestOptions
  ): Promise<string | null | undefined> => {
    setIsLoading(true);
    try {
      // Simulate fetching new messages
      const newMessages: Message[] = [
        {
          id: "1",
          content: "New message",
          role: "assistant",
          createdAt: new Date(),
        },
      ];
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);

      return "Reloaded successfully"; // Simulate a response
    } catch (error) {
      console.error("Error reloading messages:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader
          chatId={id}
          selectedModelId={selectedChatModel}
          //   selectedVisibilityType={selectedVisibilityType}
          isReadonly={isReadonly}
        />

        <Messages
          chatId={id}
          isLoading={isLoading}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
          isArtifactVisible={false}
        />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          {!isReadonly && (
            // <MultimodalInput
            //   chatId={id}
            //   input={textInput}
            //   setInput={setTextInput}
            //   handleSubmit={handleSubmit}
            //   isLoading={isLoading}
            //   stop={() => setIsLoading(false)}
            //   attachments={attachments}
            //   setAttachments={setAttachments}
            //   messages={messages}
            //   setMessages={setMessages}
            //   append={append}
            // />

            <MultimodalInput
              chatId={id}
              input={textInput}
              setInput={setTextInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={() => setIsLoading(false)}
              attachments={attachments}
              setAttachments={setAttachments}
              messages={messages}
              setMessages={setMessages}
              append={append}
            />
          )}
        </form>
      </div>

      {/* <Artifact
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
        attachments={attachments}
        setAttachments={setAttachments}
        append={append}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
        votes={votes}
        isReadonly={isReadonly}
      /> */}
    </>
  );
}
