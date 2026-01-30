import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import { loadTodosState, saveTodosState } from "./localStoragePersistence";

const preloadedState = loadTodosState();

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState,
});

let saveTimeout: ReturnType<typeof setTimeout> | null = null;
const SAVE_DEBOUNCE_MS = 300;

store.subscribe(() => {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveTodosState(store.getState());
    saveTimeout = null;
  }, SAVE_DEBOUNCE_MS);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
