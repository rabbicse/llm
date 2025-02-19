"use client";

import { Chat } from "@/components/chat";
import { generateUUID } from "@/lib/utils";
import { DEFAULT_CHAT_MODEL } from "@/lib/models";
// import { DataStreamHandler } from '@/components/data-stream-handler';

export default function Page() {
  const id = generateUUID();
  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        selectedChatModel={DEFAULT_CHAT_MODEL}
        // selectedVisibilityType="private"
        isReadonly={false}
      />
      {/* <DataStreamHandler id={id} /> */}
    </>
  );
}
