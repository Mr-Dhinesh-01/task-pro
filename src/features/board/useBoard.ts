import { useEffect, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadTasks, saveTaskStatus, taskMoved } from '@/features/tasks/tasksSlice';
import type { Task, TaskStatus } from '@/features/tasks/taskService';

export function useBoard() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.items);
  const loading = useAppSelector((state) => state.tasks.loading);
  const error = useAppSelector((state) => state.tasks.error);

  // load tasks once on mount by dispatching the thunk
  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  // group tasks by status for the columns (same as before)
  const tasksByStatus = useMemo(() => {
    return {
      todo: tasks.filter((t) => t.status === 'todo'),
      'in-progress': tasks.filter((t) => t.status === 'in-progress'),
      done: tasks.filter((t) => t.status === 'done'),
    } as Record<TaskStatus, Task[]>;
  }, [tasks]);

  // optimistic move (taskMoved) then persist (saveTaskStatus)
  const moveTaskAndSave = useCallback(
    (id: string, status: TaskStatus) => {
      dispatch(taskMoved({ id, status }));
      dispatch(saveTaskStatus({ id, status }));
    },
    [dispatch],
  );

  return { tasksByStatus, loading, error, moveTaskAndSave };
}