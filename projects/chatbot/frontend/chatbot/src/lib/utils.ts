import { CreateMessage, Message, UIMessage } from "ai";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ReasoningUIPart, SourceUIPart, TextUIPart, ToolInvocationUIPart } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function fillMessageParts(messages: Message[]): UIMessage[] {
  return messages.map(message => ({
    ...message,
    parts: getMessageParts(message),
  }));
}

export function getMessageParts(
  message: Message | CreateMessage | UIMessage,
): (TextUIPart | ReasoningUIPart | ToolInvocationUIPart | SourceUIPart)[] {
  return (
    message.parts ?? [
      ...(message.toolInvocations
        ? message.toolInvocations.map(toolInvocation => ({
            type: 'tool-invocation' as const,
            toolInvocation,
          }))
        : []),
      ...(message.reasoning
        ? [{ type: 'reasoning' as const, reasoning: message.reasoning }]
        : []),
      ...(message.content
        ? [{ type: 'text' as const, text: message.content }]
        : []),
    ]
  );
}