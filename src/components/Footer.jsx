import { Waves, Github, Twitter } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = {
  Product: ['Features', 'How It Works', 'Use Cases', 'Tech Stack'],
  Resources: ['Documentation', 'ARGO Dataset', 'API Reference', 'Changelog'],
  Company: ['About', 'Blog', 'GitHub', 'Contact'],
}

export default function Footer() {
  const { theme } = useTheme()

  return (
    <>


      {/* Footer */}
      <footer className={`border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'} py-12`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <Waves className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-sm text-black dark:text-white">FloatChat</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed max-w-xs">
                Ask the Ocean Anything. Natural language access to global ARGO float data — no code, no complexity.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 mt-5">
                <a href="https://github.com" target="_blank" rel="noreferrer"
                  className="text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors duration-150">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer"
                  className="text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors duration-150">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">{group}</h4>
                <ul className="space-y-2.5">
                  {items.map(item => (
                    <li key={item}>
                      <a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-150">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'
            }`}>
            <p className="text-xs text-zinc-400 dark:text-zinc-600">
              © {new Date().getFullYear()} FloatChat. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {['Privacy Policy', 'Terms of Service'].map(item => (
                <a key={item} href="#" className="text-xs text-zinc-400 dark:text-zinc-600 hover:text-black dark:hover:text-white transition-colors duration-150">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
