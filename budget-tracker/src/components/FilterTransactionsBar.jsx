const FilterTransactionsBar = ({ onTransactionsFilter, filter }) => {
  return (
    <>
      <button
        type="button"
        onClick={() => onTransactionsFilter("all")}
        style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => onTransactionsFilter("income")}
        style={{ fontWeight: filter === "income" ? "bold" : "normal" }}
      >
        Income
      </button>
      <button
        type="button"
        onClick={() => onTransactionsFilter("expense")}
        style={{ fontWeight: filter === "expense" ? "bold" : "normal" }}
      >
        Expense
      </button>
    </>
  );
};

export default FilterTransactionsBar;
