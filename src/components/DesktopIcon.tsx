interface DesktopIconProps {
  emoji: string;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

export function DesktopIcon({ emoji, label, onClick, isActive = false }: DesktopIconProps) {
  return (
    <button
      className={`desktop-icon${isActive ? ' desktop-icon--active' : ''}`}
      onClick={onClick}
      onDoubleClick={onClick}
    >
      <span className="desktop-icon-emoji">{emoji}</span>
      <span className="desktop-icon-label">{label}</span>
    </button>
  );
}
