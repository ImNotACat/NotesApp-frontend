import { useState } from 'react';
import styles from './Dashboard.module.css'

const priorities = ['Low', 'Medium', 'High'];

interface DashboardHeaderProps {
  onNewNoteClick: () => void
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onNewNoteClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  const togglePriority = (priority: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  };

  return (
    <div className={styles["dashboard-header"]}>
      {/* Left side: Filter dropdown */}
      <div className={styles["header-left"]}>
        <div className={styles["filter-container"]}>
          <button
            className={styles["filter-button"]}
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
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
          Add new note
          
        </button>
      </div>

      <div className={styles["header-right"]}>
        <button className={styles["share-button"]}>Share</button>
      </div>
    </div>
  );
};

export default DashboardHeader;
