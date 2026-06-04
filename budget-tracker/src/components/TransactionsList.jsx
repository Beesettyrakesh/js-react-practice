import TransactionItem from "./TransactionItem";
import TransactionsInput from "./TransactionsInput";

const TransactionsList = ({
  transactionList,
  totalTransactions,
  onTransactionDelete,
  editingId,
  editTransaction,
  onEditInputChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  error,
}) => {
  if (totalTransactions === 0)
    return <p>No transactions yet. Add one above!</p>;

  if (transactionList.length === 0)
    return <p>No transactions match this filter</p>;

  return (
    <div>
      {transactionList.map((transaction) =>
        transaction.id === editingId ? (
          <TransactionsInput
            transaction={editTransaction}
            onInputChange={onEditInputChange}
            mode="edit"
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            error={error}
            key={transaction.id}
          />
        ) : (
          <TransactionItem
            transaction={transaction}
            onTransactionDelete={onTransactionDelete}
            onStartEdit={onStartEdit}
            key={transaction.id}
          />
        ),
      )}
    </div>
  );
};

export default TransactionsList;
