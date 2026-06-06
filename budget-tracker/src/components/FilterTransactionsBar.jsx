import { useTransactions } from "../hooks/useTransaction";

const FilterTransactionsBar = () => {
  const { transactionList, filter, handleTransactionsFilter } =
    useTransactions();

  return (
    transactionList.length > 0 && (
      <>
        <button
          type="button"
          onClick={() => handleTransactionsFilter("all")}
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
          onClick={() => handleTransactionsFilter("income")}
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
          onClick={() => handleTransactionsFilter("expense")}
          style={{
            fontWeight: filter === "expense" ? "bold" : "normal",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          Expense
        </button>
      </>
    )
  );
};

export default FilterTransactionsBar;
