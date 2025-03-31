import React from 'react';
import Header from '../components/SiteHeader/Header';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import NoteCard from '../components/NoteCard/NoteCard';
import { Note, Priority } from '../types/Note';

interface HomeProps {
  onEditNote: (note: Note | undefined) => void;
}

/*interface DashboardProps {
  onEditNote: (note: Note) => void;
}*/

const Dashboard: React.FC<HomeProps> = ({ onEditNote }) => {

  const pinnedNotes = [
    {
      id: '1',
      title: 'Meeting Notes',
      content: 'Discussed project milestones and timelines for Q2. Follow up with marketing.',
      priority: 'High',
      projectId: "1"
    },
    {
      id: '2',
      title: 'Grocery List',
      content: 'Eggs, milk, bread, avocados, and some frozen blueberries for smoothies.',
      priority: 'Low',
      projectId: "2"
    },
    {
      id: '3',
      title: 'App Ideas',
      content: 'A journaling app with mood tracking and AI-generated prompts.',
      priority: 'Medium',
      projectId: "3"
    },
    {
      id: '4',
      title: 'Bug Report',
      content: 'Sidebar collapses on smaller screens when clicking outside. Investigate breakpoint logic.',
      priority: 'High',
      projectId: "4"
    },
    {
      id: '5',
      title: 'Workout Plan',
      content: 'Push/pull/legs routine. Track progress weekly and adjust volume as needed.',
      priority: 'Medium',
      projectId: "5"
    },
  ];

  const allNotes = [
    {
      id: '1',
      title: 'Meeting Notes',
      content: 'Discussed project milestones and timelines for Q2. Follow up with marketing.',
      priority: 'High',
      projectId: "6"
    },
    {
      id: '2',
      title: 'Grocery List',
      content: 'Eggs, milk, bread, avocados, and some frozen blueberries for smoothies.',
      priority: 'Low',
      projectId: "7"
    },
    {
      id: '3',
      title: 'App Ideas',
      content: 'A journaling app with mood tracking and AI-generated prompts.',
      priority: 'Medium',
      projectId: "8"
    },
    {
      id: '4',
      title: 'Bug Report',
      content: 'Sidebar collapses on smaller screens when clicking outside. Investigate breakpoint logic.',
      priority: 'High',
      projectId: "9"
    },
    {
      id: '5',
      title: 'Workout Plan',
      content: 'Push/pull/legs routine. Track progress weekly and adjust volume as needed.',
      priority: 'Medium',
      projectId: "10"
    },
  ];

  const handleCardClick = (id: string) => {
    const note = allNotes.find((n) => n.id === id) || pinnedNotes.find((n) => n.id === id);
  
    if (note) {
      onEditNote({
        id: note.id,
        title: note.title,
        content: note.content, // assuming body === content
        priority: note.priority as Priority,
        projectId: 'projectId' in note ? note.projectId ?? null : null,
      });
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header userName="Jane Doe" />
      <DashboardHeader />

      <div className="dashboard-body">
        <div className="dashboard-left">
          <div className="section-header-wrapper">
            <div className='section-header'>
              <div className='section-dot-pinned'></div>
              <h2 className="section-title">Pinned</h2>              
            </div>

            <div className="section-divider-pinned"></div>
          </div>
          <div className="pinned-cards">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                body={note.content}
                priority={note.priority as 'High' | 'Medium' | 'Low'}
                onClick={handleCardClick}
                onRename={(id) => console.log('rename', id)}
                onShare={(id) => console.log('share', id)}
                onDelete={(id) => console.log('delete', id)}
              />
            ))}
          </div>

        </div>

        <div className="dashboard-right">
          <div className="section-header-wrapper">
            <div className='section-header'>
              <div className='section-dot-all'></div>
              <h2 className="section-title">All Items</h2>
            </div>

            <div className="section-divider-all"></div>
          </div>
          <div className="all-cards">
            {allNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  body={note.content}
                  priority={note.priority as 'High' | 'Medium' | 'Low'}
                  onRename={(id) => console.log('rename', id)}
                  onShare={(id) => console.log('share', id)}
                  onDelete={(id) => console.log('delete', id)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;