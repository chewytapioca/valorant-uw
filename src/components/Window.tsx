import { useRef, useCallback, useState, type ReactNode } from 'react';

interface WindowProps {
  title: string;
  icon?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  width?: number;
}

export function Window({
  title,
  icon = '🪟',
  children,
  isOpen,
  onClose,
  onFocus,
  zIndex,
  defaultPosition,
  width = 420,
}: WindowProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [isMinimized, setIsMinimized] = useState(false);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleTitlebarMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest('.window-controls')) return;
      isDragging.current = true;
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      onFocus();

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        setPosition({
          x: Math.max(0, e.clientX - dragOffset.current.x),
          y: Math.max(0, e.clientY - dragOffset.current.y),
        });
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [position, onFocus]
  );

  if (!isOpen) return null;

  return (
    <div
      className={`window${isMinimized ? ' window--minimized' : ''}`}
      style={{ left: position.x, top: position.y, zIndex, width }}
      onMouseDown={onFocus}
    >
      <div className="window-titlebar" onMouseDown={handleTitlebarMouseDown}>
        <span className="window-title">
          <span className="window-title-icon">{icon}</span>
          {title}
        </span>
        <div className="window-controls">
          <button
            className="window-btn window-btn--minimize"
            onClick={() => setIsMinimized((m) => !m)}
            aria-label={isMinimized ? 'Restore' : 'Minimize'}
          >
            {isMinimized ? '+' : '−'}
          </button>
          <button
            className="window-btn window-btn--close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>
      {!isMinimized && <div className="window-body">{children}</div>}
    </div>
  );
}
