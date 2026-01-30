import React from "react";
import {
  FilterType,
  FILTER_ALL,
  FILTER_ACTIVE,
  FILTER_COMPLETED,
} from "../../../types";
import Button from "../../Button/Button";
import "./FilterButtons.scss";

const FILTER_OPTIONS: { filter: FilterType; label: string }[] = [
  { filter: FILTER_ALL, label: "All" },
  { filter: FILTER_ACTIVE, label: "Active" },
  { filter: FILTER_COMPLETED, label: "Completed" },
];

interface FilterButtonsProps {
  filter: FilterType;
  onSetFilter: (filter: FilterType) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  filter,
  onSetFilter,
}) => {
  return (
    <div className="filters-container">
      {FILTER_OPTIONS.map(({ filter: filterValue, label }) => (
        <Button
          key={filterValue}
          variant={filter === filterValue ? "primary" : "muted"}
          size="sm"
          onClick={() => onSetFilter(filterValue)}
          className="filters-container__btn"
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default React.memo(FilterButtons);
