import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo } from "../../types";
import TodoItem from "../TodoItem/TodoItem";
import GripVerticalIcon from "../icons/GripVerticalIcon";
import "./SortableTodoRow.scss";

interface SortableTodoRowProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

const SortableTodoRow: React.FC<SortableTodoRowProps> = ({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`sortable-todo-row ${isDragging ? "sortable-todo-row_dragging" : ""}`}
    >
      <span
        className="sortable-todo-row__handle"
        {...attributes}
        {...listeners}
        aria-label="Перетащить для изменения порядка"
      >
        <GripVerticalIcon size={18} />
      </span>
      <TodoItem
        todo={todo}
        onToggle={onToggle}
        onUpdate={onUpdate}
        onDelete={onDelete}
        asWrapper="div"
      />
    </li>
  );
};

export default React.memo(SortableTodoRow);
