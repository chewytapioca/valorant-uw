import { useState, useCallback, useMemo } from 'react';
import { Window } from './components/Window';
import { DesktopIcon } from './components/DesktopIcon';
import { Taskbar } from './components/Taskbar';
import './App.css';

type WindowId = 'welcome' | 'about' | 'team' | 'contact' | 'events';

interface WindowState {
  isOpen: boolean;
  zIndex: number;
}

const WINDOWS_CONFIG: Record<
  WindowId,
  { title: string; icon: string; defaultPosition: { x: number; y: number }; width: number }
> = {
  welcome: { title: 'Welcome!', icon: '✨', defaultPosition: { x: 160, y: 55 }, width: 440 },
  about:   { title: 'About Us', icon: '🎮', defaultPosition: { x: 200, y: 75 }, width: 440 },
  team:    { title: 'Our Team', icon: '👾', defaultPosition: { x: 220, y: 65 }, width: 460 },
  events:  { title: 'Events',   icon: '🏆', defaultPosition: { x: 240, y: 85 }, width: 440 },
  contact: { title: 'Contact',  icon: '📬', defaultPosition: { x: 260, y: 70 }, width: 420 },
};

interface SocialButtonProps {
  href: string;
  bg: string;
  color: string;
  emoji: string;
  label: string;
  description: string;
}

function SocialButton({ href, bg, color, emoji, label, description }: SocialButtonProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rip) => rip.id !== id)), 650);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-btn"
      style={{ background: bg, color } as React.CSSProperties}
      onClick={handleClick}
    >
      <span className="social-btn-emoji">{emoji}</span>
      <span className="social-btn-text">
        <span className="social-btn-label">{label}</span>
        <span className="social-btn-desc">{description}</span>
      </span>
      <span className="social-btn-arrow">→</span>
      {ripples.map((r) => (
        <span key={r.id} className="ripple" style={{ left: r.x, top: r.y }} />
      ))}
    </a>
  );
}

function BunnyMascot() {
  return (
    <div className="mascot" aria-hidden="true">
      <svg viewBox="0 0 120 165" xmlns="http://www.w3.org/2000/svg" className="mascot-svg">
        <ellipse cx="42" cy="32" rx="11" ry="26" fill="white" stroke="#4b2e83" strokeWidth="2.5" />
        <ellipse cx="42" cy="32" rx="5.5" ry="20" fill="#e8d48b" opacity="0.65" />
        <ellipse cx="78" cy="32" rx="11" ry="26" fill="white" stroke="#4b2e83" strokeWidth="2.5" />
        <ellipse cx="78" cy="32" rx="5.5" ry="20" fill="#e8d48b" opacity="0.65" />
        <circle cx="60" cy="72" r="34" fill="white" stroke="#4b2e83" strokeWidth="2.5" />
        <circle cx="48" cy="67" r="5" fill="#4b2e83" />
        <circle cx="72" cy="67" r="5" fill="#4b2e83" />
        <circle cx="50" cy="65" r="1.8" fill="white" />
        <circle cx="74" cy="65" r="1.8" fill="white" />
        <ellipse cx="43" cy="77" rx="7.5" ry="5" fill="#e8d48b" opacity="0.5" />
        <ellipse cx="77" cy="77" rx="7.5" ry="5" fill="#e8d48b" opacity="0.5" />
        <ellipse cx="60" cy="76" rx="3" ry="2" fill="#b7a57a" />
        <path d="M 53 81 Q 60 87 67 81" stroke="#4b2e83" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <ellipse cx="60" cy="136" rx="30" ry="27" fill="white" stroke="#4b2e83" strokeWidth="2.5" />
        <text x="60" y="142" textAnchor="middle" fill="#4b2e83" fontSize="22" fontWeight="900" fontFamily="Arial, sans-serif">V</text>
        <ellipse cx="24" cy="122" rx="12" ry="7" fill="white" stroke="#4b2e83" strokeWidth="2" transform="rotate(-35 24 122)" />
        <ellipse cx="96" cy="122" rx="12" ry="7" fill="white" stroke="#4b2e83" strokeWidth="2" transform="rotate(35 96 122)" />
      </svg>
    </div>
  );
}

const STARS = Array.from({ length: 28 }, (_, i) => {
  const seed = i * 137.508;
  return {
    id: i,
    x: ((seed * 1.618) % 97) + 1.5,
    y: ((seed * 2.618) % 90) + 2,
    size: (i % 3) * 0.5 + 0.6,
    delay: (i % 5) * 0.6,
    symbol: ['✦', '✧', '★', '⋆', '·', '✦'][i % 6],
  };
});

