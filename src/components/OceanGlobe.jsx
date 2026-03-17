import { useEffect, useRef, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'

/* ─────────────────────────────────────────────────────────────
   Animated Ocean Globe  (Canvas-based, theme-aware)
   • wireframe sphere with lat/lon grid
   • animated ARGO float dots
   • slow rotation
   • works in both light and dark mode
───────────────────────────────────────────────────────────── */
export default function OceanGlobe() {
  const { theme } = useTheme()
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const tRef = useRef(0)
  const themeRef = useRef(theme)

  // Keep themeRef in sync so the draw loop always reads the latest value
  useEffect(() => { themeRef.current = theme }, [theme])

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

    // Float definitions: [lng, lat, size, speed, phase]
    // Colors are chosen per-frame based on theme
    const floatDefs = [
      [-140, 20,  2.5, 0.4,  0   ],
      [-60,  45,  2.0, 0.3,  1.2 ],
      [80,  -30,  3.0, 0.5,  2.4 ],
      [30,   60,  2.0, 0.35, 1.7 ],
      [120, -10,  2.5, 0.45, 4.2 ], // Vercel blue — kept across themes
      [-100,-40,  2.0, 0.4,  5.0 ],
      [200,  10,  2.5, 0.4,  1.5 ],
    ]

    const LAT_LINES = 7
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
      const isDark = themeRef.current === 'dark'

      // ── Theme-dependent colours ──
      const gridColor    = isDark ? '255,255,255' : '0,0,0'
      const ringColor    = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'
      const floatColors  = isDark
        ? ['#ffffff', '#a1a1aa', '#ffffff', '#a1a1aa', '#0070f3', '#a1a1aa', '#ffffff']
        : ['#18181b', '#71717a', '#18181b', '#71717a', '#0070f3', '#71717a', '#18181b']

      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      tRef.current = ts * 0.00025
      const rot = tRef.current * (180 / Math.PI)
      const cx = w / 2
      const cy = h / 2
      const radius = Math.min(w, h) * 0.45

      // Minimalist Grid helper
      const drawGreatCircle = (getPoint) => {
        const pts = []
        for (let i = 0; i <= SEGMENTS; i++) pts.push(getPoint(i / SEGMENTS * 360))
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
        const alpha = 0.10 + 0.07 * Math.abs(Math.cos(lat * Math.PI / 180))
        ctx.strokeStyle = `rgba(${gridColor}, ${alpha})`
        drawGreatCircle(lng => project(lng, lat, rot, radius, cx, cy))
      }

      // Longitude lines
      for (let i = 0; i < LON_LINES; i++) {
        const lng = i * 36
        ctx.strokeStyle = `rgba(${gridColor}, 0.13)`
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

      // Float dots
      const t = ts * 0.001
      floatDefs.forEach(([baseLng, baseLat, size, speed, phase], idx) => {
        const color = floatColors[idx]
        const orbitLng = baseLng + Math.sin(t * speed + phase) * 8
        const orbitLat = baseLat + Math.cos(t * speed * 0.7 + phase) * 4
        const p = project(orbitLng, orbitLat, rot, radius, cx, cy)
        if (p.z <= 0) return

        const depthFactor = Math.max(0.2, p.z / radius)
        const pulse = 0.8 + 0.2 * Math.sin(t * 1.5 + phase)

        // Glow
        const dotGrd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2.5)
        dotGrd.addColorStop(0, color + '80')
        dotGrd.addColorStop(1, color + '00')
        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 2.5 * pulse, 0, Math.PI * 2)
        ctx.fillStyle = dotGrd
        ctx.globalAlpha = depthFactor * 0.7
        ctx.fill()

        // Core
        ctx.globalAlpha = depthFactor
        ctx.beginPath()
        ctx.arc(p.x, p.y, size * pulse, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // Edge ring
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.strokeStyle = ringColor
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
