import { useTransactions } from "../hooks/useTransaction";
import TransactionItem from "./TransactionItem";
import TransactionsInput from "./TransactionsInput";

const TransactionsList = () => {
  const { transactionList, filteredTransactions, editingId } =
    useTransactions();

  if (transactionList.length === 0)
    return <p>No transactions yet. Add one above!</p>;

  if (filteredTransactions.length === 0)
    return <p>No transactions match this filter</p>;

  return (
    <div>
      {filteredTransactions.map((transaction) =>
        transaction.id === editingId ? (
          <TransactionsInput mode="edit" key={transaction.id} />
        ) : (
          <TransactionItem transaction={transaction} key={transaction.id} />
        ),
      )}
    </div>
  );
};

export default TransactionsList;
