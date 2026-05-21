import logger from "./utils.js";

export function fetchProducts() {
  logger.info("Fetching all products...");

  return new Promise((resolve) => {
    setTimeout(() => {
      const products = [
        { id: 1, name: "Keyboard", price: 120 },
        { id: 2, name: "Mouse", price: 45 },
      ];
      logger.info("Products fetched successfully");

      resolve(products);
    }, 500);
  });
}

export async function fetchProductById(id) {
  logger.info(`Fetching product with ID: ${id}`);

  const products = await fetchProducts();

  const product = products.find((product) => product.id === id);

  if (product) {
    logger.info(`Product found: ${product.name}`);
    return product;
  }

  throw new Error("Product not found");
}
