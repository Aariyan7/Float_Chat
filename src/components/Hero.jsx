import { useEffect, useRef } from 'react'
import { Github, PlayCircle, ArrowRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const terminalLines = [
  { prefix: '> ', text: 'Show me salinity profiles near the equator in March 2023', color: 'text-zinc-300' },
  { prefix: '  ', text: 'Querying ARGO database...', color: 'text-zinc-500' },
  { prefix: '  ', text: 'Found 142 float profiles matching your query', color: 'text-emerald-400' },
  { prefix: '  ', text: 'Rendering geospatial map + depth profiles...', color: 'text-blue-400' },
  { prefix: '> ', text: 'Compare temperature anomalies in the Pacific 2022 vs 2023', color: 'text-zinc-300' },
  { prefix: '  ', text: 'Running LLM → SQL pipeline...', color: 'text-zinc-500' },
  { prefix: '  ', text: '✓ Visualization ready', color: 'text-emerald-400' },
]

export default function Hero() {
  const { theme } = useTheme()
  const termRef = useRef(null)

  useEffect(() => {
    const el = termRef.current
    if (!el) return
    el.classList.add('opacity-0', 'translate-y-4')
    const t = setTimeout(() => {
      el.classList.remove('opacity-0', 'translate-y-4')
      el.classList.add('opacity-100', 'translate-y-0')
    }, 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14 ${
        theme === 'dark' ? 'hero-grid' : 'hero-grid-light'
      }`}
    >
      {/* Glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-glow-pulse absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-blue-500/20 via-violet-500/10 to-transparent blur-3xl" />
        <div className="animate-glow-pulse animate-delay-300 absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-radial from-cyan-400/10 via-blue-500/05 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Oceanographic AI · ARGO Float Data
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up opacity-0 animate-delay-100 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-[-0.04em] leading-[1.05] mb-6"
          style={{ animationFillMode: 'forwards' }}
        >
          <span className={theme === 'dark' ? 'text-white' : 'text-black'}>
            Democratizing
          </span>
          <br />
          <span className="gradient-text-blue">
            Ocean Data
          </span>
          <br />
          <span className={theme === 'dark' ? 'text-white' : 'text-black'}>
            with Conversational AI
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="animate-fade-up opacity-0 animate-delay-200 max-w-2xl mx-auto text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 mb-3 leading-relaxed"
          style={{ animationFillMode: 'forwards' }}
        >
          Query, explore, and visualize ARGO oceanographic data just by asking.
        </p>
        <p className="animate-fade-up opacity-0 animate-delay-300 max-w-xl mx-auto text-sm text-zinc-400 dark:text-zinc-500 mb-10"
          style={{ animationFillMode: 'forwards' }}
        >
          Natural language access to global ARGO float data — no code, no complexity.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-up opacity-0 animate-delay-400 flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
          style={{ animationFillMode: 'forwards' }}
        >
          <a
            href="#"
            id="try-demo-btn"
            className="group inline-flex items-center gap-2 h-11 px-6 rounded-md bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-150 shadow-lg"
          >
            <PlayCircle className="w-4 h-4" />
            Try the Demo
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            id="github-btn"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-md border border-zinc-200 dark:border-zinc-700 text-black dark:text-white text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-150"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </div>

        {/* Terminal preview */}
        <div
          ref={termRef}
          className="transition-all duration-700 ease-out w-full max-w-2xl mx-auto"
        >
          <div className={`rounded-xl overflow-hidden border ${
            theme === 'dark'
              ? 'bg-zinc-950 border-zinc-800 shadow-vercel-dark-lg'
              : 'bg-zinc-50  border-zinc-200 shadow-vercel-lg'
          }`}>
            {/* Terminal top bar */}
            <div className={`flex items-center gap-1.5 px-4 py-3 border-b ${
              theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'
            }`}>
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-500 font-mono">floatchat ~ query</span>
            </div>
            {/* Terminal body */}
            <div className="p-4 text-left space-y-1.5">
              {terminalLines.map((line, i) => (
                <div
                  key={i}
                  className={`flex gap-2 text-xs font-mono ${line.color} animate-fade-in opacity-0`}
                  style={{ animationDelay: `${0.6 + i * 0.15}s`, animationFillMode: 'forwards' }}
                >
                  <span className="text-zinc-600 dark:text-zinc-600 select-none shrink-0">{line.prefix}</span>
                  <span>{line.text}</span>
                </div>
              ))}
              <div className="flex gap-2 text-xs font-mono text-zinc-500">
                <span className="text-zinc-600 dark:text-zinc-600 select-none">{'> '}</span>
                <span className="w-2 h-4 bg-blue-400 animate-pulse inline-block" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-600 animate-float">
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-zinc-400 dark:from-zinc-600 to-transparent" />
      </div>
    </section>
  )
}
