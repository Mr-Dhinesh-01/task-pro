import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

// types describing the whole store, for typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;