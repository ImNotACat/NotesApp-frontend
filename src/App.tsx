
import './App.css'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import NoteModal, { NoteModalProps } from './components/NoteModal/NoteModal';
import {Note} from './types/Note';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteBeingEdited, setNoteBeingEdited] = useState<NoteModalProps['existingNote']>(undefined);
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]); // You'd load this from Supabase or somewhere

  
  const openNewNoteModal = () => {
    setNoteBeingEdited(undefined);
    setIsModalOpen(true);
  };

  const openEditNoteModal = (note: NoteModalProps['existingNote']) => {
    setNoteBeingEdited(note);
    setProjects(projects);
    setIsModalOpen(true);
  };

  const handleSaveNote = (noteData: Omit<Note, 'id'> & { id?: string }) => {
    // handle save to Supabase or state
    console.log('Saving note:', noteData);
  };

  return (
    <Router>
      <div className="flex h-screen w-screen">
        <Sidebar onNewNoteClick={openNewNoteModal}/>

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard onEditNote={openEditNoteModal}/>} />
            <Route path="/project/:id" element={<ProjectPage />} />
          </Routes>
        </main>
        
        <NoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveNote}
          existingNote={noteBeingEdited}
          projects={projects}
        />
      </div>
    </Router>
  );
}

export default App
