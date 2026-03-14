import { ChatBubbleAIIcon, RAGPipelineIcon } from './icons/CustomIcons'
import { useTheme } from '../context/ThemeContext'
import Card from './ui/Card'

const solutions = [
  {
    Icon: ChatBubbleAIIcon,
    label: 'Natural Language',
    title: 'Ask Plain Questions, Get Instant Answers',
    desc: 'FloatChat translates your natural language questions directly into precise database queries — returning interactive visualizations in seconds.',
    code: '"Show salinity profiles near the equator in March 2023"',
    codeResult: '→ 142 float profiles found, map rendered',
    resultColor: '#10b981',
  },
  {
    Icon: RAGPipelineIcon,
    label: 'RAG + LLM',
    title: 'Powered by a Grounded AI Pipeline',
    desc: 'Built on retrieval-augmented generation with vector search over real ARGO datasets — every answer is explainable, accurate, and grounded in real data.',
    code: 'query → embed → retrieve → LLM → SQL → result',
    codeResult: 'MCP + RAG pipeline',
    resultColor: '#7928ca',
  },
]

export default function Solution() {
  const { theme } = useTheme()

  return (
    <section id="solution" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="absolute inset-0 bg-zinc-50/70 dark:bg-zinc-950/40" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-1.5 mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            <span className="w-4 h-px bg-zinc-300 dark:bg-zinc-600" />
            The Solution
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1] text-black dark:text-white">
            One Chatbot.{' '}
            <span className="gradient-text-blue">All the Ocean Data.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {solutions.map((s, i) => (
            <Card key={i}>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <s.Icon />
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    theme === 'dark'
                      ? 'border-zinc-700 text-zinc-400 bg-zinc-800'
                      : 'border-zinc-200 text-zinc-500 bg-zinc-100'
                  }`}>{s.label}</span>
                </div>

                <h3 className="text-[17px] font-bold text-black dark:text-white mb-3 tracking-tight">{s.title}</h3>
                <p className="text-sm leading-[1.7] text-zinc-500 dark:text-zinc-400 mb-6">{s.desc}</p>

                <div className={`rounded-lg p-3 font-mono ${
                  theme === 'dark'
                    ? 'bg-zinc-800/80 border border-zinc-700'
                    : 'bg-zinc-100 border border-zinc-200'
                }`}>
                  <p className="text-xs" style={{ color: theme === 'dark' ? '#e4e4e7' : '#3f3f46' }}>{s.code}</p>
                  <p className="text-xs mt-1" style={{ color: s.resultColor }}>{s.codeResult}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
