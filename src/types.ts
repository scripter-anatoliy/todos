export type FilterType = "all" | "active" | "completed";

export const FILTER_ALL = "all";
export const FILTER_ACTIVE = "active";
export const FILTER_COMPLETED = "completed";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
