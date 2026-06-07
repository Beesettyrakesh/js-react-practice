import { useEffect, useReducer, useState } from "react";
import { TransactionContext } from "./TransactionContext";

const initialTransactionData = {
  description: "",
  amount: "",
  type: "Income",
  category: "",
};

const initialState = {
  transaction: initialTransactionData,
  transactionList: [],
  filter: "all",
  editingId: null,
  editTransaction: null,
  addError: null,
  editError: null,
};

function transactionReducer(state, action) {}

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);
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

  function handleTransactionsFilter(selectedFilter) {
    setFilter(selectedFilter);
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
    <TransactionContext.Provider
      value={{
        transaction,
        transactionList,
        filteredTransactions,
        filter,
        editingId,
        editTransaction,
        addError,
        editError,
        handleAddTransaction,
        handleInputChange,
        handleDeleteTransaction,
        handleTransactionsFilter,
        handleStartEdit,
        handleEditInputChange,
        handleSaveEdit,
        handleCancelEdit,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
