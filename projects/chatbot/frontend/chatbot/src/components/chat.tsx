"use client";

import { CHAT_ID } from '@/lib/constants'
import { Message, useChat } from 'ai/react'
import { useEffect } from "react";
import { ChatInput } from "./chat-input";
import { toast } from 'sonner';
import { ChatMessages } from './chat-messages';

export function Chat({
    id,
    savedMessages = [],
    query 
}: {
        id: string
        savedMessages?: Message[]
        query?: string
    }) {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        setMessages,
        stop,
        append,
        data,
        setData
    } = useChat({
        api: 'http://localhost:8000/chat/stream',
        initialMessages: savedMessages,
        id: CHAT_ID,
        body: {
            query: "hi"
        },
        onFinish: () => {
            window.history.replaceState({}, '', `/search/${id}`)
        },
        onError: error => {
            toast.error(`Error in chat: ${error}`)
        },
        sendExtraMessageFields: false // Disable extra message fields
    })

    useEffect(() => {
        setMessages(savedMessages)
    }, [id])

    const onQuerySelect = (query: string) => {
        append({
            role: 'user',
            content: query
        })
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setData(undefined) // reset data to clear tool call
        handleSubmit(e)
    }
    return (
        <div className="flex flex-col w-full max-w-3xl pt-14 pb-60 mx-auto stretch">
            <ChatMessages
                messages={messages}
                data={data}
                onQuerySelect={onQuerySelect}
                isLoading={isLoading}
                chatId={id}
            />
            <ChatInput
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={onSubmit}
                isLoading={isLoading}
                messages={messages}
                setMessages={setMessages}
                stop={stop}
                query={query}
                append={append}
            />
        </div>
    )
}