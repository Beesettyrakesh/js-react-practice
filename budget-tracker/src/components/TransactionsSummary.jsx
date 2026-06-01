const TransactionsSummary = ({ transactionList }) => {
  console.log(transactionList);
  const income = transactionList.reduce(
    (acc, transaction) =>
      transaction.type === "income" ? acc + transaction.amount : acc,
    0,
  );

  const expenses = transactionList.reduce(
    (acc, transaction) =>
      transaction.type === "expense" ? acc + transaction.amount : acc,
    0,
  );

  const balance = income - expenses;

  return (
    <div>
      <span style={{ marginRight: "10px" }}>Total Balance: {balance}</span>
      <span style={{ marginRight: "10px" }}>Total Income: {income}</span>
      <span style={{ marginRight: "10px" }}>Total Expenses: {expenses}</span>
    </div>
  );
};

export default TransactionsSummary;
