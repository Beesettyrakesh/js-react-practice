import { useState } from "react";
import TransactionsInput from "./components/TransactionsInput";
import TransactionsList from "./components/TransactionsList";
import TransactionsSummary from "./components/TransactionsSummary";

const initialTransacationData = {
  id: "",
  description: "",
  amount: "",
  type: "income",
  category: "",
  createdAt: null,
};

function App() {
  const [transaction, setTransaction] = useState(initialTransacationData);
  const [transactionList, settransactionList] = useState([]);

  function handleAddTransaction() {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
      amount: Number(transaction.amount),
      createdAt: new Date(),
    };

    setTransaction(newTransaction);
    settransactionList((prev) => [...prev, newTransaction]);
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
    settransactionList((prev) =>
      prev.filter((transactionItem) => transactionItem.id !== transactionId),
    );
  }

  return (
    <>
      <div>
        <TransactionsInput
          transaction={transaction}
          onAddTransaction={handleAddTransaction}
          onInputChange={handleInputChange}
        />

        {transactionList.length > 0 ? (
          <TransactionsSummary transactionList={transactionList} />
        ) : (
          <>
            <span style={{ marginRight: "10px" }}>Total Balance: 0</span>
            <span style={{ marginRight: "10px" }}>Total Income: 0</span>
            <span style={{ marginRight: "10px" }}>Total Expenses: 0</span>
          </>
        )}

        {transactionList.length > 0 ? (
          <TransactionsList
            transactionList={transactionList}
            onTransactionDelete={handleDeleteTransaction}
          />
        ) : (
          <p>No transactions yet. Add one above!</p>
        )}
      </div>
    </>
  );
}

export default App;
