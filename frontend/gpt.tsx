import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    
    const response = await fetch(`http://localhost:8080/api/v1/llm/stream/${input}`);
    const reader = response.body.getReader();
    let receivedText = "";
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      receivedText += new TextDecoder().decode(value);
      setMessages([...messages, { text: receivedText, sender: "ai" }]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-100 dark:bg-gray-800">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black"} max-w-[80%]`}>{msg.text}</div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." className="flex-1" />
        <Button onClick={sendMessage} disabled={loading}>Send</Button>
      </div>
    </div>
  );
};

export default Chat;
