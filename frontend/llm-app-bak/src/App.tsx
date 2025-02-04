// import { useState } from 'react'
// import './App.css'

// function App() {
//   const [message, setMessage] = useState('')
//   const [response, setResponse] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!message.trim()) return

//     setLoading(true)
//     setError('')

//     try {
//       const encodedMessage = encodeURIComponent(message)
//       const response = await fetch(`http://localhost:8081/api/v1/llm/stream/${encodedMessage}`)

//       if (!response.ok) {
//         throw new Error('Failed to get response')
//       }

//       const data = await response.text()
//       setResponse(data)
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <div className="container">
//         <h1>Deepseek AI Chat</h1>

//         <form onSubmit={handleSubmit} className="chat-form">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             disabled={loading}
//           />
//           <button type="submit" disabled={loading}>
//             {loading ? 'Sending...' : 'Send'}
//           </button>
//         </form>

//         <div className="response-wrapper">
//           {error && <div className="error">{error}</div>}

//           {response && (
//             <div className="response">
//               <h2>Response:</h2>
//               <p>{response}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default App



// function App() {
//   // const [message, setMessage] = useState('');
//   // const [response, setResponse] = useState('');
//   // const [loading, setLoading] = useState(false);
//   // const [error, setError] = useState('');

//   const [chat, setChat] = useState("");
//   const [messages, setMessages] = useState([]);

//   const handleSend = () => {
//     streamChat(chat, setMessages);
//   };

//   const streamChat = async (chat) => {
//     const response = await fetch(`http://localhost:8080/api/v1/llm/stream/${chat}`);
//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();

//     while (true) {
//       const { value, done } = await reader.read();
//       if (done) break;
//       console.log(decoder.decode(value));
//     }
//   };

//   return (
//     <>
//       <div className="chat-container">
//         <input
//           type="text"
//           placeholder="Ask something..."
//           value={chat}
//           onChange={(e) => setChat(e.target.value)}
//         />
//         <button onClick={handleSend}>Send</button>

//         <div className="chat-messages">
//           {messages.map((msg, index) => (
//             <p key={index}>{msg}</p>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default App



import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

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
