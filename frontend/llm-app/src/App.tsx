import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setLoading(true)
    setError('')

    try {
      const encodedMessage = encodeURIComponent(message)
      const response = await fetch(`http://localhost:8081/api/v1/llm/stream/${encodedMessage}`)

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.text()
      setResponse(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="container">
        <h1>Deepseek AI Chat</h1>

        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>

        <div className="response-wrapper">
          {error && <div className="error">{error}</div>}

          {response && (
            <div className="response">
              <h2>Response:</h2>
              <p>{response}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
