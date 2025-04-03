import React, { useState, useEffect } from 'react';
import Header from '../components/SiteHeader/SiteHeader';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import NoteCard from '../components/NoteCard/NoteCard';
import { Note, Priority } from '../types/Note';
import { supabase } from '../lib/supabaseClient';

interface DashboardProps {
  notes: Note[]
  onEditNote: (note: Note) => void
  onTogglePin: (id: string, currentPinned: boolean) => void
  onNewNoteClick: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ notes, onEditNote, onTogglePin, onNewNoteClick }) => {
  const [currNotes, setCurrNotes] = useState<Note[]>(notes ?? []);
  const [pinnedNotes, setPinnedNotes] = useState<Note[]>([])
  const [unpinnedNotes, setUnpinnedNotes] = useState<Note[]>([])

  useEffect(() => {
    if (notes) {
      setCurrNotes(notes);
    }
  }, [notes]);

  useEffect(() => {
    setPinnedNotes(currNotes.filter((note) => note.pinned));
    setUnpinnedNotes(currNotes.filter((note) => !note.pinned));
  }, [currNotes]);
  
  

  const handleCardClick = (id: string) => {
    const note = notes.find((n) => n.id === id)
    if (note) {
      onEditNote(note)
    }
  }

  const handleDeleteNote = async (id: string) =>{
    const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting note:', error.message);
  } else {
    console.log(`Note ${id} deleted successfully`);

    // Optionally: update local state so UI reflects deletion
    setCurrNotes((prev) => prev.filter((note) => note.id !== id));
  }
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
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
                  onDelete={(id) => handleDeleteNote(id)}
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
            {unpinnedNotes.length === 0 ? (
              <p className="text-sm text-gray-500 px-4">No notes yet.</p>
            ) : (
              unpinnedNotes.map((note) => (
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
                  onDelete={(id) => handleDeleteNote(id)}
                />
              ))
            )}
          </div>
        </div> 
      </div>
    </div>
  )
}

export default Dashboard