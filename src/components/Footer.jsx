import { personalInfo } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 py-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#020509] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white font-bold text-xs shadow-glow-purple">
              SM
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{personalInfo.name}</div>
              <div className="text-xs text-text-secondary">{personalInfo.title}</div>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-text-muted text-center">
            © {year} {personalInfo.name}. Designed & built with{' '}
            <span className="text-pink-400">♥</span> using React & GSAP.
          </p>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-text-secondary hover:text-purple-400 transition-colors group"
          >
            Back to top
            <div className="w-7 h-7 rounded-full border border-white/10 bg-white/5 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 flex items-center justify-center transition-all">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
