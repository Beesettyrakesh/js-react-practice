import { useTransactions } from "../hooks/useTransaction";

const TransactionsSummary = () => {
  const { transactionList } = useTransactions();

  const income = transactionList.reduce(
    (acc, transaction) =>
      transaction.type === "Income" ? acc + transaction.amount : acc,
    0,
  );

  const expenses = transactionList.reduce(
    (acc, transaction) =>
      transaction.type === "Expense" ? acc + transaction.amount : acc,
    0,
  );

  const balance = income - expenses;

  return (
    <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
      <span style={{ marginRight: "10px" }}>Total Balance: {balance}</span>
      <span style={{ marginRight: "10px" }}>Total Income: {income}</span>
      <span style={{ marginRight: "10px" }}>Total Expenses: {expenses}</span>
    </div>
  );
};

export default TransactionsSummary;
