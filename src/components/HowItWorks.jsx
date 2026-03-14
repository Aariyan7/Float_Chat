import { IngestIcon, AskIcon, ExploreIcon } from './icons/CustomIcons'
import { useTheme } from '../context/ThemeContext'
import Card from './ui/Card'

const steps = [
  {
    Icon: IngestIcon,
    accentColor: '#f97316',
    number: '01',
    title: 'Ingest',
    desc: 'ARGO NetCDF files are processed, normalized, and indexed across a PostgreSQL relational database and a FAISS vector store for semantic retrieval.',
    tags: ['NetCDF4', 'PostgreSQL', 'FAISS'],
    detail: '3.9M float profiles ingested',
  },
  {
    Icon: AskIcon,
    accentColor: '#0070f3',
    number: '02',
    title: 'Ask',
    desc: 'Your natural language query is embedded and routed through an LLM + RAG pipeline that maps your intent to precise SQL — no code required.',
    tags: ['LLaMA', 'Mistral', 'RAG', 'SQL'],
    detail: '<200ms query translation',
  },
  {
    Icon: ExploreIcon,
    accentColor: '#10b981',
    number: '03',
    title: 'Explore',
    desc: 'Interactive geospatial maps, depth-time profiles, and BGC comparisons are rendered instantly. Download results in NetCDF, CSV, or ASCII.',
    tags: ['Plotly', 'Leaflet', 'CSV', 'NetCDF'],
    detail: 'Real-time interactive charts',
  },
]

export default function HowItWorks() {
  const { theme } = useTheme()

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            <span className="w-4 h-px bg-zinc-300 dark:bg-zinc-600" />
            How It Works
            <span className="w-4 h-px bg-zinc-300 dark:bg-zinc-600" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1] text-black dark:text-white">
            From NetCDF to Insight{' '}
            <span className="text-zinc-400 dark:text-zinc-500">in 3 Steps</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <Card>
                <div className="p-7 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <step.Icon />
                    <span className={`text-5xl font-black tabular-nums leading-none select-none ${
                      theme === 'dark' ? 'text-zinc-800' : 'text-zinc-100'
                    }`}>
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-[17px] font-bold text-black dark:text-white mb-2.5 tracking-tight">{step.title}</h3>
                  <p className="text-sm leading-[1.7] text-zinc-500 dark:text-zinc-400 mb-5 flex-1">{step.desc}</p>

                  <div
                    className="text-xs font-semibold mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800"
                    style={{ color: step.accentColor }}
                  >
                    ✦ {step.detail}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {step.tags.map(tag => (
                      <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        theme === 'dark'
                          ? 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                          : 'bg-zinc-100 text-zinc-500 border border-zinc-200'
                      }`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Arrow connector (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12">
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                    <path d="M0 6h20M16 2l6 4-6 4" stroke={theme === 'dark' ? '#333' : '#d4d4d8'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
