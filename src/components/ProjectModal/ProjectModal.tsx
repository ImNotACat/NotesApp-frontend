import React, { useState, useEffect } from 'react'
import styles from './ProjectModal.module.css'

export interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (projectData: { title: string }) => void
  existingProject?: { id: string; title: string }
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  existingProject,
}) => {
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (existingProject) {
        setTitle(existingProject.title)
    } else {
        setTitle('')
    }
  }, [existingProject, isOpen])

  const handleSave = () => {
    if (title.trim() === '') return
    onSave({
        title,
        ...(existingProject?.id ? { id: existingProject.id } : {})
      })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles['project-modal-backdrop']}>
      <div className={styles['project-modal']}>
        <div className={styles['project-modal-header']}>
          <h2 className={styles['project-modal-title']}>
            {existingProject ? 'Edit Project' : 'New Project'}
          </h2>
          <button
            onClick={onClose}
            className={styles['close-button']}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <label className={styles['project-label']}>Project Name</label>
        <input
          className={styles['project-input']}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter project name"
        />

        <div className={styles['project-actions']}>
          <button className={`${styles['project-btn']} ${styles['cancel']}`} onClick={onClose}>
            Cancel
          </button>
          <button className={`${styles['project-btn']} ${styles['save']}`} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
