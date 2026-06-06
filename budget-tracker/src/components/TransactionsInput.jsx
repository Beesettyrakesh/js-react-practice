import { useTransactions } from "../hooks/useTransaction";

const TransactionsInput = ({ mode }) => {
  const {
    transaction,
    editTransaction,
    handleAddTransaction,
    handleInputChange,
    handleEditInputChange,
    addError,
    editError,
    handleSaveEdit,
    handleCancelEdit,
  } = useTransactions();

  const currentTransaction = mode === "add" ? transaction : editTransaction;

  const currentInputHandler =
    mode === "add" ? handleInputChange : handleEditInputChange;

  const currentError = mode === "add" ? addError : editError;

  return (
    <div style={{ marginBottom: "10px" }}>
      <label>
        Description:
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={currentTransaction.description}
          onChange={currentInputHandler}
          style={{ marginRight: "10px" }}
        />
      </label>

      <label>
        Amount:
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={currentTransaction.amount}
          onChange={currentInputHandler}
          style={{ marginRight: "10px" }}
        />
      </label>

      <label>
        Type:
        <select
          name="type"
          value={currentTransaction.type}
          onChange={currentInputHandler}
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
          value={currentTransaction.category}
          onChange={currentInputHandler}
          style={{ marginRight: "10px" }}
        />
      </label>

      {mode === "add" ? (
        <button
          type="button"
          onClick={handleAddTransaction}
          style={{ marginRight: "10px" }}
        >
          Add
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={handleCancelEdit}
            style={{ marginRight: "10px" }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveEdit}
            style={{ marginRight: "10px" }}
          >
            Save
          </button>
        </>
      )}

      {currentError && <h4 style={{ color: "red" }}>{currentError}</h4>}
    </div>
  );
};

export default TransactionsInput;
