
import './App.css'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import NoteModal, { NoteModalProps } from './components/NoteModal/NoteModal';
import { useSession } from './hooks/useSession';
import LoginPage from './pages/Login';
import { supabase } from './lib/supabaseClient'
import { Note } from './types/Note';
import { Project } from './types/Project';
import ProjectModal, { ProjectModalProps } from './components/ProjectModal/ProjectModal';
import NotYet from './pages/NotYet';


function App() {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteBeingEdited, setNoteBeingEdited] = useState<NoteModalProps['existingNote']>(undefined);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectBeingEdited, setProjectBeingEdited] = useState<Project | undefined>(undefined)
  const [projects, setProjects] = useState<{ id: string; title: string }[]>([]); 
  const [notes, setNotes] = useState<Note[]>([])
  const { session, loading } = useSession();

  useEffect(() => {
    const syncProfile = async () => {
      if (session?.user?.id) {
        //console.log(typeof session.user.id);
        await supabase.rpc('ensure_user_profile_exists', {
          uid: session.user.id,
        })
      }
    }

    syncProfile()
  }, [session])

  const fetchUserNotes = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
  
    if (!userId) return []
  
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('updated_at', { ascending: false })
  
    if (error) {
      console.error('Error fetching notes:', error.message)
      return []
    }
  
    return data
  }

  const fetchUserProjects = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
  
    if (!userId) return []
  
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false })
  
    if (error) {
      console.error('Error fetching notes:', error.message)
      return []
    }
    //console.log(data)
    return data
  }
  
  useEffect(() => {
    if (session) {
      fetchUserNotes().then(setNotes);
      fetchUserProjects().then(setProjects)
    }
  }, [session])


  if (loading) return <div className="p-4">Loading...</div>
  if (!session) return <LoginPage />

  const openNewNoteModal = () => {
    setNoteBeingEdited(undefined);
    setIsNoteModalOpen(true);
  };

  const openEditNoteModal = (note: Note) => {
    setNoteBeingEdited(note)
    setProjects(projects)
    setIsNoteModalOpen(true)
  }

  const openNewProjectModal = () => {
    setProjectBeingEdited(undefined);
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (project: ProjectModalProps['existingProject']) => {
    setProjectBeingEdited(project);
    setIsProjectModalOpen(true);
  };

  const handleSaveNote = async (noteData: {
    id?: string
    title: string
    content: string
    priority: 'High' | 'Medium' | 'Low'
    projectId?: string | null
    pinned: boolean
  }) => {
    const { data: user } = await supabase.auth.getUser()
    if (!user?.user?.id) {
      console.error("No authenticated user found.")
      return
    }
  
    if (noteData.id) {
      // UPDATE existing note
      const { error } = await supabase
        .from('notes')
        .update({
          title: noteData.title,
          content: noteData.content,
          priority: noteData.priority,
          project_id: noteData.projectId ?? null,
          updated_at: new Date().toISOString(),
          pinned: noteData.pinned
        })
        .eq('id', noteData.id)
        .eq('owner_id', user.user.id)
  
      if (error) {console.error('Error updating note:', error.message)}
        else {
          fetchUserNotes().then(setNotes)
        }
    } else {
      // INSERT new note
      const { error } = await supabase.from('notes').insert({
        title: noteData.title,
        content: noteData.content,
        priority: noteData.priority,
        project_id: noteData.projectId ?? null,
        owner_id: user.user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        pinned: noteData.pinned
      })
  
      if (error) {console.error('Error inserting note:', error.message)}
      else {
        fetchUserNotes().then(setNotes)
      }
    }
  }

  const handleTogglePin = async (id: string, currentPinned: boolean) => {
    const { error } = await supabase
      .from('notes')
      .update({ pinned: !currentPinned })
      .eq('id', id)
  
    if (error) {
      console.error('Error toggling pinned state:', error.message)
    } else {
      fetchUserNotes().then(setNotes)
    }
  }
  
  const handleSaveProject = async (projectData: { id?: string; title: string }) => {
    const { data: user } = await supabase.auth.getUser()
    const userId = user?.user?.id
    if (!userId) return
  
    if (projectData.id) {
      const { error, data } = await supabase
        .from('projects')
        .update({ title: projectData.title })
        .eq('id', projectData.id)
        .eq('owner_id', userId)
        .select()
  
      if (error) {
        console.error('Error updating project:', error.message)
      } else {
        console.log('Updated project:', data)
        fetchUserProjects().then(setProjects)
      }
    } else {
      const { error } = await supabase.from('projects').insert({
        title: projectData.title,
        owner_id: userId,
        created_at: new Date().toISOString(),
      })
  
      if (error) console.error('Error creating project:', error.message)
      else fetchUserProjects().then(setProjects)
    }
  }
  

  const handleDeleteProject = async (projectId: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)
  
    if (error) {
      console.error('Error deleting project:', error.message)
    } else {
      // Refresh the projects list
      fetchUserProjects().then(setProjects)
    }
  }
  

  return (
    <Router>
    <div className="flex h-screen w-screen">
      <Sidebar 
        projects={projects}
        onNewProjectClick={openNewProjectModal}  
        onRenameProject={openEditProjectModal}
        onDeleteProject={handleDeleteProject}
      />
      <main className="flex-1 overflow-y-auto">
        <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              notes={notes}
              onEditNote={openEditNoteModal}
              onTogglePin={handleTogglePin}
              onNewNoteClick={openNewNoteModal} 
            />
          }
        />
          <Route 
            path="/project/:id" 
            element={
              <ProjectPage 
                onEditNote={openEditNoteModal}
                onTogglePin={handleTogglePin}
                onNewNoteClick={openNewNoteModal} 
              />} 
            />
            <Route path='/NotYet' element={<NotYet />}/>
        </Routes>
      </main>
      <NoteModal 
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSave={handleSaveNote}
        existingNote={noteBeingEdited}
        projects={projects}
      />
      <ProjectModal 
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={handleSaveProject}
        existingProject={projectBeingEdited}
      />
    </div>
  </Router>
  );
}

export default App
