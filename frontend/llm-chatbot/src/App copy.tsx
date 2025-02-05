import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./main.css";


type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
};

function App() {
  // const [count, setCount] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setMessages([
      ...messages,
      { id: Date.now().toString(), content: input, role: "user" },
    ]);
    setInput("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/llm/stream/${input}`
      );

      if (response.ok) {
        const reader = response.body.getReader();
        let receivedText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          receivedText += new TextDecoder().decode(value);
          setMessages([
            ...messages,
            { id: Date.now().toString(), content: receivedText, role: "ai" },
          ]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> */}

        <div className="max-w-2xl mx-auto p-4">
          {/* <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-100 dark:bg-gray-800">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-300 text-black"
                } max-w-[80%]`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          
          <div className="flex gap-2 mt-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <button onClick={sendMessage} disabled={isLoading}>
              Send
            </button>
          </div> */}




{/* Chat Container */}
<div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 my-1 max-w-xs md:max-w-sm lg:max-w-md rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start p-3 text-gray-500">
            <span className="animate-pulse">Thinking...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="p-4 border-t bg-white dark:bg-gray-800 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className={`p-2 rounded-lg ${
            isLoading ? "bg-gray-400" : "bg-blue-600 text-white"
          }`}
        >
          Send
        </button>
      </div>






      <div className="bg-[#343541] h-screen flex flex-col justify-between">
      <div>
        {/* messages */}
        <div className="overflow-y-scroll h-[70vh] md:h-[75vh] w-full md:w-[70%] mx-auto md:p-0 p-4 flex flex-col">
        {/* message */}
          <div className="flex items-start space-x-4 my-6 p-2">
              <div className="flex flex-col items-start">
                <p className="text-[#ececf1] font-bold">You</p>
                <p className="text-[#ececf1]">hello</p>
              </div>
            </div>
        </div>
        




      <div className="w-full flex justify-center items-center flex-col p-4 md:p-0">
        <div className="w-full md:w-[65%] h-[55px] border border-gray-600 flex items-center rounded-lg p-2">
           <input className="text-white h-full w-full p-2 outline-none bg-inherit" type="text" placeholder="Message ChatGPT clone"/>
           <button className="bg-gray-600 h-full p-2 rounded-lg">
            {/* <img src="/images/asset 10.svg" alt="btn-img"/> */}
           </button>
        </div>
        </div>
</div>
</div>      




        </div>
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
