export function formatCurrency(amount) {
  let formattedAmount = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `₹${formattedAmount}`;
}

export function formatDate(date) {
  let formattedDate = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
  return formattedDate;
}

const logger = {
  info(msg) {
    console.log(`[INFO] ${msg}`);
  },
  warn(msg) {
    console.log(`[WARN] ${msg}`);
  },
  error(msg) {
    console.log(`[ERROR] ${msg}`);
  },
};

export default logger;
