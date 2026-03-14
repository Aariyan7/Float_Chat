import { useTheme } from '../context/ThemeContext'

const techStack = [
  { name: 'Python',          color: 'text-yellow-500',  bg: 'bg-yellow-500/10',  border: 'border-yellow-500/20' },
  { name: 'PostgreSQL',      color: 'text-blue-400',    bg: 'bg-blue-400/10',    border: 'border-blue-400/20' },
  { name: 'FAISS',           color: 'text-violet-400',  bg: 'bg-violet-400/10',  border: 'border-violet-400/20' },
  { name: 'ChromaDB',        color: 'text-orange-400',  bg: 'bg-orange-400/10',  border: 'border-orange-400/20' },
  { name: 'LLaMA',           color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
  { name: 'Mistral',         color: 'text-cyan-400',    bg: 'bg-cyan-400/10',    border: 'border-cyan-400/20' },
  { name: 'QWEN',            color: 'text-pink-400',    bg: 'bg-pink-400/10',    border: 'border-pink-400/20' },
  { name: 'Streamlit',       color: 'text-red-400',     bg: 'bg-red-400/10',     border: 'border-red-400/20' },
  { name: 'Plotly',          color: 'text-indigo-400',  bg: 'bg-indigo-400/10',  border: 'border-indigo-400/20' },
  { name: 'Leaflet',         color: 'text-green-500',   bg: 'bg-green-500/10',   border: 'border-green-500/20' },
  { name: 'NetCDF4',         color: 'text-amber-400',   bg: 'bg-amber-400/10',   border: 'border-amber-400/20' },
]

export default function TechStack() {
  const { theme } = useTheme()

  return (
    <section id="tech-stack" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            <span className="w-4 h-px bg-zinc-300 dark:bg-zinc-600" />
            Tech Stack
            <span className="w-4 h-px bg-zinc-300 dark:bg-zinc-600" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-black dark:text-white">
            Built on a{' '}
            <span className="text-zinc-400 dark:text-zinc-500">proven stack</span>
          </h2>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500 max-w-md mx-auto">
            Open-source technologies chosen for performance, reproducibility, and extensibility.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5">
          {techStack.map((tech, i) => (
            <div
              key={i}
              className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 cursor-default ${tech.bg} ${tech.border} ${
                theme === 'dark'
                  ? 'border-opacity-30 hover:border-opacity-60'
                  : 'border-opacity-40 hover:border-opacity-80'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${tech.color.replace('text-', 'bg-')}`} />
              <span className={`${tech.color}`}>{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Decorative divider */}
        <div className="mt-20 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-zinc-200 dark:to-zinc-800" />
          <span className="text-xs text-zinc-400 dark:text-zinc-600 font-medium tracking-wider uppercase">Open Source · Reproducible · Extensible</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-zinc-200 dark:to-zinc-800" />
        </div>
      </div>
    </section>
  )
}
