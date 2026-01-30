import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterButtons from "./FilterButtons";
import {
  FILTER_ALL,
  FILTER_ACTIVE,
  FILTER_COMPLETED,
  FilterType,
} from "../../../types";

describe("FilterButtons", () => {
  const setup = (initialFilter: FilterType = FILTER_ALL) => {
    const mockOnSetFilter = jest.fn();
    render(
      <FilterButtons filter={initialFilter} onSetFilter={mockOnSetFilter} />,
    );
    return {
      allButton: screen.getByRole("button", { name: /all/i }),
      activeButton: screen.getByRole("button", { name: /active/i }),
      completedButton: screen.getByRole("button", { name: /completed/i }),
      mockOnSetFilter,
    };
  };

  test("отрисовываем кнопки фильтров", () => {
    const { allButton, activeButton, completedButton } = setup();

    expect(allButton).toBeInTheDocument();
    expect(activeButton).toBeInTheDocument();
    expect(completedButton).toBeInTheDocument();
  });

  test("записываем правильные значения при клике", async () => {
    const { allButton, activeButton, completedButton, mockOnSetFilter } =
      setup();

    await userEvent.click(activeButton);
    expect(mockOnSetFilter).toHaveBeenCalledWith(FILTER_ACTIVE);

    await userEvent.click(completedButton);
    expect(mockOnSetFilter).toHaveBeenCalledWith(FILTER_COMPLETED);

    await userEvent.click(allButton);
    expect(mockOnSetFilter).toHaveBeenCalledWith(FILTER_ALL);
  });

  test("активная кнопка имеет класс primary", () => {
    const { rerender } = render(
      <FilterButtons filter={FILTER_ALL} onSetFilter={jest.fn()} />,
    );

    expect(screen.getByRole("button", { name: /all/i })).toHaveClass(
      "button_primary",
    );
    expect(screen.getByRole("button", { name: /active/i })).toHaveClass(
      "button_muted",
    );

    rerender(<FilterButtons filter={FILTER_ACTIVE} onSetFilter={jest.fn()} />);
    expect(screen.getByRole("button", { name: /active/i })).toHaveClass(
      "button_primary",
    );
  });
});
