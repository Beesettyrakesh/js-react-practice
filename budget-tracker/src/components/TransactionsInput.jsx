const TransactionsInput = ({
  transaction,
  onAddTransaction,
  onInputChange,
}) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label>
        Description:
        <input
          name="description"
          type="text"
          value={transaction.description}
          onChange={onInputChange}
        />
      </label>

      <label>
        Amount:
        <input
          name="amount"
          type="number"
          value={transaction.amount}
          onChange={onInputChange}
        />
      </label>

      <label>
        Type:
        <select name="type" value={transaction.type} onChange={onInputChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>

      <label>
        Category:
        <input
          name="category"
          type="text"
          value={transaction.category}
          onChange={onInputChange}
        />
      </label>

      <button type="button" onClick={onAddTransaction}>
        Add
      </button>
    </div>
  );
};

export default TransactionsInput;
