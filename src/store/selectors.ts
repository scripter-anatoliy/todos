import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { FILTER_ACTIVE, FILTER_COMPLETED } from "../types";

const selectTodoList = (state: RootState) => state.todos.list;
export const selectFilter = (state: RootState) => state.todos.filter;

export const selectFilteredTodos = createSelector(
  [selectTodoList, selectFilter],
  (list, filter) => {
    if (filter === FILTER_ACTIVE) return list.filter((t) => !t.completed);
    if (filter === FILTER_COMPLETED) return list.filter((t) => t.completed);
    return list;
  },
);

export const selectActiveTodoCount = createSelector(
  [selectTodoList],
  (list) => list.filter((t) => !t.completed).length,
);

export const selectHasCompletedTodos = createSelector(
  [selectTodoList],
  (list) => list.some((t) => t.completed),
);
