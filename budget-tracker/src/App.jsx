import { useState } from "react";
import FilterTransactionsBar from "./components/FilterTransactionsBar";
import TransactionsInput from "./components/TransactionsInput";
import TransactionsList from "./components/TransactionsList";
import TransactionsSummary from "./components/TransactionsSummary";

const initialTransacationData = {
  id: "",
  description: "",
  amount: "",
  type: "Income",
  category: "",
  createdAt: null,
};

function App() {
  const [transaction, setTransaction] = useState(initialTransacationData);
  const [transactionList, setTransactionList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editTransaction, setEditTransaction] = useState(null);

  let filteredTransactions =
    filter === "income"
      ? transactionList.filter((transaction) => transaction.type === "Income")
      : filter === "expense"
        ? transactionList.filter(
            (transaction) => transaction.type === "Expense",
          )
        : transactionList;

  function handleAddTransaction() {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
      amount: Number(transaction.amount),
      createdAt: new Date(),
    };

    setTransactionList((prev) => [...prev, newTransaction]);
    setTransaction(initialTransacationData);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

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

    setEditTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSaveEdit() {
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
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditTransaction(null);
  }

  return (
    <>
      <div>
        {transactionList.length > 0 ? (
          <TransactionsSummary transactionList={transactionList} />
        ) : (
          <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
            <span style={{ marginRight: "10px" }}>Total Balance: 0</span>
            <span style={{ marginRight: "10px" }}>Total Income: 0</span>
            <span style={{ marginRight: "10px" }}>Total Expenses: 0</span>
          </div>
        )}

        <TransactionsInput
          transaction={transaction}
          onAddTransaction={handleAddTransaction}
          onInputChange={handleInputChange}
          mode="add"
        />

        {transactionList.length > 0 && (
          <FilterTransactionsBar
            onTransactionsFilter={handleTransactionsFilter}
            filter={filter}
          />
        )}

        {transactionList.length === 0 ? (
          <p>No transactions yet. Add one above!</p>
        ) : filteredTransactions.length === 0 ? (
          <p>No transactions match this filter</p>
        ) : (
          <TransactionsList
            transactionList={filteredTransactions}
            onTransactionDelete={handleDeleteTransaction}
            editingId={editingId}
            onInputChange={handleInputChange}
            editTransaction={editTransaction}
            onEditInputChange={handleEditInputChange}
            onStartEdit={handleStartEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
          />
        )}
      </div>
    </>
  );
}

export default App;
