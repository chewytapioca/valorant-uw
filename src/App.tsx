import { useState, useEffect, useRef } from 'react';
import './App.css';

function DiscordIcon() {
  return (
    <svg viewBox="0 0 127.14 96.36" className="social-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="social-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="social-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="social-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

const SPARKLES = [
  { id: 1, x: 8,  y: 18, size: 1.1, delay: 0,   symbol: '✦' },
  { id: 2, x: 88, y: 12, size: 0.8, delay: 0.7, symbol: '✧' },
  { id: 3, x: 75, y: 72, size: 1.3, delay: 1.4, symbol: '★' },
  { id: 4, x: 15, y: 65, size: 0.7, delay: 0.3, symbol: '✦' },
  { id: 5, x: 92, y: 45, size: 0.9, delay: 2.1, symbol: '⋆' },
  { id: 6, x: 50, y: 8,  size: 0.6, delay: 1.0, symbol: '✧' },
  { id: 7, x: 30, y: 85, size: 1.0, delay: 1.8, symbol: '✦' },
  { id: 8, x: 65, y: 25, size: 0.7, delay: 0.5, symbol: '⋆' },
];

const RANKS = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant', 'Unranked / Just for fun'];

function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

function useInView(threshold = 0.35) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', rank: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const { ref: statsRef, inView: statsInView } = useInView(0.4);
  const members  = useCounter(50,  1500, statsInView);
  const events   = useCounter(30,  1600, statsInView);
  const seasons  = useCounter(4,   1200, statsInView);

  // Highlight the active nav link as user scrolls
  useEffect(() => {
    const ids = ['about', 'events', 'team', 'join', 'connect'];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Close mobile menu when a nav link is clicked
  const handleNavClick = () => setMenuOpen(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/valorant@uw.edu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      setFormStatus(res.ok ? 'sent' : 'error');
      if (res.ok) setFormData({ name: '', email: '', rank: '', message: '' });
    } catch {
      setFormStatus('error');
    }
  }

  return (
    <div className="page">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="nav-v">V</span>
          <span className="nav-title">VALORANT @ UW</span>
        </div>

        {/* Desktop links */}
        <ul className="nav-links">
          {['about', 'events', 'team', 'join', 'connect'].map(id => (
            <li key={id}>
              <a href={`#${id}`} className={activeSection === id ? 'nav-link--active' : ''}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-socials">
          <a href="https://discord.gg/wYtfQdAvGc" target="_blank" rel="noopener noreferrer" className="nav-social nav-social--discord" aria-label="Discord"><DiscordIcon /></a>
          <a href="https://www.instagram.com/valorant_uw/" target="_blank" rel="noopener noreferrer" className="nav-social nav-social--instagram" aria-label="Instagram"><InstagramIcon /></a>
          <a href="https://linkedin.com/company/valorant-uw" target="_blank" rel="noopener noreferrer" className="nav-social nav-social--linkedin" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a href="mailto:valorant@uw.edu" className="nav-social nav-social--email" aria-label="Email"><EmailIcon /></a>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' hamburger--open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu drawer */}
      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}>
        {['about', 'events', 'team', 'join', 'connect'].map(id => (
          <a key={id} href={`#${id}`} className="mobile-menu__link" onClick={handleNavClick}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-deco" aria-hidden="true">
          <div className="deco-blob deco-blob--1" />
          <div className="deco-blob deco-blob--2" />
          <div className="deco-blob deco-blob--3" />
          {SPARKLES.map(s => (
            <span
              key={s.id}
              className="hero-sparkle"
              style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: `${s.size}rem`, animationDelay: `${s.delay}s` }}
            >
              {s.symbol}
            </span>
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-pill">🏫 UW RSO &nbsp;·&nbsp; 🎮 Valorant &nbsp;·&nbsp; ⚔️ Competitive</div>
          <h1 className="hero-heading">
            VALORANT<br />
            <span className="hero-heading--gradient">@ UW</span>
          </h1>
          <p className="hero-sub">
            University of Washington's Premier Valorant RSO —<br />
            compete, connect, and level up with the UW gaming community.
          </p>
          <div className="hero-actions">
            <a href="https://discord.gg/wYtfQdAvGc" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              <DiscordIcon /> Join Discord
            </a>
            <a href="#about" className="btn btn--outline">Learn More ↓</a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section section--purple">
        <div className="container">
          <p className="eyebrow">Who We Are</p>
          <h2 className="section-heading">About Us ✦</h2>
          <p className="section-sub">
            Valorant @ UW is the University of Washington's official Valorant RSO — bringing together
            students who share a passion for tactical gameplay and competitive gaming. Whether you're
            Radiant or just starting out, you belong here.
          </p>

          {/* Animated stat counters */}
          <div ref={statsRef} className="stats-row">
            <div className="stat-card">
              <span className="stat-number">{members}+</span>
              <span className="stat-label">Members</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{events}+</span>
              <span className="stat-label">Events Hosted</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{seasons}</span>
              <span className="stat-label">Seasons</span>
            </div>
          </div>

          <div className="card-grid card-grid--2" style={{ marginTop: '32px' }}>
            {[
              { emoji: '🏆', title: 'Competitive Play',  body: 'Organized scrimmages, tournaments, and ranked team play for all skill levels.' },
              { emoji: '👥', title: 'Community',         body: 'Regular meetups, watch parties, and socials to build lasting friendships.' },
              { emoji: '📈', title: 'Growth',            body: 'VOD reviews, coaching sessions, and workshops to elevate your game.' },
              { emoji: '🌟', title: 'Inclusive',         body: 'Welcoming players from Iron to Radiant — all ranks, all backgrounds.' },
            ].map(({ emoji, title, body }) => (
              <div key={title} className="card">
                <span className="card-emoji">{emoji}</span>
                <h3 className="card-title">{title}</h3>
                <p className="card-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section id="events" className="section section--gold">
        <div className="container">
          <p className="eyebrow">Stay Updated</p>
          <h2 className="section-heading">Events & Tournaments 🏆</h2>
          <p className="section-sub">Stay up to date with everything Valorant @ UW.</p>
          <div className="events-list">
            {[
              { emoji: '⚔️', name: 'Weekly Scrimmages',   when: 'Every Wednesday', status: 'ongoing'  },
              { emoji: '🥇', name: 'Spring Invitational',  when: 'May 2025',        status: 'upcoming' },
              { emoji: '🎉', name: 'New Member Social',    when: 'Every Quarter',   status: 'ongoing'  },
              { emoji: '📹', name: 'VOD Review Sessions',  when: 'Bi-weekly',       status: 'ongoing'  },
            ].map(({ emoji, name, when, status }) => (
              <div key={name} className="event-row">
                <span className="event-emoji">{emoji}</span>
                <div className="event-info">
                  <p className="event-name">{name}</p>
                  <p className="event-when">🗓 {when}</p>
                </div>
                <span className={`badge badge--${status}`}>
                  {status === 'upcoming' ? '⏳ Upcoming' : '✅ Active'}
                </span>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <a href="https://discord.gg/wYtfQdAvGc" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              Join Discord for Updates ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="section section--purple">
        <div className="container">
          <p className="eyebrow">The People Behind It</p>
          <h2 className="section-heading">Meet the Team 👾</h2>
          <p className="section-sub">The people who make Valorant @ UW possible.</p>
          <div className="card-grid card-grid--3">
            {[
              { emoji: '👑', role: 'President',   desc: 'Club leadership & vision'  },
              { emoji: '⭐', role: 'VP',           desc: 'Operations & planning'     },
              { emoji: '💰', role: 'Treasurer',    desc: 'Finance & budgeting'       },
              { emoji: '🎉', role: 'Events Lead',  desc: 'Tournaments & socials'     },
              { emoji: '📸', role: 'Media Lead',   desc: 'Content & outreach'        },
              { emoji: '🎯', role: 'Coach',        desc: 'Strategy & improvement'    },
            ].map(({ emoji, role, desc }) => (
              <div key={role} className="card card--center">
                <span className="card-emoji">{emoji}</span>
                <h3 className="card-title">{role}</h3>
                <p className="card-body">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN FORM ── */}
      <section id="join" className="section section--gold">
        <div className="container container--narrow">
          <p className="eyebrow">Get Involved</p>
          <h2 className="section-heading">Join Us ✦</h2>
          <p className="section-sub">
            Interested in joining Valorant @ UW? Fill out the form below and we'll reach out!
          </p>

          {formStatus === 'sent' ? (
            <div className="form-success">
              <span className="form-success__icon">🎉</span>
              <h3>You're on the list!</h3>
              <p>We'll be in touch soon. See you in the server!</p>
              <button className="btn btn--outline" onClick={() => setFormStatus('idle')}>
                Submit another response
              </button>
            </div>
          ) : (
            <form className="join-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">UW Email *</label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="netid@uw.edu"
                    required
                    value={formData.email}
                    onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="rank" className="form-label">Current Rank</label>
                <select
                  id="rank"
                  className="form-input form-select"
                  value={formData.rank}
                  onChange={e => setFormData(d => ({ ...d, rank: e.target.value }))}
                >
                  <option value="">Select your rank...</option>
                  {RANKS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Anything else?</label>
                <textarea
                  id="message"
                  className="form-input form-textarea"
                  placeholder="Tell us about yourself, what you're looking for, etc."
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                />
              </div>
              {formStatus === 'error' && (
                <p className="form-error">Something went wrong — try emailing us at <a href="mailto:valorant@uw.edu">valorant@uw.edu</a>.</p>
              )}
              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Sending...' : 'Submit Interest ✦'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── CONNECT ── */}
      <section id="connect" className="section section--purple">
        <div className="container">
          <p className="eyebrow">Find Us Online</p>
          <h2 className="section-heading">Connect With Us 💌</h2>
          <p className="section-sub">We'd love to hear from you — find us on any of these platforms.</p>
          <div className="card-grid card-grid--2">
            <a href="https://discord.gg/wYtfQdAvGc" target="_blank" rel="noopener noreferrer" className="connect-card connect-card--discord">
              <DiscordIcon />
              <div className="connect-card__info">
                <p className="connect-card__label">Discord</p>
                <p className="connect-card__desc">discord.gg/wYtfQdAvGc</p>
              </div>
              <span className="connect-card__arrow">↗</span>
            </a>
            <a href="https://www.instagram.com/valorant_uw/" target="_blank" rel="noopener noreferrer" className="connect-card connect-card--instagram">
              <InstagramIcon />
              <div className="connect-card__info">
                <p className="connect-card__label">Instagram</p>
                <p className="connect-card__desc">@valorant_uw</p>
              </div>
              <span className="connect-card__arrow">↗</span>
            </a>
            <a href="https://linkedin.com/company/valorant-uw" target="_blank" rel="noopener noreferrer" className="connect-card connect-card--linkedin">
              <LinkedInIcon />
              <div className="connect-card__info">
                <p className="connect-card__label">LinkedIn</p>
                <p className="connect-card__desc">linkedin.com/company/valorant-uw</p>
              </div>
              <span className="connect-card__arrow">↗</span>
            </a>
            <a href="mailto:valorant@uw.edu" className="connect-card connect-card--email">
              <EmailIcon />
              <div className="connect-card__info">
                <p className="connect-card__label">Email</p>
                <p className="connect-card__desc">valorant@uw.edu</p>
              </div>
              <span className="connect-card__arrow">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <p className="footer-brand">VALORANT @ UW</p>
        <p className="footer-sub">University of Washington · Student RSO</p>
        <div className="footer-socials">
          <a href="https://discord.gg/wYtfQdAvGc" target="_blank" rel="noopener noreferrer" className="footer-social footer-social--discord" aria-label="Discord"><DiscordIcon /></a>
          <a href="https://www.instagram.com/valorant_uw/" target="_blank" rel="noopener noreferrer" className="footer-social footer-social--instagram" aria-label="Instagram"><InstagramIcon /></a>
          <a href="https://linkedin.com/company/valorant-uw" target="_blank" rel="noopener noreferrer" className="footer-social footer-social--linkedin" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a href="mailto:valorant@uw.edu" className="footer-social footer-social--email" aria-label="Email"><EmailIcon /></a>
        </div>
        <p className="footer-copy">© 2025 Valorant @ UW · All rights reserved.</p>
      </footer>

    </div>
  );
}
