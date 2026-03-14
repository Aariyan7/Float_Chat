// Custom hand-crafted SVG icons with gradient fills — unique to FloatChat

export const OceanLockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lock-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f59e0b" />
        <stop offset="1" stopColor="#ef4444" />
      </linearGradient>
    </defs>
    <rect x="5" y="12" width="18" height="13" rx="3" stroke="url(#lock-grad)" strokeWidth="1.75" />
    <path d="M9 12V8.5a5 5 0 0 1 10 0V12" stroke="url(#lock-grad)" strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="14" cy="18.5" r="2" fill="url(#lock-grad)" />
    <path d="M14 18.5v2.5" stroke="url(#lock-grad)" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
)

export const NetCDFIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ncdf-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f97316" />
        <stop offset="1" stopColor="#eab308" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="20" height="20" rx="4" stroke="url(#ncdf-grad)" strokeWidth="1.75" />
    <path d="M9 10h10M9 14h6M9 18h8" stroke="url(#ncdf-grad)" strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="21" cy="21" r="5" fill="#0f0f0f" stroke="url(#ncdf-grad)" strokeWidth="1.5" />
    <path d="M21 18.5v2.5l1.5 1.5" stroke="url(#ncdf-grad)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ChatBubbleAIIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="chat-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0070f3" />
        <stop offset="1" stopColor="#50e3c2" />
      </linearGradient>
    </defs>
    <path d="M4 8a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-3l-4 4v-4H8a4 4 0 0 1-4-4V8z"
      stroke="url(#chat-grad)" strokeWidth="1.75" />
    <circle cx="10" cy="12" r="1.25" fill="url(#chat-grad)" />
    <circle cx="14" cy="12" r="1.25" fill="url(#chat-grad)" />
    <circle cx="18" cy="12" r="1.25" fill="url(#chat-grad)" />
  </svg>
)

export const RAGPipelineIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rag-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7928ca" />
        <stop offset="1" stopColor="#0070f3" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="9" height="9" rx="2.5" stroke="url(#rag-grad)" strokeWidth="1.75" />
    <rect x="16" y="3" width="9" height="9" rx="2.5" stroke="url(#rag-grad)" strokeWidth="1.75" />
    <rect x="9.5" y="16" width="9" height="9" rx="2.5" stroke="url(#rag-grad)" strokeWidth="1.75" />
    <path d="M12 7.5h4M7.5 12v2.5M20.5 12v2.5M7.5 17.5l6.5-2M20.5 17.5l-6.5-2" stroke="url(#rag-grad)" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
)

export const IngestIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ingest-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f97316" />
        <stop offset="1" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <path d="M14 4v14M9 14l5 5 5-5" stroke="url(#ingest-grad)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 22h16" stroke="url(#ingest-grad)" strokeWidth="1.75" strokeLinecap="round" />
    <rect x="3" y="6" width="5" height="5" rx="1.5" stroke="url(#ingest-grad)" strokeWidth="1.5" />
    <rect x="20" y="6" width="5" height="5" rx="1.5" stroke="url(#ingest-grad)" strokeWidth="1.5" />
  </svg>
)

export const AskIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ask-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0070f3" />
        <stop offset="1" stopColor="#7928ca" />
      </linearGradient>
    </defs>
    <circle cx="14" cy="14" r="10" stroke="url(#ask-grad)" strokeWidth="1.75" />
    <path d="M10.5 11a3.5 3.5 0 0 1 7 0c0 2-2 2.5-3.5 4" stroke="url(#ask-grad)" strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="14" cy="19.5" r="1.25" fill="url(#ask-grad)" />
  </svg>
)

export const ExploreIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="explore-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10b981" />
        <stop offset="1" stopColor="#0070f3" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="22" height="22" rx="4" stroke="url(#explore-grad)" strokeWidth="1.75" />
    <path d="M3 10h22" stroke="url(#explore-grad)" strokeWidth="1.25" />
    <path d="M8 17l3 3 3-4 3 2 3-4" stroke="url(#explore-grad)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="7" r="1" fill="url(#explore-grad)" />
    <circle cx="11" cy="7" r="1" fill="url(#explore-grad)" />
  </svg>
)

export const WaveQueryIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="wq-grad" x1="0" y1="0" x2="28" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0070f3" />
        <stop offset="1" stopColor="#50e3c2" />
      </linearGradient>
    </defs>
    <path d="M3 12c2.5-4 5-4 7.5 0s5 4 7.5 0 5-4 7 0" stroke="url(#wq-grad)" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M3 18c2.5-4 5-4 7.5 0s5 4 7.5 0 5-4 7 0" stroke="url(#wq-grad)" strokeWidth="1.25" strokeLinecap="round" opacity="0.5" />
    <circle cx="22" cy="9" r="3.5" stroke="url(#wq-grad)" strokeWidth="1.5" />
    <path d="M24.5 11.5L27 14" stroke="url(#wq-grad)" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
)

