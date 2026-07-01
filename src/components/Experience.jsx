import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience, education } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

function ExperienceItem({ item, index, isActive, onClick }) {
  const itemRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(itemRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          delay: index * 0.12,
          scrollTrigger: { trigger: itemRef.current, start: 'top 85%', once: true }
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className={`relative pl-8 pb-10 cursor-pointer group opacity-0 last:pb-0`}
      onClick={() => onClick(index)}
    >
      {/* Timeline line */}
      {index < experience.length - 1 && (
        <div className="absolute left-[5px] top-5 bottom-0 w-px bg-gradient-to-b from-white/15 to-transparent" />
      )}

      {/* Timeline dot */}
      <div
        className="absolute left-0 top-1 timeline-dot transition-all duration-300"
        style={{ background: isActive ? item.color : '#484f58', boxShadow: isActive ? `0 0 20px ${item.color}50` : 'none' }}
      />

      <div className={`glass-card p-5 transition-all duration-300 ${isActive ? 'border-opacity-40' : ''}`}
        style={{ borderColor: isActive ? `${item.color}30` : undefined }}
      >
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-full"
            style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}25` }}
          >
            {item.period}
          </span>
          <span className="text-xs text-text-muted px-2 py-0.5 rounded-full bg-white/4 border border-white/5">
            {item.type}
          </span>
          <span className="text-xs text-text-muted">{item.location}</span>
        </div>

        {/* Role + Company */}
        <h3 className="text-base font-bold text-white mb-0.5">{item.role}</h3>
        <p className="text-sm font-medium mb-3" style={{ color: item.color }}>
          {item.company}
          <span className="text-text-muted text-xs ml-2">· {item.companyType}</span>
        </p>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>

        {/* Achievements — expanded */}
        {isActive && (
          <div className="mt-4 space-y-2">
            {item.achievements.map((ach, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                <span className="text-xs text-text-secondary leading-relaxed">{ach}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className={`flex flex-wrap gap-1.5 ${isActive ? 'mt-4' : 'mt-3'} pt-3 border-t border-white/5`}>
          {item.tech.map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-md text-text-secondary bg-white/4 border border-white/5">
              {t}
            </span>
          ))}
        </div>

        {/* Expand indicator */}
        <div className="mt-2 flex items-center gap-1 text-xs" style={{ color: item.color }}>
          <span>{isActive ? '↑ Less detail' : '↓ More detail'}</span>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const eduRef = useRef(null);
  const [activeExp, setActiveExp] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1,
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      );

      // Education cards
      gsap.fromTo(eduRef.current.querySelectorAll('.edu-card'),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: eduRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/3 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-1/3 w-80 h-80 rounded-full bg-purple-500/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <p className="section-label mb-4 opacity-0">Career Journey</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight opacity-0">
            Where I've been,<br />
            <span className="gradient-text">what I've built.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Work Experience</h3>
            </div>

            <div>
              {experience.map((item, i) => (
                <ExperienceItem
                  key={item.id}
                  item={item}
                  index={i}
                  isActive={activeExp === i}
                  onClick={(idx) => setActiveExp(activeExp === idx ? -1 : idx)}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div ref={eduRef}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Education</h3>
            </div>

            <div className="space-y-5">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="edu-card glass-card p-6 gradient-border opacity-0"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-xs font-mono text-cyan-400 mb-1">{edu.period}</p>
                      <h4 className="text-base font-bold text-white leading-tight">{edu.degree}</h4>
                      <p className="text-sm font-medium text-purple-400 mt-0.5">{edu.institution}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 flex-shrink-0">
                      {edu.grade}
                    </span>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{edu.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map(h => (
                      <span key={h} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-text-secondary border border-white/8">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                  <span className="text-sm">🏆</span>
                </div>
                <h3 className="text-lg font-bold text-white">Achievements</h3>
              </div>

              <div className="space-y-3">
                {[
                  { icon: '🏆', title: 'Hackathon Winner', detail: 'National Coding Competition 2023 — 1st Place' },
                  { icon: '⭐', title: 'Open Source Contributor', detail: 'Active contributions to React & Node.js ecosystem' },
                  { icon: '🥇', title: 'Best Developer Project', detail: 'University Tech Symposium 2024' },
                ].map(({ icon, title, detail }) => (
                  <div key={title} className="flex items-center gap-4 p-4 glass-card group hover:border-yellow-500/20 transition-colors">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-white">{title}</div>
                      <div className="text-xs text-text-secondary">{detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
