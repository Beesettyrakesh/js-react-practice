export default function validateTransaction(transaction) {
  if (transaction.description.trim() === "") {
    return "Description is required";
  }
  if (transaction.amount === "") {
    return "Amount is required";
  }
  if (Number(transaction.amount) <= 0) {
    return "Amount must be a positive value";
  }
  if (transaction.category.trim() === "") {
    return "Category is required";
  }
  return null;
}
