import { useState, useEffect, useRef, useCallback } from 'react'
import { Waves, Eye, EyeOff, ArrowLeft, Github, Mail, Lock, User, ChevronRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

/* ─────────────────────────────────────────────────────────────
   Animated Ocean Globe  (Canvas-based)
   • wireframe sphere with lat/lon grid
   • animated ARGO float dots glowing in blue/cyan
   • slow rotation + tilt
   • radial gradient glow beneath
───────────────────────────────────────────────────────────── */
function OceanGlobe() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const tRef = useRef(0)

  const project = useCallback((lng, lat, rot, radius, cx, cy) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + rot) * (Math.PI / 180)
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)
    return { x: cx + x, y: cy - y, z }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Minimal ARGO floats: [lng, lat, size, speed, phase, color]
    // Using mostly white/zinc and a single blue accent for Vercel minimalist vibe
    const floats = [
      [-140, 20, 2.5, 0.4, 0, '#ffffff'],
      [-60, 45, 2.0, 0.3, 1.2, '#a1a1aa'], // zinc-400
      [80, -30, 3.0, 0.5, 2.4, '#ffffff'],
      [30, 60, 2.0, 0.35, 1.7, '#a1a1aa'],
      [120, -10, 2.5, 0.45, 4.2, '#0070f3'], // Vercel blue accent
      [-100, -40, 2.0, 0.4, 5.0, '#a1a1aa'],
      [200, 10, 2.5, 0.4, 1.5, '#ffffff'],
    ]

    const LAT_LINES = 7          // fewer lines for simpler look
    const LON_LINES = 10
    const SEGMENTS = 60

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = (ts) => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      tRef.current = ts * 0.00025         // slower rotation
      const rot = tRef.current * (180 / Math.PI)
      const cx = w / 2
      const cy = h / 2
      const radius = Math.min(w, h) * 0.45 // Made larger (from 0.36 to 0.45)

      // ── Very subtle radial glow beneath globe ──
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.5)
      grd.addColorStop(0, 'rgba(255, 255, 255, 0.03)') // subtle white instead of blue
      grd.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)')
      grd.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()

      // ── Minimalist Grid ──
      const drawGreatCircle = (getPoint) => {
        const pts = []
        for (let i = 0; i <= SEGMENTS; i++) {
          pts.push(getPoint(i / SEGMENTS * 360))
        }
        let drawing = false
        ctx.beginPath()
        for (const p of pts) {
          if (p.z < 0) { drawing = false; continue }
          if (!drawing) { ctx.moveTo(p.x, p.y); drawing = true }
          else ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
      }

      // Latitude lines
      ctx.lineWidth = 1.0
      for (let i = 0; i < LAT_LINES; i++) {
        const lat = -75 + i * 25
        const alpha = 0.08 + 0.06 * Math.abs(Math.cos(lat * Math.PI / 180))
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})` // Vercel faint white
        drawGreatCircle(lng => project(lng, lat, rot, radius, cx, cy))
      }

      // Longitude lines
      for (let i = 0; i < LON_LINES; i++) {
        const lng = i * 36
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)' // Vercel faint white
        ctx.lineWidth = 1.0

        const pts = []
        for (let j = 0; j <= SEGMENTS; j++) {
          const lat = -90 + j * (180 / SEGMENTS)
          pts.push(project(lng, lat, rot, radius, cx, cy))
        }
        ctx.beginPath()
        let drawing = false
        for (const p of pts) {
          if (p.z < 0) { drawing = false; continue }
          if (!drawing) { ctx.moveTo(p.x, p.y); drawing = true }
          else ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()
      }

      // ── Float dots ──
      const t = ts * 0.001
      for (const f of floats) {
        const [baseLng, baseLat, size, speed, phase, color] = f
        const orbitLng = baseLng + Math.sin(t * speed + phase) * 8
        const orbitLat = baseLat + Math.cos(t * speed * 0.7 + phase) * 4
        const p = project(orbitLng, orbitLat, rot, radius, cx, cy)
        if (p.z <= 0) continue

        const depthFactor = Math.max(0.2, p.z / radius)
        const pulse = 0.8 + 0.2 * Math.sin(t * 1.5 + phase) // subtler pulse

        // Soft outer glow
        const dotGrd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2.5)
        dotGrd.addColorStop(0, color + '80')
        dotGrd.addColorStop(1, color + '00')
        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 2.5 * pulse, 0, Math.PI * 2)
        ctx.fillStyle = dotGrd
        ctx.globalAlpha = depthFactor * 0.7
        ctx.fill()

        // Core dot
        ctx.globalAlpha = depthFactor
        ctx.beginPath()
        ctx.arc(p.x, p.y, size * pulse, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // ── Simple edge ring (no gradient fill, just thin rim) ──
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.lineWidth = 1
      ctx.stroke()

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [project])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  )
}

/* ─────────────────────────────────────────────────────────────
   Floating label input component
───────────────────────────────────────────────────────────── */
function InputField({ id, label, type = 'text', value, onChange, icon: Icon, autoComplete }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (show ? 'text' : 'password') : type

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
        <Icon className="w-4 h-4" />
      </div>
      <input
        id={id}
        type={inputType}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder=" "
        className="peer w-full h-11 pl-9 pr-10 pt-3 pb-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-black dark:text-white text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-150"
      />
      <label
        htmlFor={id}
        className="absolute left-9 top-1/2 -translate-y-1/2 text-xs text-zinc-400 pointer-events-none transition-all duration-150 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:text-blue-500 peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[10px]"
      >
        {label}
      </label>
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          tabIndex={-1}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Sign In Form
───────────────────────────────────────────────────────────── */
function SignInForm({ onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <InputField id="signin-email" label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} icon={Mail} autoComplete="email" />
      <InputField id="signin-password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} icon={Lock} autoComplete="current-password" />

      <div className="flex justify-end">
        <button type="button" className="text-xs text-zinc-400 hover:text-blue-500 transition-colors">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || done}
        className="w-full h-11 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 disabled:opacity-60 transition-all duration-150 flex items-center justify-center gap-2 shadow-lg"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
        ) : done ? (
          <span className="text-emerald-400 dark:text-emerald-600">✓ Signed in</span>
        ) : (
          <>Continue <ChevronRight className="w-4 h-4" /></>
        )}
      </button>

      <p className="text-center text-xs text-zinc-400 pt-2">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-blue-500 hover:underline font-medium">
          Sign up
        </button>
      </p>
    </form>
  )
}

/* ─────────────────────────────────────────────────────────────
   Sign Up Form
───────────────────────────────────────────────────────────── */
function SignUpForm({ onSwitch }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <InputField id="signup-name" label="Full name" type="text" value={name} onChange={e => setName(e.target.value)} icon={User} autoComplete="name" />
      <InputField id="signup-email" label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} icon={Mail} autoComplete="email" />
      <InputField id="signup-password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} icon={Lock} autoComplete="new-password" />
      <InputField id="signup-confirm" label="Confirm password" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} icon={Lock} autoComplete="new-password" />

      <button
        type="submit"
        disabled={loading || done}
        className="w-full h-11 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 disabled:opacity-60 transition-all duration-150 flex items-center justify-center gap-2 shadow-lg"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
        ) : done ? (
          <span className="text-emerald-400 dark:text-emerald-600">✓ Account created!</span>
        ) : (
          <>Create Account <ChevronRight className="w-4 h-4" /></>
        )}
      </button>

      <p className="text-center text-xs text-zinc-400 pt-2">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-blue-500 hover:underline font-medium">
          Sign in
        </button>
      </p>
    </form>
  )
}

/* ─────────────────────────────────────────────────────────────
   Main LoginPage
───────────────────────────────────────────────────────────── */
export default function LoginPage({ onBack }) {
  const { theme, toggleTheme } = useTheme()
  const [tab, setTab] = useState('signin')   // 'signin' | 'signup'

  // Animate in
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t) }, [])

  const isSignIn = tab === 'signin'

  return (
    <div className={`min-h-screen flex bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>

      {/* ── LEFT PANEL: Ocean Globe ────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black flex-col items-center justify-center" style={{ minHeight: '100vh' }}>

        {/* Grid background */}
        <div className="absolute inset-0 hero-grid opacity-60" />

        {/* Top-left glow */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px] pointer-events-none" />

        {/* Globe canvas */}
        <div className="relative w-full flex-1 flex flex-col items-center justify-center px-12 pt-16">
          <div className="w-full" style={{ aspectRatio: '1 / 1', maxWidth: '600px', maxHeight: '600px' }}>
            <OceanGlobe />
          </div>

          {/* Brand text */}
          <div className="mt-4 text-center space-y-3 animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="flex items-center justify-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/40">
                <Waves className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">FloatChat</span>
            </div>
            <p className="text-zinc-400 text-sm max-w-[280px] leading-relaxed">
              Conversational AI for global ARGO oceanographic data — explore the deep with natural language.
            </p>

            {/* Live stats row */}
            <div className="flex items-center justify-center gap-6 pt-2">
              {[
                { label: 'ARGO Floats', value: '4,000+' },
                { label: 'Data Points', value: '3.5B' },
                { label: 'Ocean Depth', value: '2000m' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-white text-sm font-semibold">{value}</div>
                  <div className="text-zinc-500 text-[10px] uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom attribution */}
        <div className="pb-6 text-zinc-600 text-xs">
          Powered by ARGO Global Float Program
        </div>

        {/* Vertical separator */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />
      </div>

      {/* ── RIGHT PANEL: Auth Form ─────────────────────── */}
      <div className="w-full lg:w-1/2 flex flex-col">

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-black dark:hover:text-white transition-colors duration-150 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
            Back
          </button>

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Waves className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-sm tracking-tight">FloatChat</span>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-md flex items-center justify-center text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all duration-150 text-xs"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀' : '🌙'}
          </button>
        </div>

        {/* Form area — visually shifted up to align with globe on desktop, centered on mobile */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:py-0 lg:pb-40">
          <div className="w-full max-w-[380px]">

            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight mb-1">
                {isSignIn ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="text-sm text-zinc-500">
                {isSignIn
                  ? 'Sign in to explore oceanographic data.'
                  : 'Join FloatChat and query the ocean in seconds.'}
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-1 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-8">
              {[
                { key: 'signin', label: 'Sign In' },
                { key: 'signup', label: 'Sign Up' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`flex-1 h-8 rounded-md text-sm font-medium transition-all duration-200 ${tab === key
                      ? 'bg-white dark:bg-zinc-950 text-black dark:text-white shadow-sm border border-zinc-200 dark:border-zinc-800'
                      : 'text-zinc-500 hover:text-black dark:hover:text-white'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Form (animated swap) */}
            <div className="relative min-h-[300px]">
              <div
                key={tab}
                className="absolute inset-0 animate-fade-up opacity-0"
                style={{ animationFillMode: 'forwards', animationDuration: '0.25s' }}
              >
                {isSignIn
                  ? <SignInForm onSwitch={() => setTab('signup')} />
                  : <SignUpForm onSwitch={() => setTab('signin')} />
                }
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-zinc-400">
            By continuing, you agree to FloatChat's{' '}
            <a href="#" className="underline hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">Terms</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
