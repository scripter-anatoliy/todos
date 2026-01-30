import React, {
  useState,
  useCallback,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import Button from "../Button/Button";
import "./TodoInput.scss";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [input, setInput] = useState("");
  const [showEmptyHint, setShowEmptyHint] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      onAdd(input.trim());
      setInput("");
      setShowEmptyHint(false);
    }
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (input === "" && newValue.startsWith(" ")) {
        return;
      }
      setInput(newValue);
      setShowEmptyHint(false);
    },
    [input],
  );

  const handleAddClick = useCallback(() => {
    const text = input.trim();
    if (!text) {
      setShowEmptyHint(true);
      return;
    }
    onAdd(text);
    setInput("");
    setShowEmptyHint(false);
  }, [input, onAdd]);

  return (
    <div className="todo-input">
      <input
        type="text"
        className="todo-input__field"
        placeholder="What needs to be done? Enter to add"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {showEmptyHint && (
        <div className="todo-input__hint-popup" role="alert">
          Введите название задачи в поле выше
        </div>
      )}
      <Button variant="primary" fullWidth onClick={handleAddClick}>
        Add Todo
      </Button>
    </div>
  );
};

export default React.memo(TodoInput);
