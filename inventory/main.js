import createStore from "./store.js";
import logger, { formatCurrency } from "./utils.js";

const store = createStore();

store.addProduct({ id: 1, name: "Keyboard", price: 120, stock: 10 });
store.addProduct({ id: 2, name: "Mouse", price: 45, stock: 0 });
store.addProduct({ id: 3, name: "Monitor", price: 380, stock: 5 });

store.getAll().forEach((product) => {
  logger.info(
    `${product.name} - ${formatCurrency(product.price)} - ${
      product.stock > 0 ? "In Stock" : "Out of Stock"
    }`,
  );
});

logger.info(formatCurrency(store.getTotalValue()));

const { id, name, price, stock } = store.updateStock(1, 5);
logger.info(
  `Id: ${id}, Name: ${name}, Price: ${formatCurrency(price)}, Stock: ${stock}`,
);

{
  const { id, name, price, stock } = store.getById(2);
  logger.info(
    `Id: ${id}, Name: ${name}, Price: ${formatCurrency(price)}, Stock: ${stock}`,
  );
}

try {
  store.getById(99);
} catch (err) {
  logger.error(err.message);
}

const { totalProducts, inStock, outOfStock, totalValue } = store.getSummary();
logger.info(
  `Summary — Total: ${totalProducts}, In Stock: ${inStock}, Out of Stock: ${outOfStock}, Value: ${formatCurrency(totalValue)}`,
);
