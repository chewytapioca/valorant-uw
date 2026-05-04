import { useEffect, useState } from 'react';

interface TaskbarItem {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
}

interface TaskbarProps {
  items: TaskbarItem[];
  onItemClick: (id: string) => void;
}

export function Taskbar({ items, onItemClick }: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="taskbar">
      <div className="taskbar-start">
        <button className="taskbar-start-btn" aria-label="Start">
          <span className="taskbar-uw-logo">W</span>
        </button>
      </div>
      <div className="taskbar-items">
        {items.filter((i) => i.isOpen).map((item) => (
          <button
            key={item.id}
            className="taskbar-item"
            onClick={() => onItemClick(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      <div className="taskbar-clock">
        <span className="taskbar-time">{formattedTime}</span>
        <span className="taskbar-date">{formattedDate}</span>
      </div>
    </div>
  );
}
