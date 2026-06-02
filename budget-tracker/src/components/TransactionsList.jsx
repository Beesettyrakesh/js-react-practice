import TransactionItem from "./TransactionItem";
import TransactionsInput from "./TransactionsInput";

const TransactionsList = ({
  transactionList,
  onTransactionDelete,
  editingId,
  editTransaction,
  onEditInputChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}) => {
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
