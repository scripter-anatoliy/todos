import { TodosState } from "./todosSlice";

const STORAGE_KEY = "todos-app-state";

interface StoredState {
  list: TodosState["list"];
  filter: TodosState["filter"];
}

export type PersistedState = { todos: TodosState };

function loadFromStorage(): StoredState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: StoredState = JSON.parse(raw);
    if (
      !parsed ||
      !Array.isArray(parsed.list) ||
      typeof parsed.filter !== "string"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

// Загружаем состояние из localStorage
export function loadTodosState(): PersistedState | undefined {
  const stored = loadFromStorage();
  if (!stored) return undefined;
  return {
    todos: {
      list: stored.list,
      filter: stored.filter,
    },
  };
}

// Сохраняем состояние todos
export function saveTodosState(state: PersistedState): void {
  try {
    const payload: StoredState = {
      list: state.todos.list,
      filter: state.todos.filter,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.warn("Не удалось сохранить задачи в localStorage", e);
  }
}
