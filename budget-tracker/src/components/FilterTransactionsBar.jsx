const FilterTransactionsBar = ({ onTransactionsFilter, filter }) => {
  return (
    <>
      <button
        type="button"
        onClick={() => onTransactionsFilter("all")}
        style={{
          fontWeight: filter === "all" ? "bold" : "normal",
          marginRight: "10px",
          marginBottom: "10px",
        }}
      >
        All
      </button>

      <button
        type="button"
        onClick={() => onTransactionsFilter("income")}
        style={{
          fontWeight: filter === "income" ? "bold" : "normal",
          marginRight: "10px",
          marginBottom: "10px",
        }}
      >
        Income
      </button>

      <button
        type="button"
        onClick={() => onTransactionsFilter("expense")}
        style={{
          fontWeight: filter === "expense" ? "bold" : "normal",
          marginRight: "10px",
          marginBottom: "10px",
        }}
      >
        Expense
      </button>
    </>
  );
};

export default FilterTransactionsBar;
