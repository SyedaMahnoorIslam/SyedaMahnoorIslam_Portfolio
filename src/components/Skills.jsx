import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills, techStack } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { key: 'frontend', label: 'Frontend', color: '#a855f7', icon: '🎨' },
  { key: 'backend', label: 'Backend', color: '#06b6d4', icon: '⚙️' },
  { key: 'qa', label: 'QA & Testing', color: '#ec4899', icon: '🧪' },
  { key: 'tools', label: 'Tools', color: '#f59e0b', icon: '🛠️' },
];

function SkillBar({ name, level, color, delay }) {
  const barRef = useRef(null);
  const fillRef = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: barRef.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.fromTo(barRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, delay, ease: 'power3.out' });
          gsap.fromTo(fillRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1, delay: delay + 0.2, ease: 'power3.out' }
          );
          const counter = { val: 0 };
          gsap.to(counter, {
            val: level,
            duration: 1,
            delay: delay + 0.2,
            ease: 'power2.out',
            onUpdate: () => {
              if (numRef.current) numRef.current.textContent = Math.round(counter.val) + '%';
            }
          });
        }
      });
    });
    return () => ctx.revert();
  }, [level, delay]);

  return (
    <div ref={barRef} className="opacity-0 group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{name}</span>
        <span ref={numRef} className="text-xs font-mono" style={{ color }}>0%</span>
      </div>
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          ref={fillRef}
          className="h-full rounded-full"
          style={{
            width: `${level}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            transformOrigin: 'left center',
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const ecosystemRef = useRef(null);
  const cardsRef = useRef(null);
  const stackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(headerRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1,
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      );

      // Category cards
      gsap.fromTo(cardsRef.current.querySelectorAll('.cat-card'),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
        }
      );

      // Tech stack pills
      gsap.fromTo(stackRef.current.querySelectorAll('.tech-pill'),
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.04, ease: 'power3.out',
          scrollTrigger: { trigger: stackRef.current, start: 'top 85%' }
        }
      );

      // Infinite scroll for tech pills
      const marquee = stackRef.current.querySelector('.marquee-track');
      if (marquee) {
        gsap.to(marquee, {
          x: '-50%',
          duration: 25,
          repeat: -1,
          ease: 'none',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/3 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <p className="section-label mb-4 opacity-0">Tech Stack</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight opacity-0">
              The toolkit I use<br />
              <span className="gradient-text">to build magic.</span>
            </h2>
            <p className="text-text-secondary max-w-xs text-sm leading-relaxed opacity-0">
              Constantly learning, always evolving. Here's what I work with on a daily basis.
            </p>
          </div>
        </div>

        {/* Category cards */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-16">
          {CATEGORIES.map(({ key, label, color, icon }) => {
            const categorySkills = skills[key] || [];
            return (
              <div
                key={key}
                className="cat-card glass-card p-6 gradient-border group opacity-0"
                style={{ '--cat-color': color }}
              >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm font-bold text-white">{label}</span>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded-full bg-white/5" style={{ color }}>
                  {categorySkills.length} skills
                </span>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                {categorySkills.slice(0, 5).map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={color}
                    delay={i * 0.08}
                  />
                ))}
              </div>

              {/* Remaining count */}
              {categorySkills.length > 5 && (
                <div className="mt-4 text-xs text-center" style={{ color: `${color}99` }}>
                  +{categorySkills.length - 5} more
                </div>
              )}

              {/* Decorative corner */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-5 pointer-events-none"
                style={{ background: color }}
              />
            </div>
          )})}
        </div>

        {/* Tech ecosystem marquee */}
        <div className="mb-8">
          <p className="section-label text-center mb-8 opacity-0" ref={stackRef} style={{opacity: 1}}>
            Full Technology Ecosystem
          </p>
        </div>

        <div
          ref={stackRef}
          className="relative overflow-hidden py-4"
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

          <div className="marquee-track flex gap-3 w-max">
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="tech-pill skill-badge opacity-0 flex-shrink-0"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Proficiency legend */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-text-secondary">
          {[
            { label: 'Expert', range: '90-100%', color: '#a855f7' },
            { label: 'Advanced', range: '75-89%', color: '#06b6d4' },
            { label: 'Intermediate', range: '60-74%', color: '#ec4899' },
          ].map(({ label, range, color }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-8 h-1.5 rounded-full" style={{ background: color }} />
              <span>{label} <span className="text-text-muted">({range})</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
