export type Priority = 'High' | 'Medium' | 'Low';

export interface Note {
  id: string;
  title: string;
  content: string;
  priority: Priority;
  projectId?: string | null;
}
