import React from "react";
import FilterButtons from "./FilterButtons/FilterButtons";
import Button from "../Button/Button";
import { FilterType } from "../../types";
import "./TodoFooter.scss";

interface TodoFooterProps {
  activeTodoCount: number;
  filter: FilterType;
  onSetFilter: (filter: FilterType) => void;
  onClearCompleted: () => void;
  hasCompletedTodos: boolean;
}

const TodoFooter: React.FC<TodoFooterProps> = ({
  activeTodoCount,
  filter,
  onSetFilter,
  onClearCompleted,
  hasCompletedTodos,
}) => {
  return (
    <div className="footer">
      <span className="todo-count">{activeTodoCount} tasks left</span>
      <div className="filters">
        <FilterButtons filter={filter} onSetFilter={onSetFilter} />
      </div>
      <Button
        variant="danger"
        size="sm"
        className="clear-completed"
        onClick={onClearCompleted}
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </Button>
    </div>
  );
};

export default React.memo(TodoFooter);
