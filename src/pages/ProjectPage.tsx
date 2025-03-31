import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from '../components/SiteHeader/SiteHeader';
import styles from '../styles/Project.module.css'
import { supabase } from "../lib/supabaseClient";
import { Note, Priority } from "../types/Note";
import { Project } from "../types/Project";
import NoteCard from "../components/NoteCard/NoteCard";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";

interface ProjectPagedProps {
  onEditNote: (note: Note) => void
  onTogglePin: (id: string, currentPinned: boolean) => void
  onNewNoteClick: () => void
}

const ProjectPage: React.FC<ProjectPagedProps> = ({ onEditNote, onTogglePin, onNewNoteClick }) => {
  const { id: projectId } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const pinnedNotes = notes.filter((note) => note.pinned)
  
  useEffect(() => {
    if (!projectId) return
  
    const fetchData = async () => {
      setLoading(true)
  
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single()
  
      const { data: notesData, error: notesError } = await supabase
        .from('notes')
        .select('*')
        .eq('project_id', projectId)
        .order('updated_at', { ascending: false })
  
      if (projectError) console.error('Project fetch error:', projectError.message)
      else setProject(projectData)
  
      if (notesError) console.error('Notes fetch error:', notesError.message)
      else setNotes(notesData)
      
      console.log(project);
      console.log(notes)
      console.log(loading)
      setLoading(false)
    }
  
    fetchData()
  }, [projectId])

  const handleCardClick = (id: string) => {
    const note = notes.find((n) => n.id === id)
    if (note) {
      onEditNote(note)
    }
  }

  if (loading) return <div className="p-4">Loading...</div>
  if (!project) return <div className="p-4">Project not found</div>

  return (
    
    <div className="flex flex-col min-h-screen overflow-hidden"> 
      <Header />
      <div className={styles["project-header-wrapper"]}>
        <div className={styles["project-header"]}>
            <h1 className="text-2xl font-bold"> {project.title}</h1>
        </div>         
      </div>
     
      <DashboardHeader onNewNoteClick={onNewNoteClick} />
      <div className="dashboard-body">
        <div className="dashboard-left">
          <div className="section-header-wrapper">
            <div className="section-header">
              <div className="section-dot-pinned"></div>
              <h2 className="section-title">Pinned</h2>
            </div>
            <div className="section-divider-pinned"></div>
          </div>

          <div className="pinned-cards">
            {pinnedNotes.length === 0 ? (
              <p className="text-sm text-gray-500 px-4">No pinned notes yet.</p>
            ) : (
              pinnedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  body={note.content}
                  priority={note.priority as Priority}
                  pinned={note.pinned}
                  onTogglePin={() => onTogglePin(note.id, note.pinned ?? false)}
                  onClick={handleCardClick}
                  onRename={(id) => console.log('rename', id)}
                  onShare={(id) => console.log('share', id)}
                  onDelete={(id) => console.log('delete', id)}
                />
              ))
            )}
          </div>
        </div>

        <div className="dashboard-right">
          <div className="section-header-wrapper">
            <div className="section-header">
              <div className="section-dot-all"></div>
              <h2 className="section-title">All Items</h2>
            </div>
            <div className="section-divider-all"></div>
          </div>

          <div className="all-cards">
            {notes.length === 0 ? (
              <p className="text-sm text-gray-500 px-4">No notes yet.</p>
            ) : (
              notes.map((note) => (
                <NoteCard
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  body={note.content}
                  priority={note.priority as Priority}
                  pinned={note.pinned}
                  onTogglePin={() => onTogglePin(note.id, note.pinned ?? false)}
                  onClick={handleCardClick}
                  onRename={(id) => console.log('rename', id)}
                  onShare={(id) => console.log('share', id)}
                  onDelete={(id) => console.log('delete', id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage