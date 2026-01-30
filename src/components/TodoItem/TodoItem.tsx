import React, { useState, useCallback, useRef, useEffect } from "react";
import { Todo } from "../../types";
import PencilIcon from "../icons/PencilIcon";
import TrashIcon from "../icons/TrashIcon";
import Button from "../Button/Button";
import "./TodoItem.scss";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  // При использовании внутри обертки сортировки
  asWrapper?: "li" | "div";
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onUpdate,
  onDelete,
  asWrapper = "li",
}) => {
  const Wrapper = asWrapper;
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      setEditValue(todo.text);
      inputRef.current?.focus();
    }
  }, [isEditing, todo.text]);

  const commitEdit = useCallback(() => {
    const text = editValue.trim();
    if (text) {
      onUpdate(todo.id, text);
      setIsEditing(false);
    } else {
      setEditValue(todo.text);
      setIsEditing(false);
    }
  }, [editValue, todo.id, todo.text, onUpdate]);

  const cancelEdit = useCallback(() => {
    setEditValue(todo.text);
    setIsEditing(false);
  }, [todo.text]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        commitEdit();
      }
      if (e.key === "Escape") {
        cancelEdit();
      }
    },
    [commitEdit, cancelEdit],
  );

  const handleBlur = useCallback(() => {
    commitEdit();
  }, [commitEdit]);

  if (isEditing) {
    return (
      <Wrapper className="todo-item todo-item_editing">
        <div className="todo-item__edit-wrap">
          <input
            ref={inputRef}
            type="text"
            className="todo-item__edit"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            aria-label="Редактировать задачу"
            placeholder="Текст задачи"
          />
          <p className="todo-item__hint">Enter — сохранить, Esc — отмена</p>
          <div className="todo-item__edit-actions">
            <Button variant="primary" size="sm" onClick={commitEdit}>
              Сохранить
            </Button>
            <Button variant="secondary" size="sm" onClick={cancelEdit}>
              Отмена
            </Button>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        id={`todo-${todo.id}`}
        className="todo-item__checkbox"
        aria-label="Отметить задачу выполненной"
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className="todo-item__checkbox-label"
        aria-hidden
      />
      <span className="todo-item__text">{todo.text}</span>
      <span className="todo-item__actions">
        <button
          type="button"
          className="todo-item__edit-btn"
          onClick={() => setIsEditing(true)}
          aria-label="Редактировать"
        >
          <PencilIcon size={16} />
        </button>
        <button
          type="button"
          className="todo-item__delete-btn"
          onClick={() => onDelete(todo.id)}
          aria-label="Удалить"
        >
          <TrashIcon size={16} />
        </button>
      </span>
    </Wrapper>
  );
};

export default React.memo(TodoItem);
