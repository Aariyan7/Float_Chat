import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import TechStack from './components/TechStack'
import UseCases from './components/UseCases'
import Footer from './components/Footer'
import ChatInterface from './components/ChatInterface'

const TourTooltip = ({ index, step, tooltipProps, primaryProps, isLastStep }) => (
  <div
    {...tooltipProps}
    className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-xl p-4 max-w-[320px] text-left pointer-events-auto"
  >
    <div className="text-[15px] text-zinc-900 dark:text-zinc-100 mb-5 leading-relaxed font-medium">
      {step.content}
    </div>
    <div className="flex items-center justify-between mt-2">
      <span className="text-xs text-zinc-500 font-medium">
        Step {index + 1} of 2
      </span>
      <button
        {...primaryProps}
        className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-sm font-semibold py-1.5 px-4 rounded-md transition-colors shadow-sm"
      >
        {isLastStep ? 'Finish' : 'Got it'}
      </button>
    </div>
  </div>
);

const TourPopup = ({ step, tourStep, onNext }) => {
  if (tourStep !== step) return null;

  const isStep1 = step === 1;
  const content = isStep1 
    ? 'View the real time Argo floats in a interactive way'
    : 'Start chatting with AI powered Argo Bot';

  if (isStep1) {
    return (
      <>
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[1px] transition-opacity" />
        <div className="fixed inset-x-0 top-[370px] sm:top-[64px] z-[70] pointer-events-none flex justify-center sm:justify-end max-w-6xl mx-auto px-4 sm:px-6">
          <div 
            className="relative pointer-events-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-xl p-4 w-[280px] sm:w-[320px] text-left animate-fade-in"
          >
            {/* Arrow */}
            <div className="absolute w-3 h-3 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rotate-45 -top-1.5 left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 sm:right-[60px] border-l border-t" />
            
            <div className="relative z-10">
              <div className="text-[14px] sm:text-[15px] text-zinc-900 dark:text-zinc-100 mb-5 leading-relaxed font-medium">
                {content}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-zinc-500 font-medium">
                  Step {step} of 2
                </span>
                <button
                  onClick={onNext}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-sm font-semibold py-1.5 px-4 rounded-md transition-colors shadow-sm"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[1px] transition-opacity" />
      <div 
        className="fixed z-[70] pointer-events-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-xl p-4 w-[280px] sm:w-[320px] text-left animate-fade-in bottom-[90px] right-5"
      >
        {/* Arrow */}
        <div className="absolute w-3 h-3 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rotate-45 -bottom-1.5 right-8 sm:right-6 border-r border-b" />
        
        <div className="relative z-10">
          <div className="text-[14px] sm:text-[15px] text-zinc-900 dark:text-zinc-100 mb-5 leading-relaxed font-medium">
            {content}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-zinc-500 font-medium">
              Step {step} of 2
            </span>
            <button
              onClick={onNext}
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-sm font-semibold py-1.5 px-4 rounded-md transition-colors shadow-sm"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const [page, setPage] = useState('home')  // 'home' | 'chat'
  const [chatHovered, setChatHovered] = useState(false)
  const [tourStep, setTourStep] = useState(0) // 0 = off, 1 = dashboard btn, 2 = chat fab

  const startTour = (e) => {
    if (e) e.preventDefault();
    setPage('home');
    setTourStep(1);
  };

  const handleNextTour = () => {
    if (tourStep === 1) {
      setTourStep(2);
    } else if (tourStep === 2) {
      setTourStep(0);
      setPage('chat');
    }
  };

  if (page === 'chat') {
    return (
      <ThemeProvider>
        <ChatInterface onBack={() => setPage('home')} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 relative">
        <TourPopup step={1} tourStep={tourStep} onNext={handleNextTour} />
        <TourPopup step={2} tourStep={tourStep} onNext={handleNextTour} />
        <div className={tourStep === 1 ? 'relative z-[80] pointer-events-none' : ''}>
          <Navbar onChatClick={() => setPage('chat')} tourStep={tourStep} />
        </div>
        <main className={tourStep !== 0 ? 'pointer-events-none' : ''}>
          <Hero onStartTour={startTour} />
          <Problem />
          <Solution />
          <HowItWorks />
          <Features />
          <TechStack />
          <UseCases />
        </main>
        <Footer />

        {/* Floating Chat Button */}
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
          {/* Tooltip */}
          <div
            className={`transition-all duration-200 origin-bottom-right ${
              chatHovered
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-1 scale-95 pointer-events-none'
            }`}
          >
            <span className="inline-block bg-black dark:bg-white text-white dark:text-black text-xs font-medium px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap">
              Start chatting
            </span>
          </div>

          {/* FAB */}
          <button
            id="chat-fab"
            aria-label="Open chat"
            onMouseEnter={() => setChatHovered(true)}
            onMouseLeave={() => setChatHovered(false)}
            onClick={() => setPage('chat')}
            className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-2xl flex items-center justify-center transition-all duration-200 ${
              tourStep === 2 ? 'z-[80] ring-4 ring-black/20 dark:ring-white/20' : ''
            } ${
              chatHovered ? 'scale-110 shadow-black/30 dark:shadow-white/20' : 'scale-100'
            } hover:ring-2 hover:ring-black dark:hover:ring-white hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-black`}
          >
            {/* Chat SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
