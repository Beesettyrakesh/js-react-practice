const logger = {
  info(msg) {
    console.log(`[INFO] ${msg}`);
  },
  error(msg) {
    console.log(`[ERROR] ${msg}`);
  },
  warn(msg) {
    console.log(`[WARN] ${msg}`);
  },
};

export function formatCurrency(amount, currency) {
  let formattedAmount = new Intl.NumberFormat(
    currency === "INR" ? "en-IN" : "en-US",
    {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    },
  ).format(amount);

  if (currency === "USD") {
    return `$${formattedAmount}`;
  } else if (currency === "INR") {
    return `₹${formattedAmount}`;
  } else {
    logger.warn(amount);
  }
}

export function capitalize(str) {
  let capitalizedWords = str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  console.log(capitalizedWords);
  return capitalizedWords;
}

export default logger;
