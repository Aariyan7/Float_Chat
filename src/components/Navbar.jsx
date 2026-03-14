import { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X, Waves } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'Home',         href: '#hero' },
  { label: 'About',        href: '#problem' },
  { label: 'Features',     href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Use Cases',    href: '#use-cases' },
]

const SECTION_IDS = ['hero', 'problem', 'solution', 'how-it-works', 'features', 'tech-stack', 'use-cases']

// Map section IDs to which nav link should be highlighted
const sectionToNav = {
  'hero':         '#hero',
  'problem':      '#problem',
  'solution':     '#problem',
  'how-it-works': '#how-it-works',
  'features':     '#features',
  'tech-stack':   '#features',
  'use-cases':    '#use-cases',
}

export default function Navbar({ onLoginClick }) {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [activeHref, setActiveHref]   = useState('#hero')

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // IntersectionObserver for active section
  useEffect(() => {
    const observers = []
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveHref(sectionToNav[id] || `#${id}`)
          }
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? theme === 'dark' ? 'glass-dark' : 'glass-light'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#hero"
            onClick={e => handleLink(e, '#hero')}
            className="flex items-center gap-2 group select-none"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-glow-blue group-hover:scale-110 transition-transform duration-200">
              <Waves className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-black dark:text-white">
              FloatChat
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = activeHref === link.href
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={e => handleLink(e, link.href)}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors duration-150 rounded-md ${
                      isActive
                        ? 'text-black dark:text-white'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {/* Active dot indicator */}
                    {isActive && (
                      <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                    )}
                    {link.label}
                    {/* Underline */}
                    <span className={`absolute bottom-0 left-3 right-3 h-px bg-black dark:bg-white transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`} />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right — theme toggle + login */}
          <div className="flex items-center gap-2">
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-md flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-150 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
            >
              {theme === 'dark'
                ? <Sun  className="w-4 h-4" />
                : <Moon className="w-4 h-4" />
              }
            </button>

            <button
              id="login-btn"
              onClick={onLoginClick}
              className="hidden sm:inline-flex items-center h-8 px-3 text-sm font-medium rounded-md border border-zinc-200 dark:border-zinc-700 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-150"
            >
              Log In
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              className="md:hidden w-8 h-8 rounded-md flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-150"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 top-14 z-40 transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className={`border-b ${theme === 'dark' ? 'bg-black/95 border-zinc-800' : 'bg-white/95 border-zinc-200'} backdrop-blur-lg px-4 py-4 flex flex-col gap-1`}>
          {navLinks.map(link => {
            const isActive = activeHref === link.href
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={e => handleLink(e, link.href)}
                className={`flex items-center gap-2 py-2.5 px-3 text-sm font-medium rounded-md transition-colors duration-150 ${
                  isActive
                    ? 'text-black dark:text-white bg-zinc-100 dark:bg-zinc-900'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />}
                {link.label}
              </a>
            )
          })}
          <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <button onClick={onLoginClick} className="w-full flex items-center justify-center h-9 text-sm font-medium rounded-md border border-zinc-200 dark:border-zinc-700 text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors duration-150">
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
