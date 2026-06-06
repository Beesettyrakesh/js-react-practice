import { useTransactions } from "../hooks/useTransaction";

const dateFormatter = new Intl.DateTimeFormat("en-IN");

const TransactionItem = ({ transaction }) => {
  const { handleDeleteTransaction, handleStartEdit } = useTransactions();

  return (
    <div>
      <p style={{ marginRight: "10px", fontWeight: "bold" }}>
        {transaction.description}
      </p>
      <span style={{ marginRight: "10px" }}>Rs. {transaction.amount}</span>
      <span style={{ marginRight: "10px" }}>{transaction.type}</span>
      <span style={{ marginRight: "10px" }}>{transaction.category}</span>
      <span style={{ marginRight: "10px" }}>
        {dateFormatter.format(transaction.createdAt)}
      </span>

      <button
        type="button"
        onClick={() => handleStartEdit(transaction)}
        style={{ marginRight: "10px" }}
      >
        Edit
      </button>

      <button
        type="button"
        onClick={() => handleDeleteTransaction(transaction.id)}
        style={{ marginRight: "10px" }}
      >
        Delete
      </button>
      <hr />
    </div>
  );
};

export default TransactionItem;
