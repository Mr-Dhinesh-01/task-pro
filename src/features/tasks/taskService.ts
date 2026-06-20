import { apiClient } from '@/shared/api/apiClient';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: 'high' | 'medium' | 'low';
  userId: string;
}

// load every task for the board
export async function fetchTasks(): Promise<Task[]> {
  const res = await apiClient.get<Task[]>('/tasks');
  return res.data;
}

// save a single task's new status (what a drag produces)
export async function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  const res = await apiClient.patch<Task>(`/tasks/${id}`, { status });
  return res.data;
}