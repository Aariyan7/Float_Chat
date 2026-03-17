import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import TechStack from './components/TechStack'
import UseCases from './components/UseCases'
import Footer from './components/Footer'
import ChatInterface from './components/ChatInterface'

function App() {
  const [page, setPage] = useState('home')  // 'home' | 'chat'
  const [chatHovered, setChatHovered] = useState(false)

  if (page === 'chat') {
    return (
      <ThemeProvider>
        <ChatInterface onBack={() => setPage('home')} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <Navbar onChatClick={() => setPage('chat')} />
        <main>
          <Hero />
          <Problem />
          <Solution />
          <HowItWorks />
          <Features />
          <TechStack />
          <UseCases />
        </main>
        <Footer />

        {/* Floating Chat Button */}
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
          {/* Tooltip */}
          <div
            className={`transition-all duration-200 origin-bottom-right ${
              chatHovered
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-1 scale-95 pointer-events-none'
            }`}
          >
            <span className="inline-block bg-black dark:bg-white text-white dark:text-black text-xs font-medium px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap">
              Start chatting
            </span>
          </div>

          {/* FAB */}
          <button
            id="chat-fab"
            aria-label="Open chat"
            onMouseEnter={() => setChatHovered(true)}
            onMouseLeave={() => setChatHovered(false)}
            onClick={() => setPage('chat')}
            className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-2xl flex items-center justify-center transition-all duration-200 ${
              chatHovered ? 'scale-110 shadow-black/30 dark:shadow-white/20' : 'scale-100'
            } hover:ring-2 hover:ring-black dark:hover:ring-white hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-black`}
          >
            {/* Chat SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>

            {/* Online indicator */}
            <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-black animate-pulse" />
          </button>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