export default function App() {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>({
    welcome: { isOpen: true, zIndex: 10 },
    about:   { isOpen: false, zIndex: 0 },
    team:    { isOpen: false, zIndex: 0 },
    events:  { isOpen: false, zIndex: 0 },
    contact: { isOpen: false, zIndex: 0 },
  });

  const openWindow = useCallback((id: WindowId) => {
    setWindows((w) => {
      const maxZ = Math.max(...Object.values(w).map((v) => v.zIndex)) + 1;
      return { ...w, [id]: { isOpen: true, zIndex: maxZ } };
    });
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((w) => ({ ...w, [id]: { ...w[id], isOpen: false } }));
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setWindows((w) => {
      const maxZ = Math.max(...Object.values(w).map((v) => v.zIndex)) + 1;
      return { ...w, [id]: { ...w[id], zIndex: maxZ } };
    });
  }, []);

  const taskbarItems = useMemo(
    () =>
      (Object.keys(WINDOWS_CONFIG) as WindowId[]).map((id) => ({
        id,
        title: WINDOWS_CONFIG[id].title,
        icon: WINDOWS_CONFIG[id].icon,
        isOpen: windows[id].isOpen,
      })),
    [windows]
  );

  return (
    <div className="desktop">
      <div className="desktop-bg" aria-hidden="true">
        {STARS.map((s) => (
          <span key={s.id} className="star"
            style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: `${s.size}em`, animationDelay: `${s.delay}s` }}>
            {s.symbol}
          </span>
        ))}
      </div>
      <header className="desktop-header">
        <span className="desktop-title">VALORANT @ UW</span>
        <span className="desktop-subtitle">University of Washington</span>
      </header>
      <nav className="desktop-icons">
        {([['about','🎮','About Us'],['team','👾','Our Team'],['events','🏆','Events'],['contact','📬','Contact']] as [WindowId,string,string][]).map(([id,emoji,label]) => (
          <DesktopIcon key={id} emoji={emoji} label={label} onClick={() => openWindow(id)} isActive={windows[id].isOpen} />
        ))}
      </nav>
      <BunnyMascot />

      <Window title="Welcome!" icon="✨" isOpen={windows.welcome.isOpen} onClose={() => closeWindow('welcome')} onFocus={() => focusWindow('welcome')} zIndex={windows.welcome.zIndex} defaultPosition={{ x: 160, y: 55 }} width={440}>
        <div className="welcome-content">
          <div className="welcome-logo"><span className="welcome-v">V</span></div>
          <h1 className="welcome-title">VALORANT @ UW</h1>
          <p className="welcome-subtitle">University of Washington's Premier Valorant RSO</p>
          <p className="welcome-desc">Compete, connect, and level up with the UW gaming community. Whether you're Radiant or just starting out — you belong here. ✦</p>
          <div className="welcome-actions">
            <a href="https://discord.gg/wYtfQdAvGc" target="_blank" rel="noopener noreferrer" className="btn btn--primary">Join our Discord ↗</a>
            <button className="btn btn--secondary" onClick={() => openWindow('about')}>Learn More →</button>
          </div>
          <div className="welcome-tags">
            <span className="tag">🏫 UW RSO</span>
            <span className="tag">🎮 Valorant</span>
            <span className="tag">⚔️ Competitive</span>
          </div>
        </div>
      </Window>

      <Window title="About Us" icon="🎮" isOpen={windows.about.isOpen} onClose={() => closeWindow('about')} onFocus={() => focusWindow('about')} zIndex={windows.about.zIndex} defaultPosition={{ x: 200, y: 75 }} width={440}>
        <div className="about-content">
          <h2 className="section-title">Who We Are 🎯</h2>
          <p className="section-text">Valorant @ UW is the University of Washington's official Valorant RSO — bringing together students who share a passion for tactical gameplay and competitive gaming.</p>
          <div className="about-grid">
            {[{emoji:'🏆',heading:'Competitive Play',body:'Organized scrimmages, tournaments, and ranked team play for all skill levels.'},{emoji:'👥',heading:'Community',body:'Regular meetups, watch parties, and socials to build lasting friendships.'},{emoji:'📈',heading:'Growth',body:'VOD reviews, coaching sessions, and workshops to elevate your game.'},{emoji:'🌟',heading:'Inclusive',body:'Welcoming players from Iron to Radiant — all ranks, all backgrounds.'}].map(({emoji,heading,body}) => (
              <div key={heading} className="about-card"><span className="about-card-emoji">{emoji}</span><h3>{heading}</h3><p>{body}</p></div>
            ))}
          </div>
          <div className="about-cta"><button className="btn btn--primary" onClick={() => openWindow('contact')}>Get In Touch ✨</button></div>
        </div>
      </Window>

      <Window title="Our Team" icon="👾" isOpen={windows.team.isOpen} onClose={() => closeWindow('team')} onFocus={() => focusWindow('team')} zIndex={windows.team.zIndex} defaultPosition={{ x: 220, y: 65 }} width={460}>
        <div className="team-content">
          <h2 className="section-title">Meet the Team 👾</h2>
          <p className="section-text">The people who make Valorant @ UW possible.</p>
          <div className="team-grid">
            {[{role:'President',emoji:'👑',desc:'Club leadership & vision'},{role:'VP',emoji:'⭐',desc:'Operations & planning'},{role:'Treasurer',emoji:'💰',desc:'Finance & budgeting'},{role:'Events Lead',emoji:'🎉',desc:'Tournaments & socials'},{role:'Media Lead',emoji:'📸',desc:'Content & outreach'},{role:'Coach',emoji:'🎯',desc:'Strategy & improvement'}].map(({role,emoji,desc}) => (
              <div key={role} className="team-card"><span className="team-card-emoji">{emoji}</span><p className="team-card-role">{role}</p><p className="team-card-desc">{desc}</p></div>
            ))}
          </div>
          <p className="team-note">✦ Interested in joining leadership? Reach out to us!</p>
        </div>
      </Window>

      <Window title="Events" icon="🏆" isOpen={windows.events.isOpen} onClose={() => closeWindow('events')} onFocus={() => focusWindow('events')} zIndex={windows.events.zIndex} defaultPosition={{ x: 240, y: 85 }} width={440}>
        <div className="events-content">
          <h2 className="section-title">Events & Tournaments 🏆</h2>
          <p className="section-text">Stay up to date with everything Valorant @ UW.</p>
          <div className="events-list">
            {[{label:'Weekly Scrimmages',when:'Every Wednesday',emoji:'⚔️',status:'ongoing'},{label:'Spring Invitational',when:'May 2025',emoji:'🥇',status:'upcoming'},{label:'New Member Social',when:'Every Quarter',emoji:'🎉',status:'ongoing'},{label:'VOD Review Sessions',when:'Bi-weekly',emoji:'📹',status:'ongoing'}].map(({label,when,emoji,status}) => (
              <div key={label} className="event-item">
                <span className="event-emoji">{emoji}</span>
                <div className="event-info"><p className="event-name">{label}</p><p className="event-when">🗓 {when}</p></div>
                <span className={`event-badge event-badge--${status}`}>{status==='upcoming'?'⏳ Upcoming':'✅ Active'}</span>
              </div>
            ))}
          </div>
          <div className="events-cta"><a href="https://discord.gg/wYtfQdAvGc" target="_blank" rel="noopener noreferrer" className="btn btn--primary">Join Discord for Updates ↗</a></div>
        </div>
      </Window>

      <Window title="Contact" icon="📬" isOpen={windows.contact.isOpen} onClose={() => closeWindow('contact')} onFocus={() => focusWindow('contact')} zIndex={windows.contact.zIndex} defaultPosition={{ x: 260, y: 70 }} width={420}>
        <div className="contact-content">
          <h2 className="section-title">Connect With Us 📬</h2>
          <p className="section-text">Find us on any of these platforms — we'd love to hear from you!</p>
          <div className="social-links">
            <SocialButton href="https://discord.gg/wYtfQdAvGc" bg="#5865f2" color="#ffffff" emoji="💬" label="Discord" description="discord.gg/wYtfQdAvGc" />
            <SocialButton href="https://www.instagram.com/valorant_uw/" bg="linear-gradient(135deg,#833ab4 0%,#e1306c 60%,#fd1d1d 100%)" color="#ffffff" emoji="📸" label="Instagram" description="@valorant_uw" />
            <SocialButton href="https://linkedin.com/company/valorant-uw" bg="#0a66c2" color="#ffffff" emoji="💼" label="LinkedIn" description="linkedin.com/company/valorant-uw" />
            <SocialButton href="mailto:valorant@uw.edu" bg="linear-gradient(135deg,#e8d48b 0%,#b7a57a 100%)" color="#2d1b69" emoji="✉️" label="Email" description="valorant@uw.edu" />
          </div>
        </div>
      </Window>

      <Taskbar items={taskbarItems} onItemClick={(id) => openWindow(id as WindowId)} />
    </div>
  );
}
