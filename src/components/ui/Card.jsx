/**
 * Vercel-accurate card component.
 *
 * Hover behaviour — strictly monochromatic, exactly like vercel.com:
 *  • Dark:  border brightens from rgba(255,255,255,0.08) → rgba(255,255,255,0.18)
 *           + a faint white radial glow at the top of the card
 *  • Light: border darkens from rgba(0,0,0,0.07) → rgba(0,0,0,0.15)
 *           + a faint black radial shadow at the top of the card
 *
 * No colour gradients on the border — the accent colour lives only inside the card
 * (icons, stat numbers, tags).
 */

import { useTheme } from '../../context/ThemeContext'

export default function Card({ children, className = '' }) {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  return (
    <div
      className={`group relative rounded-xl transition-all duration-300 cursor-default ${className}`}
      style={{
        background: dark ? '#0a0a0a' : '#ffffff',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
        boxShadow: dark
          ? '0 0 0 0 transparent'
          : '0 1px 3px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.border = `1px solid ${dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.14)'}`
        e.currentTarget.style.boxShadow = dark
          ? '0 0 0 1px rgba(255,255,255,0.06), 0 8px 30px rgba(0,0,0,0.5)'
          : '0 0 0 1px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`
        e.currentTarget.style.boxShadow = dark
          ? '0 0 0 0 transparent'
          : '0 1px 3px rgba(0,0,0,0.04)'
      }}
    >
      {/* Vercel inner radial spot — top-centre, very faint */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: dark
            ? 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 100%)'
            : 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,0,0,0.025) 0%, transparent 100%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
