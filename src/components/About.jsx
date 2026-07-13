import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const TRAITS = [
  { icon: '⚡', label: 'Fast Learner', description: 'Adapts quickly to new technologies and methodologies' },
  { icon: '🎨', label: 'Design-Minded', description: 'Bridges the gap between beautiful design and clean code' },
  { icon: '🤖', label: 'AI-Powered', description: 'Integrates AI features to build smarter products' },
  { icon: '🚀', label: 'Performance First', description: 'Obsessed with speed, optimization, and efficiency' },
];

export default function About() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const bioRef = useRef(null);
  const traitsRef = useRef(null);
  const imageAreaRef = useRef(null);
  const statsBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance
      gsap.fromTo(labelRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      // Bio paragraphs stagger
      gsap.fromTo(bioRef.current.querySelectorAll('p'),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: bioRef.current, start: 'top 80%' }
        }
      );

      // Traits cards
      gsap.fromTo(traitsRef.current.querySelectorAll('.trait-card'),
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: traitsRef.current, start: 'top 80%' }
        }
      );

      // Image area
      gsap.fromTo(imageAreaRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: imageAreaRef.current, start: 'top 80%' }
        }
      );

      // Floating animation for the visual
      gsap.to(imageAreaRef.current.querySelector('.floating-card'), {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Stats counter animation
      const stats = statsBarRef.current?.querySelectorAll('.stat-value');
      stats?.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.fromTo({ val: 0 }, { val: target }, {
              duration: 1.5,
              ease: 'power2.out',
              onUpdate() {
                el.textContent = Math.round(this.targets()[0].val) + (el.getAttribute('data-suffix') || '');
              }
            });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p ref={labelRef} className="section-label mb-4 opacity-0">About Me</p>
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight opacity-0"
          >
            Crafting the future,<br />
            <span className="gradient-text">one commit</span> at a time.
          </h2>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — text */}
          <div>
            <div ref={bioRef} className="space-y-5 mb-10">
              {personalInfo.bio.map((para, i) => (
                <p key={i} className="text-text-secondary leading-8 text-base opacity-0">
                  {para}
                </p>
              ))}
            </div>

            {/* Traits */}
            <div ref={traitsRef} className="grid grid-cols-2 gap-3">
              {TRAITS.map(({ icon, label, description }) => (
                <div
                  key={label}
                  className="trait-card glass-card p-4 group cursor-default opacity-0 transition-all duration-300"
                >
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="text-sm font-semibold text-white mb-1">{label}</div>
                  <div className="text-xs text-text-secondary leading-relaxed">{description}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary text-sm"
              >
                <span className="flex items-center gap-2">
                  Get In Touch
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
              <a
                href="#"
                className="btn-secondary text-sm"
                onClick={(e) => e.preventDefault()}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download CV
                </span>
              </a>
            </div>
          </div>

          {/* Right — visual */}
          <div ref={imageAreaRef} className="relative opacity-0">
            {/* Main card */}
            <div className="floating-card glass-card p-6 relative overflow-hidden">
              {/* Gradient shimmer */}
              <div className="absolute inset-0 shimmer pointer-events-none rounded-2xl" />

              <div className="flex items-start gap-4 mb-6">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-glow-purple flex-shrink-0 relative overflow-hidden">
                  <span>SM</span>
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-2xl border border-purple-400/30" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{personalInfo.name}</h3>
                  <p className="text-sm text-purple-400 font-medium">{personalInfo.title}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-text-secondary">{personalInfo.availability}</span>
                  </div>
                </div>
              </div>

              {/* Info rows */}
              <div className="space-y-3">
                {[
                  { icon: '📍', label: 'Location', value: personalInfo.location },
                  { icon: '💼', label: 'Experience', value: '1+ Years' },
                  { icon: '🎓', label: 'Education', value: 'BS Computer Science' },
                  { icon: '🌍', label: 'Languages', value: 'English, Urdu' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 group hover:bg-white/5 transition-colors">
                    <span className="text-base">{icon}</span>
                    <span className="text-xs text-text-secondary min-w-[70px]">{label}</span>
                    <span className="text-sm text-white font-medium ml-auto">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating mini card */}
            <div className="absolute -top-4 -right-4 glass-card px-4 py-3 shadow-glow-purple/20">
              <div className="flex items-center gap-2">
                <div className="text-yellow-400 text-sm">✦</div>
                <span className="text-xs font-semibold text-white">Open to Remote</span>
              </div>
            </div>

            {/* Floating mini card 2 */}
            <div className="absolute -bottom-4 -left-4 glass-card px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="text-green-400 text-sm">⚡</div>
                <div>
                  <div className="text-xs font-semibold text-white">Fast Response</div>
                  <div className="text-xs text-text-secondary">Usually within 24h</div>
                </div>
              </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-purple-600/8 via-transparent to-cyan-500/8 blur-xl pointer-events-none" />
          </div>
        </div>

        {/* Stats bar */}
        <div
          ref={statsBarRef}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { target: 15, suffix: '+', label: 'Projects Completed', icon: '🚀' },
            { target: 1, suffix: '+', label: 'Years Experience', icon: '⏰' },
            { target: 10, suffix: '+', label: 'Technologies', icon: '💻' },
            { target: 100, suffix: '%', label: 'Dedication', icon: '🔥' },
          ].map(({ target, suffix, label, icon }) => (
            <div
              key={label}
              className="glass-card p-6 text-center group hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="text-2xl mb-2">{icon}</div>
              <div className="text-3xl font-black text-white mb-1">
                <span className="stat-value gradient-text" data-target={target} data-suffix={suffix}>
                  0{suffix}
                </span>
              </div>
              <div className="text-xs text-text-secondary">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
