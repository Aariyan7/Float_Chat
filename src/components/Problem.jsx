import { OceanLockIcon, NetCDFIcon } from './icons/CustomIcons'
import { useTheme } from '../context/ThemeContext'
import Card from './ui/Card'

const problems = [
  {
    Icon: NetCDFIcon,
    accentColor: '#f59e0b',
    label: '01',
    title: 'Trapped in Complex Formats',
    desc: 'Millions of ARGO float profiles are locked in NetCDF binary formats. Without specialized tooling and domain expertise, this data is invisible to 99% of people who need it.',
    stat: { value: '3.9M+', label: 'float profiles in ARGO global dataset' },
  },
  {
    Icon: OceanLockIcon,
    accentColor: '#ef4444',
    label: '02',
    title: 'Steep Barriers to Insight',
    desc: 'Meaningful insights are buried under domain expertise, custom Python scripts, and steep learning curves — excluding researchers, students, and policymakers who need the data most.',
    stat: { value: '~8 years', label: 'average time to become a data-fluent oceanographer' },
  },
]

export default function Problem() {
  const { theme } = useTheme()

  return (
    <section id="problem" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-1.5 mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            <span className="w-4 h-px bg-zinc-300 dark:bg-zinc-600" />
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.1] text-black dark:text-white">
            Ocean Data Shouldn&apos;t{' '}
            <span className="text-zinc-400 dark:text-zinc-500">Require a PhD</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problems.map((p, i) => (
            <Card key={i}>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <p.Icon />
                  <span className={`text-xs font-mono font-bold px-2 py-1 rounded-md ${
                    theme === 'dark' ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-100 text-zinc-400'
                  }`}>{p.label}</span>
                </div>

                <h3 className="text-[17px] font-bold text-black dark:text-white mb-3 tracking-tight">{p.title}</h3>
                <p className="text-sm leading-[1.7] text-zinc-500 dark:text-zinc-400 mb-8">{p.desc}</p>

                <div className={`pt-5 border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-100'}`}>
                  <p className="text-2xl font-black tracking-tight" style={{ color: p.accentColor }}>{p.stat.value}</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{p.stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
