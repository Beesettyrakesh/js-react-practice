const FilterBar = ({ onFilterChange, filter }) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => onFilterChange("all")}
        style={{
          fontWeight: filter === "all" ? "bold" : "normal",
        }}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => onFilterChange("active")}
        style={{
          fontWeight: filter === "active" ? "bold" : "normal",
        }}
      >
        Active
      </button>
      <button
        type="button"
        onClick={() => onFilterChange("completed")}
        style={{
          fontWeight: filter === "completed" ? "bold" : "normal",
        }}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterBar;
