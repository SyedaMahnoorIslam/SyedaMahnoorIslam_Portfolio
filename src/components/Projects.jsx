import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const ACCENT_COLORS = {
  purple: { bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.2)', glow: 'rgba(168,85,247,0.1)', text: '#c084fc' },
  cyan: { bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)', glow: 'rgba(6,182,212,0.1)', text: '#22d3ee' },
  pink: { bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.2)', glow: 'rgba(236,72,153,0.1)', text: '#f472b6' },
  amber: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', glow: 'rgba(245,158,11,0.1)', text: '#fbbf24' },
  emerald: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', glow: 'rgba(16,185,129,0.1)', text: '#34d399' },
  violet: { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)', glow: 'rgba(139,92,246,0.1)', text: '#a78bfa' },
};

// Decorative SVG pattern per project
const ProjectPattern = ({ color }) => (
  <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 400 300">
    <defs>
      <pattern id={`grid-${color}`} width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke={color} strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="400" height="300" fill={`url(#grid-${color})`} />
  </svg>
);

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const colors = ACCENT_COLORS[project.accent] || ACCENT_COLORS.purple;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          delay: (index % 3) * 0.12,
          scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true }
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = (e) => {
    if (!glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.set(glowRef.current, { x, y });
  };

  return (
    <div
      ref={cardRef}
      className="project-card opacity-0 relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? colors.border : 'rgba(255,255,255,0.06)',
        boxShadow: hovered ? `0 24px 80px rgba(0,0,0,0.5), 0 0 60px ${colors.glow}` : undefined,
      }}
    >
      {/* Mouse glow */}
      <div
        ref={glowRef}
        className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${colors.bg} 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Pattern */}
      <ProjectPattern color={project.color} />

      {/* Content */}
      <div className="relative z-10 p-7">
        {/* Top row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            {/* Project number */}
            <span className="text-xs font-mono text-text-muted">
              {String(project.id).padStart(2, '0')}
            </span>
            {/* Status badge */}
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
            >
              {project.status}
            </span>
            <span className="text-xs text-text-muted font-mono">{project.year}</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:border-white/20 transition-all group"
              aria-label="GitHub"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:border-white/20 transition-all"
              aria-label="Live demo"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Project visual area */}
        <div
          className="w-full h-36 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${colors.bg}, rgba(0,0,0,0.3))`, border: `1px solid ${colors.border}` }}
        >
          {/* Abstract visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold transition-transform duration-300"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${project.color}40, ${project.color}10)`,
                border: `1px solid ${colors.border}`,
                transform: hovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
              }}
            >
              {project.title.charAt(0)}
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-3 left-3 w-2 h-2 rounded-full animate-pulse" style={{ background: project.color }} />
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full" style={{ background: `${project.color}60` }} />
          <div className="absolute top-1/2 right-6 w-1 h-1 rounded-full" style={{ background: `${project.color}40` }} />
        </div>

        {/* Title */}
        <div className="mb-1">
          <p className="text-xs font-mono mb-1" style={{ color: colors.text }}>{project.subtitle}</p>
          <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.highlights.map((h) => (
            <span
              key={h}
              className="text-xs px-2 py-1 rounded-lg font-medium"
              style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-md text-text-secondary bg-white/4 border border-white/5">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom glow on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);
  const visibleOthers = showAll ? otherProjects : [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1,
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute left-0 top-1/2 w-80 h-80 rounded-full bg-pink-500/4 blur-[100px] pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <p className="section-label mb-4 opacity-0">Selected Work</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight opacity-0">
              Projects that<br />
              <span className="gradient-text">speak for themselves.</span>
            </h2>
            <p className="text-text-secondary max-w-xs text-sm leading-relaxed opacity-0">
              A curated selection of work that showcases problem-solving, design thinking, and technical depth.
            </p>
          </div>
        </div>

        {/* Featured projects — big cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Other projects */}
        {showAll && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {visibleOthers.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i + 3} />
            ))}
          </div>
        )}

        {/* Show more button */}
        {otherProjects.length > 0 && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(s => !s)}
              className="btn-secondary text-sm group"
            >
              <span className="flex items-center gap-2">
                {showAll ? (
                  <>Show Less <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></>
                ) : (
                  <>View All Projects ({otherProjects.length} more) <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></>
                )}
              </span>
            </button>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="mt-16 glass-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Want to see more?</h3>
            <p className="text-text-secondary text-sm">Check out my GitHub for more projects, experiments, and open-source contributions.</p>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary whitespace-nowrap flex-shrink-0"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              View GitHub Profile
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
