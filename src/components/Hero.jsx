import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { personalInfo } from '../data/portfolio';

const ROLES = personalInfo.roles;

export default function Hero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);
  const gridRef = useRef(null);
  const statsRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayRole, setDisplayRole] = useState(ROLES[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charCount, setCharCount] = useState(ROLES[0].length);
  const roleRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charCount < currentRole.length) {
          setCharCount(c => c + 1);
          setDisplayRole(currentRole.slice(0, charCount + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (charCount > 0) {
          setCharCount(c => c - 1);
          setDisplayRole(currentRole.slice(0, charCount - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex(i => (i + 1) % ROLES.length);
          setCharCount(0);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charCount, isDeleting, roleIndex]);

  // Mouse parallax
  useEffect(() => {
    const handleMouse = (e) => {
      const { clientX, clientY } = e;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (clientX - cx) / cx;
      const dy = (clientY - cy) / cy;

      gsap.to(orb1Ref.current, { x: dx * 30, y: dy * 20, duration: 1.5, ease: 'power2.out' });
      gsap.to(orb2Ref.current, { x: -dx * 20, y: -dy * 15, duration: 1.5, ease: 'power2.out' });
      gsap.to(orb3Ref.current, { x: dx * 15, y: -dy * 10, duration: 1.5, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.8 });

    tl.fromTo(badgeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo(headlineRef.current.querySelectorAll('.hero-line'),
      { y: 80, opacity: 0, rotateX: -10 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.12, ease: 'power4.out' },
      '-=0.3'
    )
    .fromTo(subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(ctaRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(statsRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
      '-=0.3'
    );

    // Orbs entrance
    gsap.fromTo([orb1Ref.current, orb2Ref.current, orb3Ref.current],
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, stagger: 0.2, ease: 'power2.out', delay: 2.5 }
    );

    // Floating animation for orbs
    gsap.to(orb1Ref.current, {
      y: '+=20',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 3,
    });

    gsap.to(orb2Ref.current, {
      y: '-=15',
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 3.5,
    });

    // Grid pulse
    gsap.fromTo(gridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, delay: 2.5, ease: 'power2.out' }
    );
  }, []);

  const scrollToProjects = (e) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Background layers */}
      <div ref={gridRef} className="absolute inset-0 grid-bg opacity-0" />

      {/* Hero gradient */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />

      {/* Radial spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-purple-600/8 blur-[120px] pointer-events-none" />

      {/* Floating orbs */}
      <div ref={orb1Ref} className="orb w-72 h-72 bg-purple-600/15 blur-[80px] top-1/4 left-1/4 opacity-0" style={{ willChange: 'transform' }} />
      <div ref={orb2Ref} className="orb w-56 h-56 bg-cyan-500/12 blur-[60px] top-1/3 right-1/4 opacity-0" style={{ willChange: 'transform' }} />
      <div ref={orb3Ref} className="orb w-40 h-40 bg-pink-500/10 blur-[50px] bottom-1/3 left-1/3 opacity-0" style={{ willChange: 'transform' }} />

      {/* Horizontal lines */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/4 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

        {/* Availability badge */}
        <div
          ref={badgeRef}
          style={{ opacity: 0 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Available for new opportunities
        </div>

        {/* Main headline */}
        <div
          ref={headlineRef}
          className="overflow-hidden mb-4 perspective-[1000px]"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-[88px] font-black leading-none tracking-tighter">
            <span className="hero-line block text-white">Syeda Mahnoor</span>
            <span className="hero-line block">
              <span className="gradient-text">Islam</span>
            </span>
          </h1>
        </div>

        {/* Dynamic role */}
        <div className="flex items-center justify-center gap-3 mb-6 min-h-[36px]">
          <span className="text-text-secondary text-sm font-mono">~/role</span>
          <span className="text-purple-400 font-mono">→</span>
          <span
            ref={roleRef}
            className="text-xl sm:text-2xl font-semibold text-white font-mono"
          >
            {displayRole}
            <span className="inline-block w-0.5 h-6 bg-purple-400 ml-0.5 animate-pulse align-middle" />
          </span>
        </div>

        {/* Tagline */}
        <p
          ref={subRef}
          style={{ opacity: 0 }}
          className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 text-balance"
        >
          {personalInfo.tagline}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button onClick={scrollToProjects} className="btn-primary text-sm py-3 px-7">
            <span className="flex items-center gap-2">
              View My Work
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          <button onClick={scrollToContact} className="btn-secondary text-sm py-3 px-7">
            <span className="flex items-center gap-2">
              Let's Talk
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </span>
          </button>
          <a
            href="https://github.com/SyedaMahnoorIslam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 pt-8 border-t border-white/5 w-full"
        >
          {personalInfo.stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black gradient-text-purple mb-1">{value}</div>
              <div className="text-xs text-text-secondary font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-text-muted font-mono">scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-purple-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
