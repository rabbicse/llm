"use client"
 
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", text: input };
    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "This is a sample AI response." },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Chat Messages */}
      <Card className="flex-grow overflow-auto rounded-lg shadow-lg bg-white p-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-[75%] ${
                msg.role === "user"
                  ? "bg-userBubble text-white"
                  : "bg-aiBubble text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </Card>

      {/* Input Box */}
      <div className="flex gap-2 mt-4 p-2 bg-white rounded-lg shadow-m">
        <Input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600 text-white">Send</Button>
      </div>
    </div>
  );
}
