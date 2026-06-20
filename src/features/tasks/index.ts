// tasks exposes its types, service, and slice pieces
export type { Task, TaskStatus } from './taskService';
export { fetchTasks, updateTaskStatus } from './taskService';
export { default as tasksReducer, taskMoved, loadTasks, saveTaskStatus } from './tasksSlice';