import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);
  const nameRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          delay: 0.1,
          onComplete,
        });
      },
    });

    // Animate counter
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(counter.val).toString().padStart(3, '0');
        }
      },
    }, 0);

    // Animate progress bar
    tl.fromTo(progressRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.8, ease: 'power2.inOut' },
      0
    );

    // Name reveal
    tl.fromTo(nameRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      0.2
    );

    // Line reveal
    tl.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.6, ease: 'power3.out' },
      0.6
    );
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col items-center justify-center"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm px-8">
        {/* Logo mark */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white font-bold text-xl shadow-glow-purple">
          SM
        </div>

        {/* Name */}
        <div ref={nameRef} style={{ opacity: 0 }} className="text-center">
          <p className="section-label mb-2">Portfolio</p>
          <h1 className="text-2xl font-bold text-white">Syeda Mahnoor Islam</h1>
        </div>

        {/* Progress */}
        <div className="w-full">
          {/* Counter */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-text-secondary font-mono">Loading</span>
            <span ref={counterRef} className="text-2xl font-bold font-mono text-purple-400">000</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-px bg-white/10 relative overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500"
              style={{ transformOrigin: 'left center' }}
            />
          </div>

          {/* Line */}
          <div ref={lineRef} className="mt-4 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent w-full" style={{ transformOrigin: 'left center' }} />
        </div>
      </div>
    </div>
  );
}
