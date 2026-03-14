import { ResearcherIcon, PolicyIcon, StudentIcon } from './icons/CustomIcons'
import { useTheme } from '../context/ThemeContext'
import Card from './ui/Card'

const cases = [
  {
    Icon: ResearcherIcon,
    accentColor: '#0070f3',
    tag: 'Researchers',
    title: 'Rapid Data Exploration',
    desc: 'Compute statistics, compare cross-basin salinity and temperature profiles, and generate publication-ready visualizations — without writing a single query.',
    bullets: ['Cross-basin comparisons in seconds', 'BGC parameter anomaly detection', 'Citation-ready chart exports'],
    quote: '"Reduced my ARGO workflow from days to minutes."',
  },
  {
    Icon: PolicyIcon,
    accentColor: '#10b981',
    tag: 'Policy Makers',
    title: 'Climate & Ocean Insights',
    desc: 'Get visual, plain-language summaries of climate trends and ocean health indicators — no domain expertise, no technical setup required.',
    bullets: ['Temperature trend maps by region', 'Sea level anomaly context', 'Health indicator dashboards'],
    quote: '"I finally understand what the data actually says."',
  },
  {
    Icon: StudentIcon,
    accentColor: '#7928ca',
    tag: 'Students',
    title: 'Interactive Discovery',
    desc: 'Learn oceanography by exploring real ARGO data interactively — ask questions, see results, understand how temperature, salinity, and biology interact.',
    bullets: ['Guided depth profile tours', 'Comparative learning exercises', 'Zero-setup, browser-native'],
    quote: '"The best way to learn is to actually explore."',
  },
]

export default function UseCases() {
  const { theme } = useTheme()

  return (
    <section id="use-cases" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            <span className="w-4 h-px bg-zinc-300 dark:bg-zinc-600" />
            Use Cases
            <span className="w-4 h-px bg-zinc-300 dark:bg-zinc-600" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1] text-black dark:text-white">
            Built for everyone{' '}
            <span className="text-zinc-400 dark:text-zinc-500">curious about the ocean</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <Card key={i}>
              <div className="p-7 flex flex-col h-full">
                {/* Tag + Icon row */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      color: c.accentColor,
                      background: `${c.accentColor}14`,
                      border: `1px solid ${c.accentColor}28`,
                    }}
                  >
                    {c.tag}
                  </span>
                  <c.Icon />
                </div>

                <h3 className="text-[17px] font-bold text-black dark:text-white mb-3 tracking-tight">{c.title}</h3>
                <p className="text-sm leading-[1.7] text-zinc-500 dark:text-zinc-400 mb-5">{c.desc}</p>

                {/* Bullets */}
                <ul className="space-y-2 mb-6 flex-1">
                  {c.bullets.map((b, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-zinc-500 dark:text-zinc-400">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6" stroke={c.accentColor} strokeWidth="1.2" strokeOpacity="0.35" />
                        <path d="M4.5 7l2 2 3-3" stroke={c.accentColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Quote */}
                <div className={`pt-5 border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-100'}`}>
                  <p className="text-xs italic text-zinc-400 dark:text-zinc-500 leading-relaxed">{c.quote}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
