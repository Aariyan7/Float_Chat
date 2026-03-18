import { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowLeft, Send, Waves, Plus, MessageSquare, Trash2, X, ArrowRightLeft } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import OceanGlobe from './OceanGlobe'
import { sendFloatMessage } from '../utils/floatChatApi'
import Plot from 'react-plotly.js'
const STARTERS = [
  'What is an Argo Float?',
  'Show me how temperature varies from the year 2000 to 2026',
  'What salinity data is available for 2023?',
  'Why does temperature decrease with the  increase in depth?'
]

const SIDEBAR_MIN = 180
const SIDEBAR_MAX = 480
const SIDEBAR_DEFAULT = 256  // 16rem / w-64

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 max-w-[85%]">
      <div className="w-7 h-7 rounded-full bg-black dark:bg-white flex items-center justify-center shrink-0">
        <Waves className="w-3.5 h-3.5 text-white dark:text-black" strokeWidth={2.5} />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <span className="flex gap-1 items-center h-4">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:300ms]" />
        </span>
      </div>
    </div>
  )
}

function Message({ msg }) {
  const { theme } = useTheme()
  const isUser = msg.role === 'user'
  const [isSwapped, setIsSwapped] = useState(false)

  const plotX = isSwapped ? msg.graphData?.y : msg.graphData?.x;
  const plotY = isSwapped ? msg.graphData?.x : msg.graphData?.y;
  const plotXLabel = isSwapped ? msg.graphData?.yLabel : msg.graphData?.xLabel;
  const plotYLabel = isSwapped ? msg.graphData?.xLabel : msg.graphData?.yLabel;

  return (
    <div className={`flex items-end gap-2 w-full ${isUser ? 'flex-row-reverse' : 'flex-row'} ${msg.isGraph ? 'max-w-full sm:max-w-[95%] lg:max-w-[85%]' : 'max-w-[95%] sm:max-w-[85%] lg:max-w-[80%]'} ${isUser ? 'ml-auto' : 'mr-auto'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-black dark:bg-white flex items-center justify-center shrink-0 mb-0.5">
          <Waves className="w-3.5 h-3.5 text-white dark:text-black" strokeWidth={2.5} />
        </div>
      )}
      <div
        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-black dark:bg-white text-white dark:text-black rounded-br-sm'
            : msg.isGraph || msg.isScalar
              ? 'bg-transparent text-black dark:text-white w-full' 
              : 'bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white rounded-bl-sm'
        }`}
      >
        {msg.isGraph && msg.graphData ? (
          (!msg.graphData.x?.length || !msg.graphData.y?.length) ? (
            <div className="w-full max-w-2xl flex flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl mt-1 text-center shadow-sm">
              <div className="w-10 h-10 mb-3 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Waves className="w-5 h-5 text-zinc-400" />
              </div>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Data not available</p>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm">No matching records were found for this query. Please check your spelling or try different parameters.</p>
            </div>
          ) : (
          <div className="w-full flex flex-col gap-2">
            <div className="w-full max-w-2xl rounded-xl overflow-hidden bg-white dark:bg-zinc-950 mt-1 border border-zinc-200 dark:border-zinc-800 shadow-sm p-1 sm:p-2 relative">
              <button
                onClick={() => setIsSwapped(!isSwapped)}
                className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors shadow-sm"
                title="Swap X and Y axes"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
              <Plot
                data={[
                  {
                    x: plotX,
                    y: plotY,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: '#0ea5e9', size: 6 },
                    line: { shape: 'spline', smoothing: 1.3, width: 2.5 }
                  }
                ]}
                layout={{
                  title: {
                    text: 'Data Visualization',
                    font: { color: theme === 'dark' ? '#e4e4e7' : '#18181b', size: 14 }
                  },
                  xaxis: { 
                    title: { text: plotXLabel || '', font: { color: theme === 'dark' ? '#a1a1aa' : '#71717a', size: 12 } },
                    gridcolor: theme === 'dark' ? '#27272a' : '#f4f4f5',
                    zerolinecolor: theme === 'dark' ? '#3f3f46' : '#e4e4e7',
                    tickfont: { color: theme === 'dark' ? '#a1a1aa' : '#71717a' },
                    fixedrange: false // Allow zooming
                  },
                  yaxis: { 
                    title: { text: plotYLabel || '', font: { color: theme === 'dark' ? '#a1a1aa' : '#71717a', size: 12 } },
                    gridcolor: theme === 'dark' ? '#27272a' : '#f4f4f5',
                    zerolinecolor: theme === 'dark' ? '#3f3f46' : '#e4e4e7',
                    tickfont: { color: theme === 'dark' ? '#a1a1aa' : '#71717a' },
                    fixedrange: false // Allow zooming
                  },
                  margin: { t: 40, r: 15, b: 50, l: 50 },
                  autosize: true,
                  paper_bgcolor: 'transparent',
                  plot_bgcolor: 'transparent',
                  font: { family: 'inherit', color: theme === 'dark' ? '#e4e4e7' : '#18181b' },
                  dragmode: 'zoom'
                }}
                useResizeHandler={true}
                style={{ width: '100%', minHeight: '300px', height: '100%', maxHeight: '400px' }}
                config={{ 
                  displayModeBar: true, 
                  responsive: true,
                  displaylogo: false,
                  modeBarButtonsToRemove: ['lasso2d', 'select2d']
                }}
              />
            </div>
            {msg.dataDescription && (
              <div className="text-sm font-medium text-center text-zinc-700 dark:text-zinc-300">
                {msg.dataDescription}
              </div>
            )}
            {msg.explanation && (
              <div className="text-sm bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl leading-relaxed mt-1">
                {msg.explanation}
              </div>
            )}
          </div>
          )
        ) : msg.isScalar ? (
          msg.scalarValue === 'N/A' ? (
            <div className="w-full max-w-sm flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl mt-1 text-center shadow-sm">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Data unavailable for this query.
              </span>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-2">
               <div className="w-auto self-start flex items-center justify-center py-3 px-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                 <span className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight">
                   {msg.scalarValue}
                 </span>
               </div>
               {msg.dataDescription && (
                 <div className="text-sm font-medium text-left text-zinc-700 dark:text-zinc-300">
                   {msg.dataDescription}
                 </div>
               )}
               {msg.explanation && (
                 <div className="text-sm bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl leading-relaxed mt-1">
                   {msg.explanation}
                 </div>
               )}
            </div>
          )
        ) : (
          msg.content
        )}
      </div>
    </div>
  )
}

