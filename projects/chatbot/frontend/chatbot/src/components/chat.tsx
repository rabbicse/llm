"use client";

import { CHAT_ID } from "@/lib/constants";
import { Message } from "ai";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatInput } from "./chat-input";
import { toast } from "sonner";
import { ChatMessages } from "./chat-messages";
import { ChatRequestOptions, UIMessage } from "ai";
import useSWR from 'swr';
import { fillMessageParts, generateUUID, getMessageParts } from "@/lib/utils";

export function Chat({
  id,
  savedMessages = [],
  query,
}: {
  id: string;
  savedMessages?: Message[];
  query?: string;
}) {

  // declare API url
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/chat/stream";

  // Input state and handlers.
  const initialInput = "";
  const [inputContent, setInputContent] = useState<string>(initialInput);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Generate ID once, store in state for stability across re-renders
  const [hookId] = useState(generateUUID);

  // Use the caller-supplied ID if available; otherwise, fall back to our stable ID
  const chatKey = id ?? hookId;

  // Store a empty array as the initial messages
  // (instead of using a default parameter value that gets re-created each time)
  // to avoid re-renders:
  const [initialMessagesFallback] = useState([]);

  // Store the chat state in SWR, using the chatId as the key to share states.
  const { data: messages, mutate } = useSWR<Message[]>(
    [chatKey, 'messages'],
    null,
    {
      fallbackData:
        savedMessages != null
          ? fillMessageParts(savedMessages)
          : initialMessagesFallback,
    },
  );

  // Keep the latest messages in a ref.
  const messagesRef = useRef<Message[]>(messages || []);
  useEffect(() => {
    messagesRef.current = messages || [];
  }, [messages]);

  const setMessages = useCallback(
    (messages: Message[] | ((messages: Message[]) => Message[])) => {
      if (typeof messages === 'function') {
        messages = messages(messagesRef.current);
      }

      const messagesWithParts = fillMessageParts(messages);
      mutate(messagesWithParts, false);
      messagesRef.current = messagesWithParts;
    },
    [mutate],
  );

  const handleSubmit = useCallback(
    async (
      event?: { preventDefault?: () => void },
      options: ChatRequestOptions = {},
      metadata?: Object,
    ) => {
      event?.preventDefault?.();

      if (!inputContent && !options.allowEmptySubmit) return;

      const messages = messagesRef.current.concat({
        id: generateUUID(),
        createdAt: new Date(),
        role: 'user',
        content: inputContent,
        parts: [{ type: 'text', text: inputContent }],
      });

      // todo: service call and handle messages
      try {
        setIsLoading(true);

        const newMessage: Message = {
          id: generateUUID(),
          content: inputContent,
          role: "user",
        };
    
   
        // Set messages before request to AI
        setMessages((draft) => {
          console.log(draft);
          return [...draft, newMessage];
        });

        const response = await fetch(`${apiUrl}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: inputContent.trim() }),
        });


        if (response.ok && response.body != null) {
          const reader = response.body.getReader();
          let receivedText = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            receivedText += new TextDecoder().decode(value).replace("data:", "").replace("\n", "")
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


      } catch (err) {
        console.log(`Error when streaming services. Details: ${err}`);
      } finally {
        setIsLoading(false);
      }

      setInputContent('');
    },
    [inputContent],
  );

  // const append = (message,
  //   { data, headers, body } = {},) => {
  // };

  const handleInputChange = (e: any) => {
    setInputContent(e.target.value);
  };

  const onQuerySelect = (query: string) => {
    // append({
    //   role: "user",
    //   content: query,
    // });
    // todo:
  };

  // handle form submission functionality
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setData(undefined); // reset data to clear tool call
    handleSubmit(e);
  };


  return (
    <div className="flex flex-col w-full max-w-3xl pt-14 pb-60 mx-auto stretch">
      <ChatMessages
        messages={messages}
        // data={data}
        onQuerySelect={onQuerySelect}
        isLoading={isLoading}
        chatId={id}
      />

      <ChatInput
        input={inputContent}
        handleInputChange={handleInputChange}
        handleSubmit={onSubmit}
        isLoading={isLoading}
        messages={messages}
        setMessages={setMessages}
        // stop={stop}
        query={query}
      // append={append}
      />
    </div>
  );
}
