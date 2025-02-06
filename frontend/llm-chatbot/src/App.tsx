import { useState } from 'react'
import './App.css'
import Markdown from 'react-markdown';
import sendIcon from '@/assets/images/send.svg';
import errorIcon from '@/assets/images/error.svg';
import userIcon from '@/assets/images/user.svg';
import { Message } from '@/models/message';
import useAutoSize from '@/hooks/useAutoSize';
import useAutoScroll from './hooks/useAutoScroll';
import Spinner from './components/Spinner';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useAutoSize(newMessage);

  const scrollContentRef = useAutoScroll(isLoading);

  function handleKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey && !isLoading) {
      e.preventDefault();
      sendMessage();
    }
  }


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
      <div className='flex flex-col min-h-full w-full max-w-3xl mx-auto px-4'>
        <header className='sticky top-0 shrink-0 z-20 bg-themecolor'>
          <h1 className='font-urbanist text-[1.65rem] font-semibold'>AI Chatbot</h1>
        </header >
        {/* <ChatMessage /> */}
        {/* <ChatInput messages={messages} /> */}

        <div ref={scrollContentRef} className='grow space-y-4'>
          {messages.map(({ role, content, loading, error }, idx) => (
            <div key={idx} className={`flex items-start gap-4 py-4 px-3 rounded-xl ${role === 'user' ? 'bg-primary-blue/10' : ''}`}>
              {role === 'user' && (
                <img
                  className='h-[26px] w-[26px] shrink-0'
                  src={userIcon}
                  alt='user'
                />
              )}
              <div>
                <div className='markdown-container'>
                  {(loading && !content) ? <Spinner />
                    : (role === 'ai')
                      ? <Markdown>{content}</Markdown>
                      : <div className='whitespace-pre-line'>{content}</div>
                  }
                </div>
                {error && (
                  <div className={`flex items-center gap-1 text-sm text-error-red ${content && 'mt-2'}`}>
                    <img className='h-5 w-5' src={errorIcon} alt='error' />
                    <span>Error generating the response</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>


        <div className='sticky bottom-0 bg-themecolor py-4'>
          <div className='p-1.5 bg-primary-blue/35 rounded-3xl z-50 font-mono origin-bottom animate-chat duration-400'>
            <div className='pr-0.5 bg-white relative shrink-0 rounded-3xl overflow-hidden ring-primary-blue ring-1 focus-within:ring-2 transition-all'>
              <textarea
                placeholder='Ask anything'
                className='block w-full max-h-[140px] py-2 px-4 pr-11 bg-black rounded-3xl resize-none placeholder:text-primary-blue placeholder:leading-4 placeholder:-translate-y-1 sm:placeholder:leading-normal sm:placeholder:translate-y-0 focus:outline-none'
                ref={textareaRef}
                rows={1}
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className='absolute top-1/2 -translate-y-1/2 right-3 p-1 rounded-md hover:bg-primary-blue/20'
                onClick={sendMessage}
              >
                <img src={sendIcon} alt='send' />
              </button>
            </div>
          </div>
        </div>



      </div>
    </>
  )
}

export default App
