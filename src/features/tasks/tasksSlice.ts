import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchTasks, updateTaskStatus, type Task, type TaskStatus } from './taskService';

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

// load all tasks from the API
export const loadTasks = createAsyncThunk('tasks/load', async () => {
  return await fetchTasks();
});

// save a task's new status to the API
export const saveTaskStatus = createAsyncThunk(
  'tasks/saveStatus',
  async ({ id, status }: { id: string; status: TaskStatus }) => {
    await updateTaskStatus(id, status);
    return { id, status };
  },
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // optimistic move: change a task's status in the store immediately
    taskMoved(state, action: PayloadAction<{ id: string; status: TaskStatus }>) {
      const task = state.items.find((t) => String(t.id) === action.payload.id);
      if (task) task.status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadTasks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load tasks';
      })
      .addCase(saveTaskStatus.rejected, (state) => {
        state.error = 'Could not save that change.';
      });
  },
});

export const { taskMoved } = tasksSlice.actions;
export default tasksSlice.reducer;