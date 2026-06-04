import { useEffect, useState } from "react";
import FilterTransactionsBar from "./components/FilterTransactionsBar";
import TransactionsInput from "./components/TransactionsInput";
import TransactionsList from "./components/TransactionsList";
import TransactionsSummary from "./components/TransactionsSummary";

const initialTransactionData = {
  description: "",
  amount: "",
  type: "Income",
  category: "",
};

function App() {
  const [transaction, setTransaction] = useState(initialTransactionData);
  const [transactionList, setTransactionList] = useState(() => {
    const cachedTransactions = localStorage.getItem("transactions");
    if (cachedTransactions !== null) {
      const parsedTransactions = JSON.parse(cachedTransactions);
      return parsedTransactions.map((transaction) => ({
        ...transaction,
        createdAt: new Date(transaction.createdAt),
      }));
    }
    return [];
  });
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editTransaction, setEditTransaction] = useState(null);
  const [addError, setAddError] = useState(null);
  const [editError, setEditError] = useState(null);

  const filteredTransactions =
    filter === "income"
      ? transactionList.filter((transaction) => transaction.type === "Income")
      : filter === "expense"
        ? transactionList.filter(
            (transaction) => transaction.type === "Expense",
          )
        : transactionList;

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactionList));
  }, [transactionList]);

  function validateTransaction(transaction) {
    if (transaction.description.trim() === "") {
      return "Description is required";
    }

    if (transaction.amount === "") {
      return "Amount is required";
    }

    if (Number(transaction.amount) <= 0) {
      return "Amount must be a positive value";
    }

    if (transaction.category.trim() === "") {
      return "Category is required";
    }

    return null;
  }

  function handleAddTransaction() {
    const validationError = validateTransaction(transaction);
    if (!validationError) {
      const newTransaction = {
        ...transaction,
        id: crypto.randomUUID(),
        amount: Number(transaction.amount),
        createdAt: new Date(),
      };

      setTransactionList((prev) => [...prev, newTransaction]);
      setTransaction(initialTransactionData);
      setAddError(null);
    } else {
      setAddError(validationError);
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setAddError(null);
    setTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleDeleteTransaction(transactionId) {
    setTransactionList((prev) =>
      prev.filter((transactionItem) => transactionItem.id !== transactionId),
    );
  }

  function handleTransactionsFilter(filter) {
    setFilter(filter);
  }

  function handleStartEdit(transaction) {
    setEditingId(transaction.id);
    setEditTransaction({ ...transaction });
  }

  function handleEditInputChange(event) {
    const { name, value } = event.target;

    setEditError(null);
    setEditTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSaveEdit() {
    const validationError = validateTransaction(editTransaction);

    if (!validationError) {
      const updatedTransaction = {
        ...editTransaction,
        amount: Number(editTransaction.amount),
      };

      const updatedTransactions = transactionList.map((transaction) =>
        transaction.id === editingId ? updatedTransaction : transaction,
      );

      setTransactionList(updatedTransactions);
      setEditingId(null);
      setEditTransaction(null);
      setEditError(null);
    } else {
      setEditError(validationError);
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditTransaction(null);
    setEditError(null);
  }

  return (
    <>
      <div>
        <TransactionsSummary transactionList={transactionList} />

        <TransactionsInput
          transaction={transaction}
          onAddTransaction={handleAddTransaction}
          onInputChange={handleInputChange}
          mode="add"
          error={addError}
        />

        {transactionList.length > 0 && (
          <FilterTransactionsBar
            onTransactionsFilter={handleTransactionsFilter}
            filter={filter}
          />
        )}

        <TransactionsList
          transactionList={filteredTransactions}
          totalTransactions={transactionList.length}
          onTransactionDelete={handleDeleteTransaction}
          editingId={editingId}
          editTransaction={editTransaction}
          onEditInputChange={handleEditInputChange}
          onStartEdit={handleStartEdit}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          error={editError}
        />
      </div>
    </>
  );
}

export default App;
