import {
  WaveQueryIcon, GlobeMapIcon, DepthProfileIcon,
  BrainRAGIcon, ExportIcon, ExtensibleIcon
} from './icons/CustomIcons'
import { useTheme } from '../context/ThemeContext'
import Card from './ui/Card'

const features = [
  {
    Icon: WaveQueryIcon,
    accentColor: '#0070f3',
    title: 'Natural Language Querying',
    desc: '"Show salinity profiles near the equator in March 2023" — just type what you want. No SQL, no API, no friction.',
    span: 'md:col-span-2',
  },
  {
    Icon: GlobeMapIcon,
    accentColor: '#10b981',
    title: 'Geospatial Dashboards',
    desc: 'Mapped float trajectories with interactive Plotly/Leaflet charts — pan, zoom, and explore the global ocean.',
    span: '',
  },
  {
    Icon: DepthProfileIcon,
    accentColor: '#7928ca',
    title: 'Profile Visualizations',
    desc: 'Depth-time plots, BGC parameter comparisons, and anomaly detection rendered on demand.',
    span: '',
  },
  {
    Icon: BrainRAGIcon,
    accentColor: '#f59e0b',
    title: 'MCP + RAG Pipeline',
    desc: 'LLM-backed query generation with retrieval-augmented context ensures precise, explainable results grounded in real data.',
    span: '',
  },
  {
    Icon: ExportIcon,
    accentColor: '#06b6d4',
    title: 'Multi-format Export',
    desc: 'Download results as NetCDF, CSV, or ASCII with one click. Your data, your format.',
    span: '',
  },
  {
    Icon: ExtensibleIcon,
    accentColor: '#ec4899',
    title: 'Extensible Architecture',
    desc: 'Ready to plug in gliders, buoys, BGC sensors, and satellite data sources out of the box.',
    span: 'md:col-span-2',
  },
]

export default function Features() {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="absolute inset-0 bg-zinc-50/70 dark:bg-zinc-950/40" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            <span className="w-4 h-px bg-zinc-300 dark:bg-zinc-600" />
            Key Features
            <span className="w-4 h-px bg-zinc-300 dark:bg-zinc-600" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1] text-black dark:text-white">
            Everything you need to{' '}
            <span className="text-zinc-400 dark:text-zinc-500">explore the ocean</span>
          </h2>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const isWide = f.span?.includes('col-span-2')
            return (
              <Card key={i} className={f.span}>
                <div className={`p-7 ${isWide ? 'flex items-start gap-7' : 'flex flex-col'}`}>
                  {/* Icon box */}
                  <div className={`${isWide ? 'shrink-0' : 'mb-5'}`}>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                        border: dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      <f.Icon />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[15px] font-bold text-black dark:text-white mb-2 tracking-tight">{f.title}</h3>
                    <p className="text-sm leading-[1.7] text-zinc-500 dark:text-zinc-400">{f.desc}</p>

                    {/* Hover-reveal accent link */}
                    <span
                      className="inline-flex items-center gap-1 mt-3 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: f.accentColor }}
                    >
                      Learn more →
                    </span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