let convCounter = 1

export default function ChatInterface({ onBack }) {
  const { theme } = useTheme()
  const [conversations, setConversations] = useState([
    { id: 1, title: 'New conversation', messages: [] },
  ])
  const [activeId, setActiveId] = useState(1)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  // Desktop sidebar: open/closed + resizable width
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartWidth = useRef(SIDEBAR_DEFAULT)

  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false)

  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const activeConv = conversations.find(c => c.id === activeId)

  // Close mobile drawer at md breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = (e) => { if (e.matches) setDrawerOpen(false) }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConv?.messages, typing])

  // ── Drag-to-resize handlers ──
  const onDragStart = useCallback((e) => {
    e.preventDefault()
    isDragging.current = true
    dragStartX.current = e.clientX
    dragStartWidth.current = sidebarWidth
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [sidebarWidth])

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging.current) return
      const delta = e.clientX - dragStartX.current
      const newWidth = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, dragStartWidth.current + delta))
      setSidebarWidth(newWidth)
    }
    const onMouseUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  const sendMessage = (text) => {
    const content = (text ?? input).trim()
    if (!content) return
    setInput('')

    const userMsg = { role: 'user', content }
    setConversations(prev =>
      prev.map(c =>
        c.id === activeId
          ? {
              ...c,
              title: c.messages.length === 0 ? content.slice(0, 40) : c.title,
              messages: [...c.messages, userMsg],
            }
          : c
      )
    )

    setTyping(true)

    sendFloatMessage(content)
      .then(({ payload }) => {
        setConversations(prev =>
          prev.map(c =>
            c.id === activeId ? { ...c, messages: [...c.messages, { role: 'assistant', ...payload }] } : c
          )
        )
      })
      .catch((err) => {
        setConversations(prev =>
          prev.map(c =>
            c.id === activeId ? { ...c, messages: [...c.messages, { role: 'assistant', content: 'Something went wrong.' }] } : c
          )
        )
      })
      .finally(() => {
        setTyping(false)
      })

    inputRef.current?.focus()
  }

  const newConversation = () => {
    convCounter++
    const id = convCounter
    setConversations(prev => [{ id, title: 'New conversation', messages: [] }, ...prev])
    setActiveId(id)
    setDrawerOpen(false)
  }

  const deleteConversation = (id, e) => {
    e.stopPropagation()
    setConversations(prev => {
      const next = prev.filter(c => c.id !== id)
      if (next.length === 0) {
        convCounter++
        const fresh = { id: convCounter, title: 'New conversation', messages: [] }
        setActiveId(fresh.id)
        return [fresh]
      }
      if (id === activeId) setActiveId(next[0].id)
      return next
    })
  }

  // Shared inner content for both mobile drawer + desktop sidebar
  const SidebarContent = ({ onClose }) => (
    <>
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-zinc-100 dark:border-zinc-900 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
            <Waves className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-sm tracking-tight truncate">FloatChat</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={newConversation}
            className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
            title="New chat"
          >
            <Plus className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {conversations.map(c => (
          <button
            key={c.id}
            onClick={() => { setActiveId(c.id); setDrawerOpen(false) }}
            className={`group w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-all duration-150 ${
              c.id === activeId
                ? 'bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white'
                : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-950 hover:text-black dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-60" />
            <span className="text-xs font-medium truncate flex-1">{c.title}</span>
            <span
              onClick={(e) => deleteConversation(c.id, e)}
              className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:text-red-500 transition-all shrink-0"
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </span>
          </button>
        ))}
      </div>

      {/* Back to home */}
      <div className="p-3 border-t border-zinc-100 dark:border-zinc-900 shrink-0">
        <button
          onClick={onBack}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </button>
      </div>
    </>
  )

  return (
    <div className="h-screen flex bg-white dark:bg-black text-black dark:text-white overflow-hidden">

      {/* ── Mobile overlay backdrop ── */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ── */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-40 w-72 flex flex-col bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800 transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent onClose={() => setDrawerOpen(false)} />
      </div>

      {/* ── Desktop Sidebar (resizable) ── */}
      {sidebarOpen && (
        <aside
          className="hidden md:flex flex-col shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black relative overflow-hidden"
          style={{ width: sidebarWidth }}
        >
          <SidebarContent />

          {/* Drag handle */}
          <div
            onMouseDown={onDragStart}
            className="absolute top-0 right-0 bottom-0 w-1 cursor-col-resize group z-10 flex items-center justify-center"
            title="Drag to resize"
          >
            {/* Visible handle strip — glows on hover/drag */}
            <div className="w-px h-full bg-zinc-200 dark:bg-zinc-800 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-600 transition-colors duration-150" />
            {/* Wider invisible hit zone */}
            <div className="absolute inset-y-0 -left-1 -right-1" />
          </div>
        </aside>
      )}

      {/* ── Main chat area ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="h-14 flex items-center gap-3 px-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          {/* Hamburger — opens drawer on mobile, toggles sidebar on desktop */}
          <button
            onClick={() => {
              if (window.innerWidth < 768) setDrawerOpen(o => !o)
              else setSidebarOpen(o => !o)
            }}
            className="w-8 h-8 rounded-md flex items-center justify-center text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
            aria-label="Toggle sidebar"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="3" width="14" height="1" rx="0.5"/>
              <rect x="1" y="7.5" width="14" height="1" rx="0.5"/>
              <rect x="1" y="12" width="14" height="1" rx="0.5"/>
            </svg>
          </button>

          <span className="text-sm font-medium truncate text-zinc-700 dark:text-zinc-300">
            {activeConv?.title || 'New conversation'}
          </span>

          <a
            href="https://float-chat-dashboard.streamlit.app/"
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex items-center h-8 px-3 text-sm font-medium rounded-md border border-zinc-200 dark:border-zinc-700 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-150"
          >
            View Dashboard
          </a>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-4">
          {activeConv?.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 sm:gap-6 select-none px-4">
              <div className="w-36 h-36 sm:w-56 sm:h-56 opacity-80">
                <OceanGlobe />
              </div>
              <div className="text-center">
                <h2 className="text-base sm:text-lg font-semibold mb-1">Ask FloatChat anything</h2>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-xs">
                  Query global ARGO oceanographic data using natural language.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {STARTERS.map(s => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-left text-xs text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 transition-all duration-150 hover:bg-zinc-50 dark:hover:bg-zinc-950 line-clamp-2"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {activeConv.messages.map((msg, i) => (
                <Message key={i} msg={msg} />
              ))}
              {typing && <TypingIndicator />}
              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* Input bar */}
        <div className="shrink-0 px-3 sm:px-8 pb-4 sm:pb-5 pt-3 border-t border-zinc-100 dark:border-zinc-900">
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage() }}
            className="flex items-end gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 sm:px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-black/10 dark:focus-within:ring-white/10 focus-within:border-zinc-400 dark:focus-within:border-zinc-600 transition-all"
          >
            <textarea
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
              }}
              placeholder="Ask about ARGO float data…"
              rows={1}
              className="flex-1 bg-transparent text-sm text-black dark:text-white placeholder-zinc-400 resize-none focus:outline-none min-h-[24px] max-h-32 leading-6"
              style={{ overflowY: 'auto' }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:opacity-80 disabled:opacity-30 transition-all shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
