import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem from "./TodoItem";

describe("TodoItem", () => {
  const mockTodo = {
    id: "1",
    text: "Тестовая задача",
    completed: false,
  };

  const setup = (props = {}) => {
    const utils = render(
      <TodoItem
        todo={mockTodo}
        onToggle={() => {}}
        onUpdate={() => {}}
        onDelete={() => {}}
        {...props}
      />,
    );
    const checkbox = screen.getByRole("checkbox");
    const textEl = screen.getByText(mockTodo.text);
    const label = document.querySelector(
      `label[for="${(checkbox as HTMLInputElement).id}"]`,
    );
    return {
      checkbox,
      textEl,
      label,
      ...utils,
    };
  };

  test("проверяем задачу и текст", () => {
    const { textEl } = setup();
    expect(textEl).toBeInTheDocument();
  });

  test("проверяем, что label связан с чекбоксом", () => {
    const { label, checkbox } = setup();
    expect(label).toHaveAttribute("for", (checkbox as HTMLInputElement).id);
  });

  test("проверяем состояние чекбокса", () => {
    const { checkbox } = setup({ todo: { ...mockTodo, completed: true } });
    expect(checkbox).toBeChecked();
  });

  test("Проверяем, что клик срабатывает", async () => {
    const mockOnToggle = jest.fn();
    const { checkbox } = setup({ onToggle: mockOnToggle });
    await userEvent.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledWith(mockTodo.id);
  });
});
