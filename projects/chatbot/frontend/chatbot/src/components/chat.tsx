"use client";

import { Message } from "ai";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";
import useSWR from "swr";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { fillMessageParts, generateUUID } from "@/lib/utils";
import { DUMMY_MESSAGE } from "@/lib/constants";

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
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/chat/stream";

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
    [chatKey, "messages"],
    null,
    {
      fallbackData:
        savedMessages != null
          ? fillMessageParts(savedMessages)
          : initialMessagesFallback,
    }
  );

  // Keep the latest messages in a ref.
  const messagesRef = useRef<Message[]>(messages || []);
  useEffect(() => {
    messagesRef.current = messages || [];
  }, [messages]);

  const setMessages = useCallback(
    (messages: Message[] | ((messages: Message[]) => Message[])) => {
      if (typeof messages === "function") {
        messages = messages(messagesRef.current);
      }

      const messagesWithParts = fillMessageParts(messages);
      mutate(messagesWithParts, false);
      messagesRef.current = messagesWithParts;
    },
    [mutate]
  );


  const handleSubmit = useCallback(
    async (
      event?: { preventDefault?: () => void }
    ) => {
      event?.preventDefault?.();

      if (!inputContent) return;

      let messages = messagesRef.current.concat({
        id: generateUUID(),
        createdAt: new Date(),
        role: "user",
        content: inputContent,
        parts: [{ type: "text", text: inputContent }],
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
          return [...draft, newMessage];
        });


        // handle streaming response
        await fetchEventSource(`${apiUrl}`, {
          method: "POST",
          headers: {
            Accept: "text/event-stream",
            "Content-Type": "application/json", // ✅ Add this line
          },
          body: JSON.stringify({ query: inputContent }),
          onopen(res) {
            if (res.ok && res.status === 200) {
              console.log("Connection made ", res);
            } else if (
              res.status >= 400 &&
              res.status < 500 &&
              res.status !== 429
            ) {
              console.log("Client side error ", res);
            }
          },
          onmessage(event) {
            console.log(`${event.data}`);
            const text = JSON.parse(event.data);
            const content = {
              id: generateUUID(),
              content: text['text'],
              role: "assistant",
              parts: [{ type: 'text', text: text['text'] }]
            }

            setMessages((draft) => {
              const lastMessage = draft[draft.length - 1];
              if (lastMessage?.role === 'assistant') {
                // console.log(`assistant! data => ${event.data}`);
                // Append to the last assistant message
                return [
                  ...draft.slice(0, -1),
                  {
                    ...lastMessage,
                    content: lastMessage.content + text['text'],
                  },
                ];
              } else {
                // Add a new assistant message
                return [...draft, content];
              }
            });
          },
          onclose() {
            console.log("Connection closed by the server");
          },
          onerror(err) {
            console.log("There was an error from server", err);
          },
        });



      } catch (err) {
        console.log(`Error when streaming services. Details: ${err}`);
      } finally {
        setIsLoading(false);
      }

      setInputContent("");
    },
    [inputContent, setInputContent, apiUrl, setMessages]
  );

  const handleInputChange = (e: any) => {
    setInputContent(e.target.value);
  };

  // handle form submission functionality
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col w-full max-w-3xl pt-14 pb-60 mx-auto stretch">
      <ChatMessages
        messages={messages}
        // onQuerySelect={onQuerySelect}
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
