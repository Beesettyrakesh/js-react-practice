import { fetchProductById, fetchProducts } from "./api.js";
import logger, { formatCurrency } from "./utils.js";

async function fetchAllProducts() {
  const products = await fetchProducts();

  products
    .map(
      (product) => `${product.name} - ${formatCurrency(product.price, "INR")}`,
    )
    .forEach((str) => logger.info(str));
}

async function fetchById(id) {
  try {
    const product = await fetchProductById(id);

    logger.info(
      `ID: ${product.id}, Name: ${product.name}, Price: ${formatCurrency(
        product.price,
        "INR",
      )}`,
    );
  } catch (err) {
    logger.error(err.message);
  }
}

fetchAllProducts();
fetchById(1);
fetchById(99);