export const GlobeMapIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="globe-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10b981" />
        <stop offset="1" stopColor="#0070f3" />
      </linearGradient>
    </defs>
    <circle cx="14" cy="14" r="10" stroke="url(#globe-grad)" strokeWidth="1.75" />
    <ellipse cx="14" cy="14" rx="5.5" ry="10" stroke="url(#globe-grad)" strokeWidth="1.25" />
    <path d="M4 14h20M4 9.5h20M4 18.5h20" stroke="url(#globe-grad)" strokeWidth="1" opacity="0.6" />
    <circle cx="19" cy="9" r="2" fill="url(#globe-grad)" opacity="0.8" />
  </svg>
)

export const DepthProfileIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="depth-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7928ca" />
        <stop offset="1" stopColor="#0070f3" />
      </linearGradient>
    </defs>
    <path d="M6 4v20" stroke="url(#depth-grad)" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M6 24h16" stroke="url(#depth-grad)" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M6 7l4 3 4-2 4 5 4-2" stroke="url(#depth-grad)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 14l4 2 4 1 4-3 4 1" stroke="url(#depth-grad)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
  </svg>
)

export const BrainRAGIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="brain-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f59e0b" />
        <stop offset="1" stopColor="#7928ca" />
      </linearGradient>
    </defs>
    <path d="M14 5c-5 0-8 3.5-8 7 0 2 1 3.5 2.5 4.5L8 22h12l-.5-5.5c1.5-1 2.5-2.5 2.5-4.5 0-3.5-3-7-8-7z"
      stroke="url(#brain-grad)" strokeWidth="1.75" />
    <path d="M14 5v4M10 8l2 2M18 8l-2 2M8.5 16.5l2-2M19.5 16.5l-2-2" stroke="url(#brain-grad)" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
)

export const ExportIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="export-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" />
        <stop offset="1" stopColor="#0070f3" />
      </linearGradient>
    </defs>
    <rect x="4" y="14" width="20" height="11" rx="3" stroke="url(#export-grad)" strokeWidth="1.75" />
    <path d="M14 3v11M9 8l5-5 5 5" stroke="url(#export-grad)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 20h3M8 22.5h5" stroke="url(#export-grad)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const ExtensibleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ext-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ec4899" />
        <stop offset="1" stopColor="#7928ca" />
      </linearGradient>
    </defs>
    <circle cx="14" cy="14" r="3.5" stroke="url(#ext-grad)" strokeWidth="1.75" />
    <circle cx="5" cy="7" r="2.5" stroke="url(#ext-grad)" strokeWidth="1.5" />
    <circle cx="23" cy="7" r="2.5" stroke="url(#ext-grad)" strokeWidth="1.5" />
    <circle cx="5" cy="21" r="2.5" stroke="url(#ext-grad)" strokeWidth="1.5" />
    <circle cx="23" cy="21" r="2.5" stroke="url(#ext-grad)" strokeWidth="1.5" />
    <path d="M7.5 8.5l4 4M20.5 8.5l-4 4M7.5 19.5l4-4M20.5 19.5l-4-4" stroke="url(#ext-grad)" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
)

export const ResearcherIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="research-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0070f3" />
        <stop offset="1" stopColor="#50e3c2" />
      </linearGradient>
    </defs>
    <circle cx="14" cy="14" r="7" stroke="url(#research-grad)" strokeWidth="2" />
    <path d="M19.5 19.5L27 27" stroke="url(#research-grad)" strokeWidth="2" strokeLinecap="round" />
    <path d="M11 14h6M14 11v6" stroke="url(#research-grad)" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const PolicyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="policy-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10b981" />
        <stop offset="1" stopColor="#0070f3" />
      </linearGradient>
    </defs>
    <path d="M16 3L5 8v8c0 6 4.8 11.5 11 13 6.2-1.5 11-7 11-13V8L16 3z" stroke="url(#policy-grad)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M11 16l3 3 7-7" stroke="url(#policy-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const StudentIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="student-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7928ca" />
        <stop offset="1" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    <path d="M4 13l12-7 12 7-12 7-12-7z" stroke="url(#student-grad)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M8 15.5v7c2.5 2 5 3 8 3s5.5-1 8-3v-7" stroke="url(#student-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28 13v6" stroke="url(#student-grad)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="28" cy="20" r="1.5" fill="url(#student-grad)" />
  </svg>
)
