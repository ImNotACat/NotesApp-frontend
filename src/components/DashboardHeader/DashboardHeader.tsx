import { useState, useRef, useEffect } from 'react';
import styles from './Dashboard.module.css'
import { Users, Funnel, Plus } from 'lucide-react';

const priorities = ['Low', 'Medium', 'High'];

interface DashboardHeaderProps {
  onNewNoteClick: () => void
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onNewNoteClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [shareClick, setShareClick] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null);

  const togglePriority = (priority: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setShareClick(false);
        }
      };
    
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

  return (
    <div className={styles["dashboard-header"]}>
      {/* Left side: Filter dropdown */}
      <div className={styles["header-left"]}>
        <div className={styles["filter-container"]}>
          <button
            className={styles["filter-button"]}
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <Funnel size={18} />
            Filter
          </button>

          {dropdownOpen && (
            <div className={styles["filter-dropdown"]}>
              {priorities.map((priority) => (
                <label key={priority} className={styles["filter-option"]}>
                  <input
                    type="checkbox"
                    checked={selectedPriorities.includes(priority)}
                    onChange={() => togglePriority(priority)}
                  />
                  <span>{priority}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <button
          className={styles["new-button"]}
          onClick={onNewNoteClick}
          title="New Note"
        >
          <Plus size={18} />
          Add new note
          
        </button>
      </div>

      <div className={styles["header-right"]}>
        <div className={styles["share-wrapper"]}>
          <button 
            className={styles["share-button"]}
            onClick={() => setShareClick((prev) => !prev)}
          >
            <Users size={18} />
            Share
          </button>
          {shareClick && (
            <div ref={menuRef} className={styles["share-message"]}>
              <span>This ain't working yet, cowboy!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
