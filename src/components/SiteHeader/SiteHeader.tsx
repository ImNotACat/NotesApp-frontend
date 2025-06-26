import React, { useEffect, useState, useRef } from 'react'
import { Bell, User } from 'lucide-react'
import styles from './SiteHeader.module.css'
import { supabase } from '../../lib/supabaseClient'

interface Profile {
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
}

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, avatar_url')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error.message)
      } else {
        //console.log(data)
        setProfile(data)
      }
    }

    fetchProfile()
  }, [])

  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setShowMenu(false);
        }
      };
    
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

  const displayName = profile
    ? `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim()
    : 'Loading...'

  return (
    <header className={styles['header-main']}>
      <div className={styles['header-search-wrapper']}>
        <input
          type="text"
          placeholder="Search..."
          className={styles['header-search-input']}
        />
      </div>

      <div className={styles['header-right-side']}>
        <button className={styles['header-icon-wrapper']}>
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="relative">
          <div
            className={styles['header-user-wrapper']}
            onClick={toggleMenu}
          >
            <span className="font-medium mr-2">{displayName}</span>
            <div className={styles['header-user-icon-wrapper']}>
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="User avatar"
                  style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <User size={18} className="text-white" />
              )}
            </div>
          </div>

          {showMenu && (
            <div ref={menuRef} className={styles['dropdown-menu']}>
              <div className="flex justify-end px-4 py-2 w-48">
                <button
                  onClick={handleLogout}
                  className={styles['logout-button']}
                >
                  Log out
                </button>
              </div>
            </div>

          )}
        </div>
      </div>
    </header>
  )
}

export default Header
