const TransactionsInput = ({
  transaction,
  onAddTransaction,
  onInputChange,
  onSaveEdit,
  onCancelEdit,
  mode,
  error,
}) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label>
        Description:
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={transaction.description}
          onChange={onInputChange}
          style={{ marginRight: "10px" }}
        />
      </label>

      <label>
        Amount:
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={transaction.amount}
          onChange={onInputChange}
          style={{ marginRight: "10px" }}
        />
      </label>

      <label>
        Type:
        <select
          name="type"
          value={transaction.type}
          onChange={onInputChange}
          style={{ marginRight: "10px" }}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </label>

      <label>
        Category:
        <input
          name="category"
          type="text"
          placeholder="Category"
          value={transaction.category}
          onChange={onInputChange}
          style={{ marginRight: "10px" }}
        />
      </label>

      {mode === "add" ? (
        <button
          type="button"
          onClick={onAddTransaction}
          style={{ marginRight: "10px" }}
        >
          Add
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={() => onCancelEdit()}
            style={{ marginRight: "10px" }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onSaveEdit()}
            style={{ marginRight: "10px" }}
          >
            Save
          </button>
        </>
      )}

      {error && <h4>{error}</h4>}
    </div>
  );
};

export default TransactionsInput;
