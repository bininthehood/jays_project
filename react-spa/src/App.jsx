import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

const BOT_DELAY_MS = 450

function createMessage(role, text) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    text,
    createdAt: new Date().toISOString(),
  }
}

function getBotReply(input) {
  const trimmed = input.trim()

  if (!trimmed) {
    return 'Please send a message when you are ready.'
  }

  if (/hello|hi|hey/i.test(trimmed)) {
    return 'Hello. This is the basic chat bot. You can replace this logic with an API call next.'
  }

  if (/help|how/i.test(trimmed)) {
    return 'Current features: send message, bot reply, auto scroll, and timestamp.'
  }

  return `You said: "${trimmed}"`
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function HomePage() {
  return (
    <main className="home-shell">
      <section className="home-card">
        <p className="home-kicker">React SPA</p>
        <h1>Main Page</h1>
        <p>Start from the chat page and evolve this into your service workflow.</p>
        <Link className="cta-link" to="/chat">
          Open Chat
        </Link>
      </section>
    </main>
  )
}

function ChatPage() {
  const [messages, setMessages] = useState(() => [
    createMessage('bot', 'Welcome. Start by sending your first message.'),
  ])
  const [draft, setDraft] = useState('')
  const [isReplying, setIsReplying] = useState(false)
  const endRef = useRef(null)

  const canSend = useMemo(() => draft.trim().length > 0 && !isReplying, [draft, isReplying])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  const sendMessage = () => {
    const text = draft.trim()

    if (!text || isReplying) {
      return
    }

    const userMessage = createMessage('user', text)
    setMessages((prev) => [...prev, userMessage])
    setDraft('')
    setIsReplying(true)

    const replyText = getBotReply(text)

    window.setTimeout(() => {
      setMessages((prev) => [...prev, createMessage('bot', replyText)])
      setIsReplying(false)
    }, BOT_DELAY_MS)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage()
  }

  return (
    <main className="chat-shell">
      <header className="chat-header">
        <h1>Chat Page</h1>
        <p>Basic local chat UI ready for API integration.</p>
      </header>

      <section className="chat-log" aria-live="polite">
        {messages.map((message) => (
          <article
            key={message.id}
            className={message.role === 'user' ? 'bubble bubble-user' : 'bubble bubble-bot'}
          >
            <p>{message.text}</p>
            <time dateTime={message.createdAt}>{formatTime(message.createdAt)}</time>
          </article>
        ))}

        {isReplying && (
          <article className="bubble bubble-bot bubble-typing" aria-label="bot typing">
            <p>Typing...</p>
          </article>
        )}

        <div ref={endRef} />
      </section>

      <form className="chat-input" onSubmit={handleSubmit}>
        <label htmlFor="chat-message" className="sr-only">
          Message
        </label>
        <input
          id="chat-message"
          name="message"
          type="text"
          placeholder="Type a message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          autoComplete="off"
        />
        <button type="submit" disabled={!canSend}>
          Send
        </button>
      </form>
    </main>
  )
}

function App() {
  return (
    <>
      <header className="top-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'top-link active' : 'top-link')}>
          Main
        </NavLink>
        <NavLink to="/chat" className={({ isActive }) => (isActive ? 'top-link active' : 'top-link')}>
          Chat
        </NavLink>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
