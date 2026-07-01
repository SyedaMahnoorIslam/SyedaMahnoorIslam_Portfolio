import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: personalInfo.social.github,
    color: '#f0f6fc',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: personalInfo.social.linkedin,
    color: '#0A66C2',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: personalInfo.social.twitter,
    color: '#1DA1F2',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.737-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    href: personalInfo.social.email,
    color: '#a855f7',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', countryCode: '+92', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1,
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo(formRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo(infoRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone ? `${formData.countryCode} ${formData.phone}` : 'Not provided',
        _subject: formData.subject || 'New message from portfolio',
        message: formData.message,
      };

      const response = await fetch('https://formspree.io/f/xkoloonz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && !data.errors) {
        setStatus('sent');
        setFormData({ name: '', email: '', phone: '', countryCode: '+92', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error('Formspree error:', data);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      console.error('Network error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-purple-600/6 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <p className="section-label mb-4 opacity-0">Get In Touch</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4 opacity-0">
            Let's build something<br />
            <span className="gradient-text">extraordinary together.</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-base opacity-0">
            Have an interesting project? Looking for a developer who cares about craft? 
            I'd love to hear from you. Let's create something remarkable.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-6 opacity-0">
            {/* Availability card */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </div>
                <span className="text-sm font-semibold text-white">Currently Available</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Open to full-time roles, freelance projects, and interesting collaborations. 
                Response time is typically within <span className="text-white font-medium">24 hours</span>.
              </p>
            </div>

            {/* Contact info */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white mb-4">Direct Contact</h3>
              {[
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: 'Email',
                  value: personalInfo.email,
                  href: `mailto:${personalInfo.email}`,
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: 'Location',
                  value: personalInfo.location,
                  href: null,
                },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/15 flex items-center justify-center text-purple-400">
                    {icon}
                  </div>
                  <div>
                    <div className="text-xs text-text-secondary">{label}</div>
                    {href ? (
                      <a href={href} className="text-sm text-white hover:text-purple-400 transition-colors">{value}</a>
                    ) : (
                      <div className="text-sm text-white">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Find Me Online</h3>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_LINKS.map(({ name, href, color, icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-white/6 bg-white/3 hover:bg-white/6 hover:border-white/12 transition-all group"
                  >
                    <span className="transition-colors group-hover:text-white text-text-secondary" style={{ color: 'inherit' }}>
                      {icon}
                    </span>
                    <span className="text-sm text-text-secondary group-hover:text-white transition-colors">{name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right form */}
          <div ref={formRef} className="lg:col-span-3 opacity-0">
            <div className="glass-card p-8 relative overflow-hidden">
              {/* Top shimmer */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

              <h3 className="text-lg font-bold text-white mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="relative">
                    <label className="block text-xs text-text-secondary mb-2 font-medium">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      required
                      placeholder="Jane Smith"
                      className={`form-input w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-300 ${
                        focused === 'name'
                          ? 'border-purple-500/50 bg-purple-500/5'
                          : 'border-white/10 bg-white/5'
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className="block text-xs text-text-secondary mb-2 font-medium">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      required
                      placeholder="jane@company.com"
                      className={`form-input w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-300 ${
                        focused === 'email'
                          ? 'border-purple-500/50 bg-purple-500/5'
                          : 'border-white/10 bg-white/5'
                      }`}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs text-text-secondary mb-2 font-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    placeholder="Project Inquiry / Job Opportunity / Collaboration"
                    className={`form-input w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-300 ${
                      focused === 'subject'
                        ? 'border-purple-500/50 bg-purple-500/5'
                        : 'border-white/10 bg-white/5'
                    }`}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs text-text-secondary mb-2 font-medium">
                    Mobile Number <span className="text-text-muted">(Optional)</span>
                  </label>
                  <div className={`flex rounded-xl border overflow-hidden transition-all duration-300 ${
                    focused === 'phone'
                      ? 'border-purple-500/50'
                      : 'border-white/10'
                  }`}>
                    {/* Country code select */}
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      className="form-input bg-black border-0 border-r border-black px-3 py-3 text-sm outline-none cursor-pointer flex-shrink-0 appearance-none pr-7 pl-3"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238b949e' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 6px center', backgroundSize: '14px' }}
                    >
                      <option value="+92">🇵🇰 +92</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+966">🇸🇦 +966</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+86">🇨🇳 +86</option>
                      <option value="+81">🇯🇵 +81</option>
                      <option value="+7">🇷🇺 +7</option>
                      <option value="+55">🇧🇷 +55</option>
                      <option value="+27">🇿🇦 +27</option>
                      <option value="+20">🇪🇬 +20</option>
                      <option value="+234">🇳🇬 +234</option>
                      <option value="+254">🇰🇪 +254</option>
                      <option value="+65">🇸🇬 +65</option>
                      <option value="+60">🇲🇾 +60</option>
                      <option value="+880">🇧🇩 +880</option>
                    </select>
                    {/* Number input */}
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      placeholder="300 1234567"
                      className={`form-input flex-1 px-4 py-3 border-0 text-sm outline-none transition-all duration-300 ${
                        focused === 'phone' ? 'bg-purple-500/5' : 'bg-white/5'
                      }`}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs text-text-secondary mb-2 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    required
                    rows={5}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    className={`form-input w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-300 resize-none ${
                      focused === 'message'
                        ? 'border-purple-500/50 bg-purple-500/5'
                        : 'border-white/10 bg-white/5'
                    }`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  className={`w-full btn-primary py-3.5 justify-center disabled:opacity-60 disabled:cursor-not-allowed ${
                    status === 'error' ? 'bg-red-600 hover:bg-red-500' : ''
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {status === 'idle' && (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                    {status === 'sending' && (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    )}
                    {status === 'sent' && (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Message Sent! I'll be in touch soon.
                      </>
                    )}
                    {status === 'error' && (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Something went wrong. Try again.
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Bottom note */}
              <p className="mt-4 text-xs text-center text-text-muted">
                No spam. I typically respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
