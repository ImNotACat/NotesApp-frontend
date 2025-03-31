import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Folder, House, Mails, ClipboardList, Settings, Ellipsis, SquarePlus } from "lucide-react"; 
import ArrowBackIosNewRounded from '@mui/icons-material/ArrowBackIosNewRounded';
import { Project } from '../types/Project';

/*const projects = [
  { id: "1", name: "Project Alpha" },
  { id: "2", name: "Project Beta" },
  { id: "3", name: "Project Gamma" },
];*/

interface SidebarProps {
  projects: Project[];
  onNewProjectClick: () => void;
  onRenameProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;

}

const Sidebar: React.FC<SidebarProps> = ({
  projects,
  onNewProjectClick,
  onRenameProject,
  onDeleteProject,
}) => {

  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleRename = (id: string) => {
    const project = projects.find((p) => p.id === id)
    if (project) {
      onRenameProject(project)
    }
  }
  const handleShare = (id: string) => {
    console.log("Share:", id);
  };
  
  const handleDelete = (id: string) => {
    onDeleteProject(id)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
      <div
      className={`sidebar-main-div ${collapsed ? 'w-sidebar-collapsed' : 'w-sidebar'}`}>

      {!collapsed ? (
        <div className="sidebar-top">
          <h2 className="text-lg font-bold">Projects</h2>
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="sidebar-icon-button"
          >
            <ArrowBackIosNewRounded
              sx={{
                transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
                fontSize: 20,
              }}
            />
          </button>
        </div>        
      ) : (
      <div className="sidebar-top">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="sidebar-icon-button"
        >
          <ArrowBackIosNewRounded
            sx={{
              transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
              fontSize: 20,
            }}
          />
        </button>
      </div> 
      )}

      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <ul className="sidebar-menu">
          <li>
             <Link to={'./'} className="sidebar-menu-item">
                <House size={25} />
                {!collapsed && <span  style={{ color: 'inherit' }}>Home</span>}
             </Link>
          </li>
          <li>
             <Link to={'./NotYet'} className="sidebar-menu-item">
                <Mails size={25} />
                {!collapsed && <span>Messages</span>}
             </Link>
          </li>
          <li>
             <Link to={'./NotYet'} className="sidebar-menu-item">
                <ClipboardList size={25} />
                {!collapsed && <span>Tasks</span>}
             </Link>
          </li>
          <li>
             <Link to={'./NotYet'} className="sidebar-menu-item">
                <Settings size={25} />
                {!collapsed && <span>Settings</span>}
             </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-divider-wrapper">
        <div className="sidebar-divider"></div>
      </div>

      {!collapsed ? (
        <div className="sidebar-title flex items-center justify-between">
          <div>MY PROJECTS</div>
            <button className="sidebar-title-icon" onClick={onNewProjectClick}>
            <SquarePlus size={20} />
          </button>
        </div>) : (
        <div className="sidebar-title flex items-center justify-between">
            <button className="sidebar-title-icon" onClick={onNewProjectClick}>
            <SquarePlus size={20} />
          </button>
        </div>
      )}
      

      <div className={`sidebar flex flex-col h-full ${collapsed ? 'collapsed' : ''}`}>
        <ul className="sidebar-list">
          {projects.map((project) => {
            const isActive = location.pathname === `/project/${project.id}`;
            const showMenu = activeMenu === project.id;

            return (
              <li key={project.id} className="sidebar-list-item-wrapper">
                <Link
                  to={`/project/${project.id}`}
                  className={`sidebar-list-item ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                  style={{
                    color: project.project_colour || 'inherit',
                  }}
                >
                  <Folder
                    size={18}
                    style={{ color: project.project_colour || 'inherit' }}
                  />
                  {!collapsed && <span>{project.title}</span>}
                </Link>

                {!collapsed && (
                  <div
                    className="ellipsis-container"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu((prev) => (prev === project.id ? null : project.id));
                    }}
                  >
                    <Ellipsis size={18} />
                  </div>
                )}

                {showMenu && (
                  <div ref={menuRef} className="item-options-menu">
                    <button onClick={() => handleRename(project.id)}>Rename</button>
                    <button onClick={() => handleShare(project.id)}>Share</button>
                    <button onClick={() => handleDelete(project.id)}>Delete</button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>        
      </div>

    </div>
  );
}

export default Sidebar;