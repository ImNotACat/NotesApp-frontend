export type Priority = 'High' | 'Medium' | 'Low';

export interface Note {
  id: string
  title: string
  content: string
  priority: 'High' | 'Medium' | 'Low'
  project_id?: string | null
  created_at?: string
  updated_at?: string
  owner_id: string
  pinned: boolean
}
