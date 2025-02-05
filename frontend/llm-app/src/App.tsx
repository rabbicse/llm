"use client"

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import React, { useRef, useState } from "react";
import { Chat } from "@/components/ui/chat";

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null)

  // Append a new message
  function append(newMessage: Message) {
    // setMessages((prev) => [...prev, newMessage])
    setMessages([...messages, newMessage]);
  }

  // Stop ongoing request
  function stop() {
    if (controllerRef.current) {
      controllerRef.current.abort()
      controllerRef.current = null
      setIsLoading(false)
    }
  }

  // const sendMessage = async () => {
  //   if (!input.trim()) return;
  //   setLoading(true);
  //   setMessages([...messages, { text: input, sender: "user" }]);
  //   setInput("");

  //   const response = await fetch(`http://localhost:8081/api/v1/llm/stream/${input}`);
  //   const reader = response.body.getReader();
  //   let receivedText = "";

  //   while (true) {
  //     const { done, value } = await reader.read();
  //     if (done) break;
  //     receivedText += new TextDecoder().decode(value);
  //     setMessages([...messages, { text: receivedText, sender: "ai" }]);
  //   }
  //   setLoading(false);
  // };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return;

    // Append user message
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input }
    append(userMessage)
    setInput("")
    setIsLoading(true)

    controllerRef.current = new AbortController()

    try {
      const response = await fetch(`http://localhost:8081/api/v1/llm/stream/${input}`);
      if (response.ok && response.body !== null) {
        const reader = response.body.getReader();
        let receivedText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          receivedText += new TextDecoder().decode(value);
          // setMessages([...messages, { text: receivedText, sender: "ai" }]);
          // setMessages((prev) => [...prev, { id: Date.now().toString(), role: "ai", content: receivedText }])
          const botMessage: Message = { id: Date.now().toString(), role: "assistant", content: receivedText }
          append(botMessage)
        }
      }

      // setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    // <div className="max-w-2xl mx-auto p-4">
    //   <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-100 dark:bg-gray-800">
    //     {messages.map((msg, index) => (
    //       <div key={index} className={`p-2 my-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black"} max-w-[80%]`}>{msg.text}</div>
    //     ))}
    //   </div>
    //   <div className="flex gap-2 mt-4">
    //     <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." className="flex-1" />
    //     <Button onClick={sendMessage} disabled={loading}>Send</Button>
    //   </div>
    // </div>

    // <div className="w-full h-screen flex">
    //   <Chat
    //     className="grow"
    //     messages={messages}
    //     handleSubmit={handleSubmit}
    //     input={input}
    //     handleInputChange={(e) => setInput(e.target.value)}
    //     isGenerating={isLoading}
    //     stop={stop}
    //     append={append}
    //     suggestions={[
    //       "Generate a tasty vegan lasagna recipe for 3 people.",
    //       "Generate a list of 5 questions for a job interview for a software engineer.",
    //       "Who won the 2022 FIFA World Cup?",
    //     ]}
    //   />
    // </div>




    <Chat
    messages={messages}
    input={input}
    handleInputChange={(e) => setInput(e.target.value)}
    handleSubmit={handleSubmit}
    isGenerating={isLoading}
    stop={stop}
    append={append}
    suggestions={[
      "Generate a tasty vegan lasagna recipe for 3 people.",
      "Generate a list of 5 questions for a frontend job interview.",
      "Who won the 2022 FIFA World Cup?",
    ]}
  />



  );
};

export default App;