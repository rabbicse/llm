'use client'

import { ChatInput } from "@/components/chat-input";
import { Message } from "@/lib/types";
import { fillMessageParts, generateUUID } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import ChatMessage from "./chat-message";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export function Chat({
    id
}: {
    id: string
}) {
    // Input state and handlers.
    const initialInput = "";
    const [inputContent, setInputContent] = useState<string>(initialInput);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Store the chat state in SWR, using the chatId as the key to share states.
    const { data: messages, mutate } = useSWR<Message[]>(
        [id, "messages"],
        null,
        {
            fallbackData: [],
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

    // handlers
    const handleInputChange = (e: any) => {
        setInputContent(e.target.value);
    };

    // declare API url
    const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/chat/stream";
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


    // handle form submission functionality
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e);
    };

    return (
        <div className="flex flex-col w-full max-w-3xl pt-14 pb-60 mx-auto stretch">
            <ChatMessage
                isLoading={isLoading}
                messages={messages}
            />

            <ChatInput
                userInput={inputContent}
                handleInputChange={handleInputChange}
                handleSubmit={onSubmit}
                isLoading={isLoading}
                messages={messages}
            />
        </div>
    );
}