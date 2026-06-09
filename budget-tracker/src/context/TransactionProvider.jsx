import { useEffect, useReducer } from "react";
import { TransactionContext } from "./TransactionContext";
import validateTransaction from "../utils/validateTransaction";

const initialTransactionData = {
  description: "",
  amount: "",
  type: "Income",
  category: "",
};

function init(initialTransaction) {
  const cachedTransactions = localStorage.getItem("transactions");

  return {
    transaction: initialTransaction,
    transactionList:
      cachedTransactions !== null
        ? JSON.parse(cachedTransactions).map((transaction) => ({
            ...transaction,
            createdAt: new Date(transaction.createdAt),
          }))
        : [],
    filter: "all",
    editingId: null,
    editTransaction: null,
    addError: null,
    editError: null,
  };
}

function transactionReducer(state, action) {
  switch (action.type) {
    case "SET_FORM_FIELD":
      return {
        ...state,
        transaction: {
          ...state.transaction,
          [action.payload.name]: action.payload.value,
        },
      };

    case "SET_EDIT_FIELD":
      return {
        ...state,
        editTransaction: {
          ...state.editTransaction,
          [action.payload.name]: action.payload.value,
        },
      };

    case "ADD_TRANSACTION":
      return {
        ...state,
        transactionList: [...state.transactionList, action.payload],
        transaction: initialTransactionData,
      };

    case "DELETE_TRANSACTION": {
      const updatedTransactionList = state.transactionList.filter(
        (transactionItem) => transactionItem.id !== action.payload,
      );
      return {
        ...state,
        transactionList: updatedTransactionList,
      };
    }

    case "START_EDIT":
      return {
        ...state,
        editingId: action.payload.id,
        editTransaction: { ...action.payload },
      };

    case "SAVE_EDIT": {
      const updatedTransactionList = state.transactionList.map((transaction) =>
        transaction.id === action.payload.id ? action.payload : transaction,
      );
      return {
        ...state,
        transactionList: updatedTransactionList,
        editingId: null,
        editTransaction: null,
      };
    }

    case "CANCEL_EDIT":
      return {
        ...state,
        editingId: null,
        editTransaction: null,
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    case "SET_ADD_ERROR":
      return {
        ...state,
        addError: action.payload,
      };

    case "SET_EDIT_ERROR":
      return {
        ...state,
        editError: action.payload,
      };

    case "CLEAR_ADD_ERROR":
      return {
        ...state,
        addError: null,
      };

    case "CLEAR_EDIT_ERROR":
      return {
        ...state,
        editError: null,
      };

    default:
      return state;
  }
}

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    transactionReducer,
    initialTransactionData,
    init,
  );

  const {
    transaction,
    transactionList,
    filter,
    editingId,
    editTransaction,
    addError,
    editError,
  } = state;

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

  function handleInputChange(event) {
    const { name, value } = event.target;

    dispatch({
      type: "CLEAR_ADD_ERROR",
    });

    dispatch({
      type: "SET_FORM_FIELD",
      payload: { name, value },
    });
  }

  function handleEditInputChange(event) {
    const { name, value } = event.target;

    dispatch({
      type: "CLEAR_EDIT_ERROR",
    });

    dispatch({
      type: "SET_EDIT_FIELD",
      payload: { name, value },
    });
  }

  function handleAddTransaction() {
    const errorMessage = validateTransaction(transaction);

    if (!errorMessage) {
      const newTransaction = {
        ...transaction,
        id: crypto.randomUUID(),
        amount: Number(transaction.amount),
        createdAt: new Date(),
      };

      dispatch({
        type: "ADD_TRANSACTION",
        payload: newTransaction,
      });

      dispatch({
        type: "CLEAR_ADD_ERROR",
      });
    } else {
      dispatch({
        type: "SET_ADD_ERROR",
        payload: errorMessage,
      });
    }
  }

  function handleDeleteTransaction(transactionId) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: transactionId,
    });
  }

  function handleSaveEdit() {
    const errorMessage = validateTransaction(editTransaction);

    if (!errorMessage) {
      const updatedTransaction = {
        ...editTransaction,
        amount: Number(editTransaction.amount),
      };

      dispatch({
        type: "SAVE_EDIT",
        payload: updatedTransaction,
      });

      dispatch({
        type: "CLEAR_EDIT_ERROR",
      });
    } else {
      dispatch({
        type: "SET_EDIT_ERROR",
        payload: errorMessage,
      });
    }
  }

  function handleStartEdit(transaction) {
    dispatch({
      type: "START_EDIT",
      payload: transaction,
    });
  }

  function handleCancelEdit() {
    dispatch({
      type: "CANCEL_EDIT",
    });

    dispatch({
      type: "CLEAR_EDIT_ERROR",
    });
  }

  function handleTransactionsFilter(filterValue) {
    dispatch({
      type: "SET_FILTER",
      payload: filterValue,
    });
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
