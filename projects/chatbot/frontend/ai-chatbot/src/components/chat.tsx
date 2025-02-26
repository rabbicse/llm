'use client'

import { ChatInput } from "@/components/chat-input";
import { Message } from "@/lib/types";
import { fillMessageParts } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import ChatMessage from "./chat-message";

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

    // handle form submission functionality
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // todo:
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