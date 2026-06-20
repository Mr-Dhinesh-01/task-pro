import type { TaskStatus } from '@/features/tasks/taskService';

export interface Column {
  id: TaskStatus;
  label: string;
}

export const COLUMNS: Column[] = [
  { id: 'todo', label: 'To-do' },
  { id: 'in-progress', label: 'In-progress' },
  { id: 'done', label: 'Done' },
];