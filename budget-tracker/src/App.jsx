import FilterTransactionsBar from "./components/FilterTransactionsBar";
import TransactionsInput from "./components/TransactionsInput";
import TransactionsList from "./components/TransactionsList";
import TransactionsSummary from "./components/TransactionsSummary";
import { TransactionProvider } from "./context/TransactionProvider";

function App() {
  return (
    <TransactionProvider>
      <TransactionsSummary />
      <TransactionsInput mode="add" />
      <FilterTransactionsBar />
      <TransactionsList />
    </TransactionProvider>
  );
}

export default App;
