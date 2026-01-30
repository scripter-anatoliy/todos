import React, { useCallback } from "react";
import "./App.scss";
import TodoInput from "./components/TodoInput/TodoInput";
import GripVerticalIcon from "./components/icons/GripVerticalIcon";
import TodoList from "./components/TodoList/TodoList";
import TodoFooter from "./components/TodoFooter/TodoFooter";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  selectFilteredTodos,
  selectFilter,
  selectActiveTodoCount,
  selectHasCompletedTodos,
} from "./store/selectors";
import {
  addTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
  reorderTodos,
  clearCompleted,
  setFilter,
} from "./store/todosSlice";
import { FilterType } from "./types";
import { v4 } from "uuid";

function App() {
  const dispatch = useAppDispatch();
  const filteredTodos = useAppSelector(selectFilteredTodos);
  const filter = useAppSelector(selectFilter);
  const activeTodoCount = useAppSelector(selectActiveTodoCount);
  const hasCompletedTodos = useAppSelector(selectHasCompletedTodos);

  const handleAddTodo = useCallback(
    (text: string) => {
      dispatch(addTodo({ id: v4(), text }));
    },
    [dispatch],
  );

  const handleToggleTodo = useCallback(
    (id: string) => dispatch(toggleTodo(id)),
    [dispatch],
  );

  const handleUpdateTodo = useCallback(
    (id: string, text: string) => dispatch(updateTodo({ id, text })),
    [dispatch],
  );

  const handleDeleteTodo = useCallback(
    (id: string) => dispatch(deleteTodo(id)),
    [dispatch],
  );

  const handleReorder = useCallback(
    (activeId: string, overId: string) =>
      dispatch(reorderTodos({ activeId, overId })),
    [dispatch],
  );

  const handleClearCompleted = useCallback(
    () => dispatch(clearCompleted()),
    [dispatch],
  );

  const handleSetFilter = useCallback(
    (f: FilterType) => dispatch(setFilter(f)),
    [dispatch],
  );

  return (
    <div className="App">
      <h1>todos</h1>
      <TodoInput onAdd={handleAddTodo} />
      <p className="App__hint">
        Задачи можно перетаскивать за{" "}
        <span className="App__hint-icon" aria-hidden>
          <GripVerticalIcon size={14} />
        </span>{" "}
        в начале строки
      </p>
      <TodoList
        todos={filteredTodos}
        onToggle={handleToggleTodo}
        onUpdate={handleUpdateTodo}
        onDelete={handleDeleteTodo}
        onReorder={handleReorder}
      />
      <TodoFooter
        activeTodoCount={activeTodoCount}
        filter={filter}
        onSetFilter={handleSetFilter}
        onClearCompleted={handleClearCompleted}
        hasCompletedTodos={hasCompletedTodos}
      />
    </div>
  );
}

export default App;
