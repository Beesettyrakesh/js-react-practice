const dateFormatter = Intl.DateTimeFormat("en-IN");

const TransactionItem = ({ transaction, onTransactionDelete }) => {
  return (
    <div>
      <span style={{ marginRight: "10px" }}>{transaction.description}</span>

      <span style={{ marginRight: "10px" }}>{transaction.amount}</span>

      <span style={{ marginRight: "10px" }}>{transaction.type}</span>

      <span style={{ marginRight: "10px" }}>{transaction.category}</span>

      <span style={{ marginRight: "10px" }}>
        {dateFormatter.format(transaction.createdAt)}
      </span>

      <button type="button">Edit</button>
      <button type="button" onClick={() => onTransactionDelete(transaction.id)}>
        Delete
      </button>
      <hr />
    </div>
  );
};

export default TransactionItem;
