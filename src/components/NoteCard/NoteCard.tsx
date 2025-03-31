import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Pin, PinOff } from 'lucide-react';
import styles from './NoteCard.module.css'

interface NoteCardProps {
  id: string;
  title: string;
  body: string;
  priority: 'High' | 'Medium' | 'Low';
  projectId?: string | null;
  pinned: boolean;
  onTogglePin: (id: string) => void;
  onClick?: (id: string) => void;
  onRename: (id: string) => void;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ id, title, body, priority, pinned, onTogglePin, onClick, onRename, onShare, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const priorityColors: Record<NoteCardProps['priority'], string> = {
    High: '#ef444433',   // red-500
    Medium: '#DFA87433', // amber-500
    Low: '#A7F3D033'     // emerald-500
  };

  const priorityTextColors: Record<NoteCardProps['priority'], string> = {
    High: '#ef4444',   // red-500
    Medium: '#f59e0b', // amber-500
    Low: '#10B981'     // emerald-500
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  

  return (
    <div
      className="note-card"
      onClick={() => onClick?.(id)}
      role="button"
      tabIndex={0}
    >
      <div className={styles['note-card']} ref={cardRef}>
        <div className={styles['note-card-header']}>
        <span
            className={styles['note-priority']}
            style={{ backgroundColor: priorityColors[priority], color: priorityTextColors[priority] }}
          >
            {priority}
          </span>
          <div className={styles["note-header-icons"]}>
            <button
              className={styles["note-icon"]}
              onClick={(e) => {
                e.stopPropagation()
                onTogglePin(id)
              }}
              aria-label="Toggle pinned"
            >
              {pinned ? <PinOff size={18} /> : <Pin size={18} />}
            </button>
            <div className={styles["note-menu-wrapper"]} ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)} className={styles["note-icon"]}>
                <MoreVertical size={18} />
              </button>
              {menuOpen && (
                <div className={styles['note-menu']}>
                  <button onClick={() => onRename(id)}>Rename</button>
                  <button onClick={() => onShare(id)}>Share</button>
                  <button onClick={() => onDelete(id)}>Delete</button>
                </div>
              )}
            </div>            
          </div>

        </div>

        <h3 className={styles['note-title']}>{title}</h3>
        <p className={styles['note-preview']}>{body.slice(0, 100)}...</p>
      </div>      
    </div>

  );
};

export default NoteCard;
