import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certifications } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const CERT_COLORS = {
  'Meta': '#0866FF',
  'AWS': '#FF9900',
  'Google': '#4285F4',
  'FCC': '#0A0A23',
  'Udemy': '#A435F0',
};

export default function Certifications() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1,
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo(cardsRef.current.querySelectorAll('.cert-card'),
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="certifications" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/2 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <p className="section-label mb-4 opacity-0">Credentials</p>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight opacity-0">
            Certifications &<br />
            <span className="gradient-text">Continuous Learning</span>
          </h2>
        </div>

        {/* Cert grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => {
            const color = CERT_COLORS[cert.icon] || '#a855f7';
            return (
              <div
                key={i}
                className="cert-card glass-card p-5 group gradient-border opacity-0 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Issuer icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${color}30, ${color}15)`,
                      border: `1px solid ${color}30`,
                      color,
                    }}
                  >
                    {cert.icon}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-white leading-snug mb-1 line-clamp-2">{cert.title}</h4>
                    <p className="text-xs text-text-secondary mb-2">{cert.issuer}</p>
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded-full"
                      style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}
                    >
                      {cert.year}
                    </span>
                  </div>
                </div>

                {/* Verified badge */}
                <div className="mt-4 flex items-center gap-1.5 text-xs text-green-400">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified Certificate
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-text-secondary text-sm">
            Always learning. Currently exploring{' '}
            <span className="text-purple-400 font-medium">LLM Engineering</span> and{' '}
            <span className="text-cyan-400 font-medium">Advanced System Design</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
