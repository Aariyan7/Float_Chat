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
import LoginPage from './components/LoginPage'

function App() {
  const [page, setPage] = useState('home')  // 'home' | 'login'

  return (
    <ThemeProvider>
      {page === 'login' ? (
        <LoginPage onBack={() => setPage('home')} />
      ) : (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
          <Navbar onLoginClick={() => setPage('login')} />
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
        </div>
      )}
    </ThemeProvider>
  )
}

export default App
