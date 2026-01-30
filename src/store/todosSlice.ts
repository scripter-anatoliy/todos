import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, FilterType, FILTER_ALL } from "../types";

export interface TodosState {
  list: Todo[];
  filter: FilterType;
}

const initialState: TodosState = {
  list: [],
  filter: FILTER_ALL,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      state.list.unshift({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.list.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; text: string }>,
    ) => {
      const todo = state.list.find((t) => t.id === action.payload.id);
      const text = action.payload.text.trim();
      if (todo && text) todo.text = text;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
    clearCompleted: (state) => {
      state.list = state.list.filter((t) => !t.completed);
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    reorderTodos: (
      state,
      action: PayloadAction<{ activeId: string; overId: string }>,
    ) => {
      const { activeId, overId } = action.payload;
      const fromIndex = state.list.findIndex((t) => t.id === activeId);
      const toIndex = state.list.findIndex((t) => t.id === overId);
      if (fromIndex === -1 || toIndex === -1) return;
      const [item] = state.list.splice(fromIndex, 1);
      state.list.splice(toIndex, 0, item);
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
  clearCompleted,
  setFilter,
  reorderTodos,
} = todosSlice.actions;
export default todosSlice.reducer;
