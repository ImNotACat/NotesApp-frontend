import React from 'react';
import { Bell, User } from 'lucide-react';
import styles from './SiteHeader.module.css'

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header
      className={styles["header-main"]}
    >

      <div className={styles["header-search-wrapper"]}>
        <input
          type="text"
          placeholder="Search..."
          className={styles["header-search-input"]}/>

      </div>

      <div className={styles["header-right-side"]}>
        <button className={styles["header-icon-wrapper"]}>
          <Bell size={20} />
          {/* Example badge */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className={styles["header-user-wrapper"]}>
          <span className="font-medium">{userName}</span>
          <div className={styles["header-user-icon-wrapper"]}>
            <User size={18} className="text-white" />
          </div>
        </div>
      </div>


    </header>
  );
};

export default Header;
