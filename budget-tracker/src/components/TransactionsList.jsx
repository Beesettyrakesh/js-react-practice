import TransactionItem from "./TransactionItem";

const TransactionsList = ({ transactionList, onTransactionDelete }) => {
  return (
    <div>
      {transactionList.map((transaction) => (
        <TransactionItem
          transaction={transaction}
          onTransactionDelete={onTransactionDelete}
          key={transaction.id}
        />
      ))}
    </div>
  );
};

export default TransactionsList;
