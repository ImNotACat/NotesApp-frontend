import React, { useState, useEffect } from 'react';
import styles from './NoteModal.module.css'

type Priority = 'High' | 'Medium' | 'Low';

export interface NoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (note: {
      id?: string;
      title: string;
      content: string;
      priority: Priority;
      projectId?: string | null;
      pinned: boolean
    }) => void;
    existingNote?: {
      id: string;
      title: string;
      content: string;
      priority: Priority;
      projectId?: string | null;
      pinned: boolean
    };
    projects: { id: string; title: string }[];
  }

const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  existingNote,
  projects,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [projectId, setProjectId] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setPriority(existingNote.priority);
      setProjectId(existingNote.projectId ?? null);
      setPinned(existingNote.pinned)
    } else {
      setTitle('');
      setContent('');
      setPriority('Medium');
      setProjectId(null);
      setPinned(false)
    }
  }, [existingNote, isOpen]);

  const handleSave = () => {
    if (title.trim() === '') return;
    onSave({ id: existingNote?.id, title, content, priority, projectId, pinned });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles['note-modal-backdrop']}>
        <div className={styles['note-modal']}>
        <div className={styles['note-modal-header']}>
            <h2 className={styles['note-modal-title']}>
                {existingNote ? 'Edit Note' : 'New Note'}
            </h2>
            <button
                onClick={onClose}
                className={styles['close-button']}
                aria-label="Close modal"
            >
                &times;
            </button>
        </div>

            <label className={styles['note-label']}>Title</label>
            <input
            className={styles['note-input']}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />

            <label className={styles['note-label']}>Content</label>
            <textarea
            className={styles['note-textarea']}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />

            <div className={styles['note-row']}>
            <div className={styles['note-field']}>
            <label className={styles['note-label']}>Priority</label>
            <div className={styles['priority-bar']}>
                {(['High', 'Medium', 'Low'] as Priority[]).map((level) => (
                <button
                    key={level}
                    type="button"
                    className={`${styles['priority-option']} ${
                    priority === level ? styles['active'] : ''
                    }`}
                    onClick={() => setPriority(level)}
                >
                    {level}
                </button>
                ))}
            </div>
            </div>


            <div className={styles['note-field']}>
                <label className={styles['note-label']}>Project</label>
                <select
                className={styles['note-select']}
                value={projectId ?? ''}
                onChange={(e) =>
                    setProjectId(e.target.value === '' ? null : e.target.value)
                }
                >
                <option value="">None</option>
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                    {project.title}
                    </option>
                ))}
                </select>
            </div>
            </div>

            <div className={styles['note-actions']}>
            <button className={`${styles['note-btn']} ${styles['cancel']}`} onClick={onClose}>
                Cancel
            </button>
            <button className={`${styles['note-btn']} ${styles['save']}`} onClick={handleSave}>
                Save
            </button>
            </div>
        </div>
    </div>
  );
};

export default NoteModal;
