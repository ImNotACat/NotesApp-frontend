import React from 'react';
import Header from '../components/SiteHeader/SiteHeader';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import NoteCard from '../components/NoteCard/NoteCard';
import { Note, Priority } from '../types/Note';

interface DashboardProps {
  notes: Note[]
  onEditNote: (note: Note) => void
  onTogglePin: (id: string, currentPinned: boolean) => void
  onNewNoteClick: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ notes, onEditNote, onTogglePin, onNewNoteClick }) => {
  const pinnedNotes = notes.filter((note) => note.pinned)
  const unpinnedNotes = notes.filter((note) => !note.pinned)

  const handleCardClick = (id: string) => {
    const note = notes.find((n) => n.id === id)
    if (note) {
      onEditNote(note)
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
                  onDelete={(id) => console.log('delete', id)}
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